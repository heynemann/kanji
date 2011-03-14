
/*!
 * Jade - nodes - Block
 * Copyright(c) 2010 TJ Holowaychuk <tj@vision-media.ca>
 * MIT Licensed
 */

/**
 * Module dependencies.
 */

var Node = require('./node');

/**
 * Initialize a new `Block` with an optional `node`.
 *
 * @param {Node} node
 * @api public
 */

var Block = module.exports = function Block(node){
    if (node) this.push(node);
};

/**
 * Inherit from `Node`.
 */

Block.prototype.__proto__ = Node.prototype;
Block.prototype.render = function(context) {
    var rendered = [];
    for (var index=0; index<this.length; index++) {
        var node = this[index];
        rendered.push(node.render(context));
    }
    return rendered.join('');
};
