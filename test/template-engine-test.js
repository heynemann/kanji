var vows = require('vows')
    assert = require('assert'),
    kanji = require('../kanji/kanji');

vows.describe('kanji module').addBatch({
    'The kanji': {

        'module': {
            topic: kanji,

            'is defined': function(topic) {
                assert.isNotNull(topic);
            },

            'contains a render method': function(topic) {
                assert.isFunction(topic.render);
            }
        },

        'module rendering simple strings': {
            topic: function() {
                return kanji.render('some basic kanjo string');
            },

            'should not return null': function(topic) {
                assert.isNotNull(topic);
            },
            'should return the basic string': function(topic) {
                assert.strictEqual(topic, 'some basic kanjo string');
            }
        },

        'module rendering multi-line strings': {
            topic: function() {
                return kanji.render('some basic\nkanjo string');
            },

            'should return the multi-line string': function(topic) {
                assert.strictEqual(topic, 'some basic\nkanjo string');
            }
        },

        'module with simple variable replacement': {
            topic: function() {
                return kanji.render('Hello {{ world }}', {
                    world: 'World'
                });
            },

            'should not return null': function(topic) {
                assert.isNotNull(topic);
            },
            'should return the replaced value': function(topic) {
                assert.strictEqual(topic, 'Hello World');
            }
 
        },

        'module with advanced variable replacement': {
            'in one level': {
                topic: function() {
                    return kanji.render('Hello {{ world.name }}', {
                        world: {
                            name: 'Bernardo'
                        }
                    });
                },

                'should return the replaced value': function(topic) {
                    assert.strictEqual(topic, 'Hello Bernardo');
                }
            },

            'in many levels': {
                topic: function() {
                    var data = {
                        world: {
                            citizen: {
                                name: {
                                    first: 'John',
                                    last: 'Doe'
                                }
                            }
                        }
                    };

                    return kanji.render('Hello {{ world.citizen.name.first}} {{world.citizen.name.last }}', data);
                },

                'should return the replaced value': function(topic) {
                    assert.strictEqual(topic, 'Hello John Doe');
                }
            },

            'with property indexer': {
                topic: function() {
                    return kanji.render("Hello {{ world['name'] }}", {
                        world: {
                            name: "Bernardo"
                        }
                    });
                },

                'should return the replaced value': function(topic) {
                    assert.equal(topic, 'Hello Bernardo');
                }

            },

            'with property indexer in double quotes': {
                topic: function() {
                    return kanji.render('Hello {{ world["name"] }}', {
                        world: {
                            name: "Bernardo"
                        }
                    });
                },

                'should return the replaced value': function(topic) {
                    assert.equal(topic, 'Hello Bernardo');
                }

            },

            'with array index': {
                topic: function() {
                    return kanji.render('Hello {{ world.people[1].name }}', {
                        world: {
                            people: [
                                { name: 'Bernardo' },
                                { name: 'John' }
                            ]
                        }
                    });

                },

                'should return Hello John': function(topic) {
                    assert.equal(topic, 'Hello John');
                }
            },
        },

        'module with commented text': {
            topic: function() {
                return kanji.render('Hello {# {{ world["name"] }}#}', {
                    world: {
                        name: "Bernardo"
                    }
                });
            },

            'should return the proper value': function(topic) {
                assert.equal(topic, 'Hello ');
            }

        },

        'module with IF statement': {

            'test if only': {
                topic: function() {
                    return kanji.render('Hello {% if sex == "M" %}man{%endif%}!', {
                        sex: "M"
                    });
                },

                'should return Hello man!': function(topic) {
                    assert.equal(topic, 'Hello man!');
                }
            },

            'test if-else': {
                topic: function() {
                    return kanji.render('Hello {% if sex == "M" %}man{%else %}girl{%endif%}!', {
                        sex: "F"
                    });
                },

                'should return Hello girl!': function(topic) {
                    assert.equal(topic, 'Hello girl!');
                }

            }

        }

    }
}).export(module);
