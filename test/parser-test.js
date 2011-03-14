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
        }

    }
}).export(module);

