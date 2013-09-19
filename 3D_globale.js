grand=999;	//TEMP pour limiter le tracéd du sol en 3D

//OBJECTIF
//Incrément angulaire entre 2 faces
delta_angle_objectif=Math.PI/20;
N_objectif=2*Math.PI/delta_angle_objectif;

PolynomesObjectifTT=new Array(9);

for(var izis=0;izis!=9;izis++)
PolynomesObjectifTT[izis]=new Array(N_objectif);

PolynomesObjectif=new Array(N_objectif);

//MOLETTE
N_molette=36;	//doit être un multiple de 4
PolygomesMolette=new Array(2+4*N_molette);


//-Definition d'un object Polygone
function Polygone(nom,Fond_max,Fond_min,Contour,Pts,Pts_rot,cdg,p_cdg,normale,normale_p,init_pts,rot_pts,draw,Raff){
this.nom=nom;
this.Fond_max=Fond_max;
this.Fond_min=Fond_min;
this.Contour=Contour;
this.Pts=Pts;
this.Pts_rot=Pts_rot;
this.cdg=cdg;
this.p_cdg=p_cdg;
this.normale=normale;
this.normale_p=normale_p;
this.init_pts=init_pts;
this.rot_pts=rot_pts;
this.draw=draw;
this.Contour=Contour;
this.Raff=Raff;				//Rayon d'affichage: pour être affiché un polygone doit avoir le vecteur OM=(R/Ocdg)*Ocdg dans la zone affichable
}


//--DEFINITION DES DIFFERENTS GROUPES DE POLYGONES
function InitPts(){}

//-Capteur courant
var mod_capteurCourant={
	nom: 		"capteurCourant",						//Nom sous forme de chaine de charactères
	Fond_max:	[255,153,0,1],							//rgba de la couleur de fond (non utilisée si oppacité=0) en luminosité maximale
	Fond_min:	[0,0,0],								//rgb de la couleur de fond (non utilisée si oppacité=0) en luminosité minimale
	Contour:	[0,0,0,0],								//rgba de la couleur de contour (non utilisée si oppacité=0)
	Pts: 		[[0,0,0],[0,0,0],[0,0,0],[0,0,0]],		//Liste des sommets en 3D sans rotation
	Pts_rot: 	[[0,0],[0,0],[0,0],[0,0]],				//Liste des sommets en 2D après rotation
	cdg:		[0,0,0],								//Coordonées du centre de gravité en 3D avant rotation
	p_cdg:		0,										//Profondeur du cdg après rotation
	normale:	[0,0,0],								//Vecteur normal à la surface en 3D sans rotation
	normale_p:	[0,0,0],								//Vecteur normal à la surface en 3D après rotation
	init_pts: 	InitPts,								//Initialise les points en 3D
	rot_pts:	RotPts,									//Initialise les points en 2D (rotation des sommets et du cdg)
	draw:		DrawPolynome,
	Raff:		0
}

//-Capteur FF
var mod_capteurFF=new Polygone("capteurFF",[16,150,24,1],[0,0,0],[0,0,0,0],[[0,0,0],[0,0,0],[0,0,0],[0,0,0]],[[0,0],[0,0],[0,0],[0,0]],[0,0,0],0,[0,0,0],[0,0,0],InitPts,RotPts,DrawPolynome,0);

//-Visée reflex
var mod_miroir=new Polygone("miroir",[51,102,124,0.5],[5,10,12],[0,0,0,0],[[0,0,0],[0,0,0],[0,0,0],[0,0,0]],[[0,0],[0,0],[0,0],[0,0]],[0,0,0],0,[0,0,0],[0,0,0],InitPts,RotPts,DrawPolynome,0);
var mod_miroir_h=new Polygone("miroirH",[51,102,124,0.5],[5,10,12],[0,0,0,0],[[0,0,0],[0,0,0],[0,0,0],[0,0,0]],[[0,0],[0,0],[0,0],[0,0]],[0,0,0],0,[0,0,0],[0,0,0],InitPts,RotPts,DrawPolynome,0);
var mod_miroir_b=new Polygone("miroirB",[51,102,124,0.5],[5,10,12],[0,0,0,0],[[0,0,0],[0,0,0],[0,0,0],[0,0,0]],[[0,0],[0,0],[0,0],[0,0]],[0,0,0],0,[0,0,0],[0,0,0],InitPts,RotPts,DrawPolynome,0);

//-Boitier
var mod_Boitier_a={
	nom: 		"Boitier_a",							//Nom sous forme de chaine de charactères
	Fond_max:	[220,220,200,0.29],						//rgba de la couleur de fond (non utilisée si oppacité=0) en luminosité maximale
	Fond_min:	[50,50,50],								//rgb de la couleur de fond (non utilisée si oppacité=0) en luminosité minimale
	Contour:	[0,0,0,0.5],							//rgba de la couleur de contour (non utilisée si oppacité=0)
	Pts: 		[[0,0,0],[0,0,0],[0,0,0],[0,0,0]],		//Liste des sommets en 3D sans rotation
	Pts_rot: 	[[0,0],[0,0],[0,0],[0,0]],				//Liste des sommets en 2D après rotation
	cdg:		[0,0,0],								//Coordonées du centre de gravité en 3D avant rotation
	p_cdg:		0,										//Profondeur du cdg après rotation
	normale:	[0,0,0],								//Vecteur normal à la surface en 3D sans rotation
	normale_p:	[0,0,0],								//Vecteur normal à la surface en 3D après rotation
	init_pts: 	InitPts,								//Initialise les points en 3D
	rot_pts:	RotPts,									//Initialise les points en 2D (rotation des sommets et du cdg)
	draw:		DrawPolynome,
	Raff:		0
}
var mod_Boitier_b={
	nom: 		"Boitier_b",							//Nom sous forme de chaine de charactères
	Fond_max:	[220,220,200,0.29],						//rgba de la couleur de fond (non utilisée si oppacité=0) en luminosité maximale
	Fond_min:	[50,50,50],								//rgb de la couleur de fond (non utilisée si oppacité=0) en luminosité minimale
	Contour:	[0,0,0,0.5],							//rgba de la couleur de contour (non utilisée si oppacité=0)
	Pts: 		[[0,0,0],[0,0,0],[0,0,0],[0,0,0]],		//Liste des sommets en 3D sans rotation
	Pts_rot: 	[[0,0],[0,0],[0,0],[0,0]],				//Liste des sommets en 2D après rotation
	cdg:		[0,0,0],								//Coordonées du centre de gravité en 3D avant rotation
	p_cdg:		0,										//Profondeur du cdg après rotation
	normale:	[0,0,0],								//Vecteur normal à la surface en 3D sans rotation
	normale_p:	[0,0,0],								//Vecteur normal à la surface en 3D après rotation
	init_pts: 	InitPts,								//Initialise les points en 3D
	rot_pts:	RotPts,									//Initialise les points en 2D (rotation des sommets et du cdg)
	draw:		DrawPolynome,
	Raff:		0
}
var mod_Boitier_c={
	nom: 		"Boitier_c",							//Nom sous forme de chaine de charactères
	Fond_max:	[220,220,200,0.29],						//rgba de la couleur de fond (non utilisée si oppacité=0) en luminosité maximale
	Fond_min:	[50,50,50],								//rgb de la couleur de fond (non utilisée si oppacité=0) en luminosité minimale
	Contour:	[0,0,0,0.5],							//rgba de la couleur de contour (non utilisée si oppacité=0)
	Pts: 		[[0,0,0],[0,0,0],[0,0,0],[0,0,0]],		//Liste des sommets en 3D sans rotation
	Pts_rot: 	[[0,0],[0,0],[0,0],[0,0]],				//Liste des sommets en 2D après rotation
	cdg:		[0,0,0],								//Coordonées du centre de gravité en 3D avant rotation
	p_cdg:		0,										//Profondeur du cdg après rotation
	normale:	[0,0,0],								//Vecteur normal à la surface en 3D sans rotation
	normale_p:	[0,0,0],								//Vecteur normal à la surface en 3D après rotation
	init_pts: 	InitPts,								//Initialise les points en 3D
	rot_pts:	RotPts,									//Initialise les points en 2D (rotation des sommets et du cdg)
	draw:		DrawPolynome,
	Raff:		0
}
var mod_Boitier_d={
	nom: 		"Boitier_d",							//Nom sous forme de chaine de charactères
	Fond_max:	[220,220,200,0.29],						//rgba de la couleur de fond (non utilisée si oppacité=0) en luminosité maximale
	Fond_min:	[50,50,50],								//rgb de la couleur de fond (non utilisée si oppacité=0) en luminosité minimale
	Contour:	[0,0,0,0.5],							//rgba de la couleur de contour (non utilisée si oppacité=0)
	Pts: 		[[0,0,0],[0,0,0],[0,0,0],[0,0,0]],		//Liste des sommets en 3D sans rotation
	Pts_rot: 	[[0,0],[0,0],[0,0],[0,0]],				//Liste des sommets en 2D après rotation
	cdg:		[0,0,0],								//Coordonées du centre de gravité en 3D avant rotation
	p_cdg:		0,										//Profondeur du cdg après rotation
	normale:	[0,0,0],								//Vecteur normal à la surface en 3D sans rotation
	normale_p:	[0,0,0],								//Vecteur normal à la surface en 3D après rotation
	init_pts: 	InitPts,								//Initialise les points en 3D
	rot_pts:	RotPts,									//Initialise les points en 2D (rotation des sommets et du cdg)
	draw:		DrawPolynome,
	Raff:		0
}
var mod_Boitier_e={
	nom: 		"Boitier_e",							//Nom sous forme de chaine de charactères
	Fond_max:	[220,220,200,0.29],						//rgba de la couleur de fond (non utilisée si oppacité=0) en luminosité maximale
	Fond_min:	[50,50,50],								//rgb de la couleur de fond (non utilisée si oppacité=0) en luminosité minimale
	Contour:	[0,0,0,0.5],							//rgba de la couleur de contour (non utilisée si oppacité=0)
	Pts: 		[[0,0,0],[0,0,0],[0,0,0],[0,0,0]],		//Liste des sommets en 3D sans rotation
	Pts_rot: 	[[0,0],[0,0],[0,0],[0,0]],				//Liste des sommets en 2D après rotation
	cdg:		[0,0,0],								//Coordonées du centre de gravité en 3D avant rotation
	p_cdg:		0,										//Profondeur du cdg après rotation
	normale:	[0,0,0],								//Vecteur normal à la surface en 3D sans rotation
	normale_p:	[0,0,0],								//Vecteur normal à la surface en 3D après rotation
	init_pts: 	InitPts,								//Initialise les points en 3D
	rot_pts:	RotPts,									//Initialise les points en 2D (rotation des sommets et du cdg)
	draw:		DrawPolynome,
	Raff:		0
}
var mod_Boitier_f={
	nom: 		"Boitier_f",										//Nom sous forme de chaine de charactères
	Fond_max:	[220,220,200,0.29],									//rgba de la couleur de fond (non utilisée si oppacité=0) en luminosité maximale
	Fond_min:	[50,50,50],											//rgb de la couleur de fond (non utilisée si oppacité=0) en luminosité minimale
	Contour:	[0,0,0,0.5],										//rgba de la couleur de contour (non utilisée si oppacité=0)
	Pts: 		[[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]],	//Liste des sommets en 3D sans rotation
	Pts_rot: 	[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],							//Liste des sommets en 2D après rotation
	cdg:		[0,0,0],											//Coordonées du centre de gravité en 3D avant rotation
	p_cdg:		0,													//Profondeur du cdg après rotation
	normale:	[0,0,0],											//Vecteur normal à la surface en 3D sans rotation
	normale_p:	[0,0,0],											//Vecteur normal à la surface en 3D après rotation
	init_pts: 	InitPts,											//Initialise les points en 3D
	rot_pts:	RotPts,												//Initialise les points en 2D (rotation des sommets et du cdg)
	draw:		DrawPolynome,
	Raff:		0
}
var mod_Boitier_g={
	nom: 		"Boitier_g",							//Nom sous forme de chaine de charactères
	Fond_max:	[220,220,200,0.29],						//rgba de la couleur de fond (non utilisée si oppacité=0) en luminosité maximale
	Fond_min:	[50,50,50],								//rgb de la couleur de fond (non utilisée si oppacité=0) en luminosité minimale
	Contour:	[0,0,0,0.5],							//rgba de la couleur de contour (non utilisée si oppacité=0)
	Pts: 		[[0,0,0],[0,0,0],[0,0,0],[0,0,0]],		//Liste des sommets en 3D sans rotation
	Pts_rot: 	[[0,0],[0,0],[0,0],[0,0]],				//Liste des sommets en 2D après rotation
	cdg:		[0,0,0],								//Coordonées du centre de gravité en 3D avant rotation
	p_cdg:		0,										//Profondeur du cdg après rotation
	normale:	[0,0,0],								//Vecteur normal à la surface en 3D sans rotation
	normale_p:	[0,0,0],								//Vecteur normal à la surface en 3D après rotation
	init_pts: 	InitPts,								//Initialise les points en 3D
	rot_pts:	RotPts,									//Initialise les points en 2D (rotation des sommets et du cdg)
	draw:		DrawPolynome,
	Raff:		0
}
var mod_Boitier_h={
	nom: 		"Boitier_h",							//Nom sous forme de chaine de charactères
	Fond_max:	[220,220,200,0.29],						//rgba de la couleur de fond (non utilisée si oppacité=0) en luminosité maximale
	Fond_min:	[50,50,50],								//rgb de la couleur de fond (non utilisée si oppacité=0) en luminosité minimale
	Contour:	[0,0,0,0.5],							//rgba de la couleur de contour (non utilisée si oppacité=0)
	Pts: 		[[0,0,0],[0,0,0],[0,0,0],[0,0,0]],		//Liste des sommets en 3D sans rotation
	Pts_rot: 	[[0,0],[0,0],[0,0],[0,0]],				//Liste des sommets en 2D après rotation
	cdg:		[0,0,0],								//Coordonées du centre de gravité en 3D avant rotation
	p_cdg:		0,										//Profondeur du cdg après rotation
	normale:	[0,0,0],								//Vecteur normal à la surface en 3D sans rotation
	normale_p:	[0,0,0],								//Vecteur normal à la surface en 3D après rotation
	init_pts: 	InitPts,								//Initialise les points en 3D
	rot_pts:	RotPts,									//Initialise les points en 2D (rotation des sommets et du cdg)
	draw:		DrawPolynome,
	Raff:		0
}
var mod_Boitier_i={
	nom: 		"Boitier_i",							//Nom sous forme de chaine de charactères
	Fond_max:	[220,220,200,0.29],						//rgba de la couleur de fond (non utilisée si oppacité=0) en luminosité maximale
	Fond_min:	[50,50,50],								//rgb de la couleur de fond (non utilisée si oppacité=0) en luminosité minimale
	Contour:	[0,0,0,0.5],							//rgba de la couleur de contour (non utilisée si oppacité=0)
	Pts: 		[[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]],		//Liste des sommets en 3D sans rotation
	Pts_rot: 	[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],				//Liste des sommets en 2D après rotation
	cdg:		[0,0,0],								//Coordonées du centre de gravité en 3D avant rotation
	p_cdg:		0,										//Profondeur du cdg après rotation
	normale:	[0,0,0],								//Vecteur normal à la surface en 3D sans rotation
	normale_p:	[0,0,0],								//Vecteur normal à la surface en 3D après rotation
	init_pts: 	InitPts,								//Initialise les points en 3D
	rot_pts:	RotPts,									//Initialise les points en 2D (rotation des sommets et du cdg)
	draw:		DrawPolynome,
	Raff:		0
}
var mod_Boitier_ii={
	nom: 		"Boitier_ii",							//Nom sous forme de chaine de charactères
	Fond_max:	[220,220,200,0.29],						//rgba de la couleur de fond (non utilisée si oppacité=0) en luminosité maximale
	Fond_min:	[50,50,50],								//rgb de la couleur de fond (non utilisée si oppacité=0) en luminosité minimale
	Contour:	[0,0,0,0.5],							//rgba de la couleur de contour (non utilisée si oppacité=0)
	Pts: 		[[0,0,0],[0,0,0],[0,0,0],[0,0,0]],		//Liste des sommets en 3D sans rotation
	Pts_rot: 	[[0,0],[0,0],[0,0],[0,0]],				//Liste des sommets en 2D après rotation
	cdg:		[0,0,0],								//Coordonées du centre de gravité en 3D avant rotation
	p_cdg:		0,										//Profondeur du cdg après rotation
	normale:	[0,0,0],								//Vecteur normal à la surface en 3D sans rotation
	normale_p:	[0,0,0],								//Vecteur normal à la surface en 3D après rotation
	init_pts: 	InitPts,								//Initialise les points en 3D
	rot_pts:	RotPts,									//Initialise les points en 2D (rotation des sommets et du cdg)
	draw:		DrawPolynome,
	Raff:		0
}
var mod_Boitier_j={
	nom: 		"Boitier_j",							//Nom sous forme de chaine de charactères
	Fond_max:	[220,220,200,0.29],						//rgba de la couleur de fond (non utilisée si oppacité=0) en luminosité maximale
	Fond_min:	[50,50,50],								//rgb de la couleur de fond (non utilisée si oppacité=0) en luminosité minimale
	Contour:	[0,0,0,0.5],							//rgba de la couleur de contour (non utilisée si oppacité=0)
	Pts: 		[[0,0,0],[0,0,0],[0,0,0],[0,0,0]],		//Liste des sommets en 3D sans rotation
	Pts_rot: 	[[0,0],[0,0],[0,0],[0,0]],				//Liste des sommets en 2D après rotation
	cdg:		[0,0,0],								//Coordonées du centre de gravité en 3D avant rotation
	p_cdg:		0,										//Profondeur du cdg après rotation
	normale:	[0,0,0],								//Vecteur normal à la surface en 3D sans rotation
	normale_p:	[0,0,0],								//Vecteur normal à la surface en 3D après rotation
	init_pts: 	InitPts,								//Initialise les points en 3D
	rot_pts:	RotPts,									//Initialise les points en 2D (rotation des sommets et du cdg)
	draw:		DrawPolynome,
	Raff:		0
}
var mod_Boitier_k={
	nom: 		"Boitier_k",							//Nom sous forme de chaine de charactères
	Fond_max:	[220,220,200,0.29],						//rgba de la couleur de fond (non utilisée si oppacité=0) en luminosité maximale
	Fond_min:	[50,50,50],								//rgb de la couleur de fond (non utilisée si oppacité=0) en luminosité minimale
	Contour:	[0,0,0,0.5],							//rgba de la couleur de contour (non utilisée si oppacité=0)
	Pts: 		[[0,0,0],[0,0,0],[0,0,0],[0,0,0]],		//Liste des sommets en 3D sans rotation
	Pts_rot: 	[[0,0],[0,0],[0,0],[0,0]],				//Liste des sommets en 2D après rotation
	cdg:		[0,0,0],								//Coordonées du centre de gravité en 3D avant rotation
	p_cdg:		0,										//Profondeur du cdg après rotation
	normale:	[0,0,0],								//Vecteur normal à la surface en 3D sans rotation
	normale_p:	[0,0,0],								//Vecteur normal à la surface en 3D après rotation
	init_pts: 	InitPts,								//Initialise les points en 3D
	rot_pts:	RotPts,									//Initialise les points en 2D (rotation des sommets et du cdg)
	draw:		DrawPolynome,
	Raff:		0
}
var mod_Boitier_l={
	nom: 		"Boitier_l",							//Nom sous forme de chaine de charactères
	Fond_max:	[220,220,200,0.29],						//rgba de la couleur de fond (non utilisée si oppacité=0) en luminosité maximale
	Fond_min:	[50,50,50],								//rgb de la couleur de fond (non utilisée si oppacité=0) en luminosité minimale
	Contour:	[0,0,0,0.5],							//rgba de la couleur de contour (non utilisée si oppacité=0)
	Pts: 		[[0,0,0],[0,0,0],[0,0,0],[0,0,0]],		//Liste des sommets en 3D sans rotation
	Pts_rot: 	[[0,0],[0,0],[0,0],[0,0]],				//Liste des sommets en 2D après rotation
	cdg:		[0,0,0],								//Coordonées du centre de gravité en 3D avant rotation
	p_cdg:		0,										//Profondeur du cdg après rotation
	normale:	[0,0,0],								//Vecteur normal à la surface en 3D sans rotation
	normale_p:	[0,0,0],								//Vecteur normal à la surface en 3D après rotation
	init_pts: 	InitPts,								//Initialise les points en 3D
	rot_pts:	RotPts,									//Initialise les points en 2D (rotation des sommets et du cdg)
	draw:		DrawPolynome,
	Raff:		0
}
var mod_Boitier_m={
	nom: 		"Boitier_m",														//Nom sous forme de chaine de charactères
	Fond_max:	[220,220,200,0.29],													//rgba de la couleur de fond (non utilisée si oppacité=0) en luminosité maximale
	Fond_min:	[50,50,50],															//rgb de la couleur de fond (non utilisée si oppacité=0) en luminosité minimale
	Contour:	[0,0,0,0.5],														//rgba de la couleur de contour (non utilisée si oppacité=0)
	Pts: 		[[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0],[0,0,0]],	//Liste des sommets en 3D sans rotation
	Pts_rot: 	[[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0],[0,0]],					//Liste des sommets en 2D après rotation
	cdg:		[0,0,0],															//Coordonées du centre de gravité en 3D avant rotation
	p_cdg:		0,																	//Profondeur du cdg après rotation
	normale:	[0,0,0],															//Vecteur normal à la surface en 3D sans rotation
	normale_p:	[0,0,0],															//Vecteur normal à la surface en 3D après rotation
	init_pts: 	InitPts,															//Initialise les points en 3D
	rot_pts:	RotPts,																//Initialise les points en 2D (rotation des sommets et du cdg)
	draw:		DrawPolynome,
	Raff:		0
}


//--CREATION DES DIFFERENTS GROUPES DE POLYGONES
//Appelle tous les InitPts
function InitPts3D_globale(){

InitPtsBoitier();
InitPtsCapteurs();
InitPtsObjectif();
InitPtsMolette();
InitPtsViseeReflex();

}

//Polygones de la visée reflex
function InitPtsViseeReflex(){

//Sommets
//Miroir
var a1_x=-l_capteur/2000-(-dX);	var a1_y=dY+h_capteur/2000;		var a1_p=dP;
var a2_x=l_capteur/2000-(-dX);	var a2_y=a1_y;					var a2_p=a1_p;
var a3_x=a2_x;					var a3_y=dY-h_capteur/2000;		var a3_p=dP+h_capteur/1000;
var a4_x=a1_x;					var a4_y=a3_y;					var a4_p=a3_p;

//Miroir du haut
var b1_x=a2_x;					var b1_y=dY+y_foyer_corps+h_viseur;					var b1_p=a3_p;
var b2_x=a1_x;					var b2_y=b1_y;										var b2_p=a3_p;
var b3_x=a1_x;					var b3_y=dY+y_foyer_corps+h_fin_visee;				var b3_p=a1_p;
var b4_x=a2_x;					var b4_y=b3_y;										var b4_p=a1_p;

//Miroir du bas
var n1=(h_viseur-h_fin_visee)/2;
var n2_x=(b1_x+b3_x)/2-b3_x;
var n2_y=(b1_y+b3_y)/2-b3_y;
var n2_p=(b1_p+b3_p)/2-b3_p;
var n2=Math.sqrt(n2_x*n2_x+n2_y*n2_y+n2_p*n2_p);

var theta=2*Math.acos(n1/n2)-Math.PI/2;

var d=(h_viseur-h_fin_visee)/(Math.tan(theta));
var d2=(h_fin_visee-h_debut_visee)/(Math.tan(theta));

var c1_x=a2_x;					var c1_y=b3_y;								var c1_p=b1_p+d;
var c2_x=a1_x;					var c2_y=b3_y;								var c2_p=c1_p;
var c3_x=a1_x;					var c3_y=dY+y_foyer_corps+h_debut_visee;	var c3_p=b3_p+d2;
var c4_x=a2_x;					var c4_y=c3_y;								var c4_p=c3_p;


//Polynome	
//Miroir		
mod_miroir.Pts= [[a1_x,a1_y,a1_p],[a2_x,a2_y,a2_p],[a3_x,a3_y,a3_p],[a4_x,a4_y,a4_p]];
mod_miroir.cdg=[(a1_x+a2_x)/2,(a1_y+a3_y)/2,(a1_p+a3_p)/2];
mod_miroir.normale=[0,1,1];
mod_miroir.Raff=l_capteur/1000;

//Miroir haut	
mod_miroir_h.Pts= [[b1_x,b1_y,b1_p],[b2_x,b2_y,b2_p],[b3_x,b3_y,b3_p],[b4_x,b4_y,b4_p]];
mod_miroir_h.cdg=[(b1_x+b2_x)/2,(b1_y+b3_y)/2,(b1_p+b3_p)/2];
mod_miroir_h.normale=[0,Math.sin(3*Math.PI/8),-1*Math.cos(3*Math.PI/8)];
mod_miroir_h.Raff=l_capteur/1000;

//Miroir bas
mod_miroir_b.Pts= [[c1_x,c1_y,c1_p],[c2_x,c2_y,c2_p],[c3_x,c3_y,c3_p],[c4_x,c4_y,c4_p]];
mod_miroir_b.cdg=[(c1_x+c2_x)/2,(c1_y+c3_y)/2,(c1_p+c3_p)/2];
mod_miroir_b.normale=[0,Math.sin(3*Math.PI/8),-1*Math.cos(3*Math.PI/8)];
mod_miroir_b.Raff=l_capteur/1000;
}

//Polygones du boitier
function InitPtsBoitier(){

//-BOITIER
//Sommets
var a1_x=-(-dX)-x_foyer_corps;	var a1_y=dY+y_foyer_corps;		var a1_p=dP-p_foyer_corps;
var a2_x=a1_x;					var a2_y=a1_y;					var a2_p=a1_p+p_corps+p_poignee;
var a3_x=a1_x;					var a3_y=a2_y-h_corps;			var a3_p=a2_p;
var a4_x=a1_x;					var a4_y=a3_y;					var a4_p=a1_p;

var b1_x=a1_x+l_poignee;		var b1_y=a1_y;					var b1_p=a1_p+p_corps;
var b2_x=b1_x;					var b2_y=b1_y;					var b2_p=b1_p+p_poignee;
var b3_x=b1_x;					var b3_y=b2_y-h_poignee;		var b3_p=b2_p;
var b4_x=b1_x;					var b4_y=b3_y;					var b4_p=b1_p;

var c1_x=a1_x+dx_viseur;		var c1_y=a1_y+h_viseur;			var c1_p=a1_p;
var c2_x=c1_x;					var c2_y=c1_y;					var c2_p=c1_p+p_viseur;
var c3_x=c1_x;					var c3_y=a1_y;					var c3_p=c2_p;
var c4_x=c1_x;					var c4_y=c3_y;					var c4_p=c1_p;
var c5_x=c3_x;					var c5_y=c3_y;					var c5_p=c3_p-(p_viseur-p_corps);

var d1_x=c1_x+l_viseur;			var d1_y=c1_y;					var d1_p=c1_p;
var d2_x=d1_x;					var d2_y=c2_y;					var d2_p=c2_p;
var d3_x=d1_x;					var d3_y=c3_y;					var d3_p=c3_p;
var d4_x=d1_x;					var d4_y=c4_y;					var d4_p=c4_p;
var d5_x=d3_x;					var d5_y=d3_y;					var d5_p=c5_p;

var e1_x=a1_x+l_corps;			var e1_y=a1_y;					var e1_p=a1_p;
var e2_x=e1_x;					var e2_y=e1_y;					var e2_p=b1_p;
var e3_x=e1_x;					var e3_y=b4_y;					var e3_p=b4_p;
var e4_x=e1_x;					var e4_y=a4_y;					var e4_p=a4_p;

//Polynomes
mod_Boitier_a.Pts= [[a1_x,a1_y,a1_p],[a2_x,a2_y,a2_p],[a3_x,a3_y,a3_p],[a4_x,a4_y,a4_p]];
mod_Boitier_a.cdg=[a1_x,(a1_y+a4_y)/2,(a2_p+a1_p)/2];
mod_Boitier_a.normale=[-1,0,0];
mod_Boitier_a.Raff=Math.abs(a1_p-a2_p);

mod_Boitier_b.Pts= [[b1_x,b1_y,b1_p],[b2_x,b2_y,b2_p],[b3_x,b3_y,b3_p],[b4_x,b4_y,b4_p]];
mod_Boitier_b.cdg=[b1_x,(b1_y+b4_y)/2,(b2_p+b1_p)/2];
mod_Boitier_b.normale=[1,0,0];
mod_Boitier_b.Raff=Math.abs(b1_y-b4_y);

mod_Boitier_c.Pts= [[c1_x,c1_y,c1_p],[c2_x,c2_y,c2_p],[c3_x,c3_y,c3_p],[c4_x,c4_y,c4_p]];
mod_Boitier_c.cdg=[c1_x,(c1_y+c4_y)/2,(c2_p+c1_p)/2];
mod_Boitier_c.normale=[-1,0,0];
mod_Boitier_c.Raff=Math.abs(c4_p-c3_p);

mod_Boitier_d.Pts= [[d1_x,d1_y,d1_p],[d2_x,d2_y,d2_p],[d3_x,d3_y,d3_p],[d4_x,d4_y,d4_p]];
mod_Boitier_d.cdg=[d1_x,(d1_y+d4_y)/2,(d2_p+d1_p)/2];
mod_Boitier_d.normale=[1,0,0];
mod_Boitier_d.Raff=Math.abs(d4_p-d3_p);

mod_Boitier_e.Pts= [[e1_x,e1_y,e1_p],[e2_x,e2_y,e2_p],[e3_x,e3_y,e3_p],[e4_x,e4_y,e4_p]];
mod_Boitier_e.cdg=[e1_x,(e1_y+e4_y)/2,(e2_p+e1_p)/2];
mod_Boitier_e.normale=[1,0,0];
mod_Boitier_e.Raff=Math.abs(e1_y-e4_y);

mod_Boitier_f.Pts= [[a1_x,a1_y,a1_p],[c4_x,c4_y,c4_p],[c5_x,c5_y,c5_p],[b1_x,b1_y,b1_p],[b2_x,b2_y,b2_p],[a2_x,a2_y,a2_p]];
mod_Boitier_f.cdg=[(c4_x+a1_x)/2,a1_y,(a2_p+a1_p)/2];
mod_Boitier_f.normale=[0,1,0];
mod_Boitier_f.Raff=Math.abs(a1_p-a2_p);

mod_Boitier_g.Pts= [[c1_x,c1_y,c1_p],[d1_x,d1_y,d1_p],[d2_x,d2_y,d2_p],[c2_x,c2_y,c2_p]];
mod_Boitier_g.cdg=[(d1_x+c1_x)/2,c1_y,(d2_p+d1_p)/2];
mod_Boitier_g.normale=[0,1,0];
mod_Boitier_g.Raff=Math.abs(c1_p-c2_p);

mod_Boitier_h.Pts= [[d4_x,d4_y,d4_p],[e1_x,e1_y,e1_p],[e2_x,e2_y,e2_p],[d5_x,d5_y,d5_p]];
mod_Boitier_h.cdg=[(e1_x+d4_x)/2,e1_y,(e2_p+e1_p)/2];
mod_Boitier_h.normale=[0,1,0];
mod_Boitier_h.Raff=Math.abs(e1_x-d4_x);

mod_Boitier_i.Pts= [[a4_x,a4_y,a4_p],[e4_x,e4_y,e4_p],[e3_x,e3_y,e3_p],[b4_x,b4_y,b4_p],[b3_x,b3_y,b3_p],[a3_x,a3_y,a3_p]];
mod_Boitier_i.cdg=[(e4_x+a4_x)/2,a4_y,(a3_p+a4_p)/2];
mod_Boitier_i.normale=[0,-1,0];
mod_Boitier_i.Raff=Math.abs(e4_x-a4_x);

mod_Boitier_ii.Pts= [[c5_x,c5_y,c5_p],[d5_x,d5_y,d5_p],[d3_x,d3_y,d3_p],[c3_x,c3_y,c3_p]];
mod_Boitier_ii.cdg=[(d3_x+c3_x)/2,c3_y,(c3_p+c5_p)/2];
mod_Boitier_ii.normale=[0,-1,0];
mod_Boitier_ii.Raff=Math.abs(c3_x-d3_x);

mod_Boitier_j.Pts= [[a2_x,a2_y,a2_p],[b2_x,b2_y,b2_p],[b3_x,b3_y,b3_p],[a3_x,a3_y,a3_p]];
mod_Boitier_j.cdg=[(b2_x+a2_x)/2,(a2_y+a3_y)/2,a2_p];
mod_Boitier_j.normale=[0,0,1];
mod_Boitier_j.Raff=Math.abs(a2_y-a3_y);

mod_Boitier_k.Pts= [[c2_x,c2_y,c2_p],[d2_x,d2_y,d2_p],[d3_x,d3_y,d3_p],[c3_x,c3_y,c3_p]];
mod_Boitier_k.cdg=[(d2_x+c2_x)/2,(d2_y+d3_y)/2,d2_p];
mod_Boitier_k.normale=[0,0,1];
mod_Boitier_k.Raff=Math.abs(c2_x-d2_x);

mod_Boitier_l.Pts= [[b1_x,b1_y,b1_p],[e2_x,e2_y,e2_p],[e3_x,e3_y,e3_p],[b4_x,b4_y,b4_p]];
mod_Boitier_l.cdg=[(e2_x+b1_x)/2,(e2_y+e3_y)/2,e2_p];
mod_Boitier_l.normale=[0,0,1];
mod_Boitier_l.Raff=Math.abs(e2_x-b1_x);

mod_Boitier_m.Pts= [[a1_x,a1_y,a1_p],[c4_x,c4_y,c4_p],[c1_x,c1_y,c1_p],[d1_x,d1_y,d1_p],[d4_x,d4_y,d4_p],[e1_x,e1_y,e1_p],[e4_x,e4_y,e4_p],[a4_x,a4_y,a4_p]];
mod_Boitier_m.cdg=[(e1_x+a1_x)/2,(c1_y+a4_y)/2,a1_p];
mod_Boitier_m.normale=[0,0,-1];
mod_Boitier_m.Raff=Math.abs(e1_x-a1_x);
}

//Polygones des capteurs
function InitPtsCapteurs(){

//Pour les calculs
var f_m=focale/1000;
var feq_m=f_equ/1000;
var df=(f_m*f_m)/(d_map-f_m);
var dfeq=(feq_m*feq_m)/(d_map-feq_m);
var p_f=df+f_m;

//Sommets
var ff1_x=-0.018-(-dX);	var ff1_y=0.012+dY;		var ff1_p=dP-(feq_m+dfeq-f_m-df);
var ff2_x=0.018-(-dX);		var ff2_y=0.012+dY;		var ff2_p=dP-(feq_m+dfeq-f_m-df);
var ff3_x=0.018-(-dX);		var ff3_y=-0.012+dY; 	var ff3_p=dP-(feq_m+dfeq-f_m-df);
var ff4_x=-0.018-(-dX);	var ff4_y=-0.012+dY; 	var ff4_p=dP-(feq_m+dfeq-f_m-df);

var ca1_x=-l_capteur/2000-(-dX);	var ca1_y=h_capteur/2000+dY;	var ca1_p=dP;
var ca2_x=l_capteur/2000-(-dX);	var ca2_y=h_capteur/2000+dY;	var ca2_p=dP;
var ca3_x=l_capteur/2000-(-dX);	var ca3_y=-h_capteur/2000+dY; 	var ca3_p=dP;
var ca4_x=-l_capteur/2000-(-dX);	var ca4_y=-h_capteur/2000+dY; 	var ca4_p=dP;	

//Polynome			
mod_capteurFF.Pts= [[ff1_x,ff1_y,ff1_p],[ff2_x,ff2_y,ff2_p],[ff3_x,ff3_y,ff3_p],[ff4_x,ff4_y,ff4_p]];
mod_capteurFF.cdg=[(ff2_x+ff1_x)/2,(ff1_y+ff3_y)/2,ff1_p];
mod_capteurFF.normale=[0,0,1];
mod_capteurFF.Raff=Math.abs(ff1_x-ff2_x);

mod_capteurCourant.Pts= [[ca1_x,ca1_y,ca1_p],[ca2_x,ca2_y,ca2_p],[ca3_x,ca3_y,ca3_p],[ca4_x,ca4_y,ca4_p]];
mod_capteurCourant.cdg=[(ca2_x+ca1_x)/2,(ca1_y+ca3_y)/2,ca1_p];
mod_capteurCourant.normale=[0,0,1];		
mod_capteurCourant.Raff=Math.abs(ca1_x-ca2_x);
}

//Polygones de l'objectif
function InitPtsObjectif(){

//5 longueurs/diamètres possibles de cylindres
var l1=0;	var l2=0;	var l3=0;	var l4=0;	var l5=0;
var d1=0;	var d2=0;	var d3=0;	var d4=0;	var d5=0;
var e1=0;	var e2=0;	var e3=0;	var e4=0;



if(flag_obj_predefinis){

	Nbr_poly_obj=ListeObj[cpt_obj].Npoly;

	l1=0.001*ListeObj[cpt_obj].l[0];
	d1=0.001*ListeObj[cpt_obj].d[0];
	e1=0;

	if(Nbr_poly_obj>=3){
		e1=0.001*ListeObj[cpt_obj].e[0];
		l2=0.001*ListeObj[cpt_obj].l[1];
		d2=0.001*ListeObj[cpt_obj].d[1];
	}
	if(Nbr_poly_obj>=5){
		e2=0.001*ListeObj[cpt_obj].e[1];
		l3=0.001*ListeObj[cpt_obj].l[2];
		d3=0.001*ListeObj[cpt_obj].d[2];
	}
	if(Nbr_poly_obj>=7){
		e3=0.001*ListeObj[cpt_obj].e[2];
		l4=0.001*ListeObj[cpt_obj].l[3];
		d4=0.001*ListeObj[cpt_obj].d[3];
	}
	if(Nbr_poly_obj>=9){
		e4=0.001*ListeObj[cpt_obj].e[3];
		l5=0.001*ListeObj[cpt_obj].l[4];
		d5=0.001*ListeObj[cpt_obj].d[4];
	}

	var N_bague=ListeObj[cpt_obj].bague;
}

else{
	Nbr_poly_obj=ObjExtra.Npoly;

	l1=0.001*ObjExtra.l[0];
	d1=0.001*ObjExtra.d[0];

	if(Nbr_poly_obj>=3){
	e1=0.001*ObjExtra.e[0];
	l2=0.001*ObjExtra.l[1];
	d2=0.001*ObjExtra.d[1];
	}

	if(Nbr_poly_obj>=5){
	e2=0.001*ObjExtra.e[1];
	l3=0.001*ObjExtra.l[2];
	d3=0.001*ObjExtra.d[2];
	}

	if(Nbr_poly_obj>=7){
	e3=0.001*ObjExtra.e[2];
	l4=0.001*ObjExtra.l[3];
	d4=0.001*ObjExtra.d[3];
	}

	if(Nbr_poly_obj>=9){
	e4=0.001*ObjExtra.e[3];
	l5=0.001*ObjExtra.l[4];
	d5=0.001*ObjExtra.d[4];
	}

	var N_bague=ObjExtra.bague;
}



//Fait en sorte que le diaphragme ne dépace pas de l'objectif (en longueur)
var f_m=focale/1000;
var feq_m=f_equ/1000;
var df=(f_m*f_m)/(d_map-f_m);
var dfeq=(feq_m*feq_m)/(d_map-feq_m);
var p_f=df+f_m;
var p_diaff=p_f+dP;

var l_temp=p_diaff-(p_corps-p_foyer_corps)-(l1+l2+l3+l4+l5+e1+e2+e3+e4);

if(l_temp>0){

	var k=(p_diaff-(p_corps-p_foyer_corps))/(l1+l2+l3+l4+l5+e1+e2+e3+e4);

	l1=k*l1;
	
	if(Nbr_poly_obj>=3){
		e1=k*e1;
		l2=k*l2;
	}
	
	if(Nbr_poly_obj>=5){
		e2=k*e2;
		l3=k*l3;
	}
	
	if(Nbr_poly_obj>=9){
		e3=k*e3;
		l4=k*l4;
	}

	if(Nbr_poly_obj>=7){
		e4=k*e4;
		l5=k*l5;
	}
}



//Module les diamètres en fonction de l'ouverture min
var d_temp=f_m/Ouv_min;

if(Nbr_poly_obj==3){
	k=d_temp/d2;
	if(k>1)
	d2=k*d2;
	
	if(d1>d2)
	d1=d2;	
	
	
}
if(Nbr_poly_obj==5){
	k=d_temp/d3;
	if(k>1){
	d3=k*d3;
	d2=k*d2;
	}
	
	if(d2>d3)
	d2=d3;	
	
	if(d1>d2)
	d1=d2;		
	
}
if(Nbr_poly_obj==7){
	k=d_temp/d4;
	if(k>1){
	d4=k*d4;
	d3=k*d3;
	d2=k*d2;
	}
	
	if(d3>d4)
	d3=d4;
	
	if(d2>d3)
	d2=d3;	
	
	if(d1>d2)
	d1=d2;	
}
if(Nbr_poly_obj==9){
	k=d_temp/d5;
	if(k>1){
	d5=k*d5;
	d4=k*d4;
	d3=k*d3;
	d2=k*d2;
	}
	
	
	if(d4>d5)
	d4=d5;	
		
	if(d3>d4)
	d3=d4;
	
	if(d2>d3)
	d2=d3;	
	
	if(d1>d2)
	d1=d2;	
	
	
	
	
}




//Fait en sorte que les diamètres soient croissants
if(Nbr_poly_obj==3){
	if(d2<d1)
	d2=d1;
}

if(Nbr_poly_obj==5){
	if(d2<d1)
	d2=d1;
	
	if(d3<d2)
	d3=d2;
}
if(Nbr_poly_obj==7){
	if(d2<d1)
	d2=d1;
	
	if(d3<d2)
	d3=d2;
	
	if(d4<d3)
	d4=d3;
}
if(Nbr_poly_obj==9){
	if(d2<d1)
	d2=d1;
	
	if(d3<d2)
	d3=d2;
	
	if(d4<d3)
	d4=d3;
	
	if(d5<d4)
	d5=d4;	
}





var p0=dP+p_corps-p_foyer_corps;

//Sommets
var a1_x=0;					var a1_y=0;					var a1_p=0;
var a2_x=0;					var a2_y=0;					var a2_p=0;
var a3_x=0;					var a3_y=0;					var a3_p=0;
var a4_x=0;					var a4_y=0;					var a4_p=0;

var b1_x=0;					var b1_y=0;					var b1_p=0;
var b2_x=0;					var b2_y=0;					var b2_p=0;
var b3_x=0;					var b3_y=0;					var b3_p=0;
var b4_x=0;					var b4_y=0;					var b4_p=0;

var c1_x=0;					var c1_y=0;					var c1_p=0;
var c2_x=0;					var c2_y=0;					var c2_p=0;
var c3_x=0;					var c3_y=0;					var c3_p=0;
var c4_x=0;					var c4_y=0;					var c4_p=0;

var d1_x=0;					var d1_y=0;					var d1_p=0;
var d2_x=0;					var d2_y=0;					var d2_p=0;
var d3_x=0;					var d3_y=0;					var d3_p=0;
var d4_x=0;					var d4_y=0;					var d4_p=0;

var e1_x=0;					var e1_y=0;					var e1_p=0;
var e2_x=0;					var e2_y=0;					var e2_p=0;
var e3_x=0;					var e3_y=0;					var e3_p=0;
var e4_x=0;					var e4_y=0;					var e4_p=0;



var i=0;
var u_x=0; var u_y=1; var u_p=0;
var v_x=0; var v_y=1; var v_p=0;
var w_x=0; var w_y=1; var w_p=0;


var coord=Rotation3D(v_x,v_y,v_p);

var temp_R=0;

for(i=0;i*delta_angle_objectif<2*Math.PI;i++){
	
	//Sommets
	a1_x=-(-dX)+(d1/2)*Math.cos(i*delta_angle_objectif);		a1_y=dY+(d1/2)*Math.sin(i*delta_angle_objectif);		a1_p=p0;
	a2_x=a1_x;													a2_y=a1_y;												a2_p=p0+l1;
	a3_x=-(-dX)+(d1/2)*Math.cos((i+1)*delta_angle_objectif);	a3_y=dY+(d1/2)*Math.sin((i+1)*delta_angle_objectif);	a3_p=a2_p;
	a4_x=a3_x;													a4_y=a3_y;												a4_p=a1_p;
	
	//u:cb, v:cd, w=u.v
	u_x=a2_x-a3_x; 					u_y=a2_y-a3_y; 				u_p=a2_p-a3_p;
	v_x=a4_x-a3_x; 					v_y=a4_y-a3_y; 				v_p=a4_p-a3_p;
	w_x=u_y*v_p-u_p*v_y;			w_y=u_p*v_x-u_x*v_p;		w_p=u_x*v_y-u_y*v_x;

	//MAJ du polynome
	PolynomesObjectifTT[0][i]=new Polygone("Obj0"+i,[180,180,180,0.8],[50,50,50],[10,10,10,1],[[a1_x,a1_y,a1_p],[a2_x,a2_y,a2_p],[a3_x,a3_y,a3_p],[a4_x,a4_y,a4_p]],[[0,0],[0,0],[0,0],[0,0]],[(a1_x+a3_x)/2,(a1_y+a3_y)/2,(a1_p+a3_p)/2],0,[w_x,w_y,w_p],[0,0,0],InitPts,RotPts,DrawPolynome,l1);
	
	if(N_bague!=0)
	PolynomesObjectifTT[0][i].Contour[3]=0;
	
	
	if(Nbr_poly_obj>=3){
		//Sommets
		b1_x=-(-dX)+(d2/2)*Math.cos(i*delta_angle_objectif);		b1_y=dY+(d2/2)*Math.sin(i*delta_angle_objectif);		b1_p=a2_p+e1;
		b2_x=b1_x;													b2_y=b1_y;												b2_p=b1_p+l2;
		b3_x=-(-dX)+(d2/2)*Math.cos((i+1)*delta_angle_objectif);	b3_y=dY+(d2/2)*Math.sin((i+1)*delta_angle_objectif);	b3_p=b2_p;
		b4_x=b3_x;													b4_y=b3_y;												b4_p=b1_p;
	
		//Entre les 2 cylindres
		//u:cb, v:cd, w=u.v
		u_x=a3_x-a2_x; 					u_y=a3_y-a2_y; 				u_p=a3_p-a2_p;
		v_x=b1_x-a2_x; 					v_y=b1_y-a2_y; 				v_p=b1_p-a2_p;
		w_x=u_y*v_p-u_p*v_y;			w_y=u_p*v_x-u_x*v_p;		w_p=u_x*v_y-u_y*v_x;

		//MAJ du polynome
		PolynomesObjectifTT[1][i]=new Polygone("Obj1"+i,[180,180,180,0.8],[50,50,50],[10,10,10,1],[[b1_x,b1_y,b1_p],[b4_x,b4_y,b4_p],[a3_x,a3_y,a3_p],[a2_x,a2_y,a2_p]],[[0,0],[0,0],[0,0],[0,0]],[(b4_x+a2_x)/2,(b4_y+a2_y)/2,(b4_p+a2_p)/2],0,[w_x,w_y,w_p],[0,0,0],InitPts,RotPts,DrawPolynome,d2-d1);
		
		if(N_bague!=1)
		PolynomesObjectifTT[1][i].Contour[3]=0;
		
		//2nd cylindre
		//u:cb, v:cd, w=u.v
		u_x=b2_x-b3_x; 					u_y=b2_y-b3_y; 				u_p=b2_p-b3_p;
		v_x=b4_x-b3_x; 					v_y=b4_y-b3_y; 				v_p=b4_p-b3_p;
		w_x=u_y*v_p-u_p*v_y;			w_y=u_p*v_x-u_x*v_p;		w_p=u_x*v_y-u_y*v_x;

		//MAJ du polynome
		PolynomesObjectifTT[2][i]=new Polygone("Obj2"+i,[180,180,180,0.8],[50,50,50],[10,10,10,1],[[b1_x,b1_y,b1_p],[b2_x,b2_y,b2_p],[b3_x,b3_y,b3_p],[b4_x,b4_y,b4_p]],[[0,0],[0,0],[0,0],[0,0]],[(b1_x+b3_x)/2,(b1_y+b3_y)/2,(b1_p+b3_p)/2],0,[w_x,w_y,w_p],[0,0,0],InitPts,RotPts,DrawPolynome,l2);
		if(N_bague!=2)
		PolynomesObjectifTT[2][i].Contour[3]=0;
	
	}
	
	if(Nbr_poly_obj>=5){
		//Sommets
		c1_x=-(-dX)+(d3/2)*Math.cos(i*delta_angle_objectif);		c1_y=dY+(d3/2)*Math.sin(i*delta_angle_objectif);		c1_p=b2_p+e2;
		c2_x=c1_x;													c2_y=c1_y;												c2_p=c1_p+l3;
		c3_x=-(-dX)+(d3/2)*Math.cos((i+1)*delta_angle_objectif);	c3_y=dY+(d3/2)*Math.sin((i+1)*delta_angle_objectif);	c3_p=c2_p;
		c4_x=c3_x;													c4_y=c3_y;												c4_p=c1_p;
	
		//Entre les 2 cylindres
		//u:cb, v:cd, w=u.v
		u_x=b3_x-b2_x; 					u_y=b3_y-b2_y; 				u_p=b3_p-b2_p;
		v_x=c1_x-c2_x; 					v_y=c1_y-c2_y; 				v_p=c1_p-c2_p;
		w_x=u_y*v_p-u_p*v_y;			w_y=u_p*v_x-u_x*v_p;		w_p=u_x*v_y-u_y*v_x;

		//MAJ du polynome
		PolynomesObjectifTT[3][i]=new Polygone("Obj3"+i,[180,180,180,0.8],[50,50,50],[10,10,10,1],[[c1_x,c1_y,c1_p],[c4_x,c4_y,c4_p],[b3_x,b3_y,b3_p],[b2_x,b2_y,b2_p]],[[0,0],[0,0],[0,0],[0,0]],[(c4_x+b2_x)/2,(c4_y+b2_y)/2,(c4_p+b2_p)/2],0,[w_x,w_y,w_p],[0,0,0],InitPts,RotPts,DrawPolynome,d3-d2);
		if(N_bague!=3)
		PolynomesObjectifTT[3][i].Contour[3]=0;
		
		//2nd cylindre
		//u:cb, v:cd, w=u.v
		u_x=c2_x-c3_x; 					u_y=c2_y-c3_y; 				u_p=c2_p-c3_p;
		v_x=c4_x-c3_x; 					v_y=c4_y-c3_y; 				v_p=c4_p-c3_p;
		w_x=u_y*v_p-u_p*v_y;			w_y=u_p*v_x-u_x*v_p;		w_p=u_x*v_y-u_y*v_x;

		//MAJ du polynome
		PolynomesObjectifTT[4][i]=new Polygone("Obj4"+i,[180,180,180,0.8],[50,50,50],[10,10,10,1],[[c1_x,c1_y,c1_p],[c2_x,c2_y,c2_p],[c3_x,c3_y,c3_p],[c4_x,c4_y,c4_p]],[[0,0],[0,0],[0,0],[0,0]],[(c1_x+c3_x)/2,(c1_y+c3_y)/2,(c1_p+c3_p)/2],0,[w_x,w_y,w_p],[0,0,0],InitPts,RotPts,DrawPolynome,l3);
		if(N_bague!=4)
		PolynomesObjectifTT[4][i].Contour[3]=0;
	
	}
		
	if(Nbr_poly_obj>=5){
		//Sommets
		d1_x=-(-dX)+(d4/2)*Math.cos(i*delta_angle_objectif);		d1_y=dY+(d4/2)*Math.sin(i*delta_angle_objectif);		d1_p=c2_p+e3;
		d2_x=d1_x;													d2_y=d1_y;												d2_p=d1_p+l4;
		d3_x=-(-dX)+(d4/2)*Math.cos((i+1)*delta_angle_objectif);	d3_y=dY+(d4/2)*Math.sin((i+1)*delta_angle_objectif);	d3_p=d2_p;
		d4_x=d3_x;													d4_y=d3_y;												d4_p=d1_p;
	
		//Entre les 2 cylindres
		//u:cb, v:cd, w=u.v
		u_x=c3_x-c2_x; 					u_y=c3_y-c2_y; 				u_p=c3_p-c2_p;
		v_x=d1_x-d2_x; 					v_y=d1_y-d2_y; 				v_p=d1_p-d2_p;
		w_x=u_y*v_p-u_p*v_y;			w_y=u_p*v_x-u_x*v_p;		w_p=u_x*v_y-u_y*v_x;

		//MAJ du polynome
		PolynomesObjectifTT[5][i]=new Polygone("Obj5"+i,[180,180,180,0.8],[50,50,50],[10,10,10,1],[[d1_x,d1_y,d1_p],[d4_x,d4_y,d4_p],[c3_x,c3_y,c3_p],[c2_x,c2_y,c2_p]],[[0,0],[0,0],[0,0],[0,0]],[(d4_x+c2_x)/2,(d4_y+c2_y)/2,(d4_p+c2_p)/2],0,[w_x,w_y,w_p],[0,0,0],InitPts,RotPts,DrawPolynome,d4-d3);
		if(N_bague!=5)
		PolynomesObjectifTT[5][i].Contour[3]=0;		
		//2nd cylindre
		//u:cb, v:cd, w=u.v
		u_x=d2_x-d3_x; 					u_y=d2_y-d3_y; 				u_p=d2_p-d3_p;
		v_x=d4_x-d3_x; 					v_y=d4_y-d3_y; 				v_p=d4_p-d3_p;
		w_x=u_y*v_p-u_p*v_y;			w_y=u_p*v_x-u_x*v_p;		w_p=u_x*v_y-u_y*v_x;

		//MAJ du polynome
		PolynomesObjectifTT[6][i]=new Polygone("Obj6"+i,[180,180,180,0.8],[50,50,50],[10,10,10,1],[[d1_x,d1_y,d1_p],[d2_x,d2_y,d2_p],[d3_x,d3_y,d3_p],[d4_x,d4_y,d4_p]],[[0,0],[0,0],[0,0],[0,0]],[(d1_x+d3_x)/2,(d1_y+d3_y)/2,(d1_p+d3_p)/2],0,[w_x,w_y,w_p],[0,0,0],InitPts,RotPts,DrawPolynome,l4);
		if(N_bague!=6)
		PolynomesObjectifTT[6][i].Contour[3]=0;	
	}
	
	if(Nbr_poly_obj>=7){
		//Sommets
		e1_x=-(-dX)+(d5/2)*Math.cos(i*delta_angle_objectif);		e1_y=dY+(d5/2)*Math.sin(i*delta_angle_objectif);		e1_p=d2_p+e4;
		e2_x=e1_x;													e2_y=e1_y;												e2_p=e1_p+l5;
		e3_x=-(-dX)+(d5/2)*Math.cos((i+1)*delta_angle_objectif);	e3_y=dY+(d5/2)*Math.sin((i+1)*delta_angle_objectif);	e3_p=e2_p;
		e4_x=e3_x;													e4_y=e3_y;												e4_p=e1_p;
	
		//Entre les 2 cylindres
		//u:cb, v:cd, w=u.v
		u_x=d3_x-d2_x; 					u_y=d3_y-d2_y; 				u_p=d3_p-d2_p;
		v_x=e1_x-e2_x; 					v_y=e1_y-e2_y; 				v_p=e1_p-e2_p;
		w_x=u_y*v_p-u_p*v_y;			w_y=u_p*v_x-u_x*v_p;		w_p=u_x*v_y-u_y*v_x;

		//MAJ du polynome
		PolynomesObjectifTT[7][i]=new Polygone("Obj7"+i,[180,180,180,0.8],[50,50,50],[10,10,10,1],[[e1_x,e1_y,e1_p],[e4_x,e4_y,e4_p],[d3_x,d3_y,d3_p],[d2_x,d2_y,d2_p]],[[0,0],[0,0],[0,0],[0,0]],[(e4_x+d2_x)/2,(e4_y+d2_y)/2,(e4_p+d2_p)/2],0,[w_x,w_y,w_p],[0,0,0],InitPts,RotPts,DrawPolynome,d5-d4);
		if(N_bague!=7)
		PolynomesObjectifTT[7][i].Contour[3]=0;		
		//2nd cylindre
		//u:cb, v:cd, w=u.v
		u_x=e2_x-e3_x; 					u_y=e2_y-e3_y; 				u_p=e2_p-e3_p;
		v_x=e4_x-e3_x; 					v_y=e4_y-e3_y; 				v_p=e4_p-e3_p;
		w_x=u_y*v_p-u_p*v_y;			w_y=u_p*v_x-u_x*v_p;		w_p=u_x*v_y-u_y*v_x;

		//MAJ du polynome
		PolynomesObjectifTT[8][i]=new Polygone("Obj8"+i,[180,180,180,0.8],[50,50,50],[10,10,10,1],[[e1_x,e1_y,e1_p],[e2_x,e2_y,e2_p],[e3_x,e3_y,e3_p],[e4_x,e4_y,e4_p]],[[0,0],[0,0],[0,0],[0,0]],[(e1_x+e3_x)/2,(e1_y+e3_y)/2,(e1_p+e3_p)/2],0,[w_x,w_y,w_p],[0,0,0],InitPts,RotPts,DrawPolynome,l5);
		if(N_bague!=8)
		PolynomesObjectifTT[8][i].Contour[3]=0;	
	}

	
}





}

//Polygones de la molette
function InitPtsMolette(){

	var d_theta=Math.PI/N_molette;
	var r=0.018;				//rayon interne
	var R=0.02;					//rayon externe
	var e=0.004;					//épaisseur	
	
	var Xpho=-1*(-dX);
	var Ypho=dY;
	var Ppho=dP;
	
	//centre de rotation
	var x0=Xpho-x_foyer_corps+0.02;		//OK
	var y0=Ypho+y_foyer_corps-0.0123;	//OK
	var p0=Ppho-p_foyer_corps+R-0.006;	//OK

	var i=0;
	var ii=0;
	
	var Face_temp_haut=new Array(4*N_molette);
	var Face_temp_bas=new Array(4*N_molette)
	for(i=0; i < 4*N_molette; i++) {
    Face_temp_haut[i] = new Array(3);
	Face_temp_bas[i] = new Array(3);
  }
	
		
	//Mémorise les coordonées des sommets
	var ii=0;
	for(i=0;i!=2*N_molette;i+=2){
		ii=2*i;
		Face_temp_haut[ii][0]=x0-R*Math.cos(i*d_theta);			Face_temp_haut[ii][1]=y0+e/2;		Face_temp_haut[ii][2]=p0+R*Math.sin(i*d_theta);
		Face_temp_bas[ii][0]=Face_temp_haut[ii][0];				Face_temp_bas[ii][1]=y0-e/2;		Face_temp_bas[ii][2]=Face_temp_haut[ii][2];
		
		Face_temp_haut[ii+1][0]=x0-R*Math.cos((i+1)*d_theta);	Face_temp_haut[ii+1][1]=y0+e/2;		Face_temp_haut[ii+1][2]=p0+R*Math.sin((i+1)*d_theta);
		Face_temp_bas[ii+1][0]=Face_temp_haut[ii+1][0];			Face_temp_bas[ii+1][1]=y0-e/2;		Face_temp_bas[ii+1][2]=Face_temp_haut[ii+1][2];
		
		Face_temp_haut[ii+2][0]=x0-r*Math.cos((i+1)*d_theta);	Face_temp_haut[ii+2][1]=y0+e/2;		Face_temp_haut[ii+2][2]=p0+r*Math.sin((i+1)*d_theta);
		Face_temp_bas[ii+2][0]=Face_temp_haut[ii+2][0];			Face_temp_bas[ii+2][1]=y0-e/2;		Face_temp_bas[ii+2][2]=Face_temp_haut[ii+2][2];
		
		Face_temp_haut[ii+3][0]=x0-r*Math.cos((i+2)*d_theta);	Face_temp_haut[ii+3][1]=y0+e/2;		Face_temp_haut[ii+3][2]=p0+r*Math.sin((i+2)*d_theta);
		Face_temp_bas[ii+3][0]=Face_temp_haut[ii+3][0];			Face_temp_bas[ii+3][1]=y0-e/2;		Face_temp_bas[ii+3][2]=Face_temp_haut[ii+3][2];
	}	
	
	var tab_temp1=new Array(4*N_molette,2);
	for(i=0; i < 4*N_molette; i++)
	tab_temp1[i] = new Array(2);	

	var tab_temp2=new Array(4*N_molette,2);
	for(i=0; i < 4*N_molette; i++)
	tab_temp2[i] = new Array(2);		
	
	
	//Polygomes des faces haut et bas
	PolygomesMolette[0]=new Polygone("Mol0",[150,150,150,1],[50,50,50],[0,0,0,0],Face_temp_haut,tab_temp1,[x0,y0+e/2,p0],0,[0,1,0],[0,0,0],InitPts,RotPts,DrawPolynome,2*R);
	PolygomesMolette[1]=new Polygone("Mol1",[150,150,150,1],[50,50,50],[0,0,0,0],Face_temp_bas,tab_temp2,[x0,y0-e/2,p0],0, [0,-1,0],[0,0,0],InitPts,RotPts,DrawPolynome,2*R);
		
	//Polygones des tranches
	var xa=1.0;var ya=1.0;var pa=1.0;
	var xb=1.0;var yb=1.0;var pb=1.0;
	var xc=1.0;var yc=1.0;var pc=1.0;
	var xd=1.0;var yd=1.0;var pd=1.0;
	var xg=1.0;var yg=1.0;var pg=1.0;	
	var u_x=0; var u_y=1; var u_p=0;
	var v_x=0; var v_y=1; var v_p=0;
	var w_x=0; var w_y=1; var w_p=0;
	
			
	for(i=0;i!=4*N_molette-1;i++){
	
		xa=Face_temp_haut[i][0];	ya=Face_temp_haut[i][1];	pa=Face_temp_haut[i][2];
		xb=Face_temp_haut[i+1][0];	yb=Face_temp_haut[i+1][1];	pb=Face_temp_haut[i+1][2];
		xc=Face_temp_bas[i+1][0];	yc=Face_temp_bas[i+1][1];	pc=Face_temp_bas[i+1][2];
		xd=Face_temp_bas[i][0];		yd=Face_temp_bas[i][1];		pd=Face_temp_bas[i][2];
		
		xg=(xa+xc)/2;	yg=y0;	pg=(pa+pc)/2
		
		//u:ad, v:ab, w=u.v
		u_x=xd-xa; 				u_y=yd-ya; 				u_p=pd-pa;
		v_x=xb-xa; 				v_y=yb-ya; 				v_p=pb-pa;
		w_x=u_y*v_p-u_p*v_y;	w_y=u_p*v_x-u_x*v_p;	w_p=u_x*v_y-u_y*v_x;
		
		PolygomesMolette[i+2]=new Polygone("Mol"+(i+2),[150,150,150,1],[50,50,50],[0,0,0,0],[[xa,ya,pa],[xb,yb,pb],[xc,yc,pc],[xd,yd,pd]],[[0,0,0],[0,0,0],[0,0,0],[0,0,0]],[xg,yg,pg],0, [w_x,w_y,w_p],[0,0,0],InitPts,RotPts,DrawPolynome,e);	
	}
	
		//Dernier
		xa=Face_temp_haut[i][0];	ya=Face_temp_haut[i][1];	pa=Face_temp_haut[i][2];
		xb=Face_temp_haut[0][0];	yb=Face_temp_haut[0][1];	pb=Face_temp_haut[0][2];
		xc=Face_temp_bas[0][0];		yc=Face_temp_bas[0][1];		pc=Face_temp_bas[0][2];
		xd=Face_temp_bas[i][0];		yd=Face_temp_bas[i][1];		pd=Face_temp_bas[i][2];
		
		xg=(xa+xc)/2;	yg=y0;	pg=(pa+pc)/2
		
		//u:ad, v:ab, w=u.v
		u_x=xd-xa; 				u_y=yd-ya; 				u_p=pd-pa;
		v_x=xb-xa; 				v_y=yb-ya; 				v_p=pb-pa;
		w_x=u_y*v_p-u_p*v_y;	w_y=u_p*v_x-u_x*v_p;	w_p=u_x*v_y-u_y*v_x;
		
		PolygomesMolette[i+2]=new Polygone("Mol"+(i+2),[150,150,150,1],[50,50,50],[0,0,0,0],[[xa,ya,pa],[xb,yb,pb],[xc,yc,pc],[xd,yd,pd]],[[0,0,0],[0,0,0],[0,0,0],[0,0,0]],[xg,yg,pg],0, [w_x,w_y,w_p],[0,0,0],InitPts,RotPts,DrawPolynome,e);	
}

//--ROTATION DES POLYGONES
function RotPts(){

//Rotation des sommets
for(var i=0;i!=this.Pts.length;i++){
	var coord_3D = proj_3D(this.Pts[i][0],this.Pts[i][1],this.Pts[i][2]); 
	this.Pts_rot[i][0]=coord_3D.X; 
	this.Pts_rot[i][1]=coord_3D.Y;	
}

//Rotation du cdg
this.p_cdg=1.0*(Rotation3D(this.cdg[0],this.cdg[1],this.cdg[2]).p.toFixed(6));


//Rotation de la normale à la surface
var coord=Rotation3D(this.normale[0],this.normale[1],this.normale[2],"pas_de_translation");
var normalise=coord.x*coord.x+coord.y*coord.y+coord.p*coord.p;
if(normalise!=0){
	normalise=1/normalise;
	normalise=Math.sqrt(normalise);
	coord.x=coord.x*normalise;	coord.y=coord.y*normalise;	coord.p=coord.p*normalise;
}

this.normale_p=[coord.x,coord.y,coord.p];
}

//Appelle toutes les rotations
function ROTPts3D_globale(){

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

for(var i=0;i!=N_objectif;i++){

	PolynomesObjectifTT[0][i].rot_pts();

	if(Nbr_poly_obj>=3){
	PolynomesObjectifTT[1][i].rot_pts();
	PolynomesObjectifTT[2][i].rot_pts();
	}

	if(Nbr_poly_obj>=5){
	PolynomesObjectifTT[3][i].rot_pts();
	PolynomesObjectifTT[4][i].rot_pts();
	}

	if(Nbr_poly_obj>=7){
	PolynomesObjectifTT[5][i].rot_pts();
	PolynomesObjectifTT[6][i].rot_pts();
	}
	
	if(Nbr_poly_obj>=9){
	PolynomesObjectifTT[7][i].rot_pts();
	PolynomesObjectifTT[8][i].rot_pts();
	}
}




for(var i=0;i!=2+4*N_molette;i++)
PolygomesMolette[i].rot_pts();

mod_miroir.rot_pts();
mod_miroir_h.rot_pts();
mod_miroir_b.rot_pts();

}

//--DESSIN D'UN POLYGONE
function DrawPolynome(){

//Regarde si le polynome est dans la zone d'affichage

//Rayon d'affichage
var R=this.Raff;


//vecteur vers le cdg
var vx=this.cdg[0];
var vy=this.cdg[1];
var vp=this.cdg[2];

if(cvs_3d=="3D_globale")
var coord=Rotation3D(vx,vy,vp);
else
var coord=Rotation3D(vx,vy,vp,"pas_de_translation");


vx=coord.x;
vy=coord.y;
vp=coord.p;

var n=Math.sqrt(vx*vx+vy*vy+vp*vp);

//vecteur vers la limite d'affichage
if(n!=0){
	vx=vx*(n-R)/n;
	vy=vy*(n-R)/n;
	vp=vp*(n-R)/n;
}

vx=vx/k_px_3D;
vy=vy/k_px_3D;
vp=vp/k_px_3D;


//regarde si le vecteur limite est dans la zone d'impression
var coord=xyp2XY(vx,vy,vp);


if( coord.X>=0 && coord.X<Wc_3D && coord.Y>=0 && coord.Y<Hc_3D){

	ct_3D.beginPath();

	//Relie tous les sommets et revient au premier
	ct_3D.moveTo(this.Pts_rot[0][0],this.Pts_rot[0][1]);

	for (i=1;i!=this.Pts_rot.length;i++)
	ct_3D.lineTo(this.Pts_rot[i][0],this.Pts_rot[i][1]);

	ct_3D.lineTo(this.Pts_rot[0][0],this.Pts_rot[0][1]);

	//Remplissage: Calcul de la couleur en fonction de la luminosité
	if(this.Fond_max[3]!=0){

		var lum_temp=this.normale_p[0]*lum_x+this.normale_p[1]*lum_y+this.normale_p[2]*lum_p;	//produit scalaire vecteur normale / vecteur lumière
		
		if(lum_temp<0)
		lum_temp=0;
		
		var temp_R=Math.round(this.Fond_min[0]+lum_temp*(this.Fond_max[0]-this.Fond_min[0]));
		var temp_V=Math.round(this.Fond_min[1]+lum_temp*(this.Fond_max[1]-this.Fond_min[1]));
		var temp_B=Math.round(this.Fond_min[2]+lum_temp*(this.Fond_max[2]-this.Fond_min[2]));
		ct_3D.fillStyle ='rgba('+temp_R+','+temp_V+','+temp_B+','+this.Fond_max[3]+')';
		ct_3D.fill();
	}
	//Contour
	if(this.Contour[3]!=0){
		ct_3D.strokeStyle ='rgba('+this.Contour[0]+','+this.Contour[1]+','+this.Contour[2]+','+this.Contour[3]+')';
		ct_3D.stroke();
	}

}
}

//Pour pouvoir faire un tri avec des nombres négatifs
function sortNumber(a,b){
   return a - b;
}

//Maj de haut;bas,gauche,droite,devant,derriere en fonction de l'orientation de la scène
function MajOrientation(){

var pp=Rotation3D(0,1,0,'pas_de_translation').p;
if(pp>0){	haut=1;		bas=0;	}
else{		haut=0;		bas=1;	}

var pp=Rotation3D(0,0,1,'pas_de_translation').p;
if(pp>0){	devant=1;	derriere=0;}
else{		devant=0;	derriere=1;}

var pp=Rotation3D(1,0,0,'pas_de_translation').p;
if(pp<0){	gauche=1;	droite=0;}
else{		gauche=0;	droite=1;}

}

function Draw3D_globale(){

//INIT
init_3D("3D_globale");
MajOrientation();
ROTPts3D_globale();
MajLum();

var i=0;

//Dimensions du canvas
var cvs = document.getElementById('id_canvas_3D_globale');
var ct = cvs.getContext('2d');
cvs.width  = Wc_3D;
cvs.height = Hc_3D;

//RAZ et fond blanc
ct.fillStyle ='#FFFFFF';
ct.beginPath();
ct.fillRect( 0,0, Wc_3D-1, Hc_3D-1 );


//-MAJ DES CDG
var cdg_a=mod_Boitier_a.p_cdg;
var cdg_b=mod_Boitier_b.p_cdg;
var cdg_c=mod_Boitier_c.p_cdg;
var cdg_d=mod_Boitier_d.p_cdg;
var cdg_e=mod_Boitier_e.p_cdg;
var cdg_f=mod_Boitier_f.p_cdg;
var cdg_g=mod_Boitier_g.p_cdg;
var cdg_h=mod_Boitier_h.p_cdg;
var cdg_i=mod_Boitier_i.p_cdg;
var cdg_ii=mod_Boitier_ii.p_cdg;
var cdg_j=mod_Boitier_j.p_cdg;
var cdg_k=mod_Boitier_k.p_cdg;
var cdg_l=mod_Boitier_l.p_cdg;
var cdg_m=mod_Boitier_m.p_cdg;

//--Capteurs
var cdg_ff=mod_capteurFF.p_cdg;
var cdg_ca=mod_capteurCourant.p_cdg;



//--Diaphragme
var f_m=focale/1000;
var df=(f_m*f_m)/(d_map-f_m);
var p_f=df+f_m;
var dia_x=-(-dX);	var dia_y=0+dY;	var dia_p=p_f+dP-p_foyer_corps;
var cdg_dia=Rotation3D(dia_x,dia_y,dia_p).p.toFixed(6);


//--Silhouttes
var cdg_av=Rotation3D(0,0,d_avant_plan+dP+p_f).p.toFixed(6);
var cdg_map=Rotation3D(0,0,d_map+dP+p_f).p.toFixed(6);
var cdg_ar=Rotation3D(0,0,d_arriere_plan+dP+p_f).p.toFixed(6);

//--PDC
var cdg_pdc=Rotation3D(0,0,pdc_pres+dP+p_f).p.toFixed(6);


//1ier maj du tableau
var nbr_cdg_init=21;
Ordre = new Array (nbr_cdg_init+Nbr_poly_obj*N_objectif+2+4*N_molette+3+1);

Ordre[0]=cdg_a;		Ordre[1]=cdg_b;		Ordre[2]=cdg_c;		Ordre[3]=cdg_d;		Ordre[4]=cdg_e;
Ordre[5]=cdg_f;		Ordre[6]=cdg_g;		Ordre[7]=cdg_h;		Ordre[8]=cdg_i;		Ordre[9]=cdg_ii;
Ordre[10]=cdg_j;	Ordre[11]=cdg_k;	Ordre[12]=cdg_l;	Ordre[13]=cdg_m;	Ordre[14]=cdg_ff;
Ordre[15]=cdg_ca;	Ordre[16]=cdg_dia;	Ordre[17]=cdg_av;	Ordre[18]=cdg_map;	Ordre[19]=cdg_ar;	
Ordre[20]=cdg_pdc;	


//Ajout de l'objectif
for(var i=0;i!=N_objectif;i++){
Ordre[nbr_cdg_init+i]=PolynomesObjectifTT[0][i].p_cdg;
}

if(Nbr_poly_obj>=3){
	for(var i=0;i!=N_objectif;i++)
	Ordre[nbr_cdg_init+N_objectif+i]=PolynomesObjectifTT[1][i].p_cdg;

	for(var i=0;i!=N_objectif;i++)
	Ordre[nbr_cdg_init+2*N_objectif+i]=PolynomesObjectifTT[2][i].p_cdg;
}

if(Nbr_poly_obj>=5){
	for(var i=0;i!=N_objectif;i++)
	Ordre[nbr_cdg_init+3*N_objectif+i]=PolynomesObjectifTT[3][i].p_cdg;

	for(var i=0;i!=N_objectif;i++)
	Ordre[nbr_cdg_init+4*N_objectif+i]=PolynomesObjectifTT[4][i].p_cdg;
}

if(Nbr_poly_obj>=7){
	for(var i=0;i!=N_objectif;i++)
	Ordre[nbr_cdg_init+5*N_objectif+i]=PolynomesObjectifTT[5][i].p_cdg;

	for(var i=0;i!=N_objectif;i++)
	Ordre[nbr_cdg_init+6*N_objectif+i]=PolynomesObjectifTT[6][i].p_cdg;
}

if(Nbr_poly_obj>=9){
	for(var i=0;i!=N_objectif;i++)
	Ordre[nbr_cdg_init+7*N_objectif+i]=PolynomesObjectifTT[7][i].p_cdg;

	for(var i=0;i!=N_objectif;i++)
	Ordre[nbr_cdg_init+8*N_objectif+i]=PolynomesObjectifTT[8][i].p_cdg;
}


//Ajout de la molette
for(var i=0;i!=2+4*N_molette;i++)
Ordre[nbr_cdg_init+i+Nbr_poly_obj*N_objectif]=PolygomesMolette[i].p_cdg;

//Ajout des miroirs de la visée reflex
var cdg_mir=mod_miroir.p_cdg;
var cdg_mir_h=mod_miroir_h.p_cdg;
var cdg_mir_b=mod_miroir_b.p_cdg;
Ordre[nbr_cdg_init+Nbr_poly_obj*N_objectif+2+4*N_molette]=cdg_mir;
Ordre[nbr_cdg_init+Nbr_poly_obj*N_objectif+2+4*N_molette+1]=cdg_mir_h;
Ordre[nbr_cdg_init+Nbr_poly_obj*N_objectif+2+4*N_molette+2]=cdg_mir_b;


//Ajout des rayons
var cdg_rayons=cdg_j-0.000001;
Ordre[nbr_cdg_init+Nbr_poly_obj*N_objectif+2+4*N_molette+3]=cdg_rayons;



//-Trie du tableau
Ordre.sort(sortNumber);	

if(haut)
DrawGrille();

//Balaye les cdg dans l'ordre de profondeur.
//Une fois dessiné, le cdg passe à 'X' pour ne pas déssiner deux fois en cas de différents cdg de mêmes valeurs
for(var i=0;i!=Ordre.length;i++){

	ct.fillStyle ='rgba(0,0,0,0.5)';
	ct.strokeStyle ='rgba(0,0,0,0.5)';
	var lum_max=220;
	var lum_min=50;
	var temp_lum=0;
	var opp=0.29;
	
	//Objectif
	for(var ii=0;ii!=N_objectif;ii++){	
		for(var iii=0;iii!=Nbr_poly_obj;iii++){
			if(Ordre[i]==PolynomesObjectifTT[iii][ii].p_cdg){
				PolynomesObjectifTT[iii][ii].draw();
				PolynomesObjectifTT[iii][ii].p_cdg='X';
				ii=N_objectif-1;
			}
		}
	}
	
	//Molette
	for(var ii=0;ii!=2+4*N_molette;ii++){
		if(Ordre[i]==PolygomesMolette[ii].p_cdg){
			PolygomesMolette[ii].draw();
			PolygomesMolette[ii].p_cdg='X'
			ii=2+4*N_molette-1;
		}
	}
	


	switch(Ordre[i]){
		
		//Miroirs
		case cdg_mir_b:	mod_miroir_b.draw();		cdg_mir_b="X";	break;	
		case cdg_mir_h:	mod_miroir_h.draw();		cdg_mir_h="X";	break;
		case cdg_mir:	mod_miroir.draw();			cdg_mir="X";	break;
		//Boitier et viseur
		case cdg_a:		mod_Boitier_a.draw();		cdg_a="X";		break;
		case cdg_b:		mod_Boitier_b.draw();		cdg_b="X";		break;
		case cdg_c:		mod_Boitier_c.draw();		cdg_c="X";		break;	
		case cdg_d:		mod_Boitier_d.draw();		cdg_d="X";		break;		
		case cdg_e:		mod_Boitier_e.draw();		cdg_e="X";		break;				
		case cdg_f:		mod_Boitier_f.draw();		cdg_f="X";		break;		
		case cdg_g:		mod_Boitier_g.draw();		cdg_g="X";		break;		
		case cdg_h:		mod_Boitier_h.draw();		cdg_h="X";		break;	
		case cdg_i:		mod_Boitier_i.draw();		cdg_i="X";		break;	
		case cdg_ii:	mod_Boitier_ii.draw();		cdg_ii="X";		break;						
		case cdg_j:		mod_Boitier_j.draw();		cdg_j="X";		break;	
		case cdg_k:		mod_Boitier_k.draw();		cdg_k="X";		break;	
		case cdg_l:		mod_Boitier_l.draw();		cdg_l="X";		break;		
		case cdg_m:		mod_Boitier_m.draw();		cdg_m="X";					
										
						var x1=mod_miroir_b.Pts[0][0];			var y1=mod_miroir_b.Pts[0][1]; 				var p1=dP-p_foyer_corps;
						var x2=mod_miroir_b.Pts[1][0];			var y2=mod_miroir_b.Pts[1][1]; 				var p2=p1;
						var x4=mod_miroir_b.Pts[3][0];			var y4=mod_miroir_b.Pts[3][1];; 			var p4=p1;

						var proj_temp=proj_3D(x1,y1,p1);	x1=proj_temp.X;	y1=proj_temp.Y;
						proj_temp=proj_3D(x2,y2,p2);		x2=proj_temp.X;	y2=proj_temp.Y;
						proj_temp=proj_3D(x4,y4,p4);		x4=proj_temp.X;	y4=proj_temp.Y;
						
						//TBD: ajouter le cadre et réduire la taille du viseur et ajouter une lentille
						/*
						var cvs1 = document.getElementById("id_cvs_viseur_viseur");  
						DrawImagePerspective(cvs1,x1,y1,x2,y2,x4,y4);
						*/
						var cvs1 = document.getElementById("id_cvs_viseur_cadre");  
						DrawImagePerspective(cvs1,x1,y1,x2,y2,x4,y4);
						var cvs1 = document.getElementById("id_cvs_viseur_ar");  
						DrawImagePerspective(cvs1,x1,y1,x2,y2,x4,y4);
						var cvs1 = document.getElementById("id_cvs_viseur_map");  
						DrawImagePerspective(cvs1,x1,y1,x2,y2,x4,y4);
						var cvs1 = document.getElementById("id_cvs_viseur_av");  
						DrawImagePerspective(cvs1,x1,y1,x2,y2,x4,y4);
					
						break;					

		//Capteurs
		case cdg_ff:	mod_capteurFF.draw();		cdg_ff="X";		break;
		case cdg_ca:	mod_capteurCourant.draw();	cdg_ca="X";		break;
		//Diaphragme
		case cdg_dia:	DrawDiaph();				cdg_dia='X';	break;
		//Silhouettes
		case cdg_av:	var x1=l_img_av/2-dX_img_av;		var y1=(l_img_av*h_img_av/w_img_av)-offset_y_av; 	var p1=d_avant_plan+dP+p_f;
						var x2=-l_img_av/2-dX_img_av;		var y2=y1; 											var p2=p1;
						var x4=x1;							var y4=-offset_y_av; 								var p4=p1;

						var proj_temp=proj_3D(x1,y1,p1);	x1=proj_temp.X;	y1=proj_temp.Y;
						proj_temp=proj_3D(x2,y2,p2);		x2=proj_temp.X;	y2=proj_temp.Y;
						proj_temp=proj_3D(x4,y4,p4);		x4=proj_temp.X;	y4=proj_temp.Y;

						if(img_av.width)	
						DrawImagePerspective(img_av,x1,y1,x2,y2,x4,y4);
						
						cdg_av='X';
						break;
						
		case cdg_map:	var x1=l_img_map/2;		var y1=(l_img_map*h_img_map/w_img_map)-offset_y_map; 	var p1=d_map+dP+p_f;
						var x2=-l_img_map/2;	var y2=y1; 												var p2=p1;
						var x4=x1;				var y4=-offset_y_map; 									var p4=p1;

						var proj_temp=proj_3D(x1,y1,p1);	x1=proj_temp.X;	y1=proj_temp.Y;
						proj_temp=proj_3D(x2,y2,p2);		x2=proj_temp.X;	y2=proj_temp.Y;
						proj_temp=proj_3D(x4,y4,p4);		x4=proj_temp.X;	y4=proj_temp.Y;

						if(img_map.width)
						DrawImagePerspective(img_map,x1,y1,x2,y2,x4,y4);
						
						cdg_map='X';
						break;
						
		case cdg_ar:	var x1=l_img_ar/2-dX_img_ar;		var y1=(l_img_ar*h_img_ar/w_img_ar)-offset_y_ar; 	var p1=d_arriere_plan+dP+p_f;
						var x2=-l_img_ar/2-dX_img_ar;		var y2=y1; 											var p2=p1;
						var x4=x1;							var y4=-offset_y_ar; 								var p4=p1;

						var proj_temp=proj_3D(x1,y1,p1);	x1=proj_temp.X;	y1=proj_temp.Y;
						proj_temp=proj_3D(x2,y2,p2);		x2=proj_temp.X;	y2=proj_temp.Y;
						proj_temp=proj_3D(x4,y4,p4);		x4=proj_temp.X;	y4=proj_temp.Y;

						if(img_ar.width)
						DrawImagePerspective(img_ar,x1,y1,x2,y2,x4,y4);		
						
						cdg_ar='X';
						break;
						
		//PDC				
		case cdg_pdc: 	DrawZonePDC();	cdg_pdc='X';
						break;
						
						
		//Rayons
		case cdg_rayons: DrawRayons();	cdg_rayons='X';

	}

}

if(bas)
DrawGrille();


//--CADRE
ct.fillStyle ='#000000';
ct.beginPath();
ct.fillRect( 0,0, Wc_3D, 1 );	ct.fillRect( 0,Hc_3D-1, Wc_3D, 1 );	ct.fillRect( 0,0, 1, Hc_3D );	ct.fillRect( Wc_3D-1,0, 1, Hc_3D );
}

function DrawRayons(){

var cvs = document.getElementById('id_canvas_3D_globale');
var ct = cvs.getContext('2d');

var xo=1.0;var yo=1.0;var po=1.0;
var xa=1.0;var ya=1.0;var pa=1.0;
var xb=1.0;var yb=1.0;var pb=1.0;
var xc=1.0;var yc=1.0;var pc=1.0;
var xd=1.0;var yd=1.0;var pd=1.0;
var xe=1.0;var ye=1.0;var pe=1.0;
var xf=1.0;var yf=1.0;var pf=1.0;
var xg=1.0;var yg=1.0;var pg=1.0;
var xh=1.0;var yh=1.0;var ph=1.0;
var xi=1.0;var yi=1.0;var pi=1.0;
var xj=1.0;var yj=1.0;var pj=1.0;
var xk=1.0;var yk=1.0;var pk=1.0;
var xl=1.0;var yl=1.0;var pl=1.0;

//-RAYONS
var f_m=focale/1000;
var feq_m=f_equ/1000;
var df=(f_m*f_m)/(d_map-f_m);
var dfeq=(feq_m*feq_m)/(d_map-feq_m);
var p_f=df+f_m;
var xa=-l_capteur/2000-(-dX);	var ya=h_capteur/2000+dY;
var xb=l_capteur/2000-(-dX);	
var yd=-h_capteur/2000+dY;
var X0_cc=(xa+xb)/2;
var Y0_cc=(ya+yd)/2;
var xf_cc=X0_cc-(-dX)*(l_capteur/1000)/largeur_avant;
var yf_cc=Y0_cc+dY*(h_capteur/1000)/hauteur_avant;
var inc_angle=2*Math.PI/50;





//--CHAMP DE VISION
if(Rayons_3D=='dim'){
	
	
	var dxc=d_arriere_plan*Math.tan(angle_horiz*Math.PI/360.0);	//demi largeur de la scène au niveau de l'arrière plan
	var dyc=d_arriere_plan*Math.tan(angle_vert*Math.PI/360.0);	//demi hauteur de la scène au niveau de l'arrière plan

	//Arrière plan
	xa=dxc-(-dX);		ya=dyc+dY; 		pa=d_arriere_plan+dP+p_f;
	xb=-1*dxc-(-dX);	yb=dyc+dY; 		pb=d_arriere_plan+dP+p_f;
	xc=-1*dxc-(-dX);	yc=-1*dyc+dY; 	pc=d_arriere_plan+dP+p_f;
	xd=dxc-(-dX);		yd=-1*dyc+dY; 	pd=d_arriere_plan+dP+p_f;
	
	//Centre du diaph
	xo=dX;				yo=dY;			po=p_f+dP;
	
	//Sur le sol
	var k=yo/(yo-yc);
	xe=xa; 				ye=0; 			pe=pa;	
	xf=xb; 				yf=0; 			pf=pb;
	xh=xo-k*(xc-xo); 	yh=0; 			ph=po+k*(pc-po);
	xg=xo-k*(xe-xo); 	yg=0; 			pg=po+k*(pe-po);
	
	//Capteur
	xi=0.018-(-dX); 	yi=0.012+dY; 	pi=dP-(feq_m+dfeq-f_m-df);
	xj=-0.018-(-dX); 	yj=0.012+dY; 	pj=dP-(feq_m+dfeq-f_m-df);
	xk=-0.018-(-dX); 	yk=-0.012+dY; 	pk=dP-(feq_m+dfeq-f_m-df);
	xl=0.018-(-dX); 	yl=-0.012+dY; 	pl=dP-(feq_m+dfeq-f_m-df);	
	
	ct.strokeStyle ='rgba('+rayon_color+',0.5)';	
	
	//si une partie du champ est sur le sol
	if(pg<pf){
	
		ct.beginPath();
		var coord_3D = proj_3D(xi,yi,pi); xt=coord_3D.X; yt=coord_3D.Y;  ct.moveTo(xt,yt);
		coord_3D = proj_3D(xg,yg,pg); xt=coord_3D.X; yt=coord_3D.Y;  ct.lineTo(xt,yt);
		coord_3D = proj_3D(xf,yf,pf); xt=coord_3D.X; yt=coord_3D.Y;  ct.lineTo(xt,yt);
		coord_3D = proj_3D(xb,yb,pb); xt=coord_3D.X; yt=coord_3D.Y;  ct.lineTo(xt,yt);
		coord_3D = proj_3D(xl,yl,pl); xt=coord_3D.X; yt=coord_3D.Y;  ct.lineTo(xt,yt);
		coord_3D = proj_3D(xk,yk,pk); xt=coord_3D.X; yt=coord_3D.Y;  ct.lineTo(xt,yt);
		coord_3D = proj_3D(xa,ya,pa); xt=coord_3D.X; yt=coord_3D.Y;  ct.lineTo(xt,yt);
		coord_3D = proj_3D(xe,ye,pe); xt=coord_3D.X; yt=coord_3D.Y;  ct.lineTo(xt,yt);
		coord_3D = proj_3D(xh,yh,ph); xt=coord_3D.X; yt=coord_3D.Y;  ct.lineTo(xt,yt);
		coord_3D = proj_3D(xj,yj,pj); xt=coord_3D.X; yt=coord_3D.Y;  ct.lineTo(xt,yt);
		ct.closePath();
		ct.stroke();
		
		ct.beginPath();
		coord_3D = proj_3D(xa,ya,pa); xt=coord_3D.X; yt=coord_3D.Y;  ct.moveTo(xt,yt);
		coord_3D = proj_3D(xb,yb,pb); xt=coord_3D.X; yt=coord_3D.Y;  ct.lineTo(xt,yt);
		ct.stroke();
		
		ct.beginPath();
		coord_3D = proj_3D(xe,ye,pe); xt=coord_3D.X; yt=coord_3D.Y;  ct.moveTo(xt,yt);
		coord_3D = proj_3D(xf,yf,pf); xt=coord_3D.X; yt=coord_3D.Y;  ct.lineTo(xt,yt);
		ct.stroke();
		
		ct.beginPath();
		coord_3D = proj_3D(xh,yh,ph); xt=coord_3D.X; yt=coord_3D.Y;  ct.moveTo(xt,yt);
		coord_3D = proj_3D(xg,yg,pg); xt=coord_3D.X; yt=coord_3D.Y;  ct.lineTo(xt,yt);
		ct.stroke();
		
		ct.beginPath();
		coord_3D = proj_3D(xl,yl,pl); xt=coord_3D.X; yt=coord_3D.Y;  ct.moveTo(xt,yt);
		coord_3D = proj_3D(xi,yi,pi); xt=coord_3D.X; yt=coord_3D.Y;  ct.lineTo(xt,yt);
		coord_3D = proj_3D(xj,yj,pj); xt=coord_3D.X; yt=coord_3D.Y;  ct.lineTo(xt,yt);
		coord_3D = proj_3D(xk,yk,pk); xt=coord_3D.X; yt=coord_3D.Y;  ct.lineTo(xt,yt);
		ct.closePath();
		ct.stroke();
	}
	else{
	
		//Arrière plan
		ct.beginPath();
		var coord_3D = proj_3D(xa,ya,pa); xt=coord_3D.X; yt=coord_3D.Y;  ct.moveTo(xt,yt);
		coord_3D = proj_3D(xb,yb,pb); xt=coord_3D.X; yt=coord_3D.Y;  ct.lineTo(xt,yt);
		coord_3D = proj_3D(xc,yc,pc); xt=coord_3D.X; yt=coord_3D.Y;  ct.lineTo(xt,yt);
		coord_3D = proj_3D(xd,yd,pd); xt=coord_3D.X; yt=coord_3D.Y;  ct.lineTo(xt,yt);
		ct.closePath();
		ct.stroke();
		
		//Capteur
		ct.beginPath();		
		coord_3D = proj_3D(xi,yi,pi); xt=coord_3D.X; yt=coord_3D.Y;  ct.moveTo(xt,yt);
		coord_3D = proj_3D(xj,yj,pj); xt=coord_3D.X; yt=coord_3D.Y;  ct.lineTo(xt,yt);
		coord_3D = proj_3D(xk,yk,pk); xt=coord_3D.X; yt=coord_3D.Y;  ct.lineTo(xt,yt);
		coord_3D = proj_3D(xl,yl,pl); xt=coord_3D.X; yt=coord_3D.Y;  ct.lineTo(xt,yt);
		ct.closePath();
		ct.stroke();
		
		//Rayons
		ct.beginPath();
		coord_3D = proj_3D(xi,yi,pi); xt=coord_3D.X; yt=coord_3D.Y;  ct.moveTo(xt,yt);
		coord_3D = proj_3D(xc,yc,pc); xt=coord_3D.X; yt=coord_3D.Y;  ct.lineTo(xt,yt);
		ct.stroke();
		
		ct.beginPath();
		coord_3D = proj_3D(xj,yj,pj); xt=coord_3D.X; yt=coord_3D.Y;  ct.moveTo(xt,yt);
		coord_3D = proj_3D(xd,yd,pd); xt=coord_3D.X; yt=coord_3D.Y;  ct.lineTo(xt,yt);
		ct.stroke();
		
		ct.beginPath();
		coord_3D = proj_3D(xl,yl,pl); xt=coord_3D.X; yt=coord_3D.Y;  ct.moveTo(xt,yt);
		coord_3D = proj_3D(xb,yb,pb); xt=coord_3D.X; yt=coord_3D.Y;  ct.lineTo(xt,yt);
		ct.stroke();
		
		ct.beginPath();
		coord_3D = proj_3D(xk,yk,pk); xt=coord_3D.X; yt=coord_3D.Y;  ct.moveTo(xt,yt);
		coord_3D = proj_3D(xa,ya,pa); xt=coord_3D.X; yt=coord_3D.Y;  ct.lineTo(xt,yt);
		ct.stroke();
	
	
	
	}
	
	
}

//--FLOU AVANT
else if(Rayons_3D=='flou_av'){

	ct.fillStyle ='rgba('+avant_color+',0.5)';
	ct.lineWidth=1;
	
	xa=0;		ya=0;	pa=d_avant_plan+dP+p_f;
	pb=p_f+dP;	pc=dP;	pd=dP;	pe=p_f+dP;	
	
	for(i=inc_angle;i<=2*Math.PI;i+=inc_angle){
	
		xb=(f_m/(2*ouverture))*Math.cos(i)-(-dX);				yb=(f_m/(2*ouverture))*Math.sin(i)+dY;
		xc=(flou_avant/2)*Math.cos(i)+xf_cc;					yc=(flou_avant/2)*Math.sin(i)+yf_cc; 
		xd=(flou_avant/2)*Math.cos(i+inc_angle)+xf_cc;			yd=(flou_avant/2)*Math.sin(i+inc_angle)+yf_cc; 	
		xe=(f_m/(2*ouverture))*Math.cos(i+inc_angle)-(-dX);		ye=(f_m/(2*ouverture))*Math.sin(i+inc_angle)+dY;	
						
		ct.beginPath();
		coord_3D = proj_3D(xa,ya,pa); xt=coord_3D.X; yt=coord_3D.Y;  ct.moveTo(xt,yt);				
		coord_3D = proj_3D(xb,yb,pb); xt=coord_3D.X; yt=coord_3D.Y;  ct.lineTo(xt,yt);
		coord_3D = proj_3D(xc,yc,pc); xt=coord_3D.X; yt=coord_3D.Y;  ct.lineTo(xt,yt);
		coord_3D = proj_3D(xd,yd,pd); xt=coord_3D.X; yt=coord_3D.Y;  ct.lineTo(xt,yt);
		coord_3D = proj_3D(xe,ye,pe); xt=coord_3D.X; yt=coord_3D.Y;  ct.lineTo(xt,yt);
		ct.closePath();
		ct.fill();
	}	
}
//--FLOU ARRIERE
else if(Rayons_3D=='flou_ar'){
	//-Arrière plan
	var xf_cc=X0_cc-(-dX)*(l_capteur/1000)/largeur_arriere;
	var yf_cc=Y0_cc+dY*(h_capteur/1000)/hauteur_arriere;
	
	ct.fillStyle ='rgba('+arriere_color+',0.5)';
	ct.lineWidth=1;
	
	xa=0;		ya=0;	pa=d_arriere_plan+dP+p_f;
	pb=p_f+dP;	pc=dP;	pd=dP;	pe=p_f+dP;	
	
	for(i=inc_angle;i<=2*Math.PI;i+=inc_angle){
		
		xb=(f_m/(2*ouverture))*Math.cos(i)-(-dX);				yb=(f_m/(2*ouverture))*Math.sin(i)+dY;
		xc=-1*((flou_arriere/2)*Math.cos(i)-xf_cc);					yc=-1*((flou_arriere/2)*Math.sin(i)-yf_cc); 
		xd=-1*((flou_arriere/2)*Math.cos(i+inc_angle)-xf_cc);		yd=-1*((flou_arriere/2)*Math.sin(i+inc_angle)-yf_cc); 	
		xe=(f_m/(2*ouverture))*Math.cos(i+inc_angle)-(-dX);	ye=(f_m/(2*ouverture))*Math.sin(i+inc_angle)+dY;	
		
		ct.beginPath();
		coord_3D = proj_3D(xa,ya,pa); xt=coord_3D.X; yt=coord_3D.Y;	ct.moveTo(xt,yt);
		coord_3D = proj_3D(xb,yb,pb); xt=coord_3D.X; yt=coord_3D.Y; ct.lineTo(xt,yt);		
		coord_3D = proj_3D(xc,yc,pc); xt=coord_3D.X; yt=coord_3D.Y; ct.lineTo(xt,yt);
		coord_3D = proj_3D(xd,yd,pd); xt=coord_3D.X; yt=coord_3D.Y; ct.lineTo(xt,yt);
		coord_3D = proj_3D(xe,ye,pe); xt=coord_3D.X; yt=coord_3D.Y; ct.lineTo(xt,yt);
		ct.closePath();
		ct.fill();
	}

}
//--VISEE REFLEX
else if(Rayons_3D=='visee_reflex'){

	ct.beginPath();
	ct.strokeStyle ='rgba('+rayon_color+',0.5)';
	ct.fillStyle ='rgba('+rayon_color+',0.5)';
	ct.lineWidth=1;

	Line3D(0,0,d_map+dP+p_f,											mod_miroir.cdg[0],mod_miroir.cdg[1],mod_miroir.cdg[2]);
	Line3D(mod_miroir.cdg[0],mod_miroir.cdg[1],mod_miroir.cdg[2],		mod_miroir_h.cdg[0],mod_miroir_h.cdg[1],mod_miroir_h.cdg[2]);
	Line3D(mod_miroir_h.cdg[0],mod_miroir_h.cdg[1],mod_miroir_h.cdg[2],	mod_miroir_b.cdg[0],mod_miroir_b.cdg[1],mod_miroir_b.cdg[2]);
	Line3D(mod_miroir_b.cdg[0],mod_miroir_b.cdg[1],mod_miroir_b.cdg[2], -(-dX),dY+y_foyer_corps+h_fin_visee-(h_fin_visee-h_debut_visee)/2	,dP-p_foyer_corps);


}


}

function DrawImagePerspective(img,X0,Y0,X1,Y1,X2,Y2){

var cvs = document.getElementById('id_canvas_3D_globale');
var ct = cvs.getContext('2d');
 
X1-=X0;	Y1-=Y0;	X2-=X0;	Y2-=Y0;  
 
var U0=0;			var V0=0;
var U1=img.width-1;	var V1=0;
var U2=0;			var V2=img.height-1;
  
var det = 1 / (U1*V2 - U2*V1);

var A = (V2*X1 - V1*X2) * det;
var B = (V2*Y1 - V1*Y2) * det;
var C = (U1*X2 - U2*X1) * det;
var D = (U1*Y2 - U2*Y1) * det;
var E = X0 - A*U0 - C*V0;
var F = Y0 - B*U0 - D*V0;

ct.save();
ct.transform(A, B, C, D, E, F);
ct.drawImage(img,0,0,img.width,img.height);
ct.restore();
}

function DrawDiaph(){


var cvs_photographe = document.getElementById('id_canvas_3D_globale');
var ct_photographe = cvs_photographe.getContext('2d');

var Xpho=-1*(-dX);
var Ypho=dY;
var Ppho=dP;

var f_m=focale/1000;
var feq_m=f_equ/1000;
var df=(f_m*f_m)/(d_map-f_m);
var dfeq=(feq_m*feq_m)/(d_map-feq_m);
var p_f=df+f_m;

var inc_angle=2*Math.PI/50;


//-Disque plein
ct_photographe.beginPath();
xa=(f_m/Ouv_min)/2-(-dX);	ya=0+dY;	pa=p_f+dP;
coord_3D = proj_3D(xa,ya,pa); xt=coord_3D.X; yt=coord_3D.Y;  ct_photographe.moveTo(xt,yt);
for(i=inc_angle;i<=2*Math.PI;i+=inc_angle){
	xa=((f_m/Ouv_min)/2)*Math.cos(i)-(-dX);	ya=((f_m/Ouv_min)/2)*Math.sin(i)+dY;	pa=p_f+dP;
	coord_3D = proj_3D(xa,ya,pa); xt=coord_3D.X; yt=coord_3D.Y;  ct_photographe.lineTo(xt,yt);	
}

var lum_max=20;
var temp_lum=Math.round(lum_devant*lum_max);
ct_photographe.fillStyle ='rgba('+temp_lum+','+temp_lum+','+temp_lum+',0.66)';
ct_photographe.fill();



//-Trou
ct_photographe.beginPath();
xa=f_m/(2*ouverture)-(-dX);	ya=0+dY;	pa=p_f+dP;
coord_3D = proj_3D(xa,ya,pa); xt=coord_3D.X; yt=coord_3D.Y; ct_photographe.moveTo(xt,yt);
for(i=inc_angle;i<=2*Math.PI;i+=inc_angle){
	xa=(f_m/(2*ouverture))*Math.cos(i)-(-dX);	ya=(f_m/(2*ouverture))*Math.sin(i)+dY;	pa=p_f+dP;
	coord_3D = proj_3D(xa,ya,pa); xt=coord_3D.X; yt=coord_3D.Y;  ct_photographe.lineTo(xt,yt);
}
ct_photographe.fillStyle ='rgba(255,255,255,0.5)';
ct_photographe.fill();

//-Lamelles
var theta0=0;		//angle entre le centre et le point sur le grand cercle
var NbrLamelles=6;
var delta_angle=2*Math.PI/NbrLamelles;
var i=0;

//Le centre du daphragme est en (0,0)
//point sur le grand cercle
var xa=1.0;var ya=1.0;
//point sur le petit cercle
var xb=1.0;var yb=1.0;
//point entre A et B
var XM=1.0;var XM=1.0;
//centre du nouveau cercle
var xc=1.0;var yc=1.0;

var AB=1.0;	//distance entre A et B
var MC=1.0;	//distance entre M et C

//angle entre l'axe des abscices et le premier point puis entre le second point
var omega0=1.0;
var omega1=1.0
var omega2=1.0;

var R=(f_m/Ouv_min)/2;
var r=f_m/(2*ouverture);

for(i=0;i!=NbrLamelles;i++){

	xa=R*Math.cos(theta0+i*delta_angle)-(-dX);
	ya=R*Math.sin(theta0+i*delta_angle)+dY;
	
	xb=r*Math.cos(theta0+(i+1)*delta_angle)-(-dX);
	yb=r*Math.sin(theta0+(i+1)*delta_angle)+dY;
	
	XM=(xa+xb)/2;
	YM=(ya+yb)/2;
	
	AB=Math.sqrt((xa-xb)*(xa-xb)+(ya-yb)*(ya-yb));
	
	MC=Math.sqrt(R*R-(AB/2)*(AB/2));
	
	if(xa>=xb)
	omega0=Math.atan((ya-yb)/(xa-xb))-Math.PI/2;
	else
	omega0=Math.PI+Math.atan((ya-yb)/(xa-xb))-Math.PI/2;	

	xc=XM+MC*Math.cos(omega0);
	yc=YM+MC*Math.sin(omega0);
	
	if(yc<=ya)
	omega1=Math.acos((xa-xc)/R);
	else
	omega1=2*Math.PI-Math.acos((xa-xc)/R);
	
	if(yc<=yb)
	omega2=Math.acos((xb-xc)/R);
	else
	omega2=2*Math.PI-Math.acos((xb-xc)/R);
	
	ct_photographe.beginPath();	
	
	ct_photographe.lineWidth = 2;
	ct_photographe.strokeStyle ='rgba(255,255,255,0.5)';	
	
		
	var angle_d=omega1;
	var angle_f=omega2;
	var d_angle=(angle_f-angle_d)/10;
	
	if(angle_f<angle_d){
	angle_d=angle_d-2*Math.PI;
	d_angle=(angle_f+angle_d)/10;
	}
	
	if(d_angle<=0)
	d_angle=Math.PI/200;
	
	xa=xc+R*Math.cos(angle_d);
	ya=yc+R*Math.sin(angle_d);
	pa=p_f+dP;
	
	
	coord_3D = proj_3D(xa,ya,pa); xt=coord_3D.X; yt=coord_3D.Y; 

	ct_photographe.beginPath();
	ct_photographe.lineWidth = 1;
	ct_photographe.strokeStyle = '#ffffff';
	ct_photographe.moveTo(xt,yt);	
	
	var ii=d_angle;
	for(ii=angle_d+ii; ii<=angle_f; ii+=d_angle){
		xa=xc+R*Math.cos(ii);
		ya=yc+R*Math.sin(ii);		
		coord_3D = proj_3D(xa,ya,pa); xt=coord_3D.X; yt=coord_3D.Y; 
		ct_photographe.lineTo(xt,yt);
	}
	
	ct_photographe.stroke();
}





}

function DrawGrille(){
//TBD: largeur du sol = max(largeur max illus, cahmp de vision à l'arrière)
//TBD: grille jusqu'à #1m derrière le photographe

//--COULEUR DE FOND DE LA GRILLE DE PERSCPECTIVE
ct_3D.fillStyle=color_fond_perspective;
ct_3D.beginPath();



if(0){
coord_3D = proj_3D(-0.5*largeur_arriere-(-dX),0,-1*(d_arriere_plan+dP)); xt=coord_3D.X; yt=coord_3D.Y; ct_3D.moveTo(xt,yt);
coord_3D = proj_3D(0.5*largeur_arriere-(-dX),0,-1*(d_arriere_plan+dP)); xt=coord_3D.X; yt=coord_3D.Y; ct_3D.lineTo(xt,yt);
coord_3D = proj_3D(0.5*largeur_arriere-(-dX),0,d_arriere_plan+dP); xt=coord_3D.X; yt=coord_3D.Y; ct_3D.lineTo(xt,yt);
coord_3D = proj_3D(-0.5*largeur_arriere-(-dX),0,d_arriere_plan+dP); xt=coord_3D.X; yt=coord_3D.Y; ct_3D.lineTo(xt,yt);
}
else{

coord_3D = proj_3D(-grand,0,-grand); xt=coord_3D.X; yt=coord_3D.Y; ct_3D.moveTo(xt,yt);
coord_3D = proj_3D(grand,0,-grand); xt=coord_3D.X; yt=coord_3D.Y; ct_3D.lineTo(xt,yt);
coord_3D = proj_3D(grand,0,grand); xt=coord_3D.X; yt=coord_3D.Y; ct_3D.lineTo(xt,yt);
coord_3D = proj_3D(-grand,0,grand); xt=coord_3D.X; yt=coord_3D.Y; ct_3D.lineTo(xt,yt);
}
ct_3D.closePath();
ct_3D.fill();



//--GRILLE DE PERSPECTIVE
if(0){
if(haut){
	ct_3D.strokeStyle =color_grille_perspective;
	//Traits // x
	for(i=0;i<d_arriere_plan+dP;i+=pas_perspective){
		Line3D(-0.5*largeur_arriere-(-dX),0,i,0.5*largeur_arriere-(-dX),0,i);
		Line3D(-0.5*largeur_arriere-(-dX),0,-1*i,	0.5*largeur_arriere-(-dX),0,-1*i);
	}
	//Traits //p
	for(i=0;i<0.5*largeur_arriere-(-dX);i+=pas_perspective){
		Line3D(i,0,-1*(d_arriere_plan+dP),i,0,d_arriere_plan+dP);
		Line3D(-1*i,0,-1*(d_arriere_plan+dP),-1*i,0,d_arriere_plan+dP);
	}
}
}
else{
if(haut){
	ct_3D.strokeStyle =color_grille_perspective;
	//Traits // x
	for(i=0;i<grand+dP;i+=pas_perspective){
		Line3D(-0.5*grand-(-dX),0,i,0.5*grand-(-dX),0,i);
		Line3D(-0.5*grand-(-dX),0,-1*i,	0.5*grand-(-dX),0,-1*i);
	}
	//Traits //p
	for(i=0;i<0.5*grand-(-dX);i+=pas_perspective){
		Line3D(i,0,-1*(grand+dP),i,0,grand+dP);
		Line3D(-1*i,0,-1*(grand+dP),-1*i,0,grand+dP);
	}
}



}

}

function DrawZonePDC(){

var cvs_photographe = document.getElementById('id_canvas_3D_globale');
var ct_photographe = cvs_photographe.getContext('2d');

var f_m=focale/1000;
var feq_m=f_equ/1000;
var df=(f_m*f_m)/(d_map-f_m);
var dfeq=(feq_m*feq_m)/(d_map-feq_m);
var p_f=df+f_m;

//--pdC
ct_photographe.strokeStyle ='rgba('+rayon_color+',0.5)';
ct_photographe.fillStyle ='rgba('+rayon_color+',0.5)';

var xt=1.0;
var yt=1.0;



var pdc_loin_t=pdc_loin;

if(pdc_loin_t>999999)
pdc_loin_t=999999;

ct_photographe.beginPath();
if(0){
coord_3D = proj_3D(-0.5*largeur_arriere-(-dX),0,pdc_pres+dP+p_f); xt=coord_3D.X; yt=coord_3D.Y; 	ct_photographe.moveTo(xt,yt);
coord_3D = proj_3D(-0.5*largeur_arriere-(-dX),0,pdc_loin_t+dP+p_f); xt=coord_3D.X; yt=coord_3D.Y; 	ct_photographe.lineTo(xt,yt);
coord_3D = proj_3D(0.5*largeur_arriere-(-dX),0,pdc_loin_t+dP+p_f); xt=coord_3D.X; yt=coord_3D.Y; 	ct_photographe.lineTo(xt,yt);
coord_3D = proj_3D(0.5*largeur_arriere-(-dX),0,pdc_pres+dP+p_f); xt=coord_3D.X; yt=coord_3D.Y; 		ct_photographe.lineTo(xt,yt);
}
else{
coord_3D = proj_3D(-0.5*grand-(-dX),0,pdc_pres+dP+p_f); xt=coord_3D.X; yt=coord_3D.Y; 	ct_photographe.moveTo(xt,yt);
coord_3D = proj_3D(-0.5*grand-(-dX),0,pdc_loin_t+dP+p_f); xt=coord_3D.X; yt=coord_3D.Y; 	ct_photographe.lineTo(xt,yt);
coord_3D = proj_3D(0.5*grand-(-dX),0,pdc_loin_t+dP+p_f); xt=coord_3D.X; yt=coord_3D.Y; 	ct_photographe.lineTo(xt,yt);
coord_3D = proj_3D(0.5*grand-(-dX),0,pdc_pres+dP+p_f); xt=coord_3D.X; yt=coord_3D.Y; 		ct_photographe.lineTo(xt,yt);
}
ct_photographe.closePath();

ct_photographe.stroke();
ct_photographe.fill();
}

function MajLum(){

var normalise=lum_x*lum_x+lum_y*lum_y+lum_p*lum_p;
if(normalise!=0){
	normalise=1/normalise;
	normalise=Math.sqrt(normalise);
	lum_x=lum_x*normalise;	lum_y=lum_y*normalise;	lum_p=lum_p*normalise;
}

//Haut
var v_x=0; var v_y=1; var v_p=0;
var coord=Rotation3D(v_x,v_y,v_p);
v_x=coord.x;	v_y=coord.y;	v_p=coord.p;
normalise=v_x*v_x+v_y*v_y+v_p*v_p;
if(normalise!=0){
	normalise=1/normalise;
	normalise=Math.sqrt(normalise);
	v_x=v_x*normalise;	v_y=v_y*normalise;	v_p=v_p*normalise;
	lum_haut=v_x*lum_x+v_y*lum_y+v_p*lum_p;
}
else
	lum_haut=0;
	
//Bas
v_x=0; v_y=-1; v_p=0;
coord=Rotation3D(v_x,v_y,v_p);
v_x=coord.x;	v_y=coord.y;	v_p=coord.p;
normalise=v_x*v_x+v_y*v_y+v_p*v_p;
if(normalise!=0){
	normalise=1/normalise;
	normalise=Math.sqrt(normalise);
	v_x=v_x*normalise;	v_y=v_y*normalise;	v_p=v_p*normalise;
	lum_bas=v_x*lum_x+v_y*lum_y+v_p*lum_p;
}
else
	lum_bas=0;	
	
//Gauche
v_x=-1; v_y=0; v_p=0;
coord=Rotation3D(v_x,v_y,v_p);
v_x=coord.x;	v_y=coord.y;	v_p=coord.p;
normalise=v_x*v_x+v_y*v_y+v_p*v_p;
if(normalise!=0){
	normalise=1/normalise;
	normalise=Math.sqrt(normalise);
	v_x=v_x*normalise;	v_y=v_y*normalise;	v_p=v_p*normalise;
	lum_gauche=v_x*lum_x+v_y*lum_y+v_p*lum_p;
}
else
	lum_gauche=0;		
	
//Droite
v_x=1; v_y=0; v_p=0;
coord=Rotation3D(v_x,v_y,v_p);
v_x=coord.x;	v_y=coord.y;	v_p=coord.p;
normalise=v_x*v_x+v_y*v_y+v_p*v_p;
if(normalise!=0){
	normalise=1/normalise;
	normalise=Math.sqrt(normalise);
	v_x=v_x*normalise;	v_y=v_y*normalise;	v_p=v_p*normalise;
	lum_droite=v_x*lum_x+v_y*lum_y+v_p*lum_p;
}
else
	lum_droite=0;	

//Devant
v_x=0; v_y=0; v_p=1;
coord=Rotation3D(v_x,v_y,v_p);
v_x=coord.x;	v_y=coord.y;	v_p=coord.p;
normalise=v_x*v_x+v_y*v_y+v_p*v_p;
if(normalise!=0){
	normalise=1/normalise;
	normalise=Math.sqrt(normalise);
	v_x=v_x*normalise;	v_y=v_y*normalise;	v_p=v_p*normalise;
	lum_devant=v_x*lum_x+v_y*lum_y+v_p*lum_p;
}
else
	lum_devant=0;		

//Derriere
v_x=0; v_y=0; v_p=-1;
coord=Rotation3D(v_x,v_y,v_p);
v_x=coord.x;	v_y=coord.y;	v_p=coord.p;
normalise=v_x*v_x+v_y*v_y+v_p*v_p;
if(normalise!=0){
	normalise=1/normalise;
	normalise=Math.sqrt(normalise);
	v_x=v_x*normalise;	v_y=v_y*normalise;	v_p=v_p*normalise;
	lum_derriere=v_x*lum_x+v_y*lum_y+v_p*lum_p;
}
else
	lum_derriere=0;
}