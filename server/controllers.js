var swig  = require('swig');
var tplRoot = __dirname + '/../client/src/swig/';

module.exports = {

	indexPage : function index(req, res) {
        var template = swig.compileFile( tplRoot + 'pages/index.swig');
        var output = template();
        res.send(output);
    }
};