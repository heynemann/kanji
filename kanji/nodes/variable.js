
/**
 * Module dependencies.
 */

var Node = require('./node');

var Variable = module.exports = function Variable(name) {
    this.name = name;
};

/**
 * Inherit from `Node`.
 */

var getValue = function(obj, next) {
    if (obj == null) {
        return null;
    }

    var captures;
    if (captures = /(.+?)\[(?:(\d+)|(?:['"](.+?)['"]))\]/.exec(next)) {
        var nextName = captures[1];
        var index = parseInt(captures[2], 10);
        var word = captures[3];

        var nextReduced = obj[nextName];
        if (nextReduced == null){
            return null;
        }

        if (!isNaN(index)) {
            return obj[nextName][index];
        }

        return nextReduced[word];
    }

    return obj[next];
};

Variable.prototype.__proto__ = Node.prototype;
Variable.prototype.render = function(context) {
    var value;
    if (this.name.indexOf('.') >= 0) {
        var values = this.name.split('.');
        var initial = context[values[0]];

        value = values.slice(1).reduce(function(reduced, next) {
            return getValue(reduced, next);
        }, initial);
    }
    else {
        value = getValue(context, this.name);
    }

    return value || '';
}

