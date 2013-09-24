//dimensions des div & canvas
h_ZoneFenetres = 320;
w_ZoneFenetres = 800;
h_Fenetre = 320;
w_Fenetre = 400;
h_cvs = 0;
w_cvs = 400;
w_cvs_hiden = 100;



//--LUMINOSITE
document.getElementById('liste_scene').addEventListener('change', function() {

	luminosite_EV = 1.0 * document.getElementById('liste_scene').options[document.getElementById('liste_scene').selectedIndex].value;
	calculs();


	ouverture = cpt2ouverture(cpt_ouverture).N;

	//Prio vitesse => modifie l'ouverture
	if (modeAPN === "vitesse") {


		cpt_ouverture += (Math.round(expo / (1 / 3)));

		if (cpt_ouverture < cpt_ouvertureMin)
			cpt_ouverture = cpt_ouvertureMin;
		if (cpt_ouverture > 37)
			cpt_ouverture = 37;

		ouverture = cpt2ouverture(cpt_ouverture).N;
	}

	//Prio ouverture => modifie la vitesse
	if (modeAPN === "ouverture") {

		cpt_vitesse -= (Math.round(expo / (1 / 3)));

		if (cpt_vitesse < 1)
			cpt_vitesse = 1;
		if (cpt_vitesse > 58)
			cpt_vitesse = 58;

		temp = '';

		switch (cpt_vitesse) {


			case 1:
				temp = '1/8000';
				vitesse = 0.000125;
				break;
			case 2:
				temp = '1/6400';
				vitesse = 0.00015625;
				break;
			case 3:
				temp = '1/5000';
				vitesse = 0.0002;
				break;
			case 4:
				temp = '1/4000';
				vitesse = 0.00025;
				break;
			case 5:
				temp = '1/3200';
				vitesse = 0.0003125;
				break;
			case 6:
				temp = '1/2500';
				vitesse = 0.0004;
				break;
			case 7:
				temp = '1/2000';
				vitesse = 0.0005;
				break;
			case 8:
				temp = '1/1600';
				vitesse = 0.000625;
				break;
			case 9:
				temp = '1/1250';
				vitesse = 0.0008;
				break;
			case 10:
				temp = '1/1000';
				vitesse = 0.001;
				break;
			case 11:
				temp = '1/800';
				vitesse = 0.00125;
				break;
			case 12:
				temp = '1/640';
				vitesse = 0.0015625;
				break;
			case 13:
				temp = '1/500';
				vitesse = 0.002;
				break;
			case 14:
				temp = '1/400';
				vitesse = 0.0025;
				break;
			case 15:
				temp = '1/320';
				vitesse = 0.003125;
				break;
			case 16:
				temp = '1/250';
				vitesse = 0.004;
				break;
			case 17:
				temp = '1/200';
				vitesse = 0.005;
				break;
			case 18:
				temp = '1/160';
				vitesse = 0.00625;
				break;
			case 19:
				temp = '1/125';
				vitesse = 0.008;
				break;
			case 20:
				temp = '1/100';
				vitesse = 0.01;
				break;
			case 21:
				temp = '1/80';
				vitesse = 0.0125;
				break;
			case 22:
				temp = '1/60';
				vitesse = 0.0166666666666667;
				break;
			case 23:
				temp = '1/50';
				vitesse = 0.02;
				break;
			case 24:
				temp = '1/40';
				vitesse = 0.025;
				break;
			case 25:
				temp = '1/30';
				vitesse = 0.0333333333333333;
				break;
			case 26:
				temp = '1/25';
				vitesse = 0.04;
				break;
			case 27:
				temp = '1/20';
				vitesse = 0.05;
				break;
			case 28:
				temp = '1/15';
				vitesse = 0.0666666666666667;
				break;
			case 29:
				temp = '1/13';
				vitesse = 0.0769230769230769;
				break;
			case 30:
				temp = '1/10';
				vitesse = 0.1;
				break;
			case 31:
				temp = '1/8';
				vitesse = 0.125;
				break;
			case 32:
				temp = '1/6';
				vitesse = 0.166666666666667;
				break;
			case 33:
				temp = '1/5';
				vitesse = 0.2;
				break;
			case 34:
				temp = '1/4';
				vitesse = 0.25;
				break;
			case 35:
				temp = '1/3';
				vitesse = 0.333333333333333;
				break;
			case 36:
				temp = '1/2.5';
				vitesse = 0.4;
				break;
			case 37:
				temp = '1/2';
				vitesse = 0.5;
				break;
			case 38:
				temp = '1/1.6';
				vitesse = 0.625;
				break;
			case 39:
				temp = '1/1.3';
				vitesse = 0.769230769230769;
				break;
			case 40:
				temp = '1"';
				vitesse = 1;
				break;
			case 41:
				temp = '1.3"';
				vitesse = 1.3;
				break;
			case 42:
				temp = '1.6"';
				vitesse = 1.6;
				break;
			case 43:
				temp = '2"';
				vitesse = 2;
				break;
			case 44:
				temp = '2.5"';
				vitesse = 2.5;
				break;
			case 45:
				temp = '3"';
				vitesse = 3;
				break;
			case 46:
				temp = '4"';
				vitesse = 4;
				break;
			case 47:
				temp = '5"';
				vitesse = 5;
				break;
			case 48:
				temp = '6"';
				vitesse = 6;
				break;
			case 49:
				temp = '8"';
				vitesse = 8;
				break;
			case 50:
				temp = '10"';
				vitesse = 10;
				break;
			case 51:
				temp = '13"';
				vitesse = 13;
				break;
			case 52:
				temp = '15"';
				vitesse = 15;
				break;
			case 53:
				temp = '20"';
				vitesse = 20;
				break;
			case 54:
				temp = '25"';
				vitesse = 25;
				break;
			case 55:
				temp = '30"';
				vitesse = 30;
				break;
			case 56:
				temp = '40"';
				vitesse = 40;
				break;
			case 57:
				temp = '50"';
				vitesse = 50;
				break;
			case 58:
				temp = '60"';
				vitesse = 60;
				break;
		}


		if (temp !== '')
			vitesse_string = temp;

	}

	calculs();
	drawViseur();


	calculs();
	drawViseur();
}, false);


//--FENETRE3D
//Roulette: Zoom & dé-zoom, par pas de 5%
document.getElementById('id_cvs_Fenetre3D').addEventListener('mousewheel', function(e) {
	var Delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

	if (!e) {
		e = window.event;
	}
	if (e.preventDefault) {
		e.preventDefault();
	}

	if (Delta > 0)
		h_m_Fenetre3D = h_m_Fenetre3D / 1.05;
	else
		h_m_Fenetre3D = 1.05 * h_m_Fenetre3D;

	drawFenetre3D();
}, false);

//Clic: MAJ des coordonées initiales
document.getElementById('id_cvs_Fenetre3D').addEventListener('mousedown', function(e) {

	document.getElementById('liste_camera').selectedIndex = 0; //

	flag_clicFenetre3D = 1;
	document.body.style.cursor = 'move';

	var cvs = document.getElementById('id_cvs_Fenetre3D');
	var rect = cvs.getBoundingClientRect(),
		root = document.documentElement;

	Xt0_Fenetre3D = e.clientX - rect.left - root.scrollLeft;
	Yt0_Fenetre3D = e.clientY - rect.top - root.scrollTop;

}, false);

//Relache clic
document.getElementById('id_cvs_Fenetre3D').addEventListener('mouseup', function() {
	flag_clicFenetre3D = 0;
	document.body.style.cursor = 'auto';
}, false);

//bouge
document.getElementById('id_cvs_Fenetre3D').addEventListener('mousemove', function(e) {
	if (flag_clicFenetre3D)
		souris3D("Fenetre3D", e);
}, false);



//TRANSLATION VS ROTATION
document.getElementById('id_div_BtnTranslation').onclick = function() {
	if (typeDeplacementFenetre3D !== "translation") {
		typeDeplacementFenetre3D = "translation";
		drawBouton('id_div_BtnRotation', 'id_img_BtnRotation', 'css_BtnOFF');
		drawBouton('id_div_BtnTranslation', 'id_img_BtnTranslation', 'css_BtnON');
	}
};



document.getElementById('id_div_BtnRotation').onclick = function() {
	if (typeDeplacementFenetre3D !== "rotation") {
		typeDeplacementFenetre3D = "rotation";
		drawBouton('id_div_BtnRotation', 'id_img_BtnRotation', 'css_BtnON');
		drawBouton('id_div_BtnTranslation', 'id_img_BtnTranslation', 'css_BtnOFF');
	}
};



//RB DE SELECTION DU PARAMTERE DU TRIANGLE D'EXPOSITION
document.getElementById('rb_triangle_vitesse').addEventListener('change', function() {
	selectMoletteReglage = "vitesse";



}, false);

document.getElementById('rb_triangle_ouverture').addEventListener('change', function() {
	selectMoletteReglage = "ouverture";
}, false);

document.getElementById('rb_triangle_ISO').addEventListener('change', function() {
	selectMoletteReglage = "ISO";
}, false);



//-APN
//Capteur
document.getElementById('liste_capteur').addEventListener('change', function() {
	Capteur = document.getElementById('liste_capteur').options[document.getElementById('liste_capteur').selectedIndex].value;

	switch (Capteur) {
		case "1/2.3":
			l_capteur = 5.1;
			h_capteur = 3.8;
			break;
		case "1/1.8":
			l_capteur = 7.1;
			h_capteur = 5.3;
			break;
		case "1/1.7":
			l_capteur = 7.5;
			h_capteur = 5.6;
			break;
		case "1/1.6":
			l_capteur = 8;
			h_capteur = 6;
			break;
		case "2/3":
			l_capteur = 8.8;
			h_capteur = 6.6;
			break;
		case "CX":
			l_capteur = 13.2;
			h_capteur = 8.8;
			break;
		case "4/3":
			l_capteur = 17.8;
			h_capteur = 13.4;
			break;
		case "aps-c":
			l_capteur = 23.4;
			h_capteur = 15.6;
			break;
		case "aps-h":
			l_capteur = 28.7;
			h_capteur = 19.1;
			break;
		case "full-frame":
			l_capteur = 36;
			h_capteur = 24;
			break;
	}


	if (flag_cadrageConstant) {
		focale = l_capteur * d_map / w_m_map; //nouvelle focale

		if (focale < 4)
			focale = 4;
		if (focale > 250)
			focale = 250;

		document.getElementById("slider_focale").value = focale;
		document.getElementById('val_focale').innerHTML = focale.toFixed(0) + "mm";
	}


	calculs();
	drawViseur();
	initPtsCapteurs();
	initPtsViseeReflex();

	if (flag_cadrageConstant)
		initPtsObjectif();

	drawFenetre3D();

}, false);

//Definition
document.getElementById('input_definition').addEventListener('change', function() {
	definition = 1.0 * document.getElementById('input_definition').value;

	if (definition < 0.1) {
		definition = 0.1;
		document.getElementById('input_definition').value = definition;
	}

	/*
if(resolution>definition){
resolution=definition;
document.getElementById('input_resolution').value=resolution;
}
*/
	calculs();
}, false);

//Dynamique
document.getElementById('input_dynamique').addEventListener('change', function() {
	dynamiqueCapteur100ISO = 1.0 * document.getElementById('input_dynamique').value;
	calculs();
	drawViseur();
}, false);


//-OBJECTIF


function majObjectif() {

	var temp = 1.0 * document.getElementById("slider_focale").value;

	if (flag_objectifPredefini === 0) {

		focale = temp;
		extrapoleObjectif();
	} else {
		cpt_objectif = temp;
		focale = 1.0 * ListeObj[temp].foc;
		ouvertureMin = 1.0 * ListeObj[temp].Nmin;
		cpt_ouvertureMin = 1.0 * ouverture2cpt(ouvertureMin).cpt;
		antiVibration = 1.0 * ListeObj[temp].VR;
		resolution = 1.0 * ListeObj[temp].res;
		abberationChromatique = 1.0 * ListeObj[temp].AC;

		document.getElementById('liste_N_min').selectedIndex = cpt_ouvertureMin - 1;
		document.getElementById('liste_antiVibration').selectedIndex = antiVibration;
		document.getElementById('input_resolution').value = resolution;
		document.getElementById('input_aberrations_chromatiques').value = abberationChromatique;



		if (ouverture < ouvertureMin) {
			ouverture = ouvertureMin;
			cpt_ouverture = cpt_ouvertureMin;
		}

	}



	if (flag_cadrageConstant) {

		temp = w_m_map * focale / l_capteur; //nouvelle dmap

		if (temp < -1 * (d_map - (focale / 1000.0 + 0.001)))
			temp = -1 * (d_map - (focale / 1000.0 + 0.001));


		dP += d_map - temp;
		d_arrierePlan += (temp - d_map);

		if (d_avantPlan < 0)
			d_avantPlan = 0;


		d_avantPlan += (temp - d_map);
		d_map = temp;
	} else {
		if (d_map < (focale / 1000.0 + 0.001)) {
			d_map = (focale / 1000.0 + 0.001).toFixed(3);
		}
	}

	if (d_avantPlan > d_map)
		d_avantPlan = d_map;

	if (d_arrierePlan < d_map)
		d_arrierePlan = d_map;

	calculs();
	drawViseur();
	initPtsObjectif();

	if (cropFactor !== 1)
		initPtsCapteurs();


	drawFenetre3D();

}

//Objectifs pré-définis ou non
document.getElementById('id_chk_obj_predefinis').addEventListener('change', function() {


	//Objectif pré-défini
	if (document.getElementById('id_chk_obj_predefinis').checked) {

		flag_objectifPredefini = 1;

		//Cherche la focale prédéfinie la plus proche de la courante (TBD: chercher vraiment la plus proche)
		for (var i = 0; i < ListeObj.length; i++) {

			if ((focale >= ListeObj[i].foc) && ((i === ListeObj.length - 1) || (focale < ListeObj[i + 1].foc))) {

				document.getElementById("slider_focale").min = 0;
				document.getElementById("slider_focale").max = ListeObj.length - 1;
				document.getElementById("slider_focale").value = i;

				majObjectif();

				i = ListeObj.length - 1; //sort de la boucle
			}
		}
	}

	//Objectif libre
	else {
		flag_objectifPredefini = 0;
		document.getElementById("slider_focale").min = 14;
		document.getElementById("slider_focale").max = 400;
		document.getElementById("slider_focale").value = focale;
	}



}, false);



//Longueur focale
document.getElementById("slider_focale").oninput = function() {
	majObjectif();
};


//Ouverture min
document.getElementById('liste_N_min').addEventListener('change', function() {
	cpt_ouvertureMin = 1.0 * document.getElementById('liste_N_min').options[document.getElementById('liste_N_min').selectedIndex].value;

	ouvertureMin = cpt2ouverture(cpt_ouvertureMin).N;


	if (ouverture < ouvertureMin) {
		ouverture = ouvertureMin;
		cpt_ouverture = cpt_ouvertureMin;
		calculs();
		drawViseur();
	}

	initPtsObjectif();

	drawFenetre3D();


}, false);



//3D
//Choix du phénomène optique à afficher
document.getElementById('rb_3D_aucune').addEventListener('change', function() {
	illuOptiqueFenetre3D = 'aucune';
	drawFenetre3D();
}, false);

document.getElementById('rb_3D_dim').addEventListener('change', function() {
	illuOptiqueFenetre3D = 'dim';
	drawFenetre3D();
}, false);

document.getElementById('rb_3D_flou_avantPlan').addEventListener('change', function() {
	illuOptiqueFenetre3D = 'flou_avantPlan';
	drawFenetre3D();
}, false);

document.getElementById('rb_3D_flou_arrierePlan').addEventListener('change', function() {
	illuOptiqueFenetre3D = 'flou_arrierePlan';
	drawFenetre3D();
}, false);

document.getElementById('rb_3D_visee').addEventListener('change', function() {
	illuOptiqueFenetre3D = 'visee_reflex';
	drawFenetre3D();
}, false);

//Placement de la caméra

function razPosition3DGlobale() {
	theta_x_Fenetre3D = 0;
	theta_y_Fenetre3D = 0;
	theta_p_Fenetre3D = 0;

	Rot1_1_Fenetre3D = 1;
	Rot1_2_Fenetre3D = 0;
	Rot1_3_Fenetre3D = 0;
	Rot2_1_Fenetre3D = 0;
	Rot2_2_Fenetre3D = 1;
	Rot2_3_Fenetre3D = 0;
	Rot3_1_Fenetre3D = 0;
	Rot3_2_Fenetre3D = 0;
	Rot3_3_Fenetre3D = 1;


	Tx_Fenetre3D = 0;
	Ty_Fenetre3D = 0;
	Tp_Fenetre3D = 0;
}



document.getElementById('liste_camera').addEventListener('change', function() {
	var camera = document.getElementById('liste_camera').options[document.getElementById('liste_camera').selectedIndex].value;

	switch (camera) {
		case 'Derrière':
			razPosition3DGlobale();
			theta_y_Fenetre3D = Math.PI;
			drawFenetre3D();
			break;
		case 'Côté':
			razPosition3DGlobale();
			theta_y_Fenetre3D = Math.PI / 2;
			drawFenetre3D();
			break;
		case 'Devant':
			razPosition3DGlobale();
			drawFenetre3D();
			break;
		case 'Haut':
			razPosition3DGlobale();
			theta_x_Fenetre3D = Math.PI / 2;
			theta_p_Fenetre3D = Math.PI / 2;
			drawFenetre3D();
			break;
	}

}, false);



//--VISEUR
//Flou
document.getElementById('id_chk_flou').addEventListener('change', function() {
	if (document.getElementById('id_chk_flou').checked)
		flag_drawFlou = 1;
	else
		flag_drawFlou = 0;

	drawViseur();
}, false);

//Expo
document.getElementById('id_chk_expo').addEventListener('change', function() {
	if (document.getElementById('id_chk_expo').checked)
		flag_drawExposition = 1;
	else
		flag_drawExposition = 0;

	drawViseur();
}, false);



//--DIVERS
//CDC
document.getElementById('liste_cdc').addEventListener('change', function() {
	cdc_denominateur = 1.0 * document.getElementById('liste_cdc').options[document.getElementById('liste_cdc').selectedIndex].value;
	calculs();

	drawViseur();
	drawFenetre3D();
	drawDistances();

}, false);



function positionneFenetres(id_liste) {


	//Commence par tout cacher
	hide('id_graph_3D');
	hide('id_graph_Viseur');
	hide('id_graph_PDC');
	hide('id_graph_Histo');


	var liste_old = '';

	//Cherche l'ancienne place du graph selectionné dans la liste courante
	if (id_liste !== 'id_lst_Fenetre11' && (document.getElementById('id_lst_Fenetre11').options[document.getElementById('id_lst_Fenetre11').selectedIndex].value === document.getElementById(id_liste).options[document.getElementById(id_liste).selectedIndex].value))
		liste_old = 'id_lst_Fenetre11';


	if (id_liste !== 'id_lst_Fenetre12' && (document.getElementById('id_lst_Fenetre12').options[document.getElementById('id_lst_Fenetre12').selectedIndex].value === document.getElementById(id_liste).options[document.getElementById(id_liste).selectedIndex].value))
		liste_old = 'id_lst_Fenetre12';


	if (id_liste !== 'id_lst_Fenetre21' && (document.getElementById('id_lst_Fenetre21').options[document.getElementById('id_lst_Fenetre21').selectedIndex].value === document.getElementById(id_liste).options[document.getElementById(id_liste).selectedIndex].value))
		liste_old = 'id_lst_Fenetre21';

	if (id_liste !== 'id_lst_Fenetre22' && (document.getElementById('id_lst_Fenetre22').options[document.getElementById('id_lst_Fenetre22').selectedIndex].value === document.getElementById(id_liste).options[document.getElementById(id_liste).selectedIndex].value))
		liste_old = 'id_lst_Fenetre22';


	var graph_old = '';

	if (liste_old !== '') {
		//Cherche le graph qui n'est plus selectionné
		if (document.getElementById('id_lst_Fenetre11').options[document.getElementById('id_lst_Fenetre11').selectedIndex].value !== 'id_graph_3D' &&
			document.getElementById('id_lst_Fenetre12').options[document.getElementById('id_lst_Fenetre12').selectedIndex].value !== 'id_graph_3D' &&
			document.getElementById('id_lst_Fenetre21').options[document.getElementById('id_lst_Fenetre21').selectedIndex].value !== 'id_graph_3D' &&
			document.getElementById('id_lst_Fenetre22').options[document.getElementById('id_lst_Fenetre22').selectedIndex].value !== 'id_graph_3D')
			graph_old = 'id_graph_3D';

		if (document.getElementById('id_lst_Fenetre11').options[document.getElementById('id_lst_Fenetre11').selectedIndex].value !== 'id_graph_Viseur' &&
			document.getElementById('id_lst_Fenetre12').options[document.getElementById('id_lst_Fenetre12').selectedIndex].value !== 'id_graph_Viseur' &&
			document.getElementById('id_lst_Fenetre21').options[document.getElementById('id_lst_Fenetre21').selectedIndex].value !== 'id_graph_Viseur' &&
			document.getElementById('id_lst_Fenetre22').options[document.getElementById('id_lst_Fenetre22').selectedIndex].value !== 'id_graph_Viseur')
			graph_old = 'id_graph_Viseur';

		if (document.getElementById('id_lst_Fenetre11').options[document.getElementById('id_lst_Fenetre11').selectedIndex].value !== 'id_graph_PDC' &&
			document.getElementById('id_lst_Fenetre12').options[document.getElementById('id_lst_Fenetre12').selectedIndex].value !== 'id_graph_PDC' &&
			document.getElementById('id_lst_Fenetre21').options[document.getElementById('id_lst_Fenetre21').selectedIndex].value !== 'id_graph_PDC' &&
			document.getElementById('id_lst_Fenetre22').options[document.getElementById('id_lst_Fenetre22').selectedIndex].value !== 'id_graph_PDC')
			graph_old = 'id_graph_PDC';

		if (document.getElementById('id_lst_Fenetre11').options[document.getElementById('id_lst_Fenetre11').selectedIndex].value !== 'id_graph_Histo' &&
			document.getElementById('id_lst_Fenetre12').options[document.getElementById('id_lst_Fenetre12').selectedIndex].value !== 'id_graph_Histo' &&
			document.getElementById('id_lst_Fenetre21').options[document.getElementById('id_lst_Fenetre21').selectedIndex].value !== 'id_graph_Histo' &&
			document.getElementById('id_lst_Fenetre22').options[document.getElementById('id_lst_Fenetre22').selectedIndex].value !== 'id_graph_Histo')
			graph_old = 'id_graph_Histo';


		//Met le graph non selectionné à l'ancienne place du nouveau
		if (graph_old === 'id_graph_3D')
			document.getElementById(liste_old).selectedIndex = 0;
		if (graph_old === 'id_graph_Viseur')
			document.getElementById(liste_old).selectedIndex = 1;
		if (graph_old === 'id_graph_PDC')
			document.getElementById(liste_old).selectedIndex = 2;
		if (graph_old === 'id_graph_Histo')
			document.getElementById(liste_old).selectedIndex = 3;
	}

	//Place les graph 

	document.getElementById((document.getElementById('id_lst_Fenetre11').options[document.getElementById('id_lst_Fenetre11').selectedIndex].value)).style.position = 'absolute';
	document.getElementById((document.getElementById('id_lst_Fenetre11').options[document.getElementById('id_lst_Fenetre11').selectedIndex].value)).style.top = '0px';
	document.getElementById((document.getElementById('id_lst_Fenetre11').options[document.getElementById('id_lst_Fenetre11').selectedIndex].value)).style.bottom = h_Fenetre + 'px';
	document.getElementById((document.getElementById('id_lst_Fenetre11').options[document.getElementById('id_lst_Fenetre11').selectedIndex].value)).style.left = '0px';
	document.getElementById((document.getElementById('id_lst_Fenetre11').options[document.getElementById('id_lst_Fenetre11').selectedIndex].value)).style.right = w_Fenetre + 'px';

	document.getElementById((document.getElementById('id_lst_Fenetre12').options[document.getElementById('id_lst_Fenetre12').selectedIndex].value)).style.position = 'absolute';
	document.getElementById((document.getElementById('id_lst_Fenetre12').options[document.getElementById('id_lst_Fenetre12').selectedIndex].value)).style.top = '0px';
	document.getElementById((document.getElementById('id_lst_Fenetre12').options[document.getElementById('id_lst_Fenetre12').selectedIndex].value)).style.bottom = h_Fenetre + 'px';
	document.getElementById((document.getElementById('id_lst_Fenetre12').options[document.getElementById('id_lst_Fenetre12').selectedIndex].value)).style.left = w_Fenetre + 'px';
	document.getElementById((document.getElementById('id_lst_Fenetre12').options[document.getElementById('id_lst_Fenetre12').selectedIndex].value)).style.right = '0px';


	document.getElementById((document.getElementById('id_lst_Fenetre21').options[document.getElementById('id_lst_Fenetre21').selectedIndex].value)).style.position = 'absolute';
	document.getElementById((document.getElementById('id_lst_Fenetre21').options[document.getElementById('id_lst_Fenetre21').selectedIndex].value)).style.top = h_Fenetre + 'px';
	document.getElementById((document.getElementById('id_lst_Fenetre21').options[document.getElementById('id_lst_Fenetre21').selectedIndex].value)).style.bottom = '0px';
	document.getElementById((document.getElementById('id_lst_Fenetre21').options[document.getElementById('id_lst_Fenetre21').selectedIndex].value)).style.left = '0px';
	document.getElementById((document.getElementById('id_lst_Fenetre21').options[document.getElementById('id_lst_Fenetre21').selectedIndex].value)).style.right = w_Fenetre + 'px';


	document.getElementById((document.getElementById('id_lst_Fenetre22').options[document.getElementById('id_lst_Fenetre22').selectedIndex].value)).style.position = 'absolute';
	document.getElementById((document.getElementById('id_lst_Fenetre22').options[document.getElementById('id_lst_Fenetre22').selectedIndex].value)).style.top = h_Fenetre + 'px';
	document.getElementById((document.getElementById('id_lst_Fenetre22').options[document.getElementById('id_lst_Fenetre22').selectedIndex].value)).style.bottom = '0px';
	document.getElementById((document.getElementById('id_lst_Fenetre22').options[document.getElementById('id_lst_Fenetre22').selectedIndex].value)).style.left = w_Fenetre + 'px';
	document.getElementById((document.getElementById('id_lst_Fenetre22').options[document.getElementById('id_lst_Fenetre22').selectedIndex].value)).style.right = '0px';



	//MAJ des dimensions
	switch (nbrFenetres) {

		//4 graph: tous sont affichés et ont même dim
		case 4:
			document.getElementById("id_graph_3D").style.height = h_Fenetre + 'px';
			document.getElementById("id_graph_3D").style.width = w_Fenetre + 'px';
			w_cvs_Fenetre3D = w_cvs;

			document.getElementById("id_graph_Viseur").style.height = h_Fenetre + 'px';
			document.getElementById("id_graph_Viseur").style.width = w_Fenetre + 'px';
			w_cvs_viseur = w_cvs - 2 * marge_X_exifViseur;

			document.getElementById("id_graph_PDC").style.height = h_Fenetre + 'px';
			document.getElementById("id_graph_PDC").style.width = w_Fenetre + 'px';
			w_cvs_Pdc = w_cvs - marge_X_cvs_PDC - marge_X_fin_cvs_PDC;
			h_cvs_Pdc = Math.round(w_cvs_Pdc * 2 / 3);

			document.getElementById("id_graph_Histo").style.height = h_Fenetre + 'px';
			document.getElementById("id_graph_Histo").style.width = w_Fenetre + 'px';
			break;



		case 2: //1ier graph selectionné
			switch (document.getElementById('id_lst_Fenetre11').options[document.getElementById('id_lst_Fenetre11').selectedIndex].value) {


				case 'id_graph_3D':
					document.getElementById("id_graph_3D").style.height = h_Fenetre + 'px';
					document.getElementById("id_graph_3D").style.width = w_Fenetre + 'px';
					w_cvs_Fenetre3D = w_cvs;
					break;

				case 'id_graph_Viseur':
					document.getElementById("id_graph_Viseur").style.height = h_Fenetre + 'px';
					document.getElementById("id_graph_Viseur").style.width = w_Fenetre + 'px';
					w_cvs_viseur = w_cvs - 2 * marge_X_exifViseur;
					break;

				case 'id_graph_PDC':
					document.getElementById("id_graph_PDC").style.height = h_Fenetre + 'px';
					document.getElementById("id_graph_PDC").style.width = w_Fenetre + 'px';
					w_cvs_Pdc = w_cvs - marge_X_cvs_PDC - marge_X_fin_cvs_PDC;
					h_cvs_Pdc = Math.round(w_cvs_Pdc * 2 / 3);
					break;

				case 'id_graph_Histo':
					document.getElementById("id_graph_Histo").style.height = h_Fenetre + 'px';
					document.getElementById("id_graph_Histo").style.width = w_Fenetre + 'px';

					break;
			}


			//2nd graph selectionné
			switch (document.getElementById('id_lst_Fenetre12').options[document.getElementById('id_lst_Fenetre12').selectedIndex].value) {


				case 'id_graph_3D':
					document.getElementById("id_graph_3D").style.height = h_Fenetre + 'px';
					document.getElementById("id_graph_3D").style.width = w_Fenetre + 'px';

					w_cvs_Fenetre3D = w_cvs;

					break;

				case 'id_graph_Viseur':
					document.getElementById("id_graph_Viseur").style.height = h_Fenetre + 'px';
					document.getElementById("id_graph_Viseur").style.width = w_Fenetre + 'px';

					w_cvs_viseur = w_cvs - 2 * marge_X_exifViseur;

					break;

				case 'id_graph_PDC':
					document.getElementById("id_graph_PDC").style.height = h_Fenetre + 'px';
					document.getElementById("id_graph_PDC").style.width = w_Fenetre + 'px';

					w_cvs_Pdc = w_cvs - marge_X_cvs_PDC - marge_X_fin_cvs_PDC;

					h_cvs_Pdc = Math.round(w_cvs_Pdc * 2 / 3);
					break;

				case 'id_graph_Histo':
					document.getElementById("id_graph_Histo").style.height = h_Fenetre + 'px';
					document.getElementById("id_graph_Histo").style.width = w_Fenetre + 'px';


					break;
			}

			//1ier graph NON selectionné
			switch (document.getElementById('id_lst_Fenetre21').options[document.getElementById('id_lst_Fenetre21').selectedIndex].value) {

				case 'id_graph_3D':
					document.getElementById("id_graph_3D").style.height = h_Fenetre + 'px';
					document.getElementById("id_graph_3D").style.width = w_Fenetre + 'px';
					w_cvs_Fenetre3D = w_cvs_hiden;
					break;

				case 'id_graph_Viseur':
					document.getElementById("id_graph_Viseur").style.height = h_Fenetre + 'px';
					document.getElementById("id_graph_Viseur").style.width = w_Fenetre + 'px';
					w_cvs_viseur = w_cvs_hiden - 2 * marge_X_exifViseur;
					break;

				case 'id_graph_PDC':
					document.getElementById("id_graph_PDC").style.height = h_Fenetre + 'px';
					document.getElementById("id_graph_PDC").style.width = w_Fenetre + 'px';
					w_cvs_Pdc = w_cvs_hiden - marge_X_cvs_PDC - marge_X_fin_cvs_PDC;
					h_cvs_Pdc = Math.round(w_cvs_Pdc * 2 / 3);
					break;

				case 'id_graph_Histo':
					document.getElementById("id_graph_Histo").style.height = h_Fenetre + 'px';
					document.getElementById("id_graph_Histo").style.width = w_Fenetre + 'px';

					break;
			}


			//2nd graph NON selectionné
			switch (document.getElementById('id_lst_Fenetre22').options[document.getElementById('id_lst_Fenetre22').selectedIndex].value) {

				case 'id_graph_3D':
					document.getElementById("id_graph_3D").style.height = h_Fenetre + 'px';
					document.getElementById("id_graph_3D").style.width = w_Fenetre + 'px';
					w_cvs_Fenetre3D = w_cvs_hiden;
					break;

				case 'id_graph_Viseur':
					document.getElementById("id_graph_Viseur").style.height = h_Fenetre + 'px';
					document.getElementById("id_graph_Viseur").style.width = w_Fenetre + 'px';
					w_cvs_viseur = w_cvs_hiden - 2 * marge_X_exifViseur;
					break;

				case 'id_graph_PDC':
					document.getElementById("id_graph_PDC").style.height = h_Fenetre + 'px';
					document.getElementById("id_graph_PDC").style.width = w_Fenetre + 'px';
					w_cvs_Pdc = w_cvs_hiden - marge_X_cvs_PDC - marge_X_fin_cvs_PDC;
					h_cvs_Pdc = Math.round(w_cvs_Pdc * 2 / 3);
					break;

				case 'id_graph_Histo':
					document.getElementById("id_graph_Histo").style.height = h_Fenetre + 'px';
					document.getElementById("id_graph_Histo").style.width = w_Fenetre + 'px';

					break;
			}

			break;


		case 1: //graph selectionné
			switch (document.getElementById('id_lst_Fenetre11').options[document.getElementById('id_lst_Fenetre11').selectedIndex].value) {

				case 'id_graph_3D':
					document.getElementById("id_graph_3D").style.height = h_Fenetre + 'px';
					document.getElementById("id_graph_3D").style.width = w_Fenetre + 'px';
					w_cvs_Fenetre3D = w_cvs;
					break;

				case 'id_graph_Viseur':
					document.getElementById("id_graph_Viseur").style.height = h_Fenetre + 'px';
					document.getElementById("id_graph_Viseur").style.width = w_Fenetre + 'px';
					w_cvs_viseur = w_cvs - 2 * marge_X_exifViseur;
					break;

				case 'id_graph_PDC':
					document.getElementById("id_graph_PDC").style.height = h_Fenetre + 'px';
					document.getElementById("id_graph_PDC").style.width = w_Fenetre + 'px';
					w_cvs_Pdc = w_cvs - marge_X_cvs_PDC - marge_X_fin_cvs_PDC;
					h_cvs_Pdc = Math.round(w_cvs_Pdc * 2 / 3);
					break;

				case 'id_graph_Histo':
					document.getElementById("id_graph_Histo").style.height = h_Fenetre + 'px';
					document.getElementById("id_graph_Histo").style.width = w_Fenetre + 'px';

					break;
			}

			//1ier graph NON selectionné
			switch (document.getElementById('id_lst_Fenetre12').options[document.getElementById('id_lst_Fenetre12').selectedIndex].value) {

				case 'id_graph_3D':
					document.getElementById("id_graph_3D").style.height = h_Fenetre + 'px';
					document.getElementById("id_graph_3D").style.width = w_Fenetre + 'px';
					w_cvs_Fenetre3D = w_cvs_hiden;
					break;

				case 'id_graph_Viseur':
					document.getElementById("id_graph_Viseur").style.height = h_Fenetre + 'px';
					document.getElementById("id_graph_Viseur").style.width = w_Fenetre + 'px';
					w_cvs_viseur = w_cvs_hiden - 2 * marge_X_exifViseur;
					break;

				case 'id_graph_PDC':
					document.getElementById("id_graph_PDC").style.height = h_Fenetre + 'px';
					document.getElementById("id_graph_PDC").style.width = w_Fenetre + 'px';
					w_cvs_Pdc = w_cvs_hiden - marge_X_cvs_PDC - marge_X_fin_cvs_PDC;
					h_cvs_Pdc = Math.round(w_cvs_Pdc * 2 / 3);
					break;

				case 'id_graph_Histo':
					document.getElementById("id_graph_Histo").style.height = h_Fenetre + 'px';
					document.getElementById("id_graph_Histo").style.width = w_Fenetre + 'px';

					break;
			}

			//2nd graph NON selectionné
			switch (document.getElementById('id_lst_Fenetre21').options[document.getElementById('id_lst_Fenetre21').selectedIndex].value) {

				case 'id_graph_3D':
					document.getElementById("id_graph_3D").style.height = h_Fenetre + 'px';
					document.getElementById("id_graph_3D").style.width = w_Fenetre + 'px';
					w_cvs_Fenetre3D = w_cvs_hiden;
					break;

				case 'id_graph_Viseur':
					document.getElementById("id_graph_Viseur").style.height = h_Fenetre + 'px';
					document.getElementById("id_graph_Viseur").style.width = w_Fenetre + 'px';
					w_cvs_viseur = w_cvs_hiden - 2 * marge_X_exifViseur;
					break;

				case 'id_graph_PDC':
					document.getElementById("id_graph_PDC").style.height = h_Fenetre + 'px';
					document.getElementById("id_graph_PDC").style.width = w_Fenetre + 'px';
					w_cvs_Pdc = w_cvs_hiden - marge_X_cvs_PDC - marge_X_fin_cvs_PDC;
					h_cvs_Pdc = Math.round(w_cvs_Pdc * 2 / 3);
					break;

				case 'id_graph_Histo':
					document.getElementById("id_graph_Histo").style.height = h_Fenetre + 'px';
					document.getElementById("id_graph_Histo").style.width = w_Fenetre + 'px';

					break;
			}

			//3ième graph NON selectionné
			switch (document.getElementById('id_lst_Fenetre22').options[document.getElementById('id_lst_Fenetre22').selectedIndex].value) {

				case 'id_graph_3D':
					document.getElementById("id_graph_3D").style.height = h_Fenetre + 'px';
					document.getElementById("id_graph_3D").style.width = w_Fenetre + 'px';
					w_cvs_Fenetre3D = w_cvs_hiden;
					break;

				case 'id_graph_Viseur':
					document.getElementById("id_graph_Viseur").style.height = h_Fenetre + 'px';
					document.getElementById("id_graph_Viseur").style.width = w_Fenetre + 'px';
					w_cvs_viseur = w_cvs_hiden - 2 * marge_X_exifViseur;
					break;

				case 'id_graph_PDC':
					document.getElementById("id_graph_PDC").style.height = h_Fenetre + 'px';
					document.getElementById("id_graph_PDC").style.width = w_Fenetre + 'px';
					w_cvs_Pdc = w_cvs_hiden - marge_X_cvs_PDC - marge_X_fin_cvs_PDC;
					h_cvs_Pdc = Math.round(w_cvs_Pdc * 2 / 3);
					break;

				case 'id_graph_Histo':
					document.getElementById("id_graph_Histo").style.height = h_Fenetre + 'px';
					document.getElementById("id_graph_Histo").style.width = w_Fenetre + 'px';

					break;
			}

			break;

	}

	//Affiche les zones à afficher
	switch (nbrFenetres) {

		case 1:
			show(document.getElementById('id_lst_Fenetre11').options[document.getElementById('id_lst_Fenetre11').selectedIndex].value);
			break;

		case 2:
			show(document.getElementById('id_lst_Fenetre11').options[document.getElementById('id_lst_Fenetre11').selectedIndex].value);
			show(document.getElementById('id_lst_Fenetre12').options[document.getElementById('id_lst_Fenetre12').selectedIndex].value);
			break;

		case 4:
			show(document.getElementById('id_lst_Fenetre11').options[document.getElementById('id_lst_Fenetre11').selectedIndex].value);
			show(document.getElementById('id_lst_Fenetre12').options[document.getElementById('id_lst_Fenetre12').selectedIndex].value);
			show(document.getElementById('id_lst_Fenetre21').options[document.getElementById('id_lst_Fenetre21').selectedIndex].value);
			show(document.getElementById('id_lst_Fenetre22').options[document.getElementById('id_lst_Fenetre22').selectedIndex].value);
			break;
	}


	//MAJ des canvas
	if (flag_init === 0) {
		drawFenetre3D();
		drawViseur();


	}
}



function init_dimensionsFenetres() {



	switch (nbrFenetres) {

		case 1:
			h_ZoneFenetres = 540;
			w_ZoneFenetres = 800;
			h_Fenetre = 520;
			w_Fenetre = 800;
			h_cvs = 0;
			w_cvs = 700;
			document.getElementById("id_choix_graph_1_1").style.display = '';
			document.getElementById("id_choix_graph_1_2").style.display = 'none';
			document.getElementById("id_choix_graph_2_1").style.display = 'none';
			document.getElementById("id_choix_graph_2_2").style.display = 'none';
			document.getElementById("id_canvas_histo_RVB").style.display = '';
			break;

		case 2:
			h_ZoneFenetres = 320;
			w_ZoneFenetres = 800;
			h_Fenetre = 300;
			w_Fenetre = 400;
			h_cvs = 0;
			w_cvs = 380;
			document.getElementById("id_choix_graph_1_1").style.display = '';
			document.getElementById("id_choix_graph_1_2").style.display = '';
			document.getElementById("id_choix_graph_2_1").style.display = 'none';
			document.getElementById("id_choix_graph_2_2").style.display = 'none';
			document.getElementById("id_canvas_histo_RVB").style.display = '';
			break;

		case 4:
			h_ZoneFenetres = 460;
			w_ZoneFenetres = 800;
			h_Fenetre = 220;
			w_Fenetre = 400;
			h_cvs = 0;
			w_cvs = 250;
			document.getElementById("id_choix_graph_1_1").style.display = '';
			document.getElementById("id_choix_graph_1_2").style.display = '';
			document.getElementById("id_choix_graph_2_1").style.display = '';
			document.getElementById("id_choix_graph_2_2").style.display = '';
			document.getElementById("id_canvas_histo_RVB").style.display = 'none';

			break;
	}

	//Zone graphique totale
	document.getElementById("id_zone_graph").style.height = h_ZoneFenetres + 'px';
	document.getElementById("id_zone_graph").style.width = w_ZoneFenetres + 'px';

	var left_temp = Math.round((w_Fenetre - 207) / 2);
	document.getElementById("menu_3D").style.left = left_temp + 'px';


	//Zone graphique totale
	document.getElementById("id_zone_graph").style.height = h_ZoneFenetres + 'px';
	document.getElementById("id_zone_graph").style.width = w_ZoneFenetres + 'px';


	positionneFenetres('id_lst_Fenetre11');
}


//Nbr de graph à afficher
document.getElementById('id_div_Btn1Fenetre').onclick = function() {
	if (nbrFenetres !== 1) {
		nbrFenetres = 1;
		drawBouton('id_div_Btn1Fenetre', 'id_img_Btn1Fenetre', 'css_BtnON');
		drawBouton('id_div_Btn2Fenetres', 'id_img_Btn2Fenetres', 'css_BtnOFF');
		drawBouton('id_div_Btn4Fenetres', 'id_img_Btn4Fenetres', 'css_BtnOFF');
		init_dimensionsFenetres();
	}
};
document.getElementById('id_div_Btn2Fenetres').onclick = function() {
	if (nbrFenetres !== 2) {
		nbrFenetres = 2;
		drawBouton('id_div_Btn1Fenetre', 'id_img_Btn1Fenetre', 'css_BtnOFF');
		drawBouton('id_div_Btn2Fenetres', 'id_img_Btn2Fenetres', 'css_BtnON');
		drawBouton('id_div_Btn4Fenetres', 'id_img_Btn4Fenetres', 'css_BtnOFF');
		init_dimensionsFenetres();
	}
};
document.getElementById('id_div_Btn4Fenetres').onclick = function() {
	if (nbrFenetres !== 4) {
		nbrFenetres = 4;
		drawBouton('id_div_Btn1Fenetre', 'id_img_Btn1Fenetre', 'css_BtnOFF');
		drawBouton('id_div_Btn2Fenetres', 'id_img_Btn2Fenetres', 'css_BtnOFF');
		drawBouton('id_div_Btn4Fenetres', 'id_img_Btn4Fenetres', 'css_BtnON');
		init_dimensionsFenetres();
	}
};


//Nbr de graph à afficher
document.getElementById('id_div_Btn1Fenetre').onclick = function() {
	if (nbrFenetres !== 1) {
		nbrFenetres = 1;
		drawBouton('id_div_Btn1Fenetre', 'id_img_Btn1Fenetre', 'css_BtnON');
		drawBouton('id_div_Btn2Fenetres', 'id_img_Btn2Fenetres', 'css_BtnOFF');
		drawBouton('id_div_Btn4Fenetres', 'id_img_Btn4Fenetres', 'css_BtnOFF');
		init_dimensionsFenetres();
	}
};
document.getElementById('id_div_Btn2Fenetres').onclick = function() {
	if (nbrFenetres !== 2) {
		nbrFenetres = 2;
		drawBouton('id_div_Btn1Fenetre', 'id_img_Btn1Fenetre', 'css_BtnOFF');
		drawBouton('id_div_Btn2Fenetres', 'id_img_Btn2Fenetres', 'css_BtnON');
		drawBouton('id_div_Btn4Fenetres', 'id_img_Btn4Fenetres', 'css_BtnOFF');
		init_dimensionsFenetres();
	}
};
document.getElementById('id_div_Btn4Fenetres').onclick = function() {
	if (nbrFenetres !== 4) {
		nbrFenetres = 4;
		drawBouton('id_div_Btn1Fenetre', 'id_img_Btn1Fenetre', 'css_BtnOFF');
		drawBouton('id_div_Btn2Fenetres', 'id_img_Btn2Fenetres', 'css_BtnOFF');
		drawBouton('id_div_Btn4Fenetres', 'id_img_Btn4Fenetres', 'css_BtnON');
		init_dimensionsFenetres();
	}
};


//MAJ d'un choix de graphique dans une liste
//MAJ de la position du graphique selectionné
//MAJ de la position du graphique anciennement à la position
//Affiche/cache
document.getElementById('id_lst_Fenetre11').addEventListener('change', function() {
	positionneFenetres('id_lst_Fenetre11');
}, false);
document.getElementById('id_lst_Fenetre12').addEventListener('change', function() {
	positionneFenetres('id_lst_Fenetre12');
}, false);
document.getElementById('id_lst_Fenetre21').addEventListener('change', function() {
	positionneFenetres('id_lst_Fenetre21');
}, false);
document.getElementById('id_lst_Fenetre22').addEventListener('change', function() {
	positionneFenetres('id_lst_Fenetre22');
}, false);



//MAJ d'un choix de graphique dans une liste
//MAJ de la position du graphique selectionné
//MAJ de la position du graphique anciennement à la position
//Affiche/cache
document.getElementById('id_lst_Fenetre11').addEventListener('change', function() {
	positionneFenetres('id_lst_Fenetre11');
}, false);
document.getElementById('id_lst_Fenetre12').addEventListener('change', function() {
	positionneFenetres('id_lst_Fenetre12');
}, false);
document.getElementById('id_lst_Fenetre21').addEventListener('change', function() {
	positionneFenetres('id_lst_Fenetre21');
}, false);
document.getElementById('id_lst_Fenetre22').addEventListener('change', function() {
	positionneFenetres('id_lst_Fenetre22');
}, false);


//SOURIS & CANVAS VISEUR
//--VISEUR
//-dP = f(roulette)