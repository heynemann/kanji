var vows = require('vows')
    assert = require('assert'),
    Lexer = require('../kanji/lexer');

vows.describe('lexer module').addBatch({
    'The lexer': {
        'class': {
            topic: function() { return Lexer; },

            'should be defined': function(topic) {
                assert.notEqual(topic, undefined);
                assert.isNotNull(topic);
            },
            'should be initializable': function(topic) {
                var lex = new topic('some string');

                assert.equal(lex.input, 'some string');
                assert.equal(lex.lineno, 1);
            }
        }
    }
}).export(module);

