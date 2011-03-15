
var Node = require('./node');

var For = module.exports = function For(element, collection, block, condition) {
    this.element = element;
    this.collection = collection;
    this.block = block;
    this.condition = condition;
};

var executeInContext = function(condition, context) {
    var ifNodeEvalResult;
    with (context) {
        ifNodeEvalResult = eval(condition);
    }
    return ifNodeEvalResult;
};

For.prototype.__proto__ = Node.prototype;
For.prototype.render = function(context) {
    var collection = context[this.collection];

    if (collection == null){
        return '';
    }

    var renderedBits = [];

    for (var i=0; i<collection.length; i++) {
        var item = collection[i];

        context[this.element] = item;

        if (!this.condition || executeInContext(this.condition, context)) {
            renderedBits.push(this.block.render(context));
        }

        delete context[this.element];
    }

    return renderedBits.join('');
};
