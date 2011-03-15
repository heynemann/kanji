var Node = require('./node');

var Raw = module.exports = function Raw(text) {
    this.text = text;
};

Raw.prototype.__proto__ = Node.prototype;
Raw.prototype.render = function(context) {
    return this.text;
};
