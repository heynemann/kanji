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
        },

        'when lexing a simple string': {
            topic: function() {
                var lex = new Lexer('simple string');
                return lex.next();
            },

            'should return a token of type Text': function(topic) {
                assert.isObject(topic);
                assert.equal(topic.type, 'Text');
                assert.equal(topic.val, 'simple string');
            }
        },

        'when lexing an empty string': {

            topic: function() {
                var lex = new Lexer('');
                return lex.next();
            },

            'should return an object': function(topic) {
                assert.isObject(topic);
            },

            'should return an Eos token': function(topic) {
                assert.equal(topic.type, 'Eos');
            }
        },

        'when lexing a multi-line string': {

            topic: function() {
                var lex = new Lexer('some\ntext');
                return lex;
            },

            'should return the proper tokens': function(lex) {
                var item = lex.next();
                assert.equal(item.type, 'Text');
                item = lex.next();
                assert.equal(item.type, 'Newline');
                item = lex.next();
                assert.equal(item.type, 'Text');
                item = lex.next();
                assert.equal(item.type, 'Eos');
            }
        },


        'when lexing a string with variable replacement': {

            topic: function() {
                var lex = new Lexer('{{ world }}');

                return lex.next();
            },

            'should return a token': function(topic) {
                assert.isObject(topic);
            },

            'and it should be of type Variable': function(topic) {
                assert.equal(topic.type, 'Variable');
            }

        },

        'when lexing a string with comments': {

            topic: function() {
                var lex = new Lexer('{# {{ world }} #}');

                return lex.next();
            },

            'should return a token': function(topic) {
                assert.isObject(topic);
            },

            'and it should be of type Comment': function(topic) {
                assert.equal(topic.type, 'Comment');
            }

        },

        'when lexing a string with if statement': {
            topic: function() {
                var lex = new Lexer('{% if true %}do{% endif %}');

                return lex.next();
            },

            'should return a token': function(topic) {
                assert.isObject(topic);
            },

            'and it should be of type if': function(topic) {
                assert.equal(topic.type, 'If');
            },

            'and it should have a block of type text': function(topic) {
                assert.length(topic.blocks, 1);
                assert.equal(topic.blocks[0].type, "Text");
            }

        }

    }
}).export(module);

