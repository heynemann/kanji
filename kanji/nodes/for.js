
var Node = require('./node');

var For = module.exports = function For(element, collection, block) {
    this.element = element;
    this.collection = collection;
    this.block = block;
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

        renderedBits.push(this.block.render(context));

        delete context[this.element];
    }

    return renderedBits.join('');
};
