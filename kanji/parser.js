var Lexer = require('./lexer')
  , nodes = require('./nodes');

var Parser = mod = module.exports = function Parser(str){
  this.input = str;
  this.lexer = new Lexer(str);
};

Parser.prototype = {
    get lineno() {
        return this.lexer.lineno
    },

    get peek() {
        return this.lexer.lookahead(1);
    },

    advance: function() {
        return this.lexer.advance()
    },

    parse: function() {
        var block = new nodes.Block;
        block.lineno = this.lineno;

        while (this.peek.type !== 'Eos') {
            var element = this.parseExpr();
            if (element != null) {
                block.push(element);
            }
        }

        return block;
    },

    parseExpr: function(node) {
        var node = node || this.advance();

        var methodName = 'parse' + node.type;
        var parseMethod = this[methodName];

        return parseMethod.call(this, node);
    },

    parseNewline: function(node) {
        var newlineNode = new nodes.Newline();
        newlineNode.lineno = this.lineno;

        return newlineNode;
    },

    parseComment: function(node) {
        return null;
    },

    parseIf: function(node) {
        var blocks = new nodes.Block();

        for (var blockIndex=0;
                 blockIndex < node.blocks.length;
                 blockIndex++) {
            var blockNode = node.blocks[blockIndex];
            var parsedNode = this.parseExpr(blockNode);
            blocks.push(parsedNode);
        }

        var ifNode = new nodes.If(node.val, blocks);
        ifNode.lineno = this.lineno;

        return ifNode;
    },

    parseVariable: function(node) {
        var variableNode = new nodes.Variable(node.val);
        variableNode.lineno = this.lineno;

        return variableNode;
    },

    parseText: function(node){
        var textNode = new nodes.Text(node.val);
        textNode.lineno = this.lineno;

        return textNode;
    }

};
