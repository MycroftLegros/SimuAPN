var grand = 50; //TEMP pour limiter le tracé du sol en 3D: taille en m des demis largeurs et profondeur du sol



DeltaAngleObjectif = Math.PI / 20; //Incrément angulaire entre 2 faces (pour la construction du modèle 3D)
NbrPolygonesParCylindre = 2 * Math.PI / DeltaAngleObjectif; //Nombre de polygones pour faire un cylindre

PolynomesObjectifTT = new Array(9);

for (var iv = 0; iv !== 9; iv++)
	PolynomesObjectifTT[iv] = new Array(NbrPolygonesParCylindre);

PolynomesObjectif = new Array(NbrPolygonesParCylindre);

//MOLETTE

PolygomesMolette = new Array(2 + 4 * delta_angleMoletteReglage);



function Polygone(Nom, FondMax, FondMin, Contour, Pts, PtsMaj, CDG, CDGMaj, VecteurNormale, VecteurNormaleMaj, init_pts, rot_pts, draw, RayonAffichage) {
	this.Nom = Nom;
	this.FondMax = FondMax;
	this.FondMin = FondMin;
	this.Contour = Contour;
	this.Pts = Pts;
	this.PtsMaj = PtsMaj;
	this.CDG = CDG;
	this.CDGMaj = CDGMaj;
	this.VecteurNormale = VecteurNormale;
	this.VecteurNormaleMaj = VecteurNormaleMaj;
	this.init_pts = init_pts;
	this.rot_pts = rot_pts;
	this.draw = draw;
	this.Contour = Contour;
	this.RayonAffichage = RayonAffichage; //Rayon d'affichage: pour être affiché un polygone doit avoir le vecteur OM=(R/Ocdg)*Ocdg dans la zone affichable
}


//--DEFINITION DES DIFFERENTS OBJECTS (Capteur,miroirs,boitier,objectif,diaphragme,molette)

function initPts() {} //à virer, ne sert à rien

//-Capteur courant
var mod_capteurCourant = {
	Nom: "capteurCourant", //Nom sous forme de chaine de charactères
	FondMax: [255, 153, 0, 1], //rgba de la couleur de fond (non utilisée si oppacité=0) en luminosité maximale
	FondMin: [0, 0, 0], //rgb de la couleur de fond (non utilisée si oppacité=0) en luminosité minimale
	Contour: [0, 0, 0, 0], //rgba de la couleur de contour (non utilisée si oppacité=0)
	Pts: [
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0]
	], //Liste des sommets en 3D sans rotation
	PtsMaj: [
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0]
	], //Liste des sommets en 2D après rotation
	CDG: [0, 0, 0], //Coordonées du centre de gravité en 3D avant rotation
	CDGMaj: 0, //Profondeur du CDG après rotation
	VecteurNormale: [0, 0, 0], //Vecteur normal à la surface en 3D sans rotation
	VecteurNormaleMaj: [0, 0, 0], //Vecteur normal à la surface en 3D après rotation
	init_pts: initPts, //Initialise les points en 3D
	rot_pts: majPtsPolygones, //Initialise les points en 2D (rotation des sommets et du CDG)
	draw: drawPolynome,
	RayonAffichage: 0
};

//-Capteur FF
var mod_capteurFF = new Polygone("capteurFF", [16, 150, 24, 1], [0, 0, 0], [0, 0, 0, 0], [
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0]
], [
	[0, 0],
	[0, 0],
	[0, 0],
	[0, 0]
], [0, 0, 0], 0, [0, 0, 0], [0, 0, 0], initPts, majPtsPolygones, drawPolynome, 0);

//-Visée reflex (3 miroirs)
var mod_miroir = new Polygone("miroir", [51, 102, 124, 0.5], [5, 10, 12], [0, 0, 0, 0], [
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0]
], [
	[0, 0],
	[0, 0],
	[0, 0],
	[0, 0]
], [0, 0, 0], 0, [0, 0, 0], [0, 0, 0], initPts, majPtsPolygones, drawPolynome, 0);
var mod_miroir_haut = new Polygone("miroirH", [51, 102, 124, 0.5], [5, 10, 12], [0, 0, 0, 0], [
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0]
], [
	[0, 0],
	[0, 0],
	[0, 0],
	[0, 0]
], [0, 0, 0], 0, [0, 0, 0], [0, 0, 0], initPts, majPtsPolygones, drawPolynome, 0);
var mod_miroir_bas = new Polygone("miroirB", [51, 102, 124, 0.5], [5, 10, 12], [0, 0, 0, 0], [
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0],
	[0, 0, 0]
], [
	[0, 0],
	[0, 0],
	[0, 0],
	[0, 0]
], [0, 0, 0], 0, [0, 0, 0], [0, 0, 0], initPts, majPtsPolygones, drawPolynome, 0);

//-Boitier, décomposé en facés
var mod_Boitier_a = {
	Nom: "Boitier_a", //Nom sous forme de chaine de charactères
	FondMax: [220, 220, 200, 0.29], //rgba de la couleur de fond (non utilisée si oppacité=0) en luminosité maximale
	FondMin: [50, 50, 50], //rgb de la couleur de fond (non utilisée si oppacité=0) en luminosité minimale
	Contour: [0, 0, 0, 0.5], //rgba de la couleur de contour (non utilisée si oppacité=0)
	Pts: [
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0]
	], //Liste des sommets en 3D sans rotation
	PtsMaj: [
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0]
	], //Liste des sommets en 2D après rotation
	CDG: [0, 0, 0], //Coordonées du centre de gravité en 3D avant rotation
	CDGMaj: 0, //Profondeur du CDG après rotation
	VecteurNormale: [0, 0, 0], //Vecteur normal à la surface en 3D sans rotation
	VecteurNormaleMaj: [0, 0, 0], //Vecteur normal à la surface en 3D après rotation
	init_pts: initPts, //Initialise les points en 3D
	rot_pts: majPtsPolygones, //Initialise les points en 2D (rotation des sommets et du CDG)
	draw: drawPolynome,
	RayonAffichage: 0
};
var mod_Boitier_b = {
	Nom: "Boitier_b", //Nom sous forme de chaine de charactères
	FondMax: [220, 220, 200, 0.29], //rgba de la couleur de fond (non utilisée si oppacité=0) en luminosité maximale
	FondMin: [50, 50, 50], //rgb de la couleur de fond (non utilisée si oppacité=0) en luminosité minimale
	Contour: [0, 0, 0, 0.5], //rgba de la couleur de contour (non utilisée si oppacité=0)
	Pts: [
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0]
	], //Liste des sommets en 3D sans rotation
	PtsMaj: [
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0]
	], //Liste des sommets en 2D après rotation
	CDG: [0, 0, 0], //Coordonées du centre de gravité en 3D avant rotation
	CDGMaj: 0, //Profondeur du CDG après rotation
	VecteurNormale: [0, 0, 0], //Vecteur normal à la surface en 3D sans rotation
	VecteurNormaleMaj: [0, 0, 0], //Vecteur normal à la surface en 3D après rotation
	init_pts: initPts, //Initialise les points en 3D
	rot_pts: majPtsPolygones, //Initialise les points en 2D (rotation des sommets et du CDG)
	draw: drawPolynome,
	RayonAffichage: 0
};
var mod_Boitier_c = {
	Nom: "Boitier_c", //Nom sous forme de chaine de charactères
	FondMax: [220, 220, 200, 0.29], //rgba de la couleur de fond (non utilisée si oppacité=0) en luminosité maximale
	FondMin: [50, 50, 50], //rgb de la couleur de fond (non utilisée si oppacité=0) en luminosité minimale
	Contour: [0, 0, 0, 0.5], //rgba de la couleur de contour (non utilisée si oppacité=0)
	Pts: [
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0]
	], //Liste des sommets en 3D sans rotation
	PtsMaj: [
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0]
	], //Liste des sommets en 2D après rotation
	CDG: [0, 0, 0], //Coordonées du centre de gravité en 3D avant rotation
	CDGMaj: 0, //Profondeur du CDG après rotation
	VecteurNormale: [0, 0, 0], //Vecteur normal à la surface en 3D sans rotation
	VecteurNormaleMaj: [0, 0, 0], //Vecteur normal à la surface en 3D après rotation
	init_pts: initPts, //Initialise les points en 3D
	rot_pts: majPtsPolygones, //Initialise les points en 2D (rotation des sommets et du CDG)
	draw: drawPolynome,
	RayonAffichage: 0
};
var mod_Boitier_d = {
	Nom: "Boitier_d", //Nom sous forme de chaine de charactères
	FondMax: [220, 220, 200, 0.29], //rgba de la couleur de fond (non utilisée si oppacité=0) en luminosité maximale
	FondMin: [50, 50, 50], //rgb de la couleur de fond (non utilisée si oppacité=0) en luminosité minimale
	Contour: [0, 0, 0, 0.5], //rgba de la couleur de contour (non utilisée si oppacité=0)
	Pts: [
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0]
	], //Liste des sommets en 3D sans rotation
	PtsMaj: [
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0]
	], //Liste des sommets en 2D après rotation
	CDG: [0, 0, 0], //Coordonées du centre de gravité en 3D avant rotation
	CDGMaj: 0, //Profondeur du CDG après rotation
	VecteurNormale: [0, 0, 0], //Vecteur normal à la surface en 3D sans rotation
	VecteurNormaleMaj: [0, 0, 0], //Vecteur normal à la surface en 3D après rotation
	init_pts: initPts, //Initialise les points en 3D
	rot_pts: majPtsPolygones, //Initialise les points en 2D (rotation des sommets et du CDG)
	draw: drawPolynome,
	RayonAffichage: 0
};
var mod_Boitier_e = {
	Nom: "Boitier_e", //Nom sous forme de chaine de charactères
	FondMax: [220, 220, 200, 0.29], //rgba de la couleur de fond (non utilisée si oppacité=0) en luminosité maximale
	FondMin: [50, 50, 50], //rgb de la couleur de fond (non utilisée si oppacité=0) en luminosité minimale
	Contour: [0, 0, 0, 0.5], //rgba de la couleur de contour (non utilisée si oppacité=0)
	Pts: [
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0]
	], //Liste des sommets en 3D sans rotation
	PtsMaj: [
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0]
	], //Liste des sommets en 2D après rotation
	CDG: [0, 0, 0], //Coordonées du centre de gravité en 3D avant rotation
	CDGMaj: 0, //Profondeur du CDG après rotation
	VecteurNormale: [0, 0, 0], //Vecteur normal à la surface en 3D sans rotation
	VecteurNormaleMaj: [0, 0, 0], //Vecteur normal à la surface en 3D après rotation
	init_pts: initPts, //Initialise les points en 3D
	rot_pts: majPtsPolygones, //Initialise les points en 2D (rotation des sommets et du CDG)
	draw: drawPolynome,
	RayonAffichage: 0
};
var mod_Boitier_f = {
	Nom: "Boitier_f", //Nom sous forme de chaine de charactères
	FondMax: [220, 220, 200, 0.29], //rgba de la couleur de fond (non utilisée si oppacité=0) en luminosité maximale
	FondMin: [50, 50, 50], //rgb de la couleur de fond (non utilisée si oppacité=0) en luminosité minimale
	Contour: [0, 0, 0, 0.5], //rgba de la couleur de contour (non utilisée si oppacité=0)
	Pts: [
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0]
	], //Liste des sommets en 3D sans rotation
	PtsMaj: [
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0]
	], //Liste des sommets en 2D après rotation
	CDG: [0, 0, 0], //Coordonées du centre de gravité en 3D avant rotation
	CDGMaj: 0, //Profondeur du CDG après rotation
	VecteurNormale: [0, 0, 0], //Vecteur normal à la surface en 3D sans rotation
	VecteurNormaleMaj: [0, 0, 0], //Vecteur normal à la surface en 3D après rotation
	init_pts: initPts, //Initialise les points en 3D
	rot_pts: majPtsPolygones, //Initialise les points en 2D (rotation des sommets et du CDG)
	draw: drawPolynome,
	RayonAffichage: 0
};
var mod_Boitier_g = {
	Nom: "Boitier_g", //Nom sous forme de chaine de charactères
	FondMax: [220, 220, 200, 0.29], //rgba de la couleur de fond (non utilisée si oppacité=0) en luminosité maximale
	FondMin: [50, 50, 50], //rgb de la couleur de fond (non utilisée si oppacité=0) en luminosité minimale
	Contour: [0, 0, 0, 0.5], //rgba de la couleur de contour (non utilisée si oppacité=0)
	Pts: [
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0]
	], //Liste des sommets en 3D sans rotation
	PtsMaj: [
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0]
	], //Liste des sommets en 2D après rotation
	CDG: [0, 0, 0], //Coordonées du centre de gravité en 3D avant rotation
	CDGMaj: 0, //Profondeur du CDG après rotation
	VecteurNormale: [0, 0, 0], //Vecteur normal à la surface en 3D sans rotation
	VecteurNormaleMaj: [0, 0, 0], //Vecteur normal à la surface en 3D après rotation
	init_pts: initPts, //Initialise les points en 3D
	rot_pts: majPtsPolygones, //Initialise les points en 2D (rotation des sommets et du CDG)
	draw: drawPolynome,
	RayonAffichage: 0
};
var mod_Boitier_h = {
	Nom: "Boitier_h", //Nom sous forme de chaine de charactères
	FondMax: [220, 220, 200, 0.29], //rgba de la couleur de fond (non utilisée si oppacité=0) en luminosité maximale
	FondMin: [50, 50, 50], //rgb de la couleur de fond (non utilisée si oppacité=0) en luminosité minimale
	Contour: [0, 0, 0, 0.5], //rgba de la couleur de contour (non utilisée si oppacité=0)
	Pts: [
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0]
	], //Liste des sommets en 3D sans rotation
	PtsMaj: [
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0]
	], //Liste des sommets en 2D après rotation
	CDG: [0, 0, 0], //Coordonées du centre de gravité en 3D avant rotation
	CDGMaj: 0, //Profondeur du CDG après rotation
	VecteurNormale: [0, 0, 0], //Vecteur normal à la surface en 3D sans rotation
	VecteurNormaleMaj: [0, 0, 0], //Vecteur normal à la surface en 3D après rotation
	init_pts: initPts, //Initialise les points en 3D
	rot_pts: majPtsPolygones, //Initialise les points en 2D (rotation des sommets et du CDG)
	draw: drawPolynome,
	RayonAffichage: 0
};
var mod_Boitier_i = {
	Nom: "Boitier_i", //Nom sous forme de chaine de charactères
	FondMax: [220, 220, 200, 0.29], //rgba de la couleur de fond (non utilisée si oppacité=0) en luminosité maximale
	FondMin: [50, 50, 50], //rgb de la couleur de fond (non utilisée si oppacité=0) en luminosité minimale
	Contour: [0, 0, 0, 0.5], //rgba de la couleur de contour (non utilisée si oppacité=0)
	Pts: [
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0]
	], //Liste des sommets en 3D sans rotation
	PtsMaj: [
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0]
	], //Liste des sommets en 2D après rotation
	CDG: [0, 0, 0], //Coordonées du centre de gravité en 3D avant rotation
	CDGMaj: 0, //Profondeur du CDG après rotation
	VecteurNormale: [0, 0, 0], //Vecteur normal à la surface en 3D sans rotation
	VecteurNormaleMaj: [0, 0, 0], //Vecteur normal à la surface en 3D après rotation
	init_pts: initPts, //Initialise les points en 3D
	rot_pts: majPtsPolygones, //Initialise les points en 2D (rotation des sommets et du CDG)
	draw: drawPolynome,
	RayonAffichage: 0
};
var mod_Boitier_ii = {
	Nom: "Boitier_ii", //Nom sous forme de chaine de charactères
	FondMax: [220, 220, 200, 0.29], //rgba de la couleur de fond (non utilisée si oppacité=0) en luminosité maximale
	FondMin: [50, 50, 50], //rgb de la couleur de fond (non utilisée si oppacité=0) en luminosité minimale
	Contour: [0, 0, 0, 0.5], //rgba de la couleur de contour (non utilisée si oppacité=0)
	Pts: [
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0]
	], //Liste des sommets en 3D sans rotation
	PtsMaj: [
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0]
	], //Liste des sommets en 2D après rotation
	CDG: [0, 0, 0], //Coordonées du centre de gravité en 3D avant rotation
	CDGMaj: 0, //Profondeur du CDG après rotation
	VecteurNormale: [0, 0, 0], //Vecteur normal à la surface en 3D sans rotation
	VecteurNormaleMaj: [0, 0, 0], //Vecteur normal à la surface en 3D après rotation
	init_pts: initPts, //Initialise les points en 3D
	rot_pts: majPtsPolygones, //Initialise les points en 2D (rotation des sommets et du CDG)
	draw: drawPolynome,
	RayonAffichage: 0
};
var mod_Boitier_j = {
	Nom: "Boitier_j", //Nom sous forme de chaine de charactères
	FondMax: [220, 220, 200, 0.29], //rgba de la couleur de fond (non utilisée si oppacité=0) en luminosité maximale
	FondMin: [50, 50, 50], //rgb de la couleur de fond (non utilisée si oppacité=0) en luminosité minimale
	Contour: [0, 0, 0, 0.5], //rgba de la couleur de contour (non utilisée si oppacité=0)
	Pts: [
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0]
	], //Liste des sommets en 3D sans rotation
	PtsMaj: [
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0]
	], //Liste des sommets en 2D après rotation
	CDG: [0, 0, 0], //Coordonées du centre de gravité en 3D avant rotation
	CDGMaj: 0, //Profondeur du CDG après rotation
	VecteurNormale: [0, 0, 0], //Vecteur normal à la surface en 3D sans rotation
	VecteurNormaleMaj: [0, 0, 0], //Vecteur normal à la surface en 3D après rotation
	init_pts: initPts, //Initialise les points en 3D
	rot_pts: majPtsPolygones, //Initialise les points en 2D (rotation des sommets et du CDG)
	draw: drawPolynome,
	RayonAffichage: 0
};
var mod_Boitier_k = {
	Nom: "Boitier_k", //Nom sous forme de chaine de charactères
	FondMax: [220, 220, 200, 0.29], //rgba de la couleur de fond (non utilisée si oppacité=0) en luminosité maximale
	FondMin: [50, 50, 50], //rgb de la couleur de fond (non utilisée si oppacité=0) en luminosité minimale
	Contour: [0, 0, 0, 0.5], //rgba de la couleur de contour (non utilisée si oppacité=0)
	Pts: [
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0]
	], //Liste des sommets en 3D sans rotation
	PtsMaj: [
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0]
	], //Liste des sommets en 2D après rotation
	CDG: [0, 0, 0], //Coordonées du centre de gravité en 3D avant rotation
	CDGMaj: 0, //Profondeur du CDG après rotation
	VecteurNormale: [0, 0, 0], //Vecteur normal à la surface en 3D sans rotation
	VecteurNormaleMaj: [0, 0, 0], //Vecteur normal à la surface en 3D après rotation
	init_pts: initPts, //Initialise les points en 3D
	rot_pts: majPtsPolygones, //Initialise les points en 2D (rotation des sommets et du CDG)
	draw: drawPolynome,
	RayonAffichage: 0
};
var mod_Boitier_l = {
	Nom: "Boitier_l", //Nom sous forme de chaine de charactères
	FondMax: [220, 220, 200, 0.29], //rgba de la couleur de fond (non utilisée si oppacité=0) en luminosité maximale
	FondMin: [50, 50, 50], //rgb de la couleur de fond (non utilisée si oppacité=0) en luminosité minimale
	Contour: [0, 0, 0, 0.5], //rgba de la couleur de contour (non utilisée si oppacité=0)
	Pts: [
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0]
	], //Liste des sommets en 3D sans rotation
	PtsMaj: [
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0]
	], //Liste des sommets en 2D après rotation
	CDG: [0, 0, 0], //Coordonées du centre de gravité en 3D avant rotation
	CDGMaj: 0, //Profondeur du CDG après rotation
	VecteurNormale: [0, 0, 0], //Vecteur normal à la surface en 3D sans rotation
	VecteurNormaleMaj: [0, 0, 0], //Vecteur normal à la surface en 3D après rotation
	init_pts: initPts, //Initialise les points en 3D
	rot_pts: majPtsPolygones, //Initialise les points en 2D (rotation des sommets et du CDG)
	draw: drawPolynome,
	RayonAffichage: 0
};
var mod_Boitier_m = {
	Nom: "Boitier_m", //Nom sous forme de chaine de charactères
	FondMax: [220, 220, 200, 0.29], //rgba de la couleur de fond (non utilisée si oppacité=0) en luminosité maximale
	FondMin: [50, 50, 50], //rgb de la couleur de fond (non utilisée si oppacité=0) en luminosité minimale
	Contour: [0, 0, 0, 0.5], //rgba de la couleur de contour (non utilisée si oppacité=0)
	Pts: [
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0]
	], //Liste des sommets en 3D sans rotation
	PtsMaj: [
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0],
		[0, 0]
	], //Liste des sommets en 2D après rotation
	CDG: [0, 0, 0], //Coordonées du centre de gravité en 3D avant rotation
	CDGMaj: 0, //Profondeur du CDG après rotation
	VecteurNormale: [0, 0, 0], //Vecteur normal à la surface en 3D sans rotation
	VecteurNormaleMaj: [0, 0, 0], //Vecteur normal à la surface en 3D après rotation
	init_pts: initPts, //Initialise les points en 3D
	rot_pts: majPtsPolygones, //Initialise les points en 2D (rotation des sommets et du CDG)
	draw: drawPolynome,
	RayonAffichage: 0
};


//--CREATION DES POINTS DES POLYGONES
//Appelle tous les initPts

function initPtsFenetre3D() {
	initPtsBoitier();
	initPtsCapteurs();
	initPtsObjectif();
	initPtsMolette();
	initPtsViseeReflex();
}

//Polygones de la visée reflex

function initPtsViseeReflex() {

	//Sommets
	//Miroir
	var a1_x = -l_capteur / 2000 - (-dX);
	var a1_y = dY + h_capteur / 2000;
	var a1_p = dP;
	var a2_x = l_capteur / 2000 - (-dX);
	var a2_y = a1_y;
	var a2_p = a1_p;
	var a3_x = a2_x;
	var a3_y = dY - h_capteur / 2000;
	var a3_p = dP + h_capteur / 1000;
	var a4_x = a1_x;
	var a4_y = a3_y;
	var a4_p = a3_p;

	//Miroir du haut
	var b1_x = a2_x;
	var b1_y = dY + y_foyer_corps + h_viseur;
	var b1_p = a3_p;
	var b2_x = a1_x;
	var b2_y = b1_y;
	var b2_p = a3_p;
	var b3_x = a1_x;
	var b3_y = dY + y_foyer_corps + h_finVisee;
	var b3_p = a1_p;
	var b4_x = a2_x;
	var b4_y = b3_y;
	var b4_p = a1_p;

	//Miroir du bas
	var n1 = (h_viseur - h_finVisee) / 2;
	var n2_x = (b1_x + b3_x) / 2 - b3_x;
	var n2_y = (b1_y + b3_y) / 2 - b3_y;
	var n2_p = (b1_p + b3_p) / 2 - b3_p;
	var n2 = Math.sqrt(n2_x * n2_x + n2_y * n2_y + n2_p * n2_p);

	var theta = 2 * Math.acos(n1 / n2) - Math.PI / 2;

	var d = (h_viseur - h_finVisee) / (Math.tan(theta));
	var d2 = (h_finVisee - h_debutVisee) / (Math.tan(theta));

	var c1_x = a2_x;
	var c1_y = b3_y;
	var c1_p = b1_p + d;
	var c2_x = a1_x;
	var c2_y = b3_y;
	var c2_p = c1_p;
	var c3_x = a1_x;
	var c3_y = dY + y_foyer_corps + h_debutVisee;
	var c3_p = b3_p + d2;
	var c4_x = a2_x;
	var c4_y = c3_y;
	var c4_p = c3_p;

	//Polynome	
	//Miroir		
	mod_miroir.Pts = [
		[a1_x, a1_y, a1_p],
		[a2_x, a2_y, a2_p],
		[a3_x, a3_y, a3_p],
		[a4_x, a4_y, a4_p]
	];
	mod_miroir.CDG = [(a1_x + a2_x) / 2, (a1_y + a3_y) / 2, (a1_p + a3_p) / 2];
	mod_miroir.VecteurNormale = [0, 1, 1];
	mod_miroir.RayonAffichage = l_capteur / 1000;

	//Miroir haut	
	mod_miroir_haut.Pts = [
		[b1_x, b1_y, b1_p],
		[b2_x, b2_y, b2_p],
		[b3_x, b3_y, b3_p],
		[b4_x, b4_y, b4_p]
	];
	mod_miroir_haut.CDG = [(b1_x + b2_x) / 2, (b1_y + b3_y) / 2, (b1_p + b3_p) / 2];
	mod_miroir_haut.VecteurNormale = [0, Math.sin(3 * Math.PI / 8), -1 * Math.cos(3 * Math.PI / 8)];
	mod_miroir_haut.RayonAffichage = l_capteur / 1000;

	//Miroir bas
	mod_miroir_bas.Pts = [
		[c1_x, c1_y, c1_p],
		[c2_x, c2_y, c2_p],
		[c3_x, c3_y, c3_p],
		[c4_x, c4_y, c4_p]
	];
	mod_miroir_bas.CDG = [(c1_x + c2_x) / 2, (c1_y + c3_y) / 2, (c1_p + c3_p) / 2];
	mod_miroir_bas.VecteurNormale = [0, Math.sin(3 * Math.PI / 8), -1 * Math.cos(3 * Math.PI / 8)];
	mod_miroir_bas.RayonAffichage = l_capteur / 1000;
}

//Polygones du boitier

function initPtsBoitier() {

	//-BOITIER
	//Sommets
	var a1_x = -(-dX) - x_foyer_corps;
	var a1_y = dY + y_foyer_corps;
	var a1_p = dP - p_foyer_corps;
	var a2_x = a1_x;
	var a2_y = a1_y;
	var a2_p = a1_p + p_corps + p_poignee;
	var a3_x = a1_x;
	var a3_y = a2_y - h_corps;
	var a3_p = a2_p;
	var a4_x = a1_x;
	var a4_y = a3_y;
	var a4_p = a1_p;

	var b1_x = a1_x + l_poignee;
	var b1_y = a1_y;
	var b1_p = a1_p + p_corps;
	var b2_x = b1_x;
	var b2_y = b1_y;
	var b2_p = b1_p + p_poignee;
	var b3_x = b1_x;
	var b3_y = b2_y - h_poignee;
	var b3_p = b2_p;
	var b4_x = b1_x;
	var b4_y = b3_y;
	var b4_p = b1_p;

	var c1_x = a1_x + dx_viseur;
	var c1_y = a1_y + h_viseur;
	var c1_p = a1_p;
	var c2_x = c1_x;
	var c2_y = c1_y;
	var c2_p = c1_p + p_viseur;
	var c3_x = c1_x;
	var c3_y = a1_y;
	var c3_p = c2_p;
	var c4_x = c1_x;
	var c4_y = c3_y;
	var c4_p = c1_p;
	var c5_x = c3_x;
	var c5_y = c3_y;
	var c5_p = c3_p - (p_viseur - p_corps);

	var d1_x = c1_x + l_viseur;
	var d1_y = c1_y;
	var d1_p = c1_p;
	var d2_x = d1_x;
	var d2_y = c2_y;
	var d2_p = c2_p;
	var d3_x = d1_x;
	var d3_y = c3_y;
	var d3_p = c3_p;
	var d4_x = d1_x;
	var d4_y = c4_y;
	var d4_p = c4_p;
	var d5_x = d3_x;
	var d5_y = d3_y;
	var d5_p = c5_p;

	var e1_x = a1_x + l_corps;
	var e1_y = a1_y;
	var e1_p = a1_p;
	var e2_x = e1_x;
	var e2_y = e1_y;
	var e2_p = b1_p;
	var e3_x = e1_x;
	var e3_y = b4_y;
	var e3_p = b4_p;
	var e4_x = e1_x;
	var e4_y = a4_y;
	var e4_p = a4_p;

	//Polynomes
	mod_Boitier_a.Pts = [
		[a1_x, a1_y, a1_p],
		[a2_x, a2_y, a2_p],
		[a3_x, a3_y, a3_p],
		[a4_x, a4_y, a4_p]
	];
	mod_Boitier_a.CDG = [a1_x, (a1_y + a4_y) / 2, (a2_p + a1_p) / 2];
	mod_Boitier_a.VecteurNormale = [-1, 0, 0];
	mod_Boitier_a.RayonAffichage = Math.abs(a1_p - a2_p);

	mod_Boitier_b.Pts = [
		[b1_x, b1_y, b1_p],
		[b2_x, b2_y, b2_p],
		[b3_x, b3_y, b3_p],
		[b4_x, b4_y, b4_p]
	];
	mod_Boitier_b.CDG = [b1_x, (b1_y + b4_y) / 2, (b2_p + b1_p) / 2];
	mod_Boitier_b.VecteurNormale = [1, 0, 0];
	mod_Boitier_b.RayonAffichage = Math.abs(b1_y - b4_y);

	mod_Boitier_c.Pts = [
		[c1_x, c1_y, c1_p],
		[c2_x, c2_y, c2_p],
		[c3_x, c3_y, c3_p],
		[c4_x, c4_y, c4_p]
	];
	mod_Boitier_c.CDG = [c1_x, (c1_y + c4_y) / 2, (c2_p + c1_p) / 2];
	mod_Boitier_c.VecteurNormale = [-1, 0, 0];
	mod_Boitier_c.RayonAffichage = Math.abs(c4_p - c3_p);

	mod_Boitier_d.Pts = [
		[d1_x, d1_y, d1_p],
		[d2_x, d2_y, d2_p],
		[d3_x, d3_y, d3_p],
		[d4_x, d4_y, d4_p]
	];
	mod_Boitier_d.CDG = [d1_x, (d1_y + d4_y) / 2, (d2_p + d1_p) / 2];
	mod_Boitier_d.VecteurNormale = [1, 0, 0];
	mod_Boitier_d.RayonAffichage = Math.abs(d4_p - d3_p);

	mod_Boitier_e.Pts = [
		[e1_x, e1_y, e1_p],
		[e2_x, e2_y, e2_p],
		[e3_x, e3_y, e3_p],
		[e4_x, e4_y, e4_p]
	];
	mod_Boitier_e.CDG = [e1_x, (e1_y + e4_y) / 2, (e2_p + e1_p) / 2];
	mod_Boitier_e.VecteurNormale = [1, 0, 0];
	mod_Boitier_e.RayonAffichage = Math.abs(e1_y - e4_y);

	mod_Boitier_f.Pts = [
		[a1_x, a1_y, a1_p],
		[c4_x, c4_y, c4_p],
		[c5_x, c5_y, c5_p],
		[b1_x, b1_y, b1_p],
		[b2_x, b2_y, b2_p],
		[a2_x, a2_y, a2_p]
	];
	mod_Boitier_f.CDG = [(c4_x + a1_x) / 2, a1_y, (a2_p + a1_p) / 2];
	mod_Boitier_f.VecteurNormale = [0, 1, 0];
	mod_Boitier_f.RayonAffichage = Math.abs(a1_p - a2_p);

	mod_Boitier_g.Pts = [
		[c1_x, c1_y, c1_p],
		[d1_x, d1_y, d1_p],
		[d2_x, d2_y, d2_p],
		[c2_x, c2_y, c2_p]
	];
	mod_Boitier_g.CDG = [(d1_x + c1_x) / 2, c1_y, (d2_p + d1_p) / 2];
	mod_Boitier_g.VecteurNormale = [0, 1, 0];
	mod_Boitier_g.RayonAffichage = Math.abs(c1_p - c2_p);

	mod_Boitier_h.Pts = [
		[d4_x, d4_y, d4_p],
		[e1_x, e1_y, e1_p],
		[e2_x, e2_y, e2_p],
		[d5_x, d5_y, d5_p]
	];
	mod_Boitier_h.CDG = [(e1_x + d4_x) / 2, e1_y, (e2_p + e1_p) / 2];
	mod_Boitier_h.VecteurNormale = [0, 1, 0];
	mod_Boitier_h.RayonAffichage = Math.abs(e1_x - d4_x);

	mod_Boitier_i.Pts = [
		[a4_x, a4_y, a4_p],
		[e4_x, e4_y, e4_p],
		[e3_x, e3_y, e3_p],
		[b4_x, b4_y, b4_p],
		[b3_x, b3_y, b3_p],
		[a3_x, a3_y, a3_p]
	];
	mod_Boitier_i.CDG = [(e4_x + a4_x) / 2, a4_y, (a3_p + a4_p) / 2];
	mod_Boitier_i.VecteurNormale = [0, -1, 0];
	mod_Boitier_i.RayonAffichage = Math.abs(e4_x - a4_x);

	mod_Boitier_ii.Pts = [
		[c5_x, c5_y, c5_p],
		[d5_x, d5_y, d5_p],
		[d3_x, d3_y, d3_p],
		[c3_x, c3_y, c3_p]
	];
	mod_Boitier_ii.CDG = [(d3_x + c3_x) / 2, c3_y, (c3_p + c5_p) / 2];
	mod_Boitier_ii.VecteurNormale = [0, -1, 0];
	mod_Boitier_ii.RayonAffichage = Math.abs(c3_x - d3_x);

	mod_Boitier_j.Pts = [
		[a2_x, a2_y, a2_p],
		[b2_x, b2_y, b2_p],
		[b3_x, b3_y, b3_p],
		[a3_x, a3_y, a3_p]
	];
	mod_Boitier_j.CDG = [(b2_x + a2_x) / 2, (a2_y + a3_y) / 2, a2_p];
	mod_Boitier_j.VecteurNormale = [0, 0, 1];
	mod_Boitier_j.RayonAffichage = Math.abs(a2_y - a3_y);

	mod_Boitier_k.Pts = [
		[c2_x, c2_y, c2_p],
		[d2_x, d2_y, d2_p],
		[d3_x, d3_y, d3_p],
		[c3_x, c3_y, c3_p]
	];
	mod_Boitier_k.CDG = [(d2_x + c2_x) / 2, (d2_y + d3_y) / 2, d2_p];
	mod_Boitier_k.VecteurNormale = [0, 0, 1];
	mod_Boitier_k.RayonAffichage = Math.abs(c2_x - d2_x);

	mod_Boitier_l.Pts = [
		[b1_x, b1_y, b1_p],
		[e2_x, e2_y, e2_p],
		[e3_x, e3_y, e3_p],
		[b4_x, b4_y, b4_p]
	];
	mod_Boitier_l.CDG = [(e2_x + b1_x) / 2, (e2_y + e3_y) / 2, e2_p];
	mod_Boitier_l.VecteurNormale = [0, 0, 1];
	mod_Boitier_l.RayonAffichage = Math.abs(e2_x - b1_x);

	mod_Boitier_m.Pts = [
		[a1_x, a1_y, a1_p],
		[c4_x, c4_y, c4_p],
		[c1_x, c1_y, c1_p],
		[d1_x, d1_y, d1_p],
		[d4_x, d4_y, d4_p],
		[e1_x, e1_y, e1_p],
		[e4_x, e4_y, e4_p],
		[a4_x, a4_y, a4_p]
	];
	mod_Boitier_m.CDG = [(e1_x + a1_x) / 2, (c1_y + a4_y) / 2, a1_p];
	mod_Boitier_m.VecteurNormale = [0, 0, -1];
	mod_Boitier_m.RayonAffichage = Math.abs(e1_x - a1_x);
}

//Polygones des capteurs

function initPtsCapteurs() {

	//Pour les calculs
	var f_m = focale / 1000;
	var feq_m = focaleEquivalente / 1000;
	var df = (f_m * f_m) / (d_map - f_m);
	var dfeq = (feq_m * feq_m) / (d_map - feq_m);
	var p_f = df + f_m;

	//Sommets
	var ff1_x = -0.018 - (-dX);
	var ff1_y = 0.012 + dY;
	var ff1_p = dP - (feq_m + dfeq - f_m - df);
	var ff2_x = 0.018 - (-dX);
	var ff2_y = 0.012 + dY;
	var ff2_p = dP - (feq_m + dfeq - f_m - df);
	var ff3_x = 0.018 - (-dX);
	var ff3_y = -0.012 + dY;
	var ff3_p = dP - (feq_m + dfeq - f_m - df);
	var ff4_x = -0.018 - (-dX);
	var ff4_y = -0.012 + dY;
	var ff4_p = dP - (feq_m + dfeq - f_m - df);

	var ca1_x = -l_capteur / 2000 - (-dX);
	var ca1_y = h_capteur / 2000 + dY;
	var ca1_p = dP;
	var ca2_x = l_capteur / 2000 - (-dX);
	var ca2_y = h_capteur / 2000 + dY;
	var ca2_p = dP;
	var ca3_x = l_capteur / 2000 - (-dX);
	var ca3_y = -h_capteur / 2000 + dY;
	var ca3_p = dP;
	var ca4_x = -l_capteur / 2000 - (-dX);
	var ca4_y = -h_capteur / 2000 + dY;
	var ca4_p = dP;

	//Polynome			
	mod_capteurFF.Pts = [
		[ff1_x, ff1_y, ff1_p],
		[ff2_x, ff2_y, ff2_p],
		[ff3_x, ff3_y, ff3_p],
		[ff4_x, ff4_y, ff4_p]
	];
	mod_capteurFF.CDG = [(ff2_x + ff1_x) / 2, (ff1_y + ff3_y) / 2, ff1_p];
	mod_capteurFF.VecteurNormale = [0, 0, 1];
	mod_capteurFF.RayonAffichage = Math.abs(ff1_x - ff2_x);

	mod_capteurCourant.Pts = [
		[ca1_x, ca1_y, ca1_p],
		[ca2_x, ca2_y, ca2_p],
		[ca3_x, ca3_y, ca3_p],
		[ca4_x, ca4_y, ca4_p]
	];
	mod_capteurCourant.CDG = [(ca2_x + ca1_x) / 2, (ca1_y + ca3_y) / 2, ca1_p];
	mod_capteurCourant.VecteurNormale = [0, 0, 1];
	mod_capteurCourant.RayonAffichage = Math.abs(ca1_x - ca2_x);
}

//Polygones de l'objectif

function initPtsObjectif() {

	//dimensions pour construire les cylindres
	var l1, l2, l3, l4, l5;
	var d1, d2, d3, d4, d5;
	var e1, e2, e3, e4;

	var N_bague;


	if (flag_objectifPredefini) {

		nbrPolygonesObjectif = ListeObj[cpt_objectif].Npoly;

		l1 = 0.001 * ListeObj[cpt_objectif].l[0];
		d1 = 0.001 * ListeObj[cpt_objectif].d[0];
		e1 = 0;

		if (nbrPolygonesObjectif >= 3) {
			e1 = 0.001 * ListeObj[cpt_objectif].e[0];
			l2 = 0.001 * ListeObj[cpt_objectif].l[1];
			d2 = 0.001 * ListeObj[cpt_objectif].d[1];
		}
		if (nbrPolygonesObjectif >= 5) {
			e2 = 0.001 * ListeObj[cpt_objectif].e[1];
			l3 = 0.001 * ListeObj[cpt_objectif].l[2];
			d3 = 0.001 * ListeObj[cpt_objectif].d[2];
		}
		if (nbrPolygonesObjectif >= 7) {
			e3 = 0.001 * ListeObj[cpt_objectif].e[2];
			l4 = 0.001 * ListeObj[cpt_objectif].l[3];
			d4 = 0.001 * ListeObj[cpt_objectif].d[3];
		}
		if (nbrPolygonesObjectif >= 9) {
			e4 = 0.001 * ListeObj[cpt_objectif].e[3];
			l5 = 0.001 * ListeObj[cpt_objectif].l[4];
			d5 = 0.001 * ListeObj[cpt_objectif].d[4];
		}

		N_bague = ListeObj[cpt_objectif].bague;
	} else {
		nbrPolygonesObjectif = ObjExtra.Npoly;

		l1 = 0.001 * ObjExtra.l[0];
		d1 = 0.001 * ObjExtra.d[0];

		if (nbrPolygonesObjectif >= 3) {
			e1 = 0.001 * ObjExtra.e[0];
			l2 = 0.001 * ObjExtra.l[1];
			d2 = 0.001 * ObjExtra.d[1];
		}

		if (nbrPolygonesObjectif >= 5) {
			e2 = 0.001 * ObjExtra.e[1];
			l3 = 0.001 * ObjExtra.l[2];
			d3 = 0.001 * ObjExtra.d[2];
		}

		if (nbrPolygonesObjectif >= 7) {
			e3 = 0.001 * ObjExtra.e[2];
			l4 = 0.001 * ObjExtra.l[3];
			d4 = 0.001 * ObjExtra.d[3];
		}

		if (nbrPolygonesObjectif >= 9) {
			e4 = 0.001 * ObjExtra.e[3];
			l5 = 0.001 * ObjExtra.l[4];
			d5 = 0.001 * ObjExtra.d[4];
		}

		N_bague = ObjExtra.bague;
	}



	//Fait en sorte que le diaphragme ne dépace pas de l'objectif (en longueur)
	var f_m = focale / 1000;
	var feq_m = focaleEquivalente / 1000;
	var df = (f_m * f_m) / (d_map - f_m);
	var dfeq = (feq_m * feq_m) / (d_map - feq_m);
	var p_f = df + f_m;
<<<<<<< HEAD
	var p_diaff = p_f + dP;
=======
	var p_diaff = p_f; // + dP;
	var k;
>>>>>>> ménage, tuning et fix

	var l_temp = p_diaff - (p_corps - p_foyer_corps) - (l1 + l2 + l3 + l4 + l5 + e1 + e2 + e3 + e4);

	if (l_temp > 0) {

<<<<<<< HEAD
		var k = (p_diaff - (p_corps - p_foyer_corps)) / (l1 + l2 + l3 + l4 + l5 + e1 + e2 + e3 + e4);
=======
		k = (p_diaff - (p_corps - p_foyer_corps)) / (l1 + l2 + l3 + l4 + l5 + e1 + e2 + e3 + e4);
>>>>>>> ménage, tuning et fix

		l1 = k * l1;

		if (nbrPolygonesObjectif >= 3) {
			e1 = k * e1;
			l2 = k * l2;
		}

		if (nbrPolygonesObjectif >= 5) {
			e2 = k * e2;
			l3 = k * l3;
		}

		if (nbrPolygonesObjectif >= 9) {
			e3 = k * e3;
			l4 = k * l4;
		}

		if (nbrPolygonesObjectif >= 7) {
			e4 = k * e4;
			l5 = k * l5;
		}
	}



	//Module les diamètres en fonction de l'ouverture min
	var d_temp = f_m / ouvertureMin;

<<<<<<< HEAD
	if (nbrPolygonesObjectif == 3) {
=======
	if (nbrPolygonesObjectif === 3) {
>>>>>>> ménage, tuning et fix
		k = d_temp / d2;
		if (k > 1)
			d2 = k * d2;

		if (d1 > d2)
			d1 = d2;


	}
<<<<<<< HEAD
	if (nbrPolygonesObjectif == 5) {
=======
	if (nbrPolygonesObjectif === 5) {
>>>>>>> ménage, tuning et fix
		k = d_temp / d3;
		if (k > 1) {
			d3 = k * d3;
			d2 = k * d2;
		}

		if (d2 > d3)
			d2 = d3;

		if (d1 > d2)
			d1 = d2;

	}
<<<<<<< HEAD
	if (nbrPolygonesObjectif == 7) {
=======
	if (nbrPolygonesObjectif === 7) {
>>>>>>> ménage, tuning et fix
		k = d_temp / d4;
		if (k > 1) {
			d4 = k * d4;
			d3 = k * d3;
			d2 = k * d2;
		}

		if (d3 > d4)
			d3 = d4;

		if (d2 > d3)
			d2 = d3;

		if (d1 > d2)
			d1 = d2;
	}
<<<<<<< HEAD
	if (nbrPolygonesObjectif == 9) {
=======
	if (nbrPolygonesObjectif === 9) {
>>>>>>> ménage, tuning et fix
		k = d_temp / d5;
		if (k > 1) {
			d5 = k * d5;
			d4 = k * d4;
			d3 = k * d3;
			d2 = k * d2;
		}


		if (d4 > d5)
			d4 = d5;

		if (d3 > d4)
			d3 = d4;

		if (d2 > d3)
			d2 = d3;

		if (d1 > d2)
			d1 = d2;



	}



	//Fait en sorte que les diamètres soient croissants
<<<<<<< HEAD
	if (nbrPolygonesObjectif == 3) {
=======
	if (nbrPolygonesObjectif === 3) {
>>>>>>> ménage, tuning et fix
		if (d2 < d1)
			d2 = d1;
	}

<<<<<<< HEAD
	if (nbrPolygonesObjectif == 5) {
=======
	if (nbrPolygonesObjectif === 5) {
>>>>>>> ménage, tuning et fix
		if (d2 < d1)
			d2 = d1;

		if (d3 < d2)
			d3 = d2;
	}
<<<<<<< HEAD
	if (nbrPolygonesObjectif == 7) {
=======
	if (nbrPolygonesObjectif === 7) {
>>>>>>> ménage, tuning et fix
		if (d2 < d1)
			d2 = d1;

		if (d3 < d2)
			d3 = d2;

		if (d4 < d3)
			d4 = d3;
	}
<<<<<<< HEAD
	if (nbrPolygonesObjectif == 9) {
=======
	if (nbrPolygonesObjectif === 9) {
>>>>>>> ménage, tuning et fix
		if (d2 < d1)
			d2 = d1;

		if (d3 < d2)
			d3 = d2;

		if (d4 < d3)
			d4 = d3;

		if (d5 < d4)
			d5 = d4;
	}



	var p0 = dP + p_corps - p_foyer_corps;

	//Sommets
	var a1_x = 0;
	var a1_y = 0;
	var a1_p = 0;
	var a2_x = 0;
	var a2_y = 0;
	var a2_p = 0;
	var a3_x = 0;
	var a3_y = 0;
	var a3_p = 0;
	var a4_x = 0;
	var a4_y = 0;
	var a4_p = 0;

	var b1_x = 0;
	var b1_y = 0;
	var b1_p = 0;
	var b2_x = 0;
	var b2_y = 0;
	var b2_p = 0;
	var b3_x = 0;
	var b3_y = 0;
	var b3_p = 0;
	var b4_x = 0;
	var b4_y = 0;
	var b4_p = 0;

	var c1_x = 0;
	var c1_y = 0;
	var c1_p = 0;
	var c2_x = 0;
	var c2_y = 0;
	var c2_p = 0;
	var c3_x = 0;
	var c3_y = 0;
	var c3_p = 0;
	var c4_x = 0;
	var c4_y = 0;
	var c4_p = 0;

	var d1_x = 0;
	var d1_y = 0;
	var d1_p = 0;
	var d2_x = 0;
	var d2_y = 0;
	var d2_p = 0;
	var d3_x = 0;
	var d3_y = 0;
	var d3_p = 0;
	var d4_x = 0;
	var d4_y = 0;
	var d4_p = 0;

	var e1_x = 0;
	var e1_y = 0;
	var e1_p = 0;
	var e2_x = 0;
	var e2_y = 0;
	var e2_p = 0;
	var e3_x = 0;
	var e3_y = 0;
	var e3_p = 0;
	var e4_x = 0;
	var e4_y = 0;
	var e4_p = 0;



	var i = 0;
	var u_x = 0;
	var u_y = 1;
	var u_p = 0;
	var v_x = 0;
	var v_y = 1;
	var v_p = 0;
	var w_x = 0;
	var w_y = 1;
	var w_p = 0;


	var coord = majCoord3D(v_x, v_y, v_p);

	var temp_R = 0;

	for (i = 0; i * DeltaAngleObjectif < 2 * Math.PI; i++) {

		//Sommets
		a1_x = -(-dX) + (d1 / 2) * Math.cos(i * DeltaAngleObjectif);
		a1_y = dY + (d1 / 2) * Math.sin(i * DeltaAngleObjectif);
		a1_p = p0;
		a2_x = a1_x;
		a2_y = a1_y;
		a2_p = p0 + l1;
		a3_x = -(-dX) + (d1 / 2) * Math.cos((i + 1) * DeltaAngleObjectif);
		a3_y = dY + (d1 / 2) * Math.sin((i + 1) * DeltaAngleObjectif);
		a3_p = a2_p;
		a4_x = a3_x;
		a4_y = a3_y;
		a4_p = a1_p;

		//u:cb, v:cd, w=u.v
		u_x = a2_x - a3_x;
		u_y = a2_y - a3_y;
		u_p = a2_p - a3_p;
		v_x = a4_x - a3_x;
		v_y = a4_y - a3_y;
		v_p = a4_p - a3_p;
		w_x = u_y * v_p - u_p * v_y;
		w_y = u_p * v_x - u_x * v_p;
		w_p = u_x * v_y - u_y * v_x;

		//MAJ du polynome
		PolynomesObjectifTT[0][i] = new Polygone("Obj0" + i, [180, 180, 180, 0.8], [50, 50, 50], [10, 10, 10, 1], [
			[a1_x, a1_y, a1_p],
			[a2_x, a2_y, a2_p],
			[a3_x, a3_y, a3_p],
			[a4_x, a4_y, a4_p]
		], [
			[0, 0],
			[0, 0],
			[0, 0],
			[0, 0]
		], [(a1_x + a3_x) / 2, (a1_y + a3_y) / 2, (a1_p + a3_p) / 2], 0, [w_x, w_y, w_p], [0, 0, 0], initPts, majPtsPolygones, drawPolynome, l1);

		if (N_bague !== 0)
			PolynomesObjectifTT[0][i].Contour[3] = 0;


		if (nbrPolygonesObjectif >= 3) {
			//Sommets
			b1_x = -(-dX) + (d2 / 2) * Math.cos(i * DeltaAngleObjectif);
			b1_y = dY + (d2 / 2) * Math.sin(i * DeltaAngleObjectif);
			b1_p = a2_p + e1;
			b2_x = b1_x;
			b2_y = b1_y;
			b2_p = b1_p + l2;
			b3_x = -(-dX) + (d2 / 2) * Math.cos((i + 1) * DeltaAngleObjectif);
			b3_y = dY + (d2 / 2) * Math.sin((i + 1) * DeltaAngleObjectif);
			b3_p = b2_p;
			b4_x = b3_x;
			b4_y = b3_y;
			b4_p = b1_p;

			//Entre les 2 cylindres
			//u:cb, v:cd, w=u.v
			u_x = a3_x - a2_x;
			u_y = a3_y - a2_y;
			u_p = a3_p - a2_p;
			v_x = b1_x - a2_x;
			v_y = b1_y - a2_y;
			v_p = b1_p - a2_p;
			w_x = u_y * v_p - u_p * v_y;
			w_y = u_p * v_x - u_x * v_p;
			w_p = u_x * v_y - u_y * v_x;

			//MAJ du polynome
			PolynomesObjectifTT[1][i] = new Polygone("Obj1" + i, [180, 180, 180, 0.8], [50, 50, 50], [10, 10, 10, 1], [
				[b1_x, b1_y, b1_p],
				[b4_x, b4_y, b4_p],
				[a3_x, a3_y, a3_p],
				[a2_x, a2_y, a2_p]
			], [
				[0, 0],
				[0, 0],
				[0, 0],
				[0, 0]
			], [(b4_x + a2_x) / 2, (b4_y + a2_y) / 2, (b4_p + a2_p) / 2], 0, [w_x, w_y, w_p], [0, 0, 0], initPts, majPtsPolygones, drawPolynome, d2 - d1);

			if (N_bague !== 1)
				PolynomesObjectifTT[1][i].Contour[3] = 0;

			//2nd cylindre
			//u:cb, v:cd, w=u.v
			u_x = b2_x - b3_x;
			u_y = b2_y - b3_y;
			u_p = b2_p - b3_p;
			v_x = b4_x - b3_x;
			v_y = b4_y - b3_y;
			v_p = b4_p - b3_p;
			w_x = u_y * v_p - u_p * v_y;
			w_y = u_p * v_x - u_x * v_p;
			w_p = u_x * v_y - u_y * v_x;

			//MAJ du polynome
			PolynomesObjectifTT[2][i] = new Polygone("Obj2" + i, [180, 180, 180, 0.8], [50, 50, 50], [10, 10, 10, 1], [
				[b1_x, b1_y, b1_p],
				[b2_x, b2_y, b2_p],
				[b3_x, b3_y, b3_p],
				[b4_x, b4_y, b4_p]
			], [
				[0, 0],
				[0, 0],
				[0, 0],
				[0, 0]
			], [(b1_x + b3_x) / 2, (b1_y + b3_y) / 2, (b1_p + b3_p) / 2], 0, [w_x, w_y, w_p], [0, 0, 0], initPts, majPtsPolygones, drawPolynome, l2);
			if (N_bague !== 2)
				PolynomesObjectifTT[2][i].Contour[3] = 0;

		}

		if (nbrPolygonesObjectif >= 5) {
			//Sommets
			c1_x = -(-dX) + (d3 / 2) * Math.cos(i * DeltaAngleObjectif);
			c1_y = dY + (d3 / 2) * Math.sin(i * DeltaAngleObjectif);
			c1_p = b2_p + e2;
			c2_x = c1_x;
			c2_y = c1_y;
			c2_p = c1_p + l3;
			c3_x = -(-dX) + (d3 / 2) * Math.cos((i + 1) * DeltaAngleObjectif);
			c3_y = dY + (d3 / 2) * Math.sin((i + 1) * DeltaAngleObjectif);
			c3_p = c2_p;
			c4_x = c3_x;
			c4_y = c3_y;
			c4_p = c1_p;

			//Entre les 2 cylindres
			//u:cb, v:cd, w=u.v
			u_x = b3_x - b2_x;
			u_y = b3_y - b2_y;
			u_p = b3_p - b2_p;
			v_x = c1_x - c2_x;
			v_y = c1_y - c2_y;
			v_p = c1_p - c2_p;
			w_x = u_y * v_p - u_p * v_y;
			w_y = u_p * v_x - u_x * v_p;
			w_p = u_x * v_y - u_y * v_x;

			//MAJ du polynome
			PolynomesObjectifTT[3][i] = new Polygone("Obj3" + i, [180, 180, 180, 0.8], [50, 50, 50], [10, 10, 10, 1], [
				[c1_x, c1_y, c1_p],
				[c4_x, c4_y, c4_p],
				[b3_x, b3_y, b3_p],
				[b2_x, b2_y, b2_p]
			], [
				[0, 0],
				[0, 0],
				[0, 0],
				[0, 0]
			], [(c4_x + b2_x) / 2, (c4_y + b2_y) / 2, (c4_p + b2_p) / 2], 0, [w_x, w_y, w_p], [0, 0, 0], initPts, majPtsPolygones, drawPolynome, d3 - d2);
			if (N_bague !== 3)
				PolynomesObjectifTT[3][i].Contour[3] = 0;

			//2nd cylindre
			//u:cb, v:cd, w=u.v
			u_x = c2_x - c3_x;
			u_y = c2_y - c3_y;
			u_p = c2_p - c3_p;
			v_x = c4_x - c3_x;
			v_y = c4_y - c3_y;
			v_p = c4_p - c3_p;
			w_x = u_y * v_p - u_p * v_y;
			w_y = u_p * v_x - u_x * v_p;
			w_p = u_x * v_y - u_y * v_x;

			//MAJ du polynome
			PolynomesObjectifTT[4][i] = new Polygone("Obj4" + i, [180, 180, 180, 0.8], [50, 50, 50], [10, 10, 10, 1], [
				[c1_x, c1_y, c1_p],
				[c2_x, c2_y, c2_p],
				[c3_x, c3_y, c3_p],
				[c4_x, c4_y, c4_p]
			], [
				[0, 0],
				[0, 0],
				[0, 0],
				[0, 0]
			], [(c1_x + c3_x) / 2, (c1_y + c3_y) / 2, (c1_p + c3_p) / 2], 0, [w_x, w_y, w_p], [0, 0, 0], initPts, majPtsPolygones, drawPolynome, l3);
			if (N_bague !== 4)
				PolynomesObjectifTT[4][i].Contour[3] = 0;

		}

		if (nbrPolygonesObjectif >= 5) {
			//Sommets
			d1_x = -(-dX) + (d4 / 2) * Math.cos(i * DeltaAngleObjectif);
			d1_y = dY + (d4 / 2) * Math.sin(i * DeltaAngleObjectif);
			d1_p = c2_p + e3;
			d2_x = d1_x;
			d2_y = d1_y;
			d2_p = d1_p + l4;
			d3_x = -(-dX) + (d4 / 2) * Math.cos((i + 1) * DeltaAngleObjectif);
			d3_y = dY + (d4 / 2) * Math.sin((i + 1) * DeltaAngleObjectif);
			d3_p = d2_p;
			d4_x = d3_x;
			d4_y = d3_y;
			d4_p = d1_p;

			//Entre les 2 cylindres
			//u:cb, v:cd, w=u.v
			u_x = c3_x - c2_x;
			u_y = c3_y - c2_y;
			u_p = c3_p - c2_p;
			v_x = d1_x - d2_x;
			v_y = d1_y - d2_y;
			v_p = d1_p - d2_p;
			w_x = u_y * v_p - u_p * v_y;
			w_y = u_p * v_x - u_x * v_p;
			w_p = u_x * v_y - u_y * v_x;

			//MAJ du polynome
			PolynomesObjectifTT[5][i] = new Polygone("Obj5" + i, [180, 180, 180, 0.8], [50, 50, 50], [10, 10, 10, 1], [
				[d1_x, d1_y, d1_p],
				[d4_x, d4_y, d4_p],
				[c3_x, c3_y, c3_p],
				[c2_x, c2_y, c2_p]
			], [
				[0, 0],
				[0, 0],
				[0, 0],
				[0, 0]
			], [(d4_x + c2_x) / 2, (d4_y + c2_y) / 2, (d4_p + c2_p) / 2], 0, [w_x, w_y, w_p], [0, 0, 0], initPts, majPtsPolygones, drawPolynome, d4 - d3);
			if (N_bague !== 5)
				PolynomesObjectifTT[5][i].Contour[3] = 0;
			//2nd cylindre
			//u:cb, v:cd, w=u.v
			u_x = d2_x - d3_x;
			u_y = d2_y - d3_y;
			u_p = d2_p - d3_p;
			v_x = d4_x - d3_x;
			v_y = d4_y - d3_y;
			v_p = d4_p - d3_p;
			w_x = u_y * v_p - u_p * v_y;
			w_y = u_p * v_x - u_x * v_p;
			w_p = u_x * v_y - u_y * v_x;

			//MAJ du polynome
			PolynomesObjectifTT[6][i] = new Polygone("Obj6" + i, [180, 180, 180, 0.8], [50, 50, 50], [10, 10, 10, 1], [
				[d1_x, d1_y, d1_p],
				[d2_x, d2_y, d2_p],
				[d3_x, d3_y, d3_p],
				[d4_x, d4_y, d4_p]
			], [
				[0, 0],
				[0, 0],
				[0, 0],
				[0, 0]
			], [(d1_x + d3_x) / 2, (d1_y + d3_y) / 2, (d1_p + d3_p) / 2], 0, [w_x, w_y, w_p], [0, 0, 0], initPts, majPtsPolygones, drawPolynome, l4);
			if (N_bague !== 6)
				PolynomesObjectifTT[6][i].Contour[3] = 0;
		}

		if (nbrPolygonesObjectif >= 7) {
			//Sommets
			e1_x = -(-dX) + (d5 / 2) * Math.cos(i * DeltaAngleObjectif);
			e1_y = dY + (d5 / 2) * Math.sin(i * DeltaAngleObjectif);
			e1_p = d2_p + e4;
			e2_x = e1_x;
			e2_y = e1_y;
			e2_p = e1_p + l5;
			e3_x = -(-dX) + (d5 / 2) * Math.cos((i + 1) * DeltaAngleObjectif);
			e3_y = dY + (d5 / 2) * Math.sin((i + 1) * DeltaAngleObjectif);
			e3_p = e2_p;
			e4_x = e3_x;
			e4_y = e3_y;
			e4_p = e1_p;

			//Entre les 2 cylindres
			//u:cb, v:cd, w=u.v
			u_x = d3_x - d2_x;
			u_y = d3_y - d2_y;
			u_p = d3_p - d2_p;
			v_x = e1_x - e2_x;
			v_y = e1_y - e2_y;
			v_p = e1_p - e2_p;
			w_x = u_y * v_p - u_p * v_y;
			w_y = u_p * v_x - u_x * v_p;
			w_p = u_x * v_y - u_y * v_x;

			//MAJ du polynome
			PolynomesObjectifTT[7][i] = new Polygone("Obj7" + i, [180, 180, 180, 0.8], [50, 50, 50], [10, 10, 10, 1], [
				[e1_x, e1_y, e1_p],
				[e4_x, e4_y, e4_p],
				[d3_x, d3_y, d3_p],
				[d2_x, d2_y, d2_p]
			], [
				[0, 0],
				[0, 0],
				[0, 0],
				[0, 0]
			], [(e4_x + d2_x) / 2, (e4_y + d2_y) / 2, (e4_p + d2_p) / 2], 0, [w_x, w_y, w_p], [0, 0, 0], initPts, majPtsPolygones, drawPolynome, d5 - d4);
			if (N_bague !== 7)
				PolynomesObjectifTT[7][i].Contour[3] = 0;
			//2nd cylindre
			//u:cb, v:cd, w=u.v
			u_x = e2_x - e3_x;
			u_y = e2_y - e3_y;
			u_p = e2_p - e3_p;
			v_x = e4_x - e3_x;
			v_y = e4_y - e3_y;
			v_p = e4_p - e3_p;
			w_x = u_y * v_p - u_p * v_y;
			w_y = u_p * v_x - u_x * v_p;
			w_p = u_x * v_y - u_y * v_x;

			//MAJ du polynome
			PolynomesObjectifTT[8][i] = new Polygone("Obj8" + i, [180, 180, 180, 0.8], [50, 50, 50], [10, 10, 10, 1], [
				[e1_x, e1_y, e1_p],
				[e2_x, e2_y, e2_p],
				[e3_x, e3_y, e3_p],
				[e4_x, e4_y, e4_p]
			], [
				[0, 0],
				[0, 0],
				[0, 0],
				[0, 0]
			], [(e1_x + e3_x) / 2, (e1_y + e3_y) / 2, (e1_p + e3_p) / 2], 0, [w_x, w_y, w_p], [0, 0, 0], initPts, majPtsPolygones, drawPolynome, l5);
			if (N_bague !== 8)
				PolynomesObjectifTT[8][i].Contour[3] = 0;
		}


	}



}

//Polygones de la molette

function initPtsMolette() {

	var d_theta = Math.PI / delta_angleMoletteReglage;
	var r = 0.018; //rayon interne
	var R = 0.02; //rayon externe
	var e = 0.004; //épaisseur	

	var Xpho = -1 * (-dX);
	var Ypho = dY;
	var Ppho = dP;

	//centre de rotation
	var x0 = Xpho - x_foyer_corps + 0.02; //OK
	var y0 = Ypho + y_foyer_corps - 0.0123; //OK
	var p0 = Ppho - p_foyer_corps + R - 0.006; //OK

	var i = 0;
	var ii = 0;

	var Face_temp_haut = new Array(4 * delta_angleMoletteReglage);
	var Face_temp_bas = new Array(4 * delta_angleMoletteReglage);
	for (i = 0; i < 4 * delta_angleMoletteReglage; i++) {
		Face_temp_haut[i] = new Array(3);
		Face_temp_bas[i] = new Array(3);
	}


	//Mémorise les coordonées des sommets
	var ii = 0;
	for (i = 0; i !== 2 * delta_angleMoletteReglage; i += 2) {
		ii = 2 * i;
		Face_temp_haut[ii][0] = x0 - R * Math.cos(i * d_theta);
		Face_temp_haut[ii][1] = y0 + e / 2;
		Face_temp_haut[ii][2] = p0 + R * Math.sin(i * d_theta);
		Face_temp_bas[ii][0] = Face_temp_haut[ii][0];
		Face_temp_bas[ii][1] = y0 - e / 2;
		Face_temp_bas[ii][2] = Face_temp_haut[ii][2];

		Face_temp_haut[ii + 1][0] = x0 - R * Math.cos((i + 1) * d_theta);
		Face_temp_haut[ii + 1][1] = y0 + e / 2;
		Face_temp_haut[ii + 1][2] = p0 + R * Math.sin((i + 1) * d_theta);
		Face_temp_bas[ii + 1][0] = Face_temp_haut[ii + 1][0];
		Face_temp_bas[ii + 1][1] = y0 - e / 2;
		Face_temp_bas[ii + 1][2] = Face_temp_haut[ii + 1][2];

		Face_temp_haut[ii + 2][0] = x0 - r * Math.cos((i + 1) * d_theta);
		Face_temp_haut[ii + 2][1] = y0 + e / 2;
		Face_temp_haut[ii + 2][2] = p0 + r * Math.sin((i + 1) * d_theta);
		Face_temp_bas[ii + 2][0] = Face_temp_haut[ii + 2][0];
		Face_temp_bas[ii + 2][1] = y0 - e / 2;
		Face_temp_bas[ii + 2][2] = Face_temp_haut[ii + 2][2];

		Face_temp_haut[ii + 3][0] = x0 - r * Math.cos((i + 2) * d_theta);
		Face_temp_haut[ii + 3][1] = y0 + e / 2;
		Face_temp_haut[ii + 3][2] = p0 + r * Math.sin((i + 2) * d_theta);
		Face_temp_bas[ii + 3][0] = Face_temp_haut[ii + 3][0];
		Face_temp_bas[ii + 3][1] = y0 - e / 2;
		Face_temp_bas[ii + 3][2] = Face_temp_haut[ii + 3][2];
	}

	var tab_temp1 = new Array(4 * delta_angleMoletteReglage, 2);
	for (i = 0; i < 4 * delta_angleMoletteReglage; i++)
		tab_temp1[i] = new Array(2);

	var tab_temp2 = new Array(4 * delta_angleMoletteReglage, 2);
	for (i = 0; i < 4 * delta_angleMoletteReglage; i++)
		tab_temp2[i] = new Array(2);


	//Polygomes des faces haut et bas
	PolygomesMolette[0] = new Polygone("Mol0", [150, 150, 150, 1], [50, 50, 50], [0, 0, 0, 0], Face_temp_haut, tab_temp1, [x0, y0 + e / 2, p0], 0, [0, 1, 0], [0, 0, 0], initPts, majPtsPolygones, drawPolynome, 2 * R);
	PolygomesMolette[1] = new Polygone("Mol1", [150, 150, 150, 1], [50, 50, 50], [0, 0, 0, 0], Face_temp_bas, tab_temp2, [x0, y0 - e / 2, p0], 0, [0, -1, 0], [0, 0, 0], initPts, majPtsPolygones, drawPolynome, 2 * R);

	//Polygones des tranches
	var xa = 1.0;
	var ya = 1.0;
	var pa = 1.0;
	var xb = 1.0;
	var yb = 1.0;
	var pb = 1.0;
	var xc = 1.0;
	var yc = 1.0;
	var pc = 1.0;
	var xd = 1.0;
	var yd = 1.0;
	var pd = 1.0;
	var xg = 1.0;
	var yg = 1.0;
	var pg = 1.0;
	var u_x = 0;
	var u_y = 1;
	var u_p = 0;
	var v_x = 0;
	var v_y = 1;
	var v_p = 0;
	var w_x = 0;
	var w_y = 1;
	var w_p = 0;


	for (i = 0; i !== 4 * delta_angleMoletteReglage - 1; i++) {

		xa = Face_temp_haut[i][0];
		ya = Face_temp_haut[i][1];
		pa = Face_temp_haut[i][2];
		xb = Face_temp_haut[i + 1][0];
		yb = Face_temp_haut[i + 1][1];
		pb = Face_temp_haut[i + 1][2];
		xc = Face_temp_bas[i + 1][0];
		yc = Face_temp_bas[i + 1][1];
		pc = Face_temp_bas[i + 1][2];
		xd = Face_temp_bas[i][0];
		yd = Face_temp_bas[i][1];
		pd = Face_temp_bas[i][2];

		xg = (xa + xc) / 2;
		yg = y0;
		pg = (pa + pc) / 2;

		//u:ad, v:ab, w=u.v
		u_x = xd - xa;
		u_y = yd - ya;
		u_p = pd - pa;
		v_x = xb - xa;
		v_y = yb - ya;
		v_p = pb - pa;
		w_x = u_y * v_p - u_p * v_y;
		w_y = u_p * v_x - u_x * v_p;
		w_p = u_x * v_y - u_y * v_x;

		PolygomesMolette[i + 2] = new Polygone("Mol" + (i + 2), [150, 150, 150, 1], [50, 50, 50], [0, 0, 0, 0], [
			[xa, ya, pa],
			[xb, yb, pb],
			[xc, yc, pc],
			[xd, yd, pd]
		], [
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0]
		], [xg, yg, pg], 0, [w_x, w_y, w_p], [0, 0, 0], initPts, majPtsPolygones, drawPolynome, e);
	}

	//Dernier
	xa = Face_temp_haut[i][0];
	ya = Face_temp_haut[i][1];
	pa = Face_temp_haut[i][2];
	xb = Face_temp_haut[0][0];
	yb = Face_temp_haut[0][1];
	pb = Face_temp_haut[0][2];
	xc = Face_temp_bas[0][0];
	yc = Face_temp_bas[0][1];
	pc = Face_temp_bas[0][2];
	xd = Face_temp_bas[i][0];
	yd = Face_temp_bas[i][1];
	pd = Face_temp_bas[i][2];

	xg = (xa + xc) / 2;
	yg = y0;
	pg = (pa + pc) / 2;

	//u:ad, v:ab, w=u.v
	u_x = xd - xa;
	u_y = yd - ya;
	u_p = pd - pa;
	v_x = xb - xa;
	v_y = yb - ya;
	v_p = pb - pa;
	w_x = u_y * v_p - u_p * v_y;
	w_y = u_p * v_x - u_x * v_p;
	w_p = u_x * v_y - u_y * v_x;

	PolygomesMolette[i + 2] = new Polygone("Mol" + (i + 2), [150, 150, 150, 1], [50, 50, 50], [0, 0, 0, 0], [
		[xa, ya, pa],
		[xb, yb, pb],
		[xc, yc, pc],
		[xd, yd, pd]
	], [
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0]
	], [xg, yg, pg], 0, [w_x, w_y, w_p], [0, 0, 0], initPts, majPtsPolygones, drawPolynome, e);
}

//--ROTATION DES POLYGONES

function majPtsPolygones() {

	//Rotation des sommets
	for (var i = 0; i !== this.Pts.length; i++) {
		var coord_3D = xyp2XYmaj(this.Pts[i][0], this.Pts[i][1], this.Pts[i][2]);
		this.PtsMaj[i][0] = coord_3D.X;
		this.PtsMaj[i][1] = coord_3D.Y;
	}

	//Rotation du CDG
	this.CDGMaj = 1.0 * (majCoord3D(this.CDG[0], this.CDG[1], this.CDG[2]).p.toFixed(6));


	//Rotation de la VecteurNormale à la surface
	var coord = majCoord3D(this.VecteurNormale[0], this.VecteurNormale[1], this.VecteurNormale[2], "pas_de_translation");
	var normalise = coord.x * coord.x + coord.y * coord.y + coord.p * coord.p;
	if (normalise !== 0) {
		normalise = 1 / normalise;
		normalise = Math.sqrt(normalise);
		coord.x = coord.x * normalise;
		coord.y = coord.y * normalise;
		coord.p = coord.p * normalise;
	}

	this.VecteurNormaleMaj = [coord.x, coord.y, coord.p];
}

//Appelle toutes les rotations

function majPtsFenetre3D() {

	mod_capteurFF.rot_pts();
	mod_capteurCourant.rot_pts();

	mod_Boitier_a.rot_pts();
	mod_Boitier_b.rot_pts();
	mod_Boitier_c.rot_pts();
	mod_Boitier_d.rot_pts();
	mod_Boitier_e.rot_pts();
	mod_Boitier_f.rot_pts();
	mod_Boitier_g.rot_pts();
	mod_Boitier_h.rot_pts();
	mod_Boitier_i.rot_pts();
	mod_Boitier_ii.rot_pts();
	mod_Boitier_j.rot_pts();
	mod_Boitier_k.rot_pts();
	mod_Boitier_l.rot_pts();
	mod_Boitier_m.rot_pts();

	for (var i = 0; i !== NbrPolygonesParCylindre; i++) {

		PolynomesObjectifTT[0][i].rot_pts();

		if (nbrPolygonesObjectif >= 3) {
			PolynomesObjectifTT[1][i].rot_pts();
			PolynomesObjectifTT[2][i].rot_pts();
		}

		if (nbrPolygonesObjectif >= 5) {
			PolynomesObjectifTT[3][i].rot_pts();
			PolynomesObjectifTT[4][i].rot_pts();
		}

		if (nbrPolygonesObjectif >= 7) {
			PolynomesObjectifTT[5][i].rot_pts();
			PolynomesObjectifTT[6][i].rot_pts();
		}

		if (nbrPolygonesObjectif >= 9) {
			PolynomesObjectifTT[7][i].rot_pts();
			PolynomesObjectifTT[8][i].rot_pts();
		}
	}



	for (i = 0; i !== 2 + 4 * delta_angleMoletteReglage; i++)
		PolygomesMolette[i].rot_pts();

	mod_miroir.rot_pts();
	mod_miroir_haut.rot_pts();
	mod_miroir_bas.rot_pts();

}

//--DESSIN D'UN POLYGONE

function drawPolynome() {

	//Regarde si le polynome est dans la zone d'affichage

	//Rayon d'affichage (affiche le polygone si la sphere de rayon R centrée sur le CDG est au moins en partie visible)
	var R = this.RayonAffichage;

	//vecteur vers le CDG
	var vx = this.CDG[0];
	var vy = this.CDG[1];
	var vp = this.CDG[2];

<<<<<<< HEAD
	if (cvs_3D == "Fenetre3D")
		var coord = majCoord3D(vx, vy, vp);
	else
		var coord = majCoord3D(vx, vy, vp, "pas_de_translation");
=======
	var coord;

	if (cvs_3D === "Fenetre3D")
		coord = majCoord3D(vx, vy, vp);
	else
		coord = majCoord3D(vx, vy, vp, "pas_de_translation");
>>>>>>> ménage, tuning et fix


	vx = coord.x;
	vy = coord.y;
	vp = coord.p;

	var n = Math.sqrt(vx * vx + vy * vy + vp * vp);

	//vecteur vers la limite d'affichage
	if (n !== 0) {
		vx = vx * (n - R) / n;
		vy = vy * (n - R) / n;
		vp = vp * (n - R) / n;
	}

	vx = vx / k_3D;
	vy = vy / k_3D;
	vp = vp / k_3D;


	//regarde si le vecteur limite est dans la zone d'impression
<<<<<<< HEAD
	var coord = xyp2XY(vx, vy, vp);
=======
	coord = xyp2XY(vx, vy, vp);
>>>>>>> ménage, tuning et fix


	if (coord.X >= 0 && coord.X < w_cvs_3D && coord.Y >= 0 && coord.Y < h_cvs_3D) {

		ct_3D.beginPath();

		//Relie tous les sommets et revient au premier
		ct_3D.moveTo(this.PtsMaj[0][0], this.PtsMaj[0][1]);

		for (i = 1; i !== this.PtsMaj.length; i++)
			ct_3D.lineTo(this.PtsMaj[i][0], this.PtsMaj[i][1]);

		ct_3D.lineTo(this.PtsMaj[0][0], this.PtsMaj[0][1]);

		//Remplissage: Calcul de la couleur en fonction de la luminosité
		if (this.FondMax[3] !== 0) {

			var lum_temp = this.VecteurNormaleMaj[0] * lum_x + this.VecteurNormaleMaj[1] * lum_y + this.VecteurNormaleMaj[2] * lum_p; //produit scalaire vecteur VecteurNormale / vecteur lumière

			if (lum_temp < 0)
				lum_temp = 0;

			var temp_R = Math.round(this.FondMin[0] + lum_temp * (this.FondMax[0] - this.FondMin[0]));
			var temp_V = Math.round(this.FondMin[1] + lum_temp * (this.FondMax[1] - this.FondMin[1]));
			var temp_B = Math.round(this.FondMin[2] + lum_temp * (this.FondMax[2] - this.FondMin[2]));
			ct_3D.fillStyle = 'rgba(' + temp_R + ',' + temp_V + ',' + temp_B + ',' + this.FondMax[3] + ')';
			ct_3D.fill();
		}
		//Contour
		if (this.Contour[3] !== 0) {
			ct_3D.strokeStyle = 'rgba(' + this.Contour[0] + ',' + this.Contour[1] + ',' + this.Contour[2] + ',' + this.Contour[3] + ')';
			ct_3D.stroke();
		}

	}
}

//Pour pouvoir faire un tri avec des nombres négatifs

function sortNumber(a, b) {
	return a - b;
}

//Maj de haut;bas,gauche,droite,devant,derriere en fonction de l'orientation de la scène
//variables lues ailleurs pour simplifier certaines choses

function majOrientationFenetre3D() {

	var pp = majCoord3D(0, 1, 0, 'pas_de_translation').p;
	if (pp > 0) {
		haut = 1;
		bas = 0;
	} else {
		haut = 0;
		bas = 1;
	}

	var pp = majCoord3D(0, 0, 1, 'pas_de_translation').p;
	if (pp > 0) {
		devant = 1;
		derriere = 0;
	} else {
		devant = 0;
		derriere = 1;
	}

	var pp = majCoord3D(1, 0, 0, 'pas_de_translation').p;
	if (pp < 0) {
		gauche = 1;
		droite = 0;
	} else {
		gauche = 0;
		droite = 1;
	}

}

function drawFenetre3D() {

	//INIT
	init_3D("Fenetre3D");
<<<<<<< HEAD
	majVecteursLuminosite()
=======
	majVecteursLuminosite();
>>>>>>> ménage, tuning et fix
	majOrientationFenetre3D();
	majPtsFenetre3D();


	var i = 0;

	//Dimensions du canvas
	var cvs = document.getElementById('id_cvs_Fenetre3D');
	var ct = cvs.getContext('2d');
	cvs.width = w_cvs_3D;
	cvs.height = h_cvs_3D;

	//RAZ et fond blanc
	ct.fillStyle = '#FFFFFF';
	ct.beginPath();
	ct.fillRect(0, 0, w_cvs_3D - 1, h_cvs_3D - 1);


	//-MAJ DES CDG
	var cdg_a = mod_Boitier_a.CDGMaj;
	var cdg_b = mod_Boitier_b.CDGMaj;
	var cdg_c = mod_Boitier_c.CDGMaj;
	var cdg_d = mod_Boitier_d.CDGMaj;
	var cdg_e = mod_Boitier_e.CDGMaj;
	var cdg_f = mod_Boitier_f.CDGMaj;
	var cdg_g = mod_Boitier_g.CDGMaj;
	var cdg_h = mod_Boitier_h.CDGMaj;
	var cdg_i = mod_Boitier_i.CDGMaj;
	var cdg_ii = mod_Boitier_ii.CDGMaj;
	var cdg_j = mod_Boitier_j.CDGMaj;
	var cdg_k = mod_Boitier_k.CDGMaj;
	var cdg_l = mod_Boitier_l.CDGMaj;
	var cdg_m = mod_Boitier_m.CDGMaj;

	//--Capteurs
	var cdg_ff = mod_capteurFF.CDGMaj;
	var cdg_ca = mod_capteurCourant.CDGMaj;



	//--Diaphragme
	var f_m = focale / 1000;
	var df = (f_m * f_m) / (d_map - f_m);
	var p_f = df + f_m;
	var dia_x = -(-dX);
	var dia_y = 0 + dY;
	var dia_p = p_f + dP - p_foyer_corps;
	var cdg_dia = majCoord3D(dia_x, dia_y, dia_p).p.toFixed(6);


	//--Silhouttes
	var cdg_avantPlan = majCoord3D(0, 0, d_avantPlan + dP + p_f).p.toFixed(6);
	var cdg_map = majCoord3D(0, 0, d_map + dP + p_f).p.toFixed(6);
	var cdg_arrierePlan = majCoord3D(0, 0, d_arrierePlan + dP + p_f).p.toFixed(6);

	//--PDC
<<<<<<< HEAD
	var cdg_pdc = majCoord3D(0, 0, debutPDC + dP + p_f).p.toFixed(6);
=======
	var cdg_pdc = majCoord3D(0, 0, finPDC + dP + p_f).p.toFixed(6);
>>>>>>> ménage, tuning et fix


	//1ier maj du tableau
	var nbr_cdg_init = 21;
	Ordre = new Array(nbr_cdg_init + nbrPolygonesObjectif * NbrPolygonesParCylindre + 2 + 4 * delta_angleMoletteReglage + 3 + 1);

	Ordre[0] = cdg_a;
	Ordre[1] = cdg_b;
	Ordre[2] = cdg_c;
	Ordre[3] = cdg_d;
	Ordre[4] = cdg_e;
	Ordre[5] = cdg_f;
	Ordre[6] = cdg_g;
	Ordre[7] = cdg_h;
	Ordre[8] = cdg_i;
	Ordre[9] = cdg_ii;
	Ordre[10] = cdg_j;
	Ordre[11] = cdg_k;
	Ordre[12] = cdg_l;
	Ordre[13] = cdg_m;
	Ordre[14] = cdg_ff;
	Ordre[15] = cdg_ca;
	Ordre[16] = cdg_dia;
	Ordre[17] = cdg_avantPlan;
	Ordre[18] = cdg_map;
	Ordre[19] = cdg_arrierePlan;
	Ordre[20] = cdg_pdc;


	//Ajout de l'objectif
	for (var i = 0; i !== NbrPolygonesParCylindre; i++) {
		Ordre[nbr_cdg_init + i] = PolynomesObjectifTT[0][i].CDGMaj;
	}

	if (nbrPolygonesObjectif >= 3) {
		for (var i = 0; i !== NbrPolygonesParCylindre; i++)
			Ordre[nbr_cdg_init + NbrPolygonesParCylindre + i] = PolynomesObjectifTT[1][i].CDGMaj;

		for (var i = 0; i !== NbrPolygonesParCylindre; i++)
			Ordre[nbr_cdg_init + 2 * NbrPolygonesParCylindre + i] = PolynomesObjectifTT[2][i].CDGMaj;
	}

	if (nbrPolygonesObjectif >= 5) {
		for (var i = 0; i !== NbrPolygonesParCylindre; i++)
			Ordre[nbr_cdg_init + 3 * NbrPolygonesParCylindre + i] = PolynomesObjectifTT[3][i].CDGMaj;

		for (var i = 0; i !== NbrPolygonesParCylindre; i++)
			Ordre[nbr_cdg_init + 4 * NbrPolygonesParCylindre + i] = PolynomesObjectifTT[4][i].CDGMaj;
	}

	if (nbrPolygonesObjectif >= 7) {
		for (var i = 0; i !== NbrPolygonesParCylindre; i++)
			Ordre[nbr_cdg_init + 5 * NbrPolygonesParCylindre + i] = PolynomesObjectifTT[5][i].CDGMaj;

		for (var i = 0; i !== NbrPolygonesParCylindre; i++)
			Ordre[nbr_cdg_init + 6 * NbrPolygonesParCylindre + i] = PolynomesObjectifTT[6][i].CDGMaj;
	}

	if (nbrPolygonesObjectif >= 9) {
		for (var i = 0; i !== NbrPolygonesParCylindre; i++)
			Ordre[nbr_cdg_init + 7 * NbrPolygonesParCylindre + i] = PolynomesObjectifTT[7][i].CDGMaj;

		for (var i = 0; i !== NbrPolygonesParCylindre; i++)
			Ordre[nbr_cdg_init + 8 * NbrPolygonesParCylindre + i] = PolynomesObjectifTT[8][i].CDGMaj;
	}


	//Ajout de la molette
	for (var i = 0; i !== 2 + 4 * delta_angleMoletteReglage; i++)
		Ordre[nbr_cdg_init + i + nbrPolygonesObjectif * NbrPolygonesParCylindre] = PolygomesMolette[i].CDGMaj;

	//Ajout des miroirs de la visée reflex
	var cdg_mir = mod_miroir.CDGMaj;
	var cdg_mir_h = mod_miroir_haut.CDGMaj;
	var cdg_mir_b = mod_miroir_bas.CDGMaj;
	Ordre[nbr_cdg_init + nbrPolygonesObjectif * NbrPolygonesParCylindre + 2 + 4 * delta_angleMoletteReglage] = cdg_mir;
	Ordre[nbr_cdg_init + nbrPolygonesObjectif * NbrPolygonesParCylindre + 2 + 4 * delta_angleMoletteReglage + 1] = cdg_mir_h;
	Ordre[nbr_cdg_init + nbrPolygonesObjectif * NbrPolygonesParCylindre + 2 + 4 * delta_angleMoletteReglage + 2] = cdg_mir_b;


	//Ajout des rayons
	var cdg_rayons = cdg_j - 0.000001;
	Ordre[nbr_cdg_init + nbrPolygonesObjectif * NbrPolygonesParCylindre + 2 + 4 * delta_angleMoletteReglage + 3] = cdg_rayons;



	//-Trie du tableau
	Ordre.sort(sortNumber);

	if (haut)
		drawSol();

	//Balaye les CDG dans l'ordre de profondeur.
	//Une fois dessiné, le CDG passe à 'X' pour ne pas déssiner deux fois en cas de différents CDG de mêmes valeurs
	for (var i = 0; i !== Ordre.length; i++) {

		ct.fillStyle = 'rgba(0,0,0,0.5)';
		ct.strokeStyle = 'rgba(0,0,0,0.5)';
		var lum_max = 220;
		var lum_min = 50;
		var temp_lum = 0;
		var opp = 0.29;

		//Objectif
		for (var ii = 0; ii !== NbrPolygonesParCylindre; ii++) {
			for (var iii = 0; iii !== nbrPolygonesObjectif; iii++) {
<<<<<<< HEAD
				if (Ordre[i] == PolynomesObjectifTT[iii][ii].CDGMaj) {
=======
				if (Ordre[i] === PolynomesObjectifTT[iii][ii].CDGMaj) {
>>>>>>> ménage, tuning et fix
					PolynomesObjectifTT[iii][ii].draw();
					PolynomesObjectifTT[iii][ii].CDGMaj = 'X';
					ii = NbrPolygonesParCylindre - 1;
				}
			}
		}

		//Molette
		for (var ii = 0; ii !== 2 + 4 * delta_angleMoletteReglage; ii++) {
<<<<<<< HEAD
			if (Ordre[i] == PolygomesMolette[ii].CDGMaj) {
=======
			if (Ordre[i] === PolygomesMolette[ii].CDGMaj) {
>>>>>>> ménage, tuning et fix
				PolygomesMolette[ii].draw();
				PolygomesMolette[ii].CDGMaj = 'X';
				ii = 2 + 4 * delta_angleMoletteReglage - 1;
			}
		}



		switch (Ordre[i]) {

			//Miroirs
			case cdg_mir_b:
				mod_miroir_bas.draw();
				cdg_mir_b = "X";
				break;
			case cdg_mir_h:
				mod_miroir_haut.draw();
				cdg_mir_h = "X";
				break;
			case cdg_mir:
				mod_miroir.draw();
				cdg_mir = "X";
				break;
				//Boitier et viseur
			case cdg_a:
				mod_Boitier_a.draw();
				cdg_a = "X";
				break;
			case cdg_b:
				mod_Boitier_b.draw();
				cdg_b = "X";
				break;
			case cdg_c:
				mod_Boitier_c.draw();
				cdg_c = "X";
				break;
			case cdg_d:
				mod_Boitier_d.draw();
				cdg_d = "X";
				break;
			case cdg_e:
				mod_Boitier_e.draw();
				cdg_e = "X";
				break;
			case cdg_f:
				mod_Boitier_f.draw();
				cdg_f = "X";
				break;
			case cdg_g:
				mod_Boitier_g.draw();
				cdg_g = "X";
				break;
			case cdg_h:
				mod_Boitier_h.draw();
				cdg_h = "X";
				break;
			case cdg_i:
				mod_Boitier_i.draw();
				cdg_i = "X";
				break;
			case cdg_ii:
				mod_Boitier_ii.draw();
				cdg_ii = "X";
				break;
			case cdg_j:
				mod_Boitier_j.draw();
				cdg_j = "X";
				break;
			case cdg_k:
				mod_Boitier_k.draw();
				cdg_k = "X";
				break;
			case cdg_l:
				mod_Boitier_l.draw();
				cdg_l = "X";
				break;
			case cdg_m:
				mod_Boitier_m.draw();
				cdg_m = "X";

				var x1 = mod_miroir_bas.Pts[0][0];
				var y1 = mod_miroir_bas.Pts[0][1];
				var p1 = dP - p_foyer_corps;
				var x2 = mod_miroir_bas.Pts[1][0];
				var y2 = mod_miroir_bas.Pts[1][1];
				var p2 = p1;
				var x4 = mod_miroir_bas.Pts[3][0];
				var y4 = mod_miroir_bas.Pts[3][1];
				var p4 = p1;

				var proj_temp = xyp2XYmaj(x1, y1, p1);
				x1 = proj_temp.X;
				y1 = proj_temp.Y;
				proj_temp = xyp2XYmaj(x2, y2, p2);
				x2 = proj_temp.X;
				y2 = proj_temp.Y;
				proj_temp = xyp2XYmaj(x4, y4, p4);
				x4 = proj_temp.X;
				y4 = proj_temp.Y;

				//TBD: ajouter le cadre et réduire la taille du viseur et ajouter une lentille
				var cvs1 = document.getElementById("id_cvs_viseur_illustrations");
				drawImg2Dto3D(cvs1, x1, y1, x2, y2, x4, y4);



				break;

				//Capteurs
			case cdg_ff:
				mod_capteurFF.draw();
				cdg_ff = "X";
				break;
			case cdg_ca:
				mod_capteurCourant.draw();
				cdg_ca = "X";
				break;
				//Diaphragme
			case cdg_dia:
				drawDiaphragme();
				cdg_dia = 'X';
				break;
				//Silhouettes
			case cdg_avantPlan:
				var x1 = w_m_img_avantPlan / 2 - offset_x_img_avantPlan;
				var y1 = (w_m_img_avantPlan * h_img_avantPlan / w_img_avantPlan) - offset_y_avantPlan;
				var p1 = d_avantPlan + dP + p_f;
				var x2 = -w_m_img_avantPlan / 2 - offset_x_img_avantPlan;
				var y2 = y1;
				var p2 = p1;
				var x4 = x1;
				var y4 = -offset_y_avantPlan;
				var p4 = p1;

				var proj_temp = xyp2XYmaj(x1, y1, p1);
				x1 = proj_temp.X;
				y1 = proj_temp.Y;
				proj_temp = xyp2XYmaj(x2, y2, p2);
				x2 = proj_temp.X;
				y2 = proj_temp.Y;
				proj_temp = xyp2XYmaj(x4, y4, p4);
				x4 = proj_temp.X;
				y4 = proj_temp.Y;

				if (img_avantPlan.width)
					drawImg2Dto3D(img_avantPlan, x1, y1, x2, y2, x4, y4);

				cdg_avantPlan = 'X';
				break;

			case cdg_map:
				var x1 = w_m_img_map / 2;
				var y1 = (w_m_img_map * h_img_map / w_img_map) - offset_y_map;
				var p1 = d_map + dP + p_f;
				var x2 = -w_m_img_map / 2;
				var y2 = y1;
				var p2 = p1;
				var x4 = x1;
				var y4 = -offset_y_map;
				var p4 = p1;

				var proj_temp = xyp2XYmaj(x1, y1, p1);
				x1 = proj_temp.X;
				y1 = proj_temp.Y;
				proj_temp = xyp2XYmaj(x2, y2, p2);
				x2 = proj_temp.X;
				y2 = proj_temp.Y;
				proj_temp = xyp2XYmaj(x4, y4, p4);
				x4 = proj_temp.X;
				y4 = proj_temp.Y;

				if (img_map.width)
					drawImg2Dto3D(img_map, x1, y1, x2, y2, x4, y4);

				cdg_map = 'X';
				break;

			case cdg_arrierePlan:
				var x1 = w_m_img_arrierePlan / 2 - offset_x_img_arrierePlan;
				var y1 = (w_m_img_arrierePlan * h_img_arrierePlan / w_img_arrierePlan) - offset_y_arrierePlan;
				var p1 = d_arrierePlan + dP + p_f;
				var x2 = -w_m_img_arrierePlan / 2 - offset_x_img_arrierePlan;
				var y2 = y1;
				var p2 = p1;
				var x4 = x1;
				var y4 = -offset_y_arrierePlan;
				var p4 = p1;

				var proj_temp = xyp2XYmaj(x1, y1, p1);
				x1 = proj_temp.X;
				y1 = proj_temp.Y;
				proj_temp = xyp2XYmaj(x2, y2, p2);
				x2 = proj_temp.X;
				y2 = proj_temp.Y;
				proj_temp = xyp2XYmaj(x4, y4, p4);
				x4 = proj_temp.X;
				y4 = proj_temp.Y;

				if (img_arrierePlan.width)
					drawImg2Dto3D(img_arrierePlan, x1, y1, x2, y2, x4, y4);

				cdg_arrierePlan = 'X';
				break;

				//PDC				
			case cdg_pdc:
				drawZonePDC();
				cdg_pdc = 'X';
				break;


				//Rayons
			case cdg_rayons:
				drawIllustrationsOptiques();
				cdg_rayons = 'X';

		}

	}

	if (bas)
		drawSol();


	//--CADRE
	ct.fillStyle = '#000000';
	ct.beginPath();
	ct.fillRect(0, 0, w_cvs_3D, 1);
	ct.fillRect(0, h_cvs_3D - 1, w_cvs_3D, 1);
	ct.fillRect(0, 0, 1, h_cvs_3D);
	ct.fillRect(w_cvs_3D - 1, 0, 1, h_cvs_3D);
}

function drawIllustrationsOptiques() {

	var cvs = document.getElementById('id_cvs_Fenetre3D');
	var ct = cvs.getContext('2d');

	var xo = 1.0;
	var yo = 1.0;
	var po = 1.0;
	var xa = 1.0;
	var ya = 1.0;
	var pa = 1.0;
	var xb = 1.0;
	var yb = 1.0;
	var pb = 1.0;
	var xc = 1.0;
	var yc = 1.0;
	var pc = 1.0;
	var xd = 1.0;
	var yd = 1.0;
	var pd = 1.0;
	var xe = 1.0;
	var ye = 1.0;
	var pe = 1.0;
	var xf = 1.0;
	var yf = 1.0;
	var pf = 1.0;
	var xg = 1.0;
	var yg = 1.0;
	var pg = 1.0;
	var xh = 1.0;
	var yh = 1.0;
	var ph = 1.0;
	var xi = 1.0;
	var yi = 1.0;
	var pi = 1.0;
	var xj = 1.0;
	var yj = 1.0;
	var pj = 1.0;
	var xk = 1.0;
	var yk = 1.0;
	var pk = 1.0;
	var xl = 1.0;
	var yl = 1.0;
	var pl = 1.0;

	//-RAYONS
	var f_m = focale / 1000;
	var feq_m = focaleEquivalente / 1000;
	var df = (f_m * f_m) / (d_map - f_m);
	var dfeq = (feq_m * feq_m) / (d_map - feq_m);
	var p_f = df + f_m;
	var xa = -l_capteur / 2000 - (-dX);
	var ya = h_capteur / 2000 + dY;
	var xb = l_capteur / 2000 - (-dX);
	var yd = -h_capteur / 2000 + dY;
	var X0_cc = (xa + xb) / 2;
	var Y0_cc = (ya + yd) / 2;
	var xf_cc = X0_cc - (-dX) * (l_capteur / 1000) / w_m_avantPlan;
	var yf_cc = Y0_cc + dY * (h_capteur / 1000) / h_m_avantPlan;
	var inc_angle = 2 * Math.PI / 50;



	//--CHAMP DE VISION
	if (illuOptiqueFenetre3D == 'dim') {


		var dxc = d_arrierePlan * Math.tan(angleChampHorizontal * Math.PI / 360.0); //demi largeur de la scène au niveau de l'arrière plan
		var dyc = d_arrierePlan * Math.tan(angleChampVertical * Math.PI / 360.0); //demi hauteur de la scène au niveau de l'arrière plan

		//Arrière plan
		xa = dxc - (-dX);
		ya = dyc + dY;
		pa = d_arrierePlan + dP + p_f;
		xb = -1 * dxc - (-dX);
		yb = dyc + dY;
		pb = d_arrierePlan + dP + p_f;
		xc = -1 * dxc - (-dX);
		yc = -1 * dyc + dY;
		pc = d_arrierePlan + dP + p_f;
		xd = dxc - (-dX);
		yd = -1 * dyc + dY;
		pd = d_arrierePlan + dP + p_f;

		//Centre du diaph
		xo = dX;
		yo = dY;
		po = p_f + dP;

		//Sur le sol
		var k = yo / (yo - yc);
		xe = xa;
		ye = 0;
		pe = pa;
		xf = xb;
		yf = 0;
		pf = pb;
		xh = xo - k * (xc - xo);
		yh = 0;
		ph = po + k * (pc - po);
		xg = xo - k * (xe - xo);
		yg = 0;
		pg = po + k * (pe - po);

		//Capteur
		xi = 0.018 - (-dX);
		yi = 0.012 + dY;
		pi = dP - (feq_m + dfeq - f_m - df);
		xj = -0.018 - (-dX);
		yj = 0.012 + dY;
		pj = dP - (feq_m + dfeq - f_m - df);
		xk = -0.018 - (-dX);
		yk = -0.012 + dY;
		pk = dP - (feq_m + dfeq - f_m - df);
		xl = 0.018 - (-dX);
		yl = -0.012 + dY;
		pl = dP - (feq_m + dfeq - f_m - df);

		ct.strokeStyle = 'rgba(' + color_rayonLumineux + ',0.5)';

		//si une partie du champ est sur le sol
		if (pg < pf) {

			ct.beginPath();
			var coord_3D = xyp2XYmaj(xi, yi, pi);
			xt = coord_3D.X;
			yt = coord_3D.Y;
			ct.moveTo(xt, yt);
			coord_3D = xyp2XYmaj(xg, yg, pg);
			xt = coord_3D.X;
			yt = coord_3D.Y;
			ct.lineTo(xt, yt);
			coord_3D = xyp2XYmaj(xf, yf, pf);
			xt = coord_3D.X;
			yt = coord_3D.Y;
			ct.lineTo(xt, yt);
			coord_3D = xyp2XYmaj(xb, yb, pb);
			xt = coord_3D.X;
			yt = coord_3D.Y;
			ct.lineTo(xt, yt);
			coord_3D = xyp2XYmaj(xl, yl, pl);
			xt = coord_3D.X;
			yt = coord_3D.Y;
			ct.lineTo(xt, yt);
			coord_3D = xyp2XYmaj(xk, yk, pk);
			xt = coord_3D.X;
			yt = coord_3D.Y;
			ct.lineTo(xt, yt);
			coord_3D = xyp2XYmaj(xa, ya, pa);
			xt = coord_3D.X;
			yt = coord_3D.Y;
			ct.lineTo(xt, yt);
			coord_3D = xyp2XYmaj(xe, ye, pe);
			xt = coord_3D.X;
			yt = coord_3D.Y;
			ct.lineTo(xt, yt);
			coord_3D = xyp2XYmaj(xh, yh, ph);
			xt = coord_3D.X;
			yt = coord_3D.Y;
			ct.lineTo(xt, yt);
			coord_3D = xyp2XYmaj(xj, yj, pj);
			xt = coord_3D.X;
			yt = coord_3D.Y;
			ct.lineTo(xt, yt);
			ct.closePath();
			ct.stroke();

			ct.beginPath();
			coord_3D = xyp2XYmaj(xa, ya, pa);
			xt = coord_3D.X;
			yt = coord_3D.Y;
			ct.moveTo(xt, yt);
			coord_3D = xyp2XYmaj(xb, yb, pb);
			xt = coord_3D.X;
			yt = coord_3D.Y;
			ct.lineTo(xt, yt);
			ct.stroke();

			ct.beginPath();
			coord_3D = xyp2XYmaj(xe, ye, pe);
			xt = coord_3D.X;
			yt = coord_3D.Y;
			ct.moveTo(xt, yt);
			coord_3D = xyp2XYmaj(xf, yf, pf);
			xt = coord_3D.X;
			yt = coord_3D.Y;
			ct.lineTo(xt, yt);
			ct.stroke();

			ct.beginPath();
			coord_3D = xyp2XYmaj(xh, yh, ph);
			xt = coord_3D.X;
			yt = coord_3D.Y;
			ct.moveTo(xt, yt);
			coord_3D = xyp2XYmaj(xg, yg, pg);
			xt = coord_3D.X;
			yt = coord_3D.Y;
			ct.lineTo(xt, yt);
			ct.stroke();

			ct.beginPath();
			coord_3D = xyp2XYmaj(xl, yl, pl);
			xt = coord_3D.X;
			yt = coord_3D.Y;
			ct.moveTo(xt, yt);
			coord_3D = xyp2XYmaj(xi, yi, pi);
			xt = coord_3D.X;
			yt = coord_3D.Y;
			ct.lineTo(xt, yt);
			coord_3D = xyp2XYmaj(xj, yj, pj);
			xt = coord_3D.X;
			yt = coord_3D.Y;
			ct.lineTo(xt, yt);
			coord_3D = xyp2XYmaj(xk, yk, pk);
			xt = coord_3D.X;
			yt = coord_3D.Y;
			ct.lineTo(xt, yt);
			ct.closePath();
			ct.stroke();
		} else {

			//Arrière plan
			ct.beginPath();
			var coord_3D = xyp2XYmaj(xa, ya, pa);
			xt = coord_3D.X;
			yt = coord_3D.Y;
			ct.moveTo(xt, yt);
			coord_3D = xyp2XYmaj(xb, yb, pb);
			xt = coord_3D.X;
			yt = coord_3D.Y;
			ct.lineTo(xt, yt);
			coord_3D = xyp2XYmaj(xc, yc, pc);
			xt = coord_3D.X;
			yt = coord_3D.Y;
			ct.lineTo(xt, yt);
			coord_3D = xyp2XYmaj(xd, yd, pd);
			xt = coord_3D.X;
			yt = coord_3D.Y;
			ct.lineTo(xt, yt);
			ct.closePath();
			ct.stroke();

			//Capteur
			ct.beginPath();
			coord_3D = xyp2XYmaj(xi, yi, pi);
			xt = coord_3D.X;
			yt = coord_3D.Y;
			ct.moveTo(xt, yt);
			coord_3D = xyp2XYmaj(xj, yj, pj);
			xt = coord_3D.X;
			yt = coord_3D.Y;
			ct.lineTo(xt, yt);
			coord_3D = xyp2XYmaj(xk, yk, pk);
			xt = coord_3D.X;
			yt = coord_3D.Y;
			ct.lineTo(xt, yt);
			coord_3D = xyp2XYmaj(xl, yl, pl);
			xt = coord_3D.X;
			yt = coord_3D.Y;
			ct.lineTo(xt, yt);
			ct.closePath();
			ct.stroke();

			//Rayons
			ct.beginPath();
			coord_3D = xyp2XYmaj(xi, yi, pi);
			xt = coord_3D.X;
			yt = coord_3D.Y;
			ct.moveTo(xt, yt);
			coord_3D = xyp2XYmaj(xc, yc, pc);
			xt = coord_3D.X;
			yt = coord_3D.Y;
			ct.lineTo(xt, yt);
			ct.stroke();

			ct.beginPath();
			coord_3D = xyp2XYmaj(xj, yj, pj);
			xt = coord_3D.X;
			yt = coord_3D.Y;
			ct.moveTo(xt, yt);
			coord_3D = xyp2XYmaj(xd, yd, pd);
			xt = coord_3D.X;
			yt = coord_3D.Y;
			ct.lineTo(xt, yt);
			ct.stroke();

			ct.beginPath();
			coord_3D = xyp2XYmaj(xl, yl, pl);
			xt = coord_3D.X;
			yt = coord_3D.Y;
			ct.moveTo(xt, yt);
			coord_3D = xyp2XYmaj(xb, yb, pb);
			xt = coord_3D.X;
			yt = coord_3D.Y;
			ct.lineTo(xt, yt);
			ct.stroke();

			ct.beginPath();
			coord_3D = xyp2XYmaj(xk, yk, pk);
			xt = coord_3D.X;
			yt = coord_3D.Y;
			ct.moveTo(xt, yt);
			coord_3D = xyp2XYmaj(xa, ya, pa);
			xt = coord_3D.X;
			yt = coord_3D.Y;
			ct.lineTo(xt, yt);
			ct.stroke();



		}


	}

	//--FLOU AVANT
	else if (illuOptiqueFenetre3D == 'flou_avantPlan') {

		ct.fillStyle = 'rgba(' + color_avantPlan + ',0.5)';
		ct.lineWidth = 1;

		xa = 0;
		ya = 0;
		pa = d_avantPlan + dP + p_f;
		pb = p_f + dP;
		pc = dP;
		pd = dP;
		pe = p_f + dP;

		for (i = inc_angle; i <= 2 * Math.PI; i += inc_angle) {

			xb = (f_m / (2 * ouverture)) * Math.cos(i) - (-dX);
			yb = (f_m / (2 * ouverture)) * Math.sin(i) + dY;
			xc = (flouAvantPlan / 2) * Math.cos(i) + xf_cc;
			yc = (flouAvantPlan / 2) * Math.sin(i) + yf_cc;
			xd = (flouAvantPlan / 2) * Math.cos(i + inc_angle) + xf_cc;
			yd = (flouAvantPlan / 2) * Math.sin(i + inc_angle) + yf_cc;
			xe = (f_m / (2 * ouverture)) * Math.cos(i + inc_angle) - (-dX);
			ye = (f_m / (2 * ouverture)) * Math.sin(i + inc_angle) + dY;

			ct.beginPath();
			coord_3D = xyp2XYmaj(xa, ya, pa);
			xt = coord_3D.X;
			yt = coord_3D.Y;
			ct.moveTo(xt, yt);
			coord_3D = xyp2XYmaj(xb, yb, pb);
			xt = coord_3D.X;
			yt = coord_3D.Y;
			ct.lineTo(xt, yt);
			coord_3D = xyp2XYmaj(xc, yc, pc);
			xt = coord_3D.X;
			yt = coord_3D.Y;
			ct.lineTo(xt, yt);
			coord_3D = xyp2XYmaj(xd, yd, pd);
			xt = coord_3D.X;
			yt = coord_3D.Y;
			ct.lineTo(xt, yt);
			coord_3D = xyp2XYmaj(xe, ye, pe);
			xt = coord_3D.X;
			yt = coord_3D.Y;
			ct.lineTo(xt, yt);
			ct.closePath();
			ct.fill();
		}
	}
	//--FLOU ARRIERE
	else if (illuOptiqueFenetre3D == 'flou_arrierePlan') {
		//-Arrière plan
		var xf_cc = X0_cc - (-dX) * (l_capteur / 1000) / w_m_arrierePlan;
		var yf_cc = Y0_cc + dY * (h_capteur / 1000) / h_m_arrierePlan;

		ct.fillStyle = 'rgba(' + color_arrierePlan + ',0.5)';
		ct.lineWidth = 1;

		xa = 0;
		ya = 0;
		pa = d_arrierePlan + dP + p_f;
		pb = p_f + dP;
		pc = dP;
		pd = dP;
		pe = p_f + dP;

		for (i = inc_angle; i <= 2 * Math.PI; i += inc_angle) {

			xb = (f_m / (2 * ouverture)) * Math.cos(i) - (-dX);
			yb = (f_m / (2 * ouverture)) * Math.sin(i) + dY;
			xc = -1 * ((flouArrierePlan / 2) * Math.cos(i) - xf_cc);
			yc = -1 * ((flouArrierePlan / 2) * Math.sin(i) - yf_cc);
			xd = -1 * ((flouArrierePlan / 2) * Math.cos(i + inc_angle) - xf_cc);
			yd = -1 * ((flouArrierePlan / 2) * Math.sin(i + inc_angle) - yf_cc);
			xe = (f_m / (2 * ouverture)) * Math.cos(i + inc_angle) - (-dX);
			ye = (f_m / (2 * ouverture)) * Math.sin(i + inc_angle) + dY;

			ct.beginPath();
			coord_3D = xyp2XYmaj(xa, ya, pa);
			xt = coord_3D.X;
			yt = coord_3D.Y;
			ct.moveTo(xt, yt);
			coord_3D = xyp2XYmaj(xb, yb, pb);
			xt = coord_3D.X;
			yt = coord_3D.Y;
			ct.lineTo(xt, yt);
			coord_3D = xyp2XYmaj(xc, yc, pc);
			xt = coord_3D.X;
			yt = coord_3D.Y;
			ct.lineTo(xt, yt);
			coord_3D = xyp2XYmaj(xd, yd, pd);
			xt = coord_3D.X;
			yt = coord_3D.Y;
			ct.lineTo(xt, yt);
			coord_3D = xyp2XYmaj(xe, ye, pe);
			xt = coord_3D.X;
			yt = coord_3D.Y;
			ct.lineTo(xt, yt);
			ct.closePath();
			ct.fill();
		}

	}
	//--VISEE REFLEX
	else if (illuOptiqueFenetre3D == 'visee_reflex') {

		ct.beginPath();
		ct.strokeStyle = 'rgba(' + color_rayonLumineux + ',0.5)';
		ct.fillStyle = 'rgba(' + color_rayonLumineux + ',0.5)';
		ct.lineWidth = 1;

		drawLine3D(0, 0, d_map + dP + p_f, mod_miroir.CDG[0], mod_miroir.CDG[1], mod_miroir.CDG[2]);
		drawLine3D(mod_miroir.CDG[0], mod_miroir.CDG[1], mod_miroir.CDG[2], mod_miroir_haut.CDG[0], mod_miroir_haut.CDG[1], mod_miroir_haut.CDG[2]);
		drawLine3D(mod_miroir_haut.CDG[0], mod_miroir_haut.CDG[1], mod_miroir_haut.CDG[2], mod_miroir_bas.CDG[0], mod_miroir_bas.CDG[1], mod_miroir_bas.CDG[2]);
		drawLine3D(mod_miroir_bas.CDG[0], mod_miroir_bas.CDG[1], mod_miroir_bas.CDG[2], -(-dX), dY + y_foyer_corps + h_finVisee - (h_finVisee - h_debutVisee) / 2, dP - p_foyer_corps);


	}


}

function drawImg2Dto3D(img, X0, Y0, X1, Y1, X2, Y2) {

	var cvs = document.getElementById('id_cvs_Fenetre3D');
	var ct = cvs.getContext('2d');

	X1 -= X0;
	Y1 -= Y0;
	X2 -= X0;
	Y2 -= Y0;

	var U0 = 0;
	var V0 = 0;
	var U1 = img.width - 1;
	var V1 = 0;
	var U2 = 0;
	var V2 = img.height - 1;

	var det = 1 / (U1 * V2 - U2 * V1);

	var A = (V2 * X1 - V1 * X2) * det;
	var B = (V2 * Y1 - V1 * Y2) * det;
	var C = (U1 * X2 - U2 * X1) * det;
	var D = (U1 * Y2 - U2 * Y1) * det;
	var E = X0 - A * U0 - C * V0;
	var F = Y0 - B * U0 - D * V0;

	ct.save();
	ct.transform(A, B, C, D, E, F);
	ct.drawImage(img, 0, 0, img.width, img.height);
	ct.restore();
}

function drawDiaphragme() {


	var cvs_photographe = document.getElementById('id_cvs_Fenetre3D');
	var ct_photographe = cvs_photographe.getContext('2d');

	var Xpho = -1 * (-dX);
	var Ypho = dY;
	var Ppho = dP;

	var f_m = focale / 1000;
	var feq_m = focaleEquivalente / 1000;
	var df = (f_m * f_m) / (d_map - f_m);
	var dfeq = (feq_m * feq_m) / (d_map - feq_m);
	var p_f = df + f_m;

	var inc_angle = 2 * Math.PI / 50;


	//-Disque plein
	ct_photographe.beginPath();
	xa = (f_m / ouvertureMin) / 2 - (-dX);
	ya = 0 + dY;
	pa = p_f + dP;
	coord_3D = xyp2XYmaj(xa, ya, pa);
	xt = coord_3D.X;
	yt = coord_3D.Y;
	ct_photographe.moveTo(xt, yt);
	for (i = inc_angle; i <= 2 * Math.PI; i += inc_angle) {
		xa = ((f_m / ouvertureMin) / 2) * Math.cos(i) - (-dX);
		ya = ((f_m / ouvertureMin) / 2) * Math.sin(i) + dY;
		pa = p_f + dP;
		coord_3D = xyp2XYmaj(xa, ya, pa);
		xt = coord_3D.X;
		yt = coord_3D.Y;
		ct_photographe.lineTo(xt, yt);
	}

	var lum_max = 20;
	var temp_lum = Math.round(lum_devant * lum_max);
	ct_photographe.fillStyle = 'rgba(' + temp_lum + ',' + temp_lum + ',' + temp_lum + ',0.66)';
	ct_photographe.fill();



	//-Trou
	ct_photographe.beginPath();
	xa = f_m / (2 * ouverture) - (-dX);
	ya = 0 + dY;
	pa = p_f + dP;
	coord_3D = xyp2XYmaj(xa, ya, pa);
	xt = coord_3D.X;
	yt = coord_3D.Y;
	ct_photographe.moveTo(xt, yt);
	for (i = inc_angle; i <= 2 * Math.PI; i += inc_angle) {
		xa = (f_m / (2 * ouverture)) * Math.cos(i) - (-dX);
		ya = (f_m / (2 * ouverture)) * Math.sin(i) + dY;
		pa = p_f + dP;
		coord_3D = xyp2XYmaj(xa, ya, pa);
		xt = coord_3D.X;
		yt = coord_3D.Y;
		ct_photographe.lineTo(xt, yt);
	}
	ct_photographe.fillStyle = 'rgba(255,255,255,0.5)';
	ct_photographe.fill();

	//-Lamelles
	var theta0 = 0; //angle entre le centre et le point sur le grand cercle
	var NbrLamelles = 6;
	var delta_angle = 2 * Math.PI / NbrLamelles;
	var i = 0;

	//Le centre du daphragme est en (0,0)
	//point sur le grand cercle
	var xa = 1.0;
	var ya = 1.0;
	//point sur le petit cercle
	var xb = 1.0;
	var yb = 1.0;
	//point entre A et B
	var XM = 1.0;
	var XM = 1.0;
	//centre du nouveau cercle
	var xc = 1.0;
	var yc = 1.0;

	var AB = 1.0; //distance entre A et B
	var MC = 1.0; //distance entre M et C

	//angle entre l'axe des abscices et le premier point puis entre le second point
	var omega0 = 1.0;
	var omega1 = 1.0
	var omega2 = 1.0;

	var R = (f_m / ouvertureMin) / 2;
	var r = f_m / (2 * ouverture);

	for (i = 0; i !== NbrLamelles; i++) {

		xa = R * Math.cos(theta0 + i * delta_angle) - (-dX);
		ya = R * Math.sin(theta0 + i * delta_angle) + dY;

		xb = r * Math.cos(theta0 + (i + 1) * delta_angle) - (-dX);
		yb = r * Math.sin(theta0 + (i + 1) * delta_angle) + dY;

		XM = (xa + xb) / 2;
		YM = (ya + yb) / 2;

		AB = Math.sqrt((xa - xb) * (xa - xb) + (ya - yb) * (ya - yb));

		MC = Math.sqrt(R * R - (AB / 2) * (AB / 2));

		if (xa >= xb)
			omega0 = Math.atan((ya - yb) / (xa - xb)) - Math.PI / 2;
		else
			omega0 = Math.PI + Math.atan((ya - yb) / (xa - xb)) - Math.PI / 2;

		xc = XM + MC * Math.cos(omega0);
		yc = YM + MC * Math.sin(omega0);

		if (yc <= ya)
			omega1 = Math.acos((xa - xc) / R);
		else
			omega1 = 2 * Math.PI - Math.acos((xa - xc) / R);

		if (yc <= yb)
			omega2 = Math.acos((xb - xc) / R);
		else
			omega2 = 2 * Math.PI - Math.acos((xb - xc) / R);

		ct_photographe.beginPath();

		ct_photographe.lineWidth = 2;
		ct_photographe.strokeStyle = 'rgba(255,255,255,0.5)';


		var angle_d = omega1;
		var angle_f = omega2;
		var d_angle = (angle_f - angle_d) / 10;

		if (angle_f < angle_d) {
			angle_d = angle_d - 2 * Math.PI;
			d_angle = (angle_f + angle_d) / 10;
		}

		if (d_angle <= 0)
			d_angle = Math.PI / 200;

		xa = xc + R * Math.cos(angle_d);
		ya = yc + R * Math.sin(angle_d);
		pa = p_f + dP;


		coord_3D = xyp2XYmaj(xa, ya, pa);
		xt = coord_3D.X;
		yt = coord_3D.Y;

		ct_photographe.beginPath();
		ct_photographe.lineWidth = 1;
		ct_photographe.strokeStyle = '#ffffff';
		ct_photographe.moveTo(xt, yt);

		var ii = d_angle;
		for (ii = angle_d + ii; ii <= angle_f; ii += d_angle) {
			xa = xc + R * Math.cos(ii);
			ya = yc + R * Math.sin(ii);
			coord_3D = xyp2XYmaj(xa, ya, pa);
			xt = coord_3D.X;
			yt = coord_3D.Y;
			ct_photographe.lineTo(xt, yt);
		}

		ct_photographe.stroke();
	}



}

function drawSol() {
<<<<<<< HEAD
	//TBD: largeur du sol = max(largeur max illus, cahmp de vision à l'arrière)
	//TBD: grille jusqu'à #1m derrière le photographe
=======
>>>>>>> ménage, tuning et fix

	//--SOL
	ct_3D.fillStyle = color_sol;
	ct_3D.beginPath();

<<<<<<< HEAD
	coord_3D = xyp2XYmaj(-grand, 0, -grand);
	xt = coord_3D.X;
	yt = coord_3D.Y;
	ct_3D.moveTo(xt, yt);
	coord_3D = xyp2XYmaj(grand, 0, -grand);
	xt = coord_3D.X;
	yt = coord_3D.Y;
	ct_3D.lineTo(xt, yt);
	coord_3D = xyp2XYmaj(grand, 0, grand);
	xt = coord_3D.X;
	yt = coord_3D.Y;
	ct_3D.lineTo(xt, yt);
	coord_3D = xyp2XYmaj(-grand, 0, grand);
=======
	coord_3D = xyp2XYmaj(-grand + dX, 0, -grand + dP);
	xt = coord_3D.X;
	yt = coord_3D.Y;
	ct_3D.moveTo(xt, yt);
	coord_3D = xyp2XYmaj(grand + dX, 0, -grand + dP);
	xt = coord_3D.X;
	yt = coord_3D.Y;
	ct_3D.lineTo(xt, yt);
	coord_3D = xyp2XYmaj(grand + dX, 0, grand + dP);
	xt = coord_3D.X;
	yt = coord_3D.Y;
	ct_3D.lineTo(xt, yt);
	coord_3D = xyp2XYmaj(-grand + dX, 0, grand + dP);
>>>>>>> ménage, tuning et fix
	xt = coord_3D.X;
	yt = coord_3D.Y;
	ct_3D.lineTo(xt, yt);

	ct_3D.closePath();
	ct_3D.fill();



	//--GRILLE DE PERSPECTIVE
<<<<<<< HEAD

=======
	//TBD: la grille ne doit pas dépasser du sol en cas de déplacement
>>>>>>> ménage, tuning et fix
	if (haut) {
		ct_3D.strokeStyle = color_grillePerspective;
		//Traits // x
		for (i = 0; i < grand + dP; i += ecartLignesSol) {
<<<<<<< HEAD
			drawLine3D(-0.5 * grand - (-dX), 0, i, 0.5 * grand - (-dX), 0, i);
			drawLine3D(-0.5 * grand - (-dX), 0, -1 * i, 0.5 * grand - (-dX), 0, -1 * i);
		}
		//Traits //p
		for (i = 0; i < 0.5 * grand - (-dX); i += ecartLignesSol) {
=======
			drawLine3D(-grand - (-dX), 0, i, grand - (-dX), 0, i);
			drawLine3D(-grand - (-dX), 0, -1 * i, grand - (-dX), 0, -1 * i);
		}
		//Traits //p
		for (i = 0; i < grand - (-dX); i += ecartLignesSol) {
>>>>>>> ménage, tuning et fix
			drawLine3D(i, 0, -1 * (grand + dP), i, 0, grand + dP);
			drawLine3D(-1 * i, 0, -1 * (grand + dP), -1 * i, 0, grand + dP);
		}
	}

<<<<<<< HEAD


=======
>>>>>>> ménage, tuning et fix
}

function drawZonePDC() {

	var cvs_photographe = document.getElementById('id_cvs_Fenetre3D');
	var ct_photographe = cvs_photographe.getContext('2d');

	var f_m = focale / 1000;
	var feq_m = focaleEquivalente / 1000;
	var df = (f_m * f_m) / (d_map - f_m);
	var dfeq = (feq_m * feq_m) / (d_map - feq_m);
	var p_f = df + f_m;

	//--pdC
	ct_photographe.strokeStyle = 'rgba(' + color_rayonLumineux + ',0.5)';
	ct_photographe.fillStyle = 'rgba(' + color_rayonLumineux + ',0.5)';

	var xt = 1.0;
	var yt = 1.0;



	var finPDC_t = finPDC;

	if (finPDC_t > 999999)
		finPDC_t = 999999;

<<<<<<< HEAD
	ct_photographe.beginPath();
	if (0) {
		coord_3D = xyp2XYmaj(-0.5 * w_m_arrierePlan - (-dX), 0, debutPDC + dP + p_f);
		xt = coord_3D.X;
		yt = coord_3D.Y;
		ct_photographe.moveTo(xt, yt);
		coord_3D = xyp2XYmaj(-0.5 * w_m_arrierePlan - (-dX), 0, finPDC_t + dP + p_f);
		xt = coord_3D.X;
		yt = coord_3D.Y;
		ct_photographe.lineTo(xt, yt);
		coord_3D = xyp2XYmaj(0.5 * w_m_arrierePlan - (-dX), 0, finPDC_t + dP + p_f);
		xt = coord_3D.X;
		yt = coord_3D.Y;
		ct_photographe.lineTo(xt, yt);
		coord_3D = xyp2XYmaj(0.5 * w_m_arrierePlan - (-dX), 0, debutPDC + dP + p_f);
		xt = coord_3D.X;
		yt = coord_3D.Y;
		ct_photographe.lineTo(xt, yt);
	} else {
		coord_3D = xyp2XYmaj(-0.5 * grand - (-dX), 0, debutPDC + dP + p_f);
		xt = coord_3D.X;
		yt = coord_3D.Y;
		ct_photographe.moveTo(xt, yt);
		coord_3D = xyp2XYmaj(-0.5 * grand - (-dX), 0, finPDC_t + dP + p_f);
		xt = coord_3D.X;
		yt = coord_3D.Y;
		ct_photographe.lineTo(xt, yt);
		coord_3D = xyp2XYmaj(0.5 * grand - (-dX), 0, finPDC_t + dP + p_f);
		xt = coord_3D.X;
		yt = coord_3D.Y;
		ct_photographe.lineTo(xt, yt);
		coord_3D = xyp2XYmaj(0.5 * grand - (-dX), 0, debutPDC + dP + p_f);
		xt = coord_3D.X;
		yt = coord_3D.Y;
		ct_photographe.lineTo(xt, yt);
	}
=======
	if (finPDC_t > grand)
		finPDC_t = grand;


	ct_photographe.beginPath();

	coord_3D = xyp2XYmaj(-grand + dX, 0, debutPDC + dP + p_f);
	xt = coord_3D.X;
	yt = coord_3D.Y;
	ct_photographe.moveTo(xt, yt);
	coord_3D = xyp2XYmaj(-grand + dX, 0, finPDC_t + dP + p_f);
	xt = coord_3D.X;
	yt = coord_3D.Y;
	ct_photographe.lineTo(xt, yt);
	coord_3D = xyp2XYmaj(grand + dX, 0, finPDC_t + dP + p_f);
	xt = coord_3D.X;
	yt = coord_3D.Y;
	ct_photographe.lineTo(xt, yt);
	coord_3D = xyp2XYmaj(grand + dX, 0, debutPDC + dP + p_f);
	xt = coord_3D.X;
	yt = coord_3D.Y;
	ct_photographe.lineTo(xt, yt);

>>>>>>> ménage, tuning et fix
	ct_photographe.closePath();

	ct_photographe.stroke();
	ct_photographe.fill();
}

function majVecteursLuminosite() {

	var normalise = lum_x * lum_x + lum_y * lum_y + lum_p * lum_p;
	if (normalise !== 0) {
		normalise = 1 / normalise;
		normalise = Math.sqrt(normalise);
		lum_x = lum_x * normalise;
		lum_y = lum_y * normalise;
		lum_p = lum_p * normalise;
	}



	//Devant
	v_x = 0;
	v_y = 0;
	v_p = 1;
	coord = majCoord3D(v_x, v_y, v_p);
	v_x = coord.x;
	v_y = coord.y;
	v_p = coord.p;
	normalise = v_x * v_x + v_y * v_y + v_p * v_p;
	if (normalise !== 0) {
		normalise = 1 / normalise;
		normalise = Math.sqrt(normalise);
		v_x = v_x * normalise;
		v_y = v_y * normalise;
		v_p = v_p * normalise;
		lum_devant = v_x * lum_x + v_y * lum_y + v_p * lum_p;
	} else
		lum_devant = 0;

	//Derriere
	v_x = 0;
	v_y = 0;
	v_p = -1;
	coord = majCoord3D(v_x, v_y, v_p);
	v_x = coord.x;
	v_y = coord.y;
	v_p = coord.p;
	normalise = v_x * v_x + v_y * v_y + v_p * v_p;
	if (normalise !== 0) {
		normalise = 1 / normalise;
		normalise = Math.sqrt(normalise);
		v_x = v_x * normalise;
		v_y = v_y * normalise;
		v_p = v_p * normalise;
		lum_derriere = v_x * lum_x + v_y * lum_y + v_p * lum_p;
	} else
		lum_derriere = 0;
}