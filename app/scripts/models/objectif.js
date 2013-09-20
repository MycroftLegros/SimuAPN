'use strict';

// --- Constructor

function Objectif() {}

// --- Methods

Objectif.prototype.getCalculConPourExemple = function getCalculConPourExemple() {
	return this.foc / this.ouvertureMin;
};


// --- Static

Objectif.fromJSON = function fromJSON(jsonData) {
	var objectif = new Objectif();
	objectif.nom = jsonData.nom;
	objectif.focale = jsonData.focale;
	objectif.ouvertureMin = jsonData.ouvertureMin;
	objectif.vr = jsonData.vr;
	objectif.resolution = jsonData.resolution;
	objectif.ac = jsonData.ac;
	objectif.nbCylindres = jsonData.nbCylindres;
	objectif.longueursPolygones = jsonData.longueursPolygones;
	objectif.diametresPolygones = jsonData.diametresPolygones;
	objectif.distancesPolygones = jsonData.distancesPolygones;
	objectif.indiceBague = jsonData.indiceBague;
	return objectif;
};