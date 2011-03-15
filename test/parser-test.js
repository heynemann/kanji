var vows = require('vows')
    assert = require('assert'),
    nodes = require('../kanji/nodes'),
    Lexer = require('../kanji/lexer'),
    Parser = require('../kanji/parser');

vows.describe('parser module').addBatch({
    'The parser': {
        'class': {
            topic: function() { return Parser; },

            'should be defined': function(topic) {
                assert.notEqual(topic, undefined);
                assert.isNotNull(topic);
            },

            'should be initializable': function(topic) {
                var parser = new topic('some string');

                assert.isNotNull(parser);
            },

            'should return a configured instance': function(topic) {
                var parser = new topic('some string');

                assert.equal(parser.input, 'some string');
                assert.isNotNull(parser.lexer);
            }
        },

        'when parsing a simple string': {
            topic: function() {
                var parser = new Parser('simple string');
                return parser.parse();
            },

            'should have as result a block': function(topic) {
                assert.instanceOf(topic, nodes.Block);
            },

            'should return a node of type Text': function(topic) {
                assert.instanceOf(topic[0], nodes.Text);
            },

            'should return a filled TextNode': function(topic) {
                assert.equal(topic[0][0], 'simple string');
            }
        },

        'when parsing a string with an if clause': {
            topic: function() {
                var parser = new Parser('{% if something %}simple{% endif %}');
                return parser.parse();
            },
            
            'should return an IfNode': function(topic) {
                assert.instanceOf(topic[0], nodes.If);
            },

            'should return one block': function(topic) {
                assert.isNotNull(topic[0].block);
                assert.notEqual(topic[0].block, undefined);
                assert.length(topic[0].block, 1);
            },

            'should return a BlockNode as block': function(topic) {
                assert.instanceOf(topic[0].block, nodes.Block);
            },

            'should return a TextNode as block content': function(topic) {
                assert.instanceOf(topic[0].block[0], nodes.Text);
            }
 
        },

        'when parsing a string with a for clause': {
            topic: function() {
                var parser = new Parser('{% for something in other %}{{ something}}{% endfor %}');
                return parser.parse();
            },
            
            'should return a ForNode': function(topic) {
                assert.instanceOf(topic[0], nodes.For);
            },

            'should return one block': function(topic) {
                assert.isNotNull(topic[0].block);
                assert.notEqual(topic[0].block, undefined);
                assert.length(topic[0].block, 1);
            },

            'should return a BlockNode as block': function(topic) {
                assert.instanceOf(topic[0].block, nodes.Block);
            },

            'should return a VariableNode as block content': function(topic) {
                assert.instanceOf(topic[0].block[0], nodes.Variable);
            }
        },

        'when parsing a raw text': {
            topic: function() {
                var parser = new Parser('{% raw %}{{variable}}{%endraw%}');
                return parser.parse();
            },

            'should have as result a block': function(topic) {
                assert.instanceOf(topic, nodes.Block);
            },

            'should return a node of type Raw': function(topic) {
                assert.instanceOf(topic[0], nodes.Raw);
            },

            'should return a filled RawNode': function(topic) {
                assert.equal(topic[0].text, '{{variable}}');
            }
        },


    }
}).export(module);

