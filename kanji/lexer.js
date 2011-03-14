
var Lexer = module.exports = function Lexer(str) {
    this.input = str.replace(/\r\n|\r/g, '\n');
    this.lineno = 1;
};

/**
 * Lexer prototype.
 */

Lexer.prototype = {

    tok: function(type, val, lineno) {
        return {
            type: type,
            val: val,
            lineno: lineno
        };
    },

    next: function() {
        return this.tok('TEXT', this.input, this.lineno);
    }

}
