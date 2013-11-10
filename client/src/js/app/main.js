var FlouDeMAPView = require('./view/fenetres/FlouDeMAPView');
var Sujet = require('./model/Sujet');

window.onload = function() {
    // Init model
    var sujets = [
        new Sujet("Masque", 10),
        new Sujet("Walt", 30),
        new Sujet("Camion", 100)
    ];

    // Init views
    new FlouDeMAPView(sujets);
};