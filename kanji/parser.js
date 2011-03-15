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

    __parseBlock: function(node, blocks) {
        var block = new nodes.Block();
        if (!blocks || blocks.length == 0) {
            return block;
        }

        for (var blockIndex=0;
                 blockIndex < blocks.length;
                 blockIndex++) {
            var blockNode = blocks[blockIndex];
            var parsedNode = this.parseExpr(blockNode);
            block.push(parsedNode);
        }

        return block;
    },

    __parseElifBlock: function(node) {
        if (!node.elifBlocks || node.elifBlocks.length == 0) {
            return null;
        }
        var blocks = [];

        for (var index=0; index<node.elifBlocks.length; index++) {
            var elif = node.elifBlocks[index];
            blocks.push({
                condition: elif.condition,
                block: this.__parseBlock(node, elif.blocks)
            });
        }

        return blocks;
    },

    parseIf: function(node) {
        var blocks = this.__parseBlock(node, node.blocks);
        var elifBlocks = this.__parseElifBlock(node);
        var elseBlocks = this.__parseBlock(node, node.elseBlocks);

        var ifNode = new nodes.If(node.val, blocks, elifBlocks, elseBlocks);
        ifNode.lineno = this.lineno;

        return ifNode;
    },

    parseFor: function(node) {
        var blocks = this.__parseBlock(node, node.blocks);
        var forNode = new nodes.For(node.element, node.collection, blocks, node.condition);
        forNode.lineno = this.lineno;

        return forNode;
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
    },

    parseRaw: function(node) {
        var rawNode = new nodes.Raw(node.val);
        rawNode.lineno = this.lineno;

        return rawNode;
    }

};
