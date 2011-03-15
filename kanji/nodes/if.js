
var Node = require('./node');

var If = module.exports = function If(line) {
};

If.prototype.__proto__ = Node.prototype;
If.prototype.render = function(context) {
    return '';
};
