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

            'and it should have the condition as value': function(topic) {
                assert.equal(topic.val, 'true');
            },

            'and it should have a block of type text': function(topic) {
                assert.length(topic.blocks, 1);
                assert.equal(topic.blocks[0].type, "Text");
            }

        },

        'when lexing else statements': {
            topic: function() {
                var lex = new Lexer('{% if false %}do{% else %}not{% endif %}');

                return lex.next();
            },

            'it should have an else block': function(topic) {
                assert.isArray(topic.elseBlocks);
                assert.length(topic.elseBlocks, 1);
            },

            'and it should have a block of type text as else': function(topic) {
                assert.equal(topic.elseBlocks[0].type, "Text");
                assert.equal(topic.elseBlocks[0].val, "not");
            }
           
        },

        'when lexing elif statements': {

            topic: function() {
                var lex = new Lexer('{% if false %}do{% elif true %}elif{%else%}else{% endif %}');

                return lex.next();
            },

            'it should have an elif block': function(topic) {
                assert.isArray(topic.elifBlocks);
                assert.length(topic.elifBlocks, 1);
            },

            'with the proper condition': function(topic) {
                assert.equal(topic.elifBlocks[0].condition, 'true');
            },

            'and a text element in the blocks section': function(topic) {
                assert.equal(topic.elifBlocks[0].blocks[0].type, 'Text');
            },

            'and keep its else block': function(topic) {
                assert.isArray(topic.elseBlocks);
                assert.length(topic.elseBlocks, 1);
            }

        },

        'when lexing for statements': {

            'in simple loops': {

                topic: function() {
                    var lex = new Lexer('{% for element in items %}do{% endfor %}');

                    return lex.next();
                },

                'should return a token': function(topic) {
                    assert.isObject(topic);
                },

                'and it should be of type for': function(topic) {
                    assert.equal(topic.type, 'For');
                },

                'and it should have the element name': function(topic) {
                    assert.equal(topic.element, 'element');
                },

                'and it should have the collection name': function(topic) {
                    assert.equal(topic.collection, 'items');
                },

                'and it should have an array as blocks': function(topic) {
                    assert.isArray(topic.blocks);
                },

                'and it should have a text element as block': function(topic) {
                    assert.equal(topic.blocks[0].type, 'Text');

                },

                'and a null condition property': function(topic) {
                    assert.isNull(topic.condition);
                }
            },

            'in if-enabled loops': {
                topic: function() {
                    var lex = new Lexer('{% for element in items if element == "a" %}do{% endfor %}');

                    return lex.next();

                },

                'should have a condition property': function(topic) {
                    assert.equal(topic.condition,
                            'element == "a"'
                    );
                }

            }

        },

        'when lexing raw statements': {
            topic: function() {
                var lex = new Lexer('{% raw %}text {% if true %}{{ item }}{% endif %}{% endraw %}');
                return lex.next();
            },

            'should return a token': function(topic) {
                assert.isObject(topic);
            },

            'and it should be of type raw': function(topic) {
                assert.equal(topic.type, 'Raw');
            },

            'and it should lex the text as val': function(topic) {
                assert.equal(topic.val, 'text {% if true %}{{ item }}{% endif %}');
            },

        }

    }
}).export(module);

