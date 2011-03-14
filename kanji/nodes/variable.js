
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

Variable.prototype.__proto__ = Node.prototype;
Variable.prototype.render = function(context) {
    var value;
    if (this.name.indexOf('.') >= 0) {
        var values = this.name.split('.');
        var initial = context[values[0]];

        value = values.slice(1).reduce(function(reduced, next) {
            if (reduced == null) {
                return null;
            }

            var captures;
            if (captures = /(.+?)\[(\d+)\]/.exec(next)) {
                var nextName = captures[1];
                var index = parseInt(captures[2], 10);

                var nextReduced = reduced[nextName];
                if (nextReduced == null){
                    return null;
                }

                return reduced[nextName][index];
            }

            return reduced[next];
        }, initial);
    }
    else {
        value = context[this.name];
    }

    return value || '';
}
