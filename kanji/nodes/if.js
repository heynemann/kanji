
var Node = require('./node');

var If = module.exports = function If(condition, block) {
    this.condition = condition;
    this.block = block;
};

If.prototype.__proto__ = Node.prototype;
If.prototype.render = function(context) {
    var condition = this.condition;

    var ifNodeEvalResult;
    with (context) {
        ifNodeEvalResult = eval(condition);
    }

    if (ifNodeEvalResult) {
        return this.block.render(context);
    }
    return '';
};
