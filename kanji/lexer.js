
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
            this.newline ||
            this.eos ||
            this.text;

        if (!token) {
            throw Error('Token not identified in: ' + this.input);
        }

        return token;
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
