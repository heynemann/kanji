
var Parser = require('./parser');

var mod = module.exports = {
    render: function(templateString, context){
        var parser = new Parser(templateString);

        block = parser.parse();

        return block.render(context);
    }
};
