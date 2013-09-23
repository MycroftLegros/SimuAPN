//Choix des illustrations pour l'av, la map et l'ar
cpt_choix_illu_max = 4;

//--------
//----Saisies
//----Calculées
//----IHM
//----#define


//--------Pour le fonctionnement general
//----Saisies
flag_cadrageConstant = 0; //force un cadrage constant au niveau de la map (une modif de la focale, du capteur,.. est compensée par une autre modif)
unite = "cm, m, km/h"; //unités de mesure: "cm,m,km/h" ou "in,ft,mph" NON UTILISE
//----Calculées
flag_init = 1; //à 1 au début du soft, pour les init
//----IHM


//--------APN
//----Saisies
modeAPN = "ouverture"; //modes: ouverture, vitesse ou manuel
selectMoletteReglage = "ouverture"; //vitesse, ouverture ou ISO
vitesse = 0.004; //durée de l'exposition
ISO = 320; //sensibilité ISO
//----Calculées
vitesseSecurite = 1.0;
vitesseSecuriteMvt = 1.0;
cpt_vitesse = 15;
cpt_ISO = 7;
//----IHM
vitesse_string = '1/250';
//----#define



//--------CAPTEUR
//----Saisies
cdc_denominateur = 1730; //valeur du denomunateur pour calculer le cercle de confusion: 1440,1730,3000
filtreAA = 1; //1 si filtre anti-aliasing, 0 sinon
definition = 36.3; //définition du Capteur en Mpx
Capteur = 'full-frame'; //type de Capteur
dynamiqueCapteur100ISO = 14; //dynamique à 100 ISO
//----Calculées
cdc = 1.0; //cdc en m
l_capteur = 36.0; //largeur du Capteur en mm
h_capteur = 24.0; //hauteur du Capteur en mm
dynamiqueCapteurISOCourant = 14; //dynamique affectée par les ISO
formatCapteur = "3:2"; //format du Capteur: 3:2 ou 4:3 ou ?
taillePixel = 1.0; //taille d'un pixel en m
flouFiltreAA = 1.0; //flou dû au filtre anti aliasing, en m
cropFactor = 1.0;
//----IHM
//----#define
color_cdc = '51,102,204'; //bleu
color_capteurCourant = '255,153,0'; //orange
color_capteurFF = '16,150,24'; //vert
color_flouFiltreAA = '255,153,0'; //orange



//--------OBJECTIF
//----Saisies
focale = 50.0; //Longueur focale en mm
antiVibration = 0; //1 si acti, 0 sinon
resolution = 17; //resolution en P-Mpx
abberationChromatique = 7; //aberations chromatiques en µm
flag_objectifPredefini = 0;
ouverture = 5.6; //ouverture du diaphragme
ouvertureMin = 1.8;
flouAC = 1.0; //flou dû aux abbérations chromatiques, en m
//----Calculées
cpt_ouverture = 19;
cpt_ouvertureMin = 9; //pour ne pas choisir une ouverture inférieure à l'ouverture min
flouResolution = 1.0; //flou dû à la résolution de l'objectif, en m
focaleEquivalente = 1.0; //focale équivalente en mm
angleChampHorizontal = 1.0; //angle de champ horizontal en °
angleChampVertical = 1.0; //angle de champ vertical en °
//----IHM
//----#define
color_flouAC = '153,0,153'; //violet
color_flouresolution = '220,57,18'; //rouge



//--------DIAPHRAGME DE L'OBJECTIF
//----Saisies
//----Calculées
flouDiffraction = 1.0; //flou dû à la diffraction, en m
//----IHM
//----#define
color_floudiffraction = '16,150,24'; //vert



//--------EXPOSITION
//----Saisies
luminosite_EV = 11.0; //luminosité de la scène en EV
//----Calculées
expo = 1.0; //valeur de l'exposition en EV
//----IHM
//----#define



//--------AVANT PLAN
//----Saisies
d_avantPlan = 4.9; //distance de l'avant plan en m
//----Calculées
w_m_avantPlan = 1.0;
h_m_avantPlan = 1.0;
//----IHM
img_avantPlan = document.createElement("IMG");
var cvs_temp_avantPlan = document.getElementById('id_cvs_inter');
var ct_temp_avantPlan = cvs_temp_avantPlan.getContext('2d');
imageData_avantPlan = ct_temp_avantPlan.getImageData(0, 0, 300, 300);
cpt_illustrationAvantPlan = 1;
w_img_avantPlan = 133;
h_img_avantPlan = 300;
w_m_img_avantPlan = 0.8202;
offset_y_avantPlan = 0.0;
//----#define
color_avantPlan = '221,68,119'; //rose



//--------PLAN MAP
//----Saisies
d_map = 6.75; //distance de map en m
vitesseSujet = 0.0; //vitesse de déplacement du sujet en km/h
//----Calculées
flouMvt = 1.0;
<<<<<<< HEAD
=======
w_m_map = 1.0;
h_m_map = 1.0;
>>>>>>> ménage, tuning et fix
//----IHM
img_map = document.createElement("IMG");
var cvs_temp_map = document.getElementById('id_cvs_inter');
var ct_temp_map = cvs_temp_map.getContext('2d');
imageData_map = ct_temp_map.getImageData(0, 0, 300, 300);
w_img_map = 300;
h_img_map = 197;
w_m_img_map = 147.71;
offset_y_map = 0;
cpt_illustrationMap = 2;
//----#define
color_map = '51,102,204'; //bleu



//--------ARRIERE PLAN
//----Saisies
d_arrierePlan = 11.35; //distance de l'arrière plan en m
//----Calculées
w_m_arrierePlan = 1.0; //largeur au niveau de l'arrière plan
h_m_arrierePlan = 1.0; //hauteur au niveau de l'arrièreplan
//----IHM
img_arrierePlan = document.createElement("IMG");
var cvs_temp_arrierePlan = document.getElementById('id_cvs_inter');
var ct_temp_arrierePlan = cvs_temp_arrierePlan.getContext('2d');
imageData_arrierePlan = ct_temp_arrierePlan.getImageData(0, 0, 300, 300);
cpt_illustrationArrierePlan = 4;
w_img_arrierePlan = 150;
h_img_arrierePlan = 300;
w_m_img_arrierePlan = 0.26469;
offset_y_arrierePlan = 0; //0.0794;
//----#define
color_arrierePlan = '102,170,20'; //caca d'oie


//TBD: faire une fonction init
dataURL_chat_avantPlan = cvs_temp_avantPlan.toDataURL("image/png");
dataURL_bigben_avantPlan = cvs_temp_arrierePlan.toDataURL("image/png");
dataURL_parapluie_avantPlan = cvs_temp_map.toDataURL("image/png");
dataURL_arbre_avantPlan = cvs_temp_avantPlan.toDataURL("image/png");
dataURL_chat_arrierePlan = cvs_temp_avantPlan.toDataURL("image/png");
dataURL_bigben_arrierePlan = cvs_temp_arrierePlan.toDataURL("image/png");
dataURL_parapluie_arrierePlan = cvs_temp_map.toDataURL("image/png");
dataURL_arbre_arrierePlan = cvs_temp_avantPlan.toDataURL("image/png");
dataURL_chat_map = cvs_temp_avantPlan.toDataURL("image/png");
dataURL_bigben_map = cvs_temp_arrierePlan.toDataURL("image/png");
dataURL_parapluie_map = cvs_temp_map.toDataURL("image/png");
dataURL_arbre_map = cvs_temp_avantPlan.toDataURL("image/png");

//--------PHOTOGRAPHE
//----Saisies
tremblement = 1.0; //0.5,1,1.5,2 en fonction de la tremblote
dY = 1.1; //déplacement du photographe en absices
dX = 0; //déplacement du photographe en ordonnées
dP = 0; //déplacement du photographe en profondeur
//----Calculées
flouBouge = 1.0;
//----IHM
//----#define
color_flouBouge = '0,153,198'; //turquoise


//--------PDC
//----Saisies
//----Calculées
debutPDC = 1.0; //debut de la pdc, en m
finPDC = 1.0; //fin de la pdc, en m
pdc = 1.0; //taille de la pdc, en m
flouAvantPlan = 1.0; //flou au niveau de l'avant plan, en m
flouArrierePlan = 1.0; //flou au niveau de l'arrière plan, en m
hyperfocale = 1.0; //hyperfocale, en m
//----IHM
//----#define
color_pdc = '220,57,18';



//--------CANVAS FENETRE3D & VISEUR
//----Saisies
//Deplacement du photographe
//----Calculées
ecartLignesSol = 1.0; //pas entre 2 carrés de perspective, en m, utilisée en vue Fenetre3D et pour la vue viseur, pas encore calculée
//----IHM
//----#define
color_grillePerspective = 'rgba(240,240,240,1)';
color_sol = 'rgba(220,220,220,1)';
//Décalage des illustrations, en m
offset_x_img_avantPlan = 0.5;
offset_x_img_arrierePlan = -0.5;



//--------CANVAS HISTOGRAMMES
//----#define
<<<<<<< HEAD
color_axeHisto = '#777777';
=======
color_axeHisto = '#000000';
>>>>>>> ménage, tuning et fix
offset_X_histoLum = 5;
offset_Y_histoLum = 5;
max_Y_histoLum = 100;
offset_X_histoRVB = 5;
offset_Y_histoRVB = 6;
max_Y_histoRVB = 50;
//----Saisies
//----Calculées
flag_histoNB = 1; //à 1 si photo en noir et blanc
//Valeurs des composantes des pixels de l'image
valPixR = new Array(10000);
valPixV = new Array(10000);
valPixB = new Array(10000);
ValPixA = new Array(10000);

//Nbr de pixel à une valeur donnée (pour tracer les histos)
nbrPixR = new Array(256);
nbrPixV = new Array(256);
nbrPixB = new Array(256);
nbrPixL = new Array(256);
//----IHM
w_cvs_histoLum = 255 + 2 * offset_X_histoLum;
h_cvs_histoLum = max_Y_histoLum + 2 * offset_Y_histoLum;
w_cvs_HistoRVB = 255 + 2 * offset_X_histoRVB;
h_cvs_HistoRVB = 3 * max_Y_histoRVB + 4 * offset_Y_histoRVB;



//--------LES FENETRES
//----Saisies
nbrFenetres = 2; //Nbr de graphiques à afficher: 1,2 ou 4
//----Calculées
//----IHM
//----#define



//--------MODELE 3D
//----Saisies
//----Calculées
//flags pour savoir qu'elles faces sont visibles
haut = 0;
bas = 0;
droite = 0;
devant = 0;
derriere = 0;
//pour les calculs.. à virer TBC
lum_derriere = 0;
lum_devant = 0;
//vecteur luminosité après rotations
lum_x = 0;
lum_y = 0;
lum_p = 1;
//hauteur en m et coefficient
h_m_3D = 0;
k_3D = 0;
//cos et sin pour les rotations selon x,y,p
cos_x_3D = 0;
sin_x_3D = 0;
cos_y_3D = 0;
sin_y_3D = 0;
cos_z_3D = 0;
sin_z_3D = 0;
//coefficients de la matrice de rotation selon un axe quelconque
Rot1_1_3D = 0;
Rot1_2_3D = 0;
Rot1_3_3D = 0;
Rot2_1_3D = 0;
Rot2_2_3D = 0;
Rot2_3_3D = 0;
Rot3_1_3D = 0;
Rot3_2_3D = 0;
Rot3_3_3D = 0;
//Pour la translation
Tx_3D = 0;
Ty_3D = 0;
Tp_3D = 0;
//----IHM
//Nom du canvas courant
cvs_3D = "X";
//Context 2D du canvas courant
ct_3D = document.getElementById('id_cvs_Fenetre3D').getContext('2d');
//Dimensions du canvas courant
w_cvs_3D = 0;
h_cvs_3D = 0;
//coordonnées du centre de rotation dans le canvas
X0_3D = 0;
Y0_3D = 0;
//----#define



//--------CANVAS FENETRE3D
//----Saisies
typeDeplacementFenetre3D = "rotation"; //rotation ou translation
illuOptiqueFenetre3D = 'aucune'; //Selction d'un affichage: 'dim' ou 'flou_avantPlan' ou 'flou_arrierePlan'
//----Calculées
//Sauvegarde des coordonées de la souris
Xt0_Fenetre3D = 0;
Yt0_Fenetre3D = 0;
//Angles de rotations selon x,y,p
theta_x_Fenetre3D = -Math.PI / 200; //;//Math.PI/20;
theta_y_Fenetre3D = 0.95 * Math.PI; //Math.PI/20;
theta_p_Fenetre3D = 0;
//Coefficients de la matrice de rotation selon un axe quelconque
Rot1_1_Fenetre3D = 1;
Rot1_2_Fenetre3D = 0;
Rot1_3_Fenetre3D = 0;
Rot2_1_Fenetre3D = 0;
Rot2_2_Fenetre3D = 1;
Rot2_3_Fenetre3D = 0;
Rot3_1_Fenetre3D = 0;
Rot3_2_Fenetre3D = 0;
Rot3_3_Fenetre3D = 1;
//Pour la translation
Tx_Fenetre3D = 0;
Ty_Fenetre3D = 0;
Tp_Fenetre3D = 0;
//----IHM
w_cvs_Fenetre3D = 400; //351;		//Largeur du canvas, en px
h_m_Fenetre3D = 3.44; //Hauteur du canvas, en m, utilisé pour zoomer/dé-zoomer
flag_clicFenetre3D = 0; //Indique si la souris est cliquée ou non
//----#define
color_rayonLumineux = '51,102,204';



//--------MODELE OBJECTIF 3D
//----Saisies
//----Calculées
cpt_objectif = 6; //pour pointer dans le tableau contenant tous les modèles d'objectifs pré-définis
nbrPolygonesObjectif = 1; //1,3,5,7,9 en fonction du nombre de cylindres (de 1 à 5)
//----IHM
//----#define


//--------MODELE BOITIER 3D
//----Saisies
//----Calculées
nbrPolygonesObjectif = 1; //1,3,5,7,9 en fonction du nombre de cylindres (de 1 à 5)
//----IHM
//----#define
//Côtes de l'apn, en l,h,p (longueur, hauteur, profondeur) 
//Corps
l_corps = 0.146; //OK
h_corps = 0.0984; //OK
p_corps = 0.059; //OK
//Ecart entre le centre du capteur et le coin haut/doit quand on regarde l'APN par derrière
x_foyer_corps = 0.0898; //OK
y_foyer_corps = 0.05; //TBC
p_foyer_corps = 0.0125; //OK
//Viseur
l_viseur = 0.0499; //OK
h_viseur = 0.0246; //OK
p_viseur = 0.0815; //OK
dx_viseur = x_foyer_corps - l_viseur / 2; //décalage de b1 p/r à a1
//Poignée
l_poignee = 0.0378; //OK
h_poignee = h_corps; //OK
p_poignee = 0.00968; //OK
//Pour la visée reflexe
h_finVisee = 0.005; //le miroir du bas monte (en y) jusqu'à la surface haute du boitier (sans le viseur) + h_finVisee
h_debutVisee = h_finVisee - 24 / 1000; //le miroir du bas descend (en y) jusqu'à la surface haute du boitier (sans le viseur) - h_debutVisee



//--------CANVAS GRAPH DE LA PDC
//----Saisies
distanceSelectionnee = '?';
//----Calculées
//----IHM
flag_clicPdc = 0;
w_cvs_Pdc = 300;
h_cvs_Pdc = 200;
Xt0_cvs_pdc = 0;
<<<<<<< HEAD
d_DernierPoint_cvs_pdc = 1.5 * d_arrierePlan;
=======
d_DernierPoint = 1.5 * d_arrierePlan;
>>>>>>> ménage, tuning et fix
Y_m_cvs_pdc = -1; //taille de l'axe des ordonnées
//----#define
marge_X_cvs_PDC = 30;
marge_X_fin_cvs_PDC = 40;
marge_Y_cvs_PDC = 30;



//--------CANVAS DISTANCES
//----Saisies
distanceSelectionnee = '?';
//----Calculées
//----IHM
w_cvs_Distances = 400;
flag_clicDistances = 0;
Xt0_cvs_Distances = 0;
//----#define
marge_X_distances = 10;



//--------CANVAS VISEUR
//----Saisies
<<<<<<< HEAD
flag_drawExposition = 0; //à 1 si la luminosité des illustrations doit changer avec l'expo
flag_drawFlou = 0; //à 1 si le flou des illustrations doit changer avec le flou de mise au point
=======
flag_drawExposition = 1; //à 1 si la luminosité des illustrations doit changer avec l'expo
flag_drawFlou = 1; //à 1 si le flou des illustrations doit changer avec le flou de mise au point
>>>>>>> ménage, tuning et fix
//----Calculées
//----IHM
flag_clicViseur = 0; //à 1 si l'on maintient le clic dans la zone scène
Xt0_cvs_viseur = 1; //position de la souris au moment d'un clic dans la zone scène
Yt0_cvs_viseur = 1;
w_cvs_viseur = 400; //largeur effective du canvas
//----#define
//EXIF dans le viseur
marge_Y_bas_exifViseur = 50;
marge_X_exifViseur = 10; //marge sur les côtés
marge_Y_exifViseur = 10; //marge en haut



//--------CANVAS CHOIX DU MODE
//----Saisies
//----Calculées
//----IHM
img_roueMode = document.createElement("IMG");
img_roueMode.src = "MAS.png";
flag_clicRoueMode = 0;
Yt0_roueMode = 0;
w_cvs_RoueMode = 60;
h_cvs_RoueMode = 100;
//----#define



//--------CANVAS MOLETTE DE REGLAGE
//----Saisies
//----Calculées
theta_x_moletteReglage = Math.PI / 10;
theta_y_moletteReglage = 0;
theta_p_moletteReglage = 0;
Rot1_1_moletteReglage = 1;
Rot1_2_moletteReglage = 0;
Rot1_3_moletteReglage = 0;
Rot2_1_moletteReglage = 0;
Rot2_2_moletteReglage = 1;
Rot2_3_moletteReglage = 0;
Rot3_1_moletteReglage = 0;
Rot3_2_moletteReglage = 0;
Rot3_3_moletteReglage = 1;
//Pour l'incrément en fonction de la position de la molette
Xt0_cvs_moletteReglage = 0;
//----IHM
w_cvs_moletteReglage = 100; //Largeur du canvas, en px
h_m_moletteReglage = 0.04; //Largeur du canvas, en m
flag_clicMoletteReglage = 0; //Indique si la souris est cliquée ou non
//----#define
delta_angleMoletteReglage = 36; //doit être un multiple de 4, angle entre 2 "demi-engrenages" = pi/N



/*

//-ECRAN
//-Variables saisies
ecran_x = 2048; //nbr de pixels en largeur
ecran_y = 1536; //nbr de pixels en hauteur
ecran_diag = 22; //diagonale de l'écran en inch
ecran_zoom = 100; //taux de zoom en %
//----Calculées
ppi_ecran = 100;
format_ecran = "1:1";
distance_min_ecran = 20.0;
tirage_equ_ecran = "100x100";

//-TIRAGE
//-Variables saisies
tirage_x = 15.0; //largeur du tirage en cm
tirage_def_min = 36.0; //définition min de la photo pour le tirage
tirage_resolution = 300; //resolution du tirage en dpi
tirage_distance_observation = 50; //distance d'observation du tirage en cm
//----Calculées
tirage_y = 10.0;
taille_tirage = "100x100";
distance_min_tirage = 20.0;
dpi_min_tirage = 300;
*/