
var Lexer = module.exports = function Lexer(str) {
    this.input = str.replace(/\r\n|\r/g, '\n');
    this.stash = [];
    this.lineno = 1;
};

/**
 * Lexer prototype.
 */

Lexer.prototype = {

    tok: function(type, val, lineno) {
        return {
            type: type,
            val: val,
            lineno: lineno
        };
    },

    stashed: function() {
        return this.stash.length
            && this.stash.shift();
    },

    lookahead: function(n){
        var fetch = n - this.stash.length;
        while (fetch-- > 0) this.stash.push(this.next());
        return this.stash[--n];
    },

    consume: function(len){
        this.input = this.input.substr(len);
    },

    advance: function() {
        return this.stashed() || this.next()
    },

    next: function() {
        var token = 
            this.comment ||
            this.variable ||
            this.ifCapture ||
            this.forCapture ||
            this.newline ||
            this.eos ||
            this.text;

        if (!token) {
            throw Error('Token not identified in: ' + this.input);
        }

        return token;
    },

    get forCapture() {
        var captures;

        var forRegex = /^\{\%\s*for\s*(.+?)\s+in\s+(.+?)\s*\%\}/;
        var endForRegex = /\{\%\s*endfor\s*\%\}/;
        var endForRegex = /^\{\%\s*endfor\s*\%\}/;

        if (captures = forRegex.exec(this.input)) {
            this.consume(captures[0].length);

            var tok = {
                type: 'For', 
                element: captures[1],
                collection: captures[2],
                lineno: this.lineno
            };

            return tok;
        }

    },

    get ifCapture() {
        var captures;
        var endifRegex = /\{\%\s*endif\s*\%\}/;
        var imminentEndIf = /^\{\%\s*endif\s*\%\}/;
        var imminentElse = /^\{\%\s*else\s*\%\}/;
        var imminentElif = /^\{\%\s*elif\s*(.+?)\s*\%\}/;

        if (captures = /^\{\%\s*if\s*(.+?)\s*\%\}/.exec(this.input)) {
            this.consume(captures[0].length);

            if (!endifRegex.exec(this.input)) {
                throw Error("Can't find endif for if statement in line no." + this.lineno);
            }

            var tok = this.tok('If', captures[1], this.lineno);
            tok.blocks = [];

            var blocks = tok.blocks;

            while (! (captures = imminentEndIf.exec(this.input))) {
                var elseCapture;
                if (elseCapture = imminentElif.exec(this.input)) {
                    this.consume(elseCapture[0].length);
                    tok.elifBlocks = tok.elifBlocks || [];
                    var elif = {
                        condition: elseCapture[1],
                        blocks: []
                    };
                    tok.elifBlocks.push(elif);
                    blocks = elif.blocks;
                }
                if (elseCapture = imminentElse.exec(this.input)) {
                    this.consume(elseCapture[0].length);
                    tok.elseBlocks = [];
                    blocks = tok.elseBlocks;
                }
                blocks.push(this.next());
            }
            this.consume(captures[0].length);

            return tok
        }
    },

    get comment() {
        var captures;
        if (captures = /^\{\#(.+?)\#\}/.exec(this.input)) {
            this.consume(captures[0].length);
            var tok = this.tok('Comment', captures[1], this.lineno);
            return tok;
        }
    },

    get variable() {
        var captures;
        if (captures = /^\{\{\s*([^}]+?)\s*\}\}/.exec(this.input)) {
            this.consume(captures[0].length);
            var tok = this.tok('Variable', captures[1], this.lineno);
            return tok;
        }
    },

    get text() {
        var re = /^(.+?)(?=(?:\{\{|\{\%|\{\#|\n|$))/m;
        var captures;
        if (captures = re.exec(this.input)) {
            this.consume(captures[0].length);
            var tok = this.tok('Text', captures[1], this.lineno);
            return tok;
        }
    },

    get newline() {
        var captures;
        if (captures = /^(\n)/.exec(this.input)) {
            this.consume(1);
            return this.tok('Newline', '', this.lineno);
        }
    },

    get eos() {
        if (!this.input) {
            return this.tok('Eos', '', this.lineno);
        }
    }

}
