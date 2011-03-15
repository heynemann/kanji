
var Node = require('./node');

var If = module.exports = function If(condition, block, elifBlocks, elseBlock) {
    this.condition = condition;
    this.block = block;
    this.elifBlocks = elifBlocks;
    this.elseBlock = elseBlock;
};

var executeInContext = function(condition, context) {
    var ifNodeEvalResult;
    with (context) {
        ifNodeEvalResult = eval(condition);
    }
    return ifNodeEvalResult;
};

If.prototype.__proto__ = Node.prototype;
If.prototype.render = function(context) {
    var condition = this.condition;

    if (executeInContext(condition, context)) {
        return this.block.render(context);
    }
    else {
        if (this.elifBlocks) {
            for (var index=0; index<this.elifBlocks.length; index++) {
                var elif = this.elifBlocks[index];
                if (executeInContext(elif.condition, context)) {
                    return elif.block.render(context);
                }
            }
        }
        return this.elseBlock.render(context);
    }
};
