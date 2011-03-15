
var Node = require('./node');

var If = module.exports = function If(condition, block, elseBlock) {
    this.condition = condition;
    this.block = block;
    this.elseBlock = elseBlock;
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
    else {
        return this.elseBlock.render(context);
    }
};
