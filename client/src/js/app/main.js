var FlouDeMAPView = require('./view/fenetres/FlouDeMAPView');
var Sujet = require('./model/Sujet');
var Configuration = require('./utils/Configuration');

window.onload = function() {

    var configuration = new Configuration();
    configuration.systemeMesure = "IMPERIAL";

    // Init model
    var sujets = [
        new Sujet("Masque", 10),
        new Sujet("Walt", 30),
        new Sujet("Camion", 100)
    ];

    // Init views
    new FlouDeMAPView(configuration, sujets);
};