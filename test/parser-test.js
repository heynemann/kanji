var vows = require('vows')
    assert = require('assert'),
    Node = require('../kanji/nodes'),
    TextNode = require('../kanji/nodes/text'),
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
                var parser = new topic('some string',
                                       'somefile.kanji');

                assert.isNotNull(parser);
            },

            'should return a configured instance': function(topic) {
                var parser = new topic('some string',
                                       'somefile.kanji');

                assert.equal(parser.input, 'some string');
                assert.isNotNull(parser.lexer);
                assert.equal(parser.filename, 'somefile.kanji');
            }
        },

        'when parsing a simple string': {
            topic: function() {
                var parser = new Parser('simple string',
                                        'somefile.kanji');
                return parser.parse();
            },

            'should have as result a node': function(topic) {
                assert.instanceOf(topic, Node);
            },

            'should return a node of type TEXT': function(topic) {
                assert.instanceOf(topic[0], TextNode);
            }
        },

    }
}).export(module);

