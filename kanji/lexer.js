
var Lexer = module.exports = function Lexer(str) {
    this.input = str.replace(/\r\n|\r/g, '\n');
    this.lineno = 1;
};

/**
 * Lexer prototype.
 */

Lexer.prototype = {

}
