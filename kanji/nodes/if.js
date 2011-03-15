
var Node = require('./node');

var If = module.exports = function If(condition, block) {
    this.condition = condition;
    this.block = block;
};

If.prototype.__proto__ = Node.prototype;
If.prototype.render = function(context) {
    var self = this;

    var result;
    with (context) {
        result = eval(self.condition);
    }

    if (result) {
        return this.block.render(context);
    }
    return '';
};
