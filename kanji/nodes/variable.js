
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
    return context[this.name] || '';
}
