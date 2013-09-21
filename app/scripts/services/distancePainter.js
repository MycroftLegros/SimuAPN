'use strict';

angular.module('testYoAngularApp', [], function($provide) {
    $provide.factory('distancePainter', function distancePainter() {
        return {
            drawDistances : function drawDistances() {
                        /*
                //HISTOGRAMMES
                //dimension du canvas contenant l'image dont on calcul l'histogramme
                var largeur_vh = 100;
                var hauteur_vh = 100;

                //CALCUL DE L'HISTO
                var flag_nb = 1; //à 1 si photo en noir et blanc

                //Nbr de pixel pour une valeur donnée (pour tracer les histos)
                var R = new Array(256);
                var V = new Array(256);
                var B = new Array(256);
                var L = new Array(256);


                //Tableaux pour récupérer l'image
                var Pix_R = new Array(10000);
                var Pix_V = new Array(10000);
                var Pix_B = new Array(10000);
                var Pix_T = new Array(10000);



                //TRACE HISTO
                var ombre1 = '#7C7C7C'; //pour les ombres des histogrammes
                var ombre2 = '#A9A9A9'; //pour les ombres des histogrammes

                var color_axes_lum = '#777777';
                var offset_x_lum = 5;
                var offset_y_lum = 5;
                var max_y_lum = 100;
                var w_lum = 255 + 2 * offset_x_lum;
                var h_lum = max_y_lum + 2 * offset_y_lum;

                var color_axes_rvb = '#777777';
                var offset_x_rvb = 5;
                var offset_y_rvb = 6;
                var max_y_rvb = 50;
                var w_rvb = 255 + 2 * offset_x_rvb;
                var h_rvb = 3 * max_y_rvb + 4 * offset_y_rvb;

                //DEPASSEMENTS HISTO
                var pix_bouche = 0;
                var pix_crame = 0;
                var pix_R_sat = 0;
                var pix_V_sat = 0;
                var pix_B_sat = 0;
                var k_sat = 0.35; //% de luminosité pour mettre en évidence les zones non saturées
                var seuil_blanc = 180; //limite pour dsitinguer RVB saturé ou couleur cramée
                var pix_min_lum = 1;
                var pix_min_rvb = 1;



                var Nbr_graph = 2; //Nbr de graphiques à afficher: 1,2 ou 4


                //Décalage des illustrations, en m
                var dX_img_av = 0.5;
                var dX_img_ar = -0.5;

                //--GENERAL
                var Navigateur = "Chrome";

                var flag_init = 1;


                var flag_cadrage_constant = 0;

                //Pour gérer les priorités ouverture/vitesse
                var flag_reglage_expo = "ouverture"; //expo ouverture, vitesse ou manuel

                var cpt_vitesse = 15;
                var cpt_ISO = 7;
                var flag_triangle_expo = "ouverture"; //vitesse, ouverture ou ISO


                //Variables saisies
                var cdc_denom = 1730; //valeur du denomunateur pour calculer le cercle de confusion: 1440,1730,3000
                var unite = "cm, m, km/h" //unités de mesure: "cm,m,km/h" ou "in,ft,mph"
                var pas_perspective = 1.0; //pas entre 2 carrés de perspective, en m, utilisée en vue 3D_globale et pour la vue viseur

                //Variables calculées
                var cdc = 1.0; //cdc en m


                //-Deplacement du photographe
                var dY = 1.1; //déplacement du photographe en absices
                var dX = 0; //déplacement du photographe en ordonnées
                var dP = 0; //déplacement du photographe en profondeur


                //-APN (init avec les valeurs du D800)
                //Variables saisies
                var l_capteur = 36.0; //largeur du capteur en mm
                var h_capteur = 24.0; //hauteur du capteur en mm
                var filtre_aa = 1; //1 si filtre anti-aliasing, 0 sinon
                var definition = 36.3; //définition du capteur en Mpx
                var capteur = 'full-frame'; //type de capteur
                var dynamique_capteur = 14; //dynamique affectée par les ISO
                var dynamique_capteur_0 = 14; //dynamique à 100 ISO

                //-Exposition
                //Variables saisies

                var vitesse = 0.004; //durée de l'exposition
                var ISO = 320; //sensibilité ISO

                //Variables calculées
                var vitesse_string = '1/250';
                var expo = 1.0; //valeur de l'exposition en EV


                //Variables calculées
                var format_capteur = "3:2"; //format du capteur: 3:2 ou 4:3 ou ?
                var taille_pixel = 1.0; //taille d'un pixel en m
                var flou_filtre_aa = 1.0; //flou dû au filtre anti aliasing, en m
                var crop_factor = 1.0;


                //-OBJECTIF
                //-Variables saisies
                var focale = 50.0; //Longueur focale en mm
                var anti_vibration = 0; //1 si acti, 0 sinon
                var resolution = 17; //resolution en P-Mpx
                var ab_chro = 7; //aberations chromatiques en µm
                var Ouv_min = 1.8;
                var flag_obj_predefinis = 0;
                var cpt_obj = 6; //pour pointer dans le tableau contenant tous les modèles d'objectifs pré-définis
                var ouverture = 5.6; //ouverture du diaphragme
                var cpt_ouverture = 19;
                var cpt_ouverture_min = 9; //pour ne pas choisir une ouverture inférieure à l'ouverture min



                //Variables calculées
                var f_equ = 1.0; //focale équivalente en mm
                var angle_horiz = 1.0; //angle de champ horizontal en °
                var angle_vert = 1.0; //angle de champ vertical en °
                var flou_diff = 1.0; //flou dû à la diffraction, en m
                var flou_abb_chro = 1.0; //flou dû aux abbérations chromatiques, en m
                var flou_res = 1.0; //flou dû à la résolution de l'objectif, en m


                //-PRISE DE VUE
                //-Variables saisies
                var d_map = 6.75; //distance de map en m
                var d_arriere_plan = 11.35; //distance de l'arrière plan en m
                var d_avant_plan = 4.9; //distance de l'avant plan en m
                var v_sujet = 0.0; //vitesse de déplacement du sujet en km/h
                var lum_scene_EV = 11.0; //luminosité de la scène en EV
                var tremblement = 1.0; //0.5,1,1.5,2 en fonction de la tremblote

                //-Variables calculées
                //--Pdc
                var pdc_pres = 1.0; //debut de la pdc, en m
                var pdc_loin = 1.0; //fin de la pdc, en m
                var pdc = 1.0; //taille de la pdc, en m
                //-Flous
                var flou_avant = 1.0; //flou au niveau de l'avant plan, en m
                var flou_arriere = 1.0; //flou au niveau de l'arrière plan, en m
                //--Hyperfocale
                var hyperfocale = 1.0; //hyperfocale, en m
                //-Dimensions de la scene
                var largeur_arriere = 1.0; //largeur au niveau de l'arrière plan
                var hauteur_arriere = 1.0; //hauteur au niveau de l'arrièreplan
                var largeur_avant = 1.0;
                var hauteur_avant = 1.0;
                //-Flou de bougé et flou de mouvement
                var vitesse_securite = 1.0;
                var flou_bouge = 1.0;
                var vitesse_anti_mouvement = 1.0;
                var flou_mouvement = 1.0;



                //-ECRAN
                //-Variables saisies
                var ecran_x = 2048; //nbr de pixels en largeur
                var ecran_y = 1536; //nbr de pixels en hauteur
                var ecran_diag = 22; //diagonale de l'écran en inch
                var ecran_zoom = 100; //taux de zoom en %
                //-Variables calculées
                var ppi_ecran = 100;
                var format_ecran = "1:1";
                var distance_min_ecran = 20.0;
                var tirage_equ_ecran = "100x100";

                //-TIRAGE
                //-Variables saisies
                var tirage_x = 15.0; //largeur du tirage en cm
                var tirage_def_min = 36.0; //définition min de la photo pour le tirage
                var tirage_resolution = 300; //resolution du tirage en dpi
                var tirage_distance_observation = 50; //distance d'observation du tirage en cm
                //-Variables calculées
                var tirage_y = 10.0;
                var taille_tirage = "100x100";
                var distance_min_tirage = 20.0;
                var dpi_min_tirage = 300;



                //--INTERFACE 3D
                var haut = 0;
                var bas = 0;
                var droite = 0;
                var gauche = 0;
                var devant = 0;
                var derriere = 0;

                var lum_derriere = 0;
                var lum_devant = 0;
                var lum_droite = 0;
                var lum_gauche = 0;
                var lum_bas = 0;
                var lum_haut = 0;
                var lum_x = 0;
                var lum_y = 0;
                var lum_p = 0;

                //Context 2D du canvas
                var ct_3D = document.getElementById('id_canvas_3D_globale').getContext('2d');

                //Dimensions du canvas
                var Wc_3D = 0;
                var Hc_3D = 0;

                //Centre de rotation
                var X0_3D = 0;
                var Y0_3D = 0;

                //Sauvegarde des coordonées de la souris
                var X_3D_save = 0;
                var Y_3D_save = 0;

                //hauteur en m et coefficient
                var hc_3D = 0;
                var k_px_3D = 0;

                //vecteur de luminosité
                var lum_x = 0;
                var lum_y = 0;
                var lum_p = 1;

                //cos et sin pour les rotations selon x,y,p
                var cos_x_3D = 0;
                var sin_x_3D = 0;
                var cos_y_3D = 0;
                var sin_y_3D = 0;
                var cos_z_3D = 0;
                var sin_z_3D = 0;

                //Nom du canvas courant
                var cvs_3d = "X";

                //coefficients de la matrice de rotation selon un axe quelconque
                var Rot1_1_3D = 0;
                var Rot1_2_3D = 0;
                var Rot1_3_3D = 0;
                var Rot2_1_3D = 0;
                var Rot2_2_3D = 0;
                var Rot2_3_3D = 0;
                var Rot3_1_3D = 0;
                var Rot3_2_3D = 0;
                var Rot3_3_3D = 0;

                //Pour la translation
                var Tx_3D = 0;
                var Ty_3D = 0;
                var Tp_3D = 0;



                //--CANVAS 3D_GLOBALE
                var flag_mvt_3D = "rotation"; //rotation ou translation

                var Wc_3D_globale = 400; //351;        //Largeur du canvas, en px
                var h_cvs_3D_globale = 3.44; //Hauteur du canvas, en m, utilisé pour zoomer/dé-zoomervar 

                var flag_clic_3D_globale = 0; //Indique si la souris est cliquée ou nonvar 

                //Angles de rotations selon x,y,pvar 
                var theta_x_3D_globale = -Math.PI / 200; //;//Math.PI/20;
                var theta_y_3D_globale = 0.95 * Math.PI; //Math.PI/20;
                var theta_p_3D_globale = 0;

                //Coefficients de la matrice de rotation selon un axe quelconque
                var Rot1_1_3D_globale = 1;
                var Rot1_2_3D_globale = 0;
                var Rot1_3_3D_globale = 0;
                var Rot2_1_3D_globale = 0;
                var Rot2_2_3D_globale = 1;
                var Rot2_3_3D_globale = 0;
                var Rot3_1_3D_globale = 0;
                var Rot3_2_3D_globale = 0;
                var Rot3_3_3D_globale = 1;

                //Pour la translation
                var Tx_3D_globale = 0;
                var Ty_3D_globale = 0;
                var Tp_3D_globale = 0;

                var Rayons_3D = 'aucune'; //Selction d'un affichage: 'dim' ou 'flou_av' ou 'flou_ar'


                //Couleurs
                //-Couleurs
                var color_grille_flou = '119,119,119';

                var cdc_color = '51,102,204'; //bleu
                var AA_color = '255,153,0'; //orange
                var diffraction_color = '16,150,24'; //vert
                var AC_color = '153,0,153'; //violet
                var res_color = '220,57,18'; //rouge

                var avant_color = '221,68,119'; //rose
                var arriere_color = '102,170,20'; //caca d'oie
                var map_color = '51,102,204'; //bleu

                var bouge_color = '0,153,198'; //turquoise
                var angle_color = '0,153,198'; //turquoise
                var color_pdc = '220,57,18'; //rouge

                var color_grille_perspective = 'rgba(240,240,240,1)';

                var color_fond_perspective = 'rgba(220,220,220,1)';

                var FF_color = '16,150,24'; //vert
                var capteur_color = '255,153,0'; //orange
                var rayon_color = '51,102,204';


                //--POLYGONES
                //--OBJECTIF
                var Nbr_poly_obj = 1; //1,3,5,7,9 en fonction du nombre de cylindres (de 1 à 5)


                //--APN
                //-Corps
                var l_corps = 0.146; //OK
                var h_corps = 0.0984; //OK
                var p_corps = 0.059; //OK

                var x_foyer_corps = 0.0898; //OK
                var y_foyer_corps = 0.05; //TBC
                var p_foyer_corps = 0.0125; //OK

                //-Viseur
                var l_viseur = 0.0499; //OK
                var h_viseur = 0.0246; //OK
                var p_viseur = 0.0815; //OK
                var dx_viseur = x_foyer_corps - l_viseur / 2; //décalage de b1 p/r à a1

                //-Poignée
                var l_poignee = 0.0378; //OK
                var h_poignee = h_corps; //OK
                var p_poignee = 0.00968; //OK

                //-Pour la visée reflexe
                var h_fin_visee = 0.005; //le miroir du bas monte (en y) jusqu'à la surface haute du boitier (sans le viseur) + h_fin_visee
                var h_debut_visee = h_fin_visee - 24 / 1000; //le miroir du bas descend (en y) jusqu'à la surface haute du boitier (sans le viseur) - h_debut_visee


                //--CANVAS GRAPH DE LA PDC
                var marge_x_cvs_PDC = 30;
                var marge_x_fin_cvs_PDC = 40;
                var margeY_cvs_PDC = 30;
                var largeur_canvas_graph_pdc = 300;
                var hauteur_canvas_graph_pdc = 200;
                var flag_clic_illu_pdc = 0;
                var posX_pdc = 0;
                var posX_0_pdc = 0;
                var d_dernier_point = 1.5 * d_arriere_plan;
                var y_reel_graph_pdc = -1; //taille de l'axe des ordonnées
                var surbrillance = '?';


                //--CANVAS DISTANCES
                var hauteur_canvas_distances = 55;
                var largeur_canvas_distances = 400;
                var marge_x_distance = 10;
                var surbrillance = '?';
                var cdc_color = '51,102,204';
                var flag_clic_distance = 0;
                var mouseX_0_distance = 0;



                //-CANVAS VISEUR
                var flag_draw_expo = 0; //à 1 si la luminosité des illustrations doit changer avec l'expo
                var flag_draw_flou = 0; //à 1 si le flou des illustrations doit changer avec le flou de mise au point


                var av_ar_photographe = 0; //déplacement du photographe, en m
                var flag_clic_viseur = 0; //à 1 si l'on maintient le clic dans la zone scène

                var posX_0 = 1; //position de la souris au moment d'un clic dans la zone scène
                var posY_0 = 1;
                var inc_deplacement_photographe = 25; //le nbr de valeurs possible est le double
                var l_reelle = 1.0; //largeur d'un carré en m


                var img_av = document.createElement("IMG");
                var img_ar = document.createElement("IMG");
                var img_map = document.createElement("IMG");

                var cvs_temp_map = document.getElementById('id_cvs_viseur_map');
                var ct_temp_map = cvs_temp_map.getContext('2d');
                var cvs_temp_av = document.getElementById('id_cvs_viseur_av');
                var ct_temp_av = cvs_temp_av.getContext('2d');
                var cvs_temp_ar = document.getElementById('id_cvs_viseur_ar');
                var ct_temp_ar = cvs_temp_ar.getContext('2d');

                var imageData_av = ct_temp_av.getImageData(0, 0, 300, 300);
                var imageData_ar = ct_temp_ar.getImageData(0, 0, 300, 300);
                var imageData_map = ct_temp_map.getImageData(0, 0, 300, 300);

                var largeur_canvas_viseur = 400; //largeur effective du canvas

                //Choix des illustrations pour l'av, la map et l'ar
                var cpt_choix_illu_av = 1;
                var cpt_choix_illu_ar = 4;
                var cpt_choix_illu_map = 2;

                var cpt_choix_illu_max = 4;

                //DataURL pour contenir les illus aux différentes couleurs
                var dataURL_chat_av = cvs_temp_av.toDataURL("image/png");
                var dataURL_chat_ar = cvs_temp_av.toDataURL("image/png");
                var dataURL_chat_map = cvs_temp_av.toDataURL("image/png");

                var dataURL_bigben_av = cvs_temp_ar.toDataURL("image/png");
                var dataURL_bigben_ar = cvs_temp_ar.toDataURL("image/png");
                var dataURL_bigben_map = cvs_temp_ar.toDataURL("image/png");

                var dataURL_parapluie_av = cvs_temp_map.toDataURL("image/png");
                var dataURL_parapluie_ar = cvs_temp_map.toDataURL("image/png");
                var dataURL_parapluie_map = cvs_temp_map.toDataURL("image/png");

                var dataURL_arbre_av = cvs_temp_av.toDataURL("image/png");
                var dataURL_arbre_ar = cvs_temp_av.toDataURL("image/png");
                var dataURL_arbre_map = cvs_temp_av.toDataURL("image/png");

                //Caractéristiques des différentes illustrations
                var w_img_ar = 150;
                var h_img_ar = 300;
                var l_img_ar = 0.26469;
                var offset_y_ar = 0; //0.0794;

                var w_img_av = 133;
                var h_img_av = 300;
                var l_img_av = 0.8202;
                var offset_y_av = 0.0;

                var w_img_map = 300;
                var h_img_map = 197;
                var l_img_map = 147.71;
                var offset_y_map = 0;

                //Dessin du viseur
                var margeY_bas = 50;
                var marge_X = 10; //marge sur les côtés
                var margeY = 10; //marge en haut



                //--CANVAS CHOIX DU MODE
                var img_MAS = document.createElement("IMG");
                var img_MAS.src = "MAS.png";

                var flag_clic_roue_mode = 0;

                var Y0_roue_mode = 0;



                //--CANVAS MOLETTE DE REGLAGE
                var img_fond = document.createElement("IMG");
                var img_fond.src = "Fond.png";


                var X_molette_R_save = 0;
                var Wc_molette_R = 100; //Largeur du canvas, en px
                var h_cvs_molette_R = 0.04; //Largeur du canvas, en m


                var flag_clic_molette_R = 0; //Indique si la souris est cliquée ou non

                //Angles de rotations selon x,y,p
                var theta_x_molette_R = Math.PI / 10;
                var theta_y_molette_R = 0;
                var theta_p_molette_R = 0;

                var Rot1_1_molette_R = 1;
                var Rot1_2_molette_R = 0;
                var Rot1_3_molette_R = 0;
                var Rot2_1_molette_R = 0;
                var Rot2_2_molette_R = 1;
                var Rot2_3_molette_R = 0;
                var Rot3_1_molette_R = 0;
                var Rot3_2_molette_R = 0;
                var Rot3_3_molette_R = 1;

                //Pour l'incrément en fonction de la position de la molette
                var d_x_molette_R = 0;
                var d_x_molette_R_save = 0;
        */

                //--CANVAS DISTANCES
                var hauteur_canvas_distances = 55;
                var largeur_canvas_distances = 400;
                var marge_x_distance = 10;
                var surbrillance = '?';
                var cdc_color = '51,102,204';
                var flag_clic_distance = 0;
                // var mouseX_0_distance = 0;

                var avant_color = '221,68,119'; //rose
                var arriere_color = '102,170,20'; //caca d'oie
                var map_color = '51,102,204'; //bleu

                //-Variables calculées
                //--Pdc
                var pdc_pres = 1.0; //debut de la pdc, en m
                var pdc_loin = 1.0; //fin de la pdc, en m
                // var pdc = 1.0; //taille de la pdc, en m

                //-PRISE DE VUE
                //-Variables saisies
                var d_map = 6.75; //distance de map en m
                var d_arriere_plan = 11.35; //distance de l'arrière plan en m
                var d_avant_plan = 4.9; //distance de l'avant plan en m
                // var v_sujet = 0.0; //vitesse de déplacement du sujet en km/h
                // var lum_scene_EV = 11.0; //luminosité de la scène en EV
                // var tremblement = 1.0; //0.5,1,1.5,2 en fonction de la tremblote

                var d_dernier_point = 1.5 * d_arriere_plan;

                var cvsDistances = document.getElementById('display-distances');
                var ctDistances = cvsDistances.getContext('2d');

                // var margeY = 30;
                var temp = 1.0;
                var temp2 = 1.0;
                // var i = 0;

                cvsDistances.width = largeur_canvas_distances + 2 * marge_x_distance;
                cvsDistances.height = hauteur_canvas_distances;

                var h_axe = 20;

                if (flag_clic_distance === 0) {
                    d_dernier_point = 1.5 * d_arriere_plan;
                }

                //--RAZ
                ctDistances.fillStyle = '#FFFFFF';
                ctDistances.strokeStyle = '#FFFFFF';
                ctDistances.beginPath();
                ctDistances.fillRect(0, 0, largeur_canvas_distances + 2 * marge_x_distance - 1, hauteur_canvas_distances - 1);
                ctDistances.stroke();

                //--Axes
                ctDistances.fillStyle = '#777777';
                this.demi_fleche_H(ctDistances, h_axe, marge_x_distance, largeur_canvas_distances + marge_x_distance);

                //--Regarde les extrémums et calcul les coeff de flou et distance vers pixel
                // var f_m = $objectif.focale / 1000; //focale en m
                var k_distance = largeur_canvas_distances / d_dernier_point; //pour passer d'une distance en m à des px


                var demi_h_trait_d = 20;

                //Avant plan
                ctDistances.fillStyle = 'rgb(' + avant_color + ')';
                ctDistances.font = "12px 'Trebuchet MS'";
                temp = k_distance * d_avant_plan; //distance en px
                ctDistances.beginPath();
                ctDistances.fillRect(marge_x_distance + temp, h_axe - demi_h_trait_d, 1, 1 + demi_h_trait_d);
                ctDistances.beginPath();
                ctDistances.fillText(d_avant_plan.toFixed(2) + 'm', marge_x_distance + temp - 5, h_axe + 12);

                if (surbrillance === 'av') {
                    ctDistances.beginPath();
                    ctDistances.arc(marge_x_distance + temp, h_axe, 4, 0, 2 * Math.PI);
                    ctDistances.fill();
                }


                //Distance de map
                ctDistances.beginPath();
                ctDistances.fillStyle = 'rgb(' + map_color + ')';
                temp = k_distance * d_map;
                ctDistances.beginPath();
                ctDistances.fillRect(marge_x_distance + temp, h_axe - demi_h_trait_d, 1, 1 + demi_h_trait_d);
                ctDistances.fillText(d_map.toFixed(2) + 'm', marge_x_distance + temp - 5, h_axe + 23);

                if (surbrillance === 'map') {
                    ctDistances.beginPath();
                    ctDistances.arc(marge_x_distance + temp, h_axe, 4, 0, 2 * Math.PI);
                    ctDistances.fill();
                }

                //Arrière plan
                ctDistances.fillStyle = 'rgb(' + arriere_color + ')';
                temp = k_distance * d_arriere_plan; //distance en px
                ctDistances.beginPath();
                ctDistances.fillRect(marge_x_distance + temp, h_axe - demi_h_trait_d, 1, 1 + demi_h_trait_d);
                ctDistances.beginPath();
                ctDistances.fillText(d_arriere_plan.toFixed(2) + 'm', marge_x_distance + temp - 5, h_axe + 34);



                if (surbrillance === 'ar') {
                    ctDistances.beginPath();
                    ctDistances.arc(marge_x_distance + temp, h_axe, 4, 0, 2 * Math.PI);
                    ctDistances.fill();
                }


                ctDistances.font = "12px 'Trebuchet MS'";

                //Rectangle pour marquer la PDC
                ctDistances.fillStyle = 'rgba(' + cdc_color + ',0.3)';
                temp = k_distance * pdc_pres; //distance en px
                temp2 = k_distance * pdc_loin; //distance en px

                if (temp2 > largeur_canvas_distances) {
                    temp2 = largeur_canvas_distances;
                }

                ctDistances.beginPath();
                ctDistances.fillRect(marge_x_distance + temp, 0, temp2 - temp, h_axe + 34);
            },

            demi_fleche_H : function demi_fleche_H(ctx, y_, x_1, x_2) {

                var size_f = 3;
                var temp;

                if (x_2 < x_1) {
                    temp = x_1;
                    x_1 = x_2;
                    x_2 = temp;
                }

                ctx.beginPath();
                ctx.strokeStyle = '#000000';
                ctx.lineTo(x_1, y_);
                ctx.lineTo(x_2, y_);
                ctx.lineTo(x_2 - size_f, y_ - size_f);
                ctx.lineTo(x_2, y_);
                ctx.lineTo(x_2 - size_f, y_ + size_f);
                ctx.stroke();
            }
        };
    });
});