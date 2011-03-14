var Lexer = require('./lexer')
  , nodes = require('./nodes');

var Parser = mod = module.exports = function Parser(str, filename){
  this.input = str;
  this.lexer = new Lexer(str);
  this.filename = filename;
};

Parser.prototype = {

};
