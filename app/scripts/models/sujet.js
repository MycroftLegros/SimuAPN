'use strict';

// --- Constructor

function Sujet() {}

// --- Méthodes

Sujet.prototype.init = function init(distance, couleur) {
    this.distance = distance;
    this.couleur = couleur;
    return this;
};

Sujet.prototype.printableDistance = function printableDistance() {
    return this.distance.toFixed(2);
};

// --- Static
