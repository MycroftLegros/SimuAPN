//HISTOGRAMMES
//dimension du canvas contenant l'image dont on calcul l'histogramme
largeur_vh=100;
hauteur_vh=100;

//CALCUL DE L'HISTO
flag_nb=1;	//à 1 si photo en noir et blanc

//Nbr de pixel pour une valeur donnée (pour tracer les histos)
R=new Array (256);	
V=new Array (256);
B=new Array (256);
L=new Array (256);


//Tableaux pour récupérer l'image
Pix_R=new Array(10000);	
Pix_V=new Array(10000);
Pix_B=new Array(10000);
Pix_T=new Array(10000);



//TRACE HISTO
ombre1='#7C7C7C';	//pour les ombres des histogrammes
ombre2='#A9A9A9';	//pour les ombres des histogrammes

color_axes_lum='#777777';
offset_x_lum=5;
offset_y_lum=5;
max_y_lum=100;
w_lum=255+2*offset_x_lum;
h_lum=max_y_lum+2*offset_y_lum;

color_axes_rvb='#777777';
offset_x_rvb=5;
offset_y_rvb=6;
max_y_rvb=50;
w_rvb=255+2*offset_x_rvb;
h_rvb=3*max_y_rvb+4*offset_y_rvb;

//DEPASSEMENTS HISTO
pix_bouche=0;
pix_crame=0;
pix_R_sat=0;
pix_V_sat=0;
pix_B_sat=0;
k_sat=0.35;	//% de luminosité pour mettre en évidence les zones non saturées
seuil_blanc=180;	//limite pour dsitinguer RVB saturé ou couleur cramée
pix_min_lum=1;
pix_min_rvb=1;



Nbr_graph=2;	//Nbr de graphiques à afficher: 1,2 ou 4


//Décalage des illustrations, en m
dX_img_av=0.5;
dX_img_ar=-0.5;

//--GENERAL
Navigateur="Chrome";

flag_init =1;


flag_cadrage_constant=0;

//Pour gérer les priorités ouverture/vitesse
flag_reglage_expo="ouverture";		//expo ouverture, vitesse ou manuel

cpt_vitesse=15;
cpt_ISO=7;
flag_triangle_expo="ouverture";	//vitesse, ouverture ou ISO


//Variables saisies
cdc_denom=1730;		//valeur du denomunateur pour calculer le cercle de confusion: 1440,1730,3000
unite="cm, m, km/h"	//unités de mesure: "cm,m,km/h" ou "in,ft,mph"
pas_perspective=1.0;	//pas entre 2 carrés de perspective, en m, utilisée en vue 3D_globale et pour la vue viseur

//Variables calculées
cdc=1.0;	//cdc en m


//-Deplacement du photographe
dY=1.1;	//déplacement du photographe en absices
dX=0;	//déplacement du photographe en ordonnées
dP=0;	//déplacement du photographe en profondeur


//-APN (init avec les valeurs du D800)
//Variables saisies
l_capteur=36.0;			//largeur du capteur en mm
h_capteur=24.0;			//hauteur du capteur en mm
filtre_aa=1;			//1 si filtre anti-aliasing, 0 sinon
definition=36.3;		//définition du capteur en Mpx
capteur='full-frame';	//type de capteur
dynamique_capteur=14;	//dynamique affectée par les ISO
dynamique_capteur_0=14;	//dynamique à 100 ISO

//-Exposition
//Variables saisies

vitesse=0.004;	//durée de l'exposition
ISO=320;		//sensibilité ISO

//Variables calculées
vitesse_string='1/250';
expo=1.0;	//valeur de l'exposition en EV


//Variables calculées
format_capteur="3:2";	//format du capteur: 3:2 ou 4:3 ou ?
taille_pixel=1.0;	//taille d'un pixel en m
flou_filtre_aa=1.0;	//flou dû au filtre anti aliasing, en m
crop_factor=1.0;


//-OBJECTIF
//-Variables saisies
focale=50.0;				//Longueur focale en mm
anti_vibration=0;			//1 si acti, 0 sinon
resolution=17;				//resolution en P-Mpx
ab_chro=7;					//aberations chromatiques en µm
Ouv_min=1.8;
flag_obj_predefinis=0;
cpt_obj=6;					//pour pointer dans le tableau contenant tous les modèles d'objectifs pré-définis
ouverture=5.6;				//ouverture du diaphragme
cpt_ouverture=19;
cpt_ouverture_min=9;		//pour ne pas choisir une ouverture inférieure à l'ouverture min



//Variables calculées
f_equ=1.0;			//focale équivalente en mm
angle_horiz=1.0;	//angle de champ horizontal en °
angle_vert=1.0;		//angle de champ vertical en °
flou_diff=1.0;		//flou dû à la diffraction, en m
flou_abb_chro=1.0;	//flou dû aux abbérations chromatiques, en m
flou_res=1.0;		//flou dû à la résolution de l'objectif, en m


//-PRISE DE VUE
//-Variables saisies
d_map=6.75;			//distance de map en m
d_arriere_plan=11.35;	//distance de l'arrière plan en m
d_avant_plan=4.9;	//distance de l'avant plan en m
v_sujet=0.0;		//vitesse de déplacement du sujet en km/h
lum_scene_EV=11.0;		//luminosité de la scène en EV
tremblement=1.0;	//0.5,1,1.5,2 en fonction de la tremblote

//-Variables calculées
//--Pdc
pdc_pres=1.0;	//debut de la pdc, en m
pdc_loin=1.0;	//fin de la pdc, en m
pdc=1.0;		//taille de la pdc, en m
//-Flous
flou_avant=1.0;		//flou au niveau de l'avant plan, en m
flou_arriere=1.0;	//flou au niveau de l'arrière plan, en m
//--Hyperfocale
hyperfocale=1.0;	//hyperfocale, en m
//-Dimensions de la scene
largeur_arriere=1.0;	//largeur au niveau de l'arrière plan
hauteur_arriere=1.0;	//hauteur au niveau de l'arrièreplan
largeur_avant=1.0;	
hauteur_avant=1.0;	
//-Flou de bougé et flou de mouvement
vitesse_securite=1.0;
flou_bouge=1.0;
vitesse_anti_mouvement=1.0;
flou_mouvement=1.0;



//-ECRAN
//-Variables saisies
ecran_x=2048;	//nbr de pixels en largeur
ecran_y=1536;	//nbr de pixels en hauteur
ecran_diag=22;	//diagonale de l'écran en inch
ecran_zoom=100;	//taux de zoom en %
//-Variables calculées
ppi_ecran=100;
format_ecran="1:1";
distance_min_ecran=20.0;
tirage_equ_ecran="100x100";

//-TIRAGE
//-Variables saisies
tirage_x=15.0;					//largeur du tirage en cm
tirage_def_min=36.0;			//définition min de la photo pour le tirage
tirage_resolution=300;			//resolution du tirage en dpi
tirage_distance_observation=50;	//distance d'observation du tirage en cm
//-Variables calculées
tirage_y=10.0;
taille_tirage="100x100";
distance_min_tirage=20.0;
dpi_min_tirage=300;



//--INTERFACE 3D
haut=0;
bas=0;
droite=0;
gauche=0;
devant=0;
derriere=0;

lum_derriere	=0;
lum_devant	=0;
lum_droite	=0;
lum_gauche	=0;
lum_bas	=0;
lum_haut	=0;
lum_x	=0;
lum_y	=0;
lum_p	=0;

//Context 2D du canvas
ct_3D = document.getElementById('id_canvas_3D_globale').getContext('2d');

//Dimensions du canvas
Wc_3D=0;
Hc_3D=0;

//Centre de rotation
X0_3D=0;
Y0_3D=0;

//Sauvegarde des coordonées de la souris
X_3D_save=0;
Y_3D_save=0;

//hauteur en m et coefficient
hc_3D=0;					
k_px_3D=0;

//vecteur de luminosité
lum_x=0;	lum_y=0;	lum_p=1;

//cos et sin pour les rotations selon x,y,p
cos_x_3D=0;
sin_x_3D=0;
cos_y_3D=0;
sin_y_3D=0;
cos_z_3D=0;
sin_z_3D=0;

//Nom du canvas courant
cvs_3d="X";

//coefficients de la matrice de rotation selon un axe quelconque
Rot1_1_3D=0;
Rot1_2_3D=0;
Rot1_3_3D=0;
Rot2_1_3D=0;
Rot2_2_3D=0;
Rot2_3_3D=0;
Rot3_1_3D=0;
Rot3_2_3D=0;
Rot3_3_3D=0;	

//Pour la translation
Tx_3D=0;
Ty_3D=0;
Tp_3D=0;



//--CANVAS 3D_GLOBALE
flag_mvt_3D="rotation";	//rotation ou translation

Wc_3D_globale=400;//351;		//Largeur du canvas, en px
h_cvs_3D_globale=3.44;	//Hauteur du canvas, en m, utilisé pour zoomer/dé-zoomer

flag_clic_3D_globale=0;	//Indique si la souris est cliquée ou non

//Angles de rotations selon x,y,p
theta_x_3D_globale=-Math.PI/200;//;//Math.PI/20;
theta_y_3D_globale=0.95*Math.PI;//Math.PI/20;
theta_p_3D_globale=0;

//Coefficients de la matrice de rotation selon un axe quelconque
Rot1_1_3D_globale=1;
Rot1_2_3D_globale=0;
Rot1_3_3D_globale=0;
Rot2_1_3D_globale=0;
Rot2_2_3D_globale=1;
Rot2_3_3D_globale=0;
Rot3_1_3D_globale=0;
Rot3_2_3D_globale=0;
Rot3_3_3D_globale=1;

//Pour la translation
Tx_3D_globale=0;
Ty_3D_globale=0;
Tp_3D_globale=0;

Rayons_3D='aucune'; //Selction d'un affichage: 'dim' ou 'flou_av' ou 'flou_ar'


//Couleurs
//-Couleurs
color_grille_flou='119,119,119';

cdc_color='51,102,204';			//bleu
AA_color='255,153,0';			//orange
diffraction_color='16,150,24';	//vert
AC_color='153,0,153';			//violet
res_color='220,57,18';			//rouge

avant_color='221,68,119';		//rose
arriere_color='102,170,20';		//caca d'oie
map_color='51,102,204';			//bleu

bouge_color='0,153,198';		//turquoise
angle_color='0,153,198';		//turquoise
color_pdc='220,57,18';			//rouge

color_grille_perspective='rgba(240,240,240,1)';

color_fond_perspective='rgba(220,220,220,1)';

FF_color='16,150,24';			//vert
capteur_color='255,153,0';		//orange
rayon_color='51,102,204';


//--POLYGONES
//--OBJECTIF
Nbr_poly_obj=1;	//1,3,5,7,9 en fonction du nombre de cylindres (de 1 à 5)


//--APN
//-Corps
var l_corps=0.146;	//OK
var h_corps=0.0984;	//OK
var p_corps=0.059;	//OK

var x_foyer_corps=0.0898;	//OK
var y_foyer_corps=0.05;		//TBC
var p_foyer_corps=0.0125;	//OK

//-Viseur
var l_viseur=0.0499;	//OK
var h_viseur=0.0246;	//OK
var p_viseur=0.0815;	//OK
var dx_viseur=x_foyer_corps-l_viseur/2;	//décalage de b1 p/r à a1

//-Poignée
var l_poignee=0.0378;	//OK
var h_poignee=h_corps;	//OK
var p_poignee=0.00968;	//OK

//-Pour la visée reflexe
var h_fin_visee=0.005;							//le miroir du bas monte (en y) jusqu'à la surface haute du boitier (sans le viseur) + h_fin_visee
var h_debut_visee=h_fin_visee-24/1000;	//le miroir du bas descend (en y) jusqu'à la surface haute du boitier (sans le viseur) - h_debut_visee


//--CANVAS GRAPH DE LA PDC
marge_x_cvs_PDC=30;	
marge_x_fin_cvs_PDC=40;	
marge_y_cvs_PDC=30;
largeur_canvas_graph_pdc=300;
hauteur_canvas_graph_pdc=200;
flag_clic_illu_pdc=0;
posX_pdc=0;
posX_0_pdc=0;
d_dernier_point=1.5*d_arriere_plan;
y_reel_graph_pdc=-1;	//taille de l'axe des ordonnées
surbrillance='?';


//--CANVAS DISTANCES
hauteur_canvas_distances=55;
largeur_canvas_distances=400;
marge_x_distance=10;
surbrillance='?';
cdc_color='51,102,204';			
flag_clic_distance=0;
mouseX_0_distance=0;



//-CANVAS VISEUR
flag_draw_expo=0;	//à 1 si la luminosité des illustrations doit changer avec l'expo
flag_draw_flou=0;	//à 1 si le flou des illustrations doit changer avec le flou de mise au point


av_ar_photographe=0;	//déplacement du photographe, en m
flag_clic_viseur=0;		//à 1 si l'on maintient le clic dans la zone scène
	
posX_0 = 1;					//position de la souris au moment d'un clic dans la zone scène
posY_0 = 1;
inc_deplacement_photographe=25;	//le nbr de valeurs possible est le double
l_reelle=1.0;		//largeur d'un carré en m


img_av = document.createElement("IMG");
img_ar = document.createElement("IMG");
img_map = document.createElement("IMG");

var cvs_temp_map = document.getElementById('id_cvs_viseur_map');
var ct_temp_map = cvs_temp_map.getContext('2d');
var cvs_temp_av = document.getElementById('id_cvs_viseur_av');
var ct_temp_av = cvs_temp_av.getContext('2d');
var cvs_temp_ar = document.getElementById('id_cvs_viseur_ar');
var ct_temp_ar = cvs_temp_ar.getContext('2d');

imageData_av = ct_temp_av.getImageData(0, 0, 300, 300);
imageData_ar = ct_temp_ar.getImageData(0, 0, 300, 300);
imageData_map = ct_temp_map.getImageData(0, 0, 300, 300);

largeur_canvas_viseur=400;		//largeur effective du canvas

//Choix des illustrations pour l'av, la map et l'ar
cpt_choix_illu_av=1;
cpt_choix_illu_ar=4;
cpt_choix_illu_map=2;

cpt_choix_illu_max=4;

//DataURL pour contenir les illus aux différentes couleurs
dataURL_chat_av = cvs_temp_av.toDataURL("image/png");
dataURL_chat_ar = cvs_temp_av.toDataURL("image/png");
dataURL_chat_map = cvs_temp_av.toDataURL("image/png");

dataURL_bigben_av = cvs_temp_ar.toDataURL("image/png");
dataURL_bigben_ar = cvs_temp_ar.toDataURL("image/png");
dataURL_bigben_map = cvs_temp_ar.toDataURL("image/png");

dataURL_parapluie_av = cvs_temp_map.toDataURL("image/png");
dataURL_parapluie_ar = cvs_temp_map.toDataURL("image/png");
dataURL_parapluie_map = cvs_temp_map.toDataURL("image/png");

dataURL_arbre_av = cvs_temp_av.toDataURL("image/png");
dataURL_arbre_ar = cvs_temp_av.toDataURL("image/png");
dataURL_arbre_map = cvs_temp_av.toDataURL("image/png");

//Caractéristiques des différentes illustrations
w_img_ar=150;
h_img_ar=300;
l_img_ar=0.26469;
offset_y_ar=0;//0.0794;

w_img_av=133;		
h_img_av=300;		
l_img_av=0.8202;	
offset_y_av=0.0;

w_img_map=300;
h_img_map=197;
l_img_map=147.71;
offset_y_map=0;

//Dessin du viseur
marge_Y_bas=50;
marge_X=10;	//marge sur les côtés
marge_Y=10;	//marge en haut




//--CANVAS CHOIX DU MODE
img_MAS = document.createElement("IMG");
img_MAS.src="MAS.png";

flag_clic_roue_mode=0;

Y0_roue_mode=0;



//--CANVAS MOLETTE DE REGLAGE
img_fond = document.createElement("IMG");
img_fond.src="Fond.png";


X_molette_R_save=0;
Wc_molette_R=100;			//Largeur du canvas, en px
h_cvs_molette_R=0.04;		//Largeur du canvas, en m


flag_clic_molette_R=0;	//Indique si la souris est cliquée ou non

//Angles de rotations selon x,y,p
theta_x_molette_R=Math.PI/10;
theta_y_molette_R=0;
theta_p_molette_R=0;

Rot1_1_molette_R=1;
Rot1_2_molette_R=0;
Rot1_3_molette_R=0;
Rot2_1_molette_R=0;
Rot2_2_molette_R=1;
Rot2_3_molette_R=0;
Rot3_1_molette_R=0;
Rot3_2_molette_R=0;
Rot3_3_molette_R=1;

//Pour l'incrément en fonction de la position de la molette
d_x_molette_R=0;
d_x_molette_R_save=0;

