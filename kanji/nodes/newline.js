/**
 * Module dependencies.
 */

var Node = require('./node');

var Newline = module.exports = function Newline(line) {
};

Newline.prototype.__proto__ = Node.prototype;
Newline.prototype.render = function(context) {
    return '\n';
};
