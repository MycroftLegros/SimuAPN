//Dessine le viseur


//Rq: appeler luminosité une fois sur l'imagedata globale fait passer de 77ms à 32ms (vs luminosité pour chaque layer)

function drawViseur() {

	var i, ii;
	var temp, temp2;

	var marge_x_viseur = 10;
	var h_cvs_Viseur = h_capteur * w_cvs_viseur / l_capteur;


	//Canvas Illus
	var cvs_illu = document.getElementById('id_cvs_viseur_illustrations');
	var ct_illu = cvs_illu.getContext('2d');
	cvs_illu.width = w_cvs_viseur;
	cvs_illu.height = h_cvs_Viseur;

	var my_gradient = ct_illu.createLinearGradient(0, 0, 0, 170);
	my_gradient.addColorStop(0, "rgb(50,100,250)");
	my_gradient.addColorStop(1, "white");
	ct_illu.fillStyle = my_gradient;
	ct_illu.fillRect(0, 0, w_cvs_viseur, h_cvs_Viseur / 2);

	document.getElementById('id_cvs_viseur_illustrations').style.cssText = 'position: absolute; left: ' + marge_x_viseur + 'px; top: ' + marge_Y_exifViseur + 'px; z-index: 2;';

	//Canvas avec les Indications
	var cvs_cadre = document.getElementById('id_cvs_viseur_cadre');
	var ct_cadre = cvs_cadre.getContext('2d');
	var W_viseur = w_cvs_viseur + 2 * marge_X_exifViseur;
	var H_viseur = h_cvs_Viseur + marge_Y_exifViseur + marge_Y_bas_exifViseur;
	cvs_cadre.width = W_viseur;
	cvs_cadre.height = H_viseur;

	ct_cadre.fillStyle = '#000000';
	ct_cadre.fillRect(0, 0, W_viseur - 1, H_viseur - 1);

	marge_x_viseur -= marge_X_exifViseur;
	document.getElementById('id_cvs_viseur_cadre').style.cssText = 'position: absolute; left: ' + marge_x_viseur + 'px; top: 0px; z-index: 1;';
	marge_x_viseur += marge_X_exifViseur;


	//--INDICATIONS SOUS LE VISEUR
	var y_text = H_viseur - 0.5 * marge_Y_bas_exifViseur + 5;

	ct_cadre.font = "12px 'Trebuchet MS'";
	ct_cadre.fillStyle = "#ffffff";
	ct_cadre.beginPath();
	//-vitesse
	temp = 0.083333 * W_viseur;
	ct_cadre.fillText(vitesse_string, temp, y_text);
	//-ouverture
	temp = 0.25 * W_viseur;
	ct_cadre.fillText('f/' + ouverture, temp, y_text);
	//-iso
	temp = 0.75 * W_viseur;
	ct_cadre.fillText('ISO' + ISO, temp, y_text);
	//-exposition
	temp = 0.5 * W_viseur;

	temp2 = expo;
	if (temp2 !== 0)
		temp2 = temp2.toFixed(1);
	if (temp2 > 0)
		temp2 = '+' + temp2;


	//-Curseur d'exposition
	var X0 = (W_viseur - 1) / 2;
	var Y0 = y_text - 5;

	var c = 3; //côté d'un carré de l'indicateur d'EV
	var e = 1; //espace entre 2 indications

	ct_cadre.beginPath();

	//trait en haut
	ct_cadre.fillRect(X0, Y0 - c - e, c, 3 * c + e);

	for (i = 1; i !== 3; i++) {
		ct_cadre.fillRect(X0 + i * 3 * (c + e), Y0 - c - e, c, c);
		ct_cadre.fillRect(X0 - i * 3 * (c + e), Y0 - c - e, c, c);
	}

	ct_cadre.fillText('-', X0 - 6 * (c + e) - 4, Y0 - 2 * c);
	ct_cadre.fillText(temp2 + 'EV', X0 - 10, Y0 - 2 * c - 2);
	ct_cadre.fillText('+', X0 + 7 * (c + e), Y0 - 2 * c);

	//traits dynamiques
	ii = 0;

	for (i = Math.abs(expo); i >= 0 & ii < 7; i -= 0.333) {
		if (expo > 0)
			ct_cadre.fillRect(X0 + ii * (c + e), Y0, c, 2 * c);
		else
			ct_cadre.fillRect(X0 - ii * (c + e), Y0, c, 2 * c);
		ii++;
	}

	if (expo > 2) {
		ct_cadre.moveTo(X0 + 7 * (c + e), Y0);
		ct_cadre.lineTo(X0 + 7 * (c + e) + 1.732 * c, Y0 + c);
		ct_cadre.lineTo(X0 + 7 * (c + e), Y0 + 2 * c);
		ct_cadre.lineTo(X0 + 7 * (c + e), Y0);
		ct_cadre.fill();
	}
	if (expo < -2) {
		ct_cadre.moveTo(X0 - 6 * (c + e), Y0);
		ct_cadre.lineTo(X0 - 6 * (c + e) - 1.732 * c, Y0 + c);
		ct_cadre.lineTo(X0 - 6 * (c + e), Y0 + 2 * c);
		ct_cadre.lineTo(X0 - 6 * (c + e), Y0);
		ct_cadre.fill();
	}


	var Wc = w_cvs_viseur;
	var Hc = h_cvs_Viseur;

	var Xm = (Wc - 1) / 2;
	var Ym = (Hc - 1) / 2;

	var d0 = focale / 1000 + dY * Math.tan((Math.PI - (angleChampVertical * 2 * Math.PI / 360.0)) / 2); //distance de la scène au bas du cadre
	var l0 = 2 * d0 * Math.tan(angleChampHorizontal * Math.PI / 360.0); //largeur de la scène au niveau du cadre



	//--GRILLE DE PERSPECTIVE
	//Couleur de fond
	//TBD: faire un dégradé
	ct_illu.fillStyle = color_sol;
	ct_illu.fillRect(0, h_cvs_Viseur / 2, w_cvs_viseur, h_cvs_Viseur / 2);

	//Couleur des lignes
	ct_illu.beginPath();
	ct_illu.strokeStyle = color_grillePerspective;
	ct_illu.lineWidth = 1;

	//-Lignes de fuite
	var dg = 1.0 * ecartLignesSol;
	temp = (Hc / 2) * Math.tan(0.99 * Math.PI / 2); //ecart en X à l'angle final
	var Xi = 0;
	var flag = 0;
	i = 0;
	while (flag !== 3) {
		//Trait vers la droite
		if (dY >= 0)
			Xi = Xm + i * dg * Wc / l0 + dX * Wc / l0;
		else
			Xi = Xm + i * dg * Wc / l0 - dX * Wc / l0;

		ct_illu.moveTo(Xm, Ym);
		if (dY >= 0)
			ct_illu.lineTo(Xi, Hc - 1);
		else
			ct_illu.lineTo(Xi, 0);
		ct_illu.stroke();

		if (Math.abs(Xm - Xi) >= temp)
			flag |= 0x01;

		//Trait vers la gauche
		if (dY >= 0)
			Xi = Xm - i * dg * Wc / l0 + dX * Wc / l0;
		else
			Xi = Xm - i * dg * Wc / l0 - dX * Wc / l0;

		ct_illu.beginPath();
		ct_illu.moveTo(Xm, Ym);
		if (dY >= 0)
			ct_illu.lineTo(Xi, Hc - 1);
		else
			ct_illu.lineTo(Xi, 0);
		ct_illu.stroke();

		if (Math.abs(Xm - Xi) >= temp)
			flag |= 0x02;

		i++;
	}

	//-Traits horizontaux
	var Yi = 0;
	var di = dg * Math.ceil((d0 + dP) / dg); //multiple entier de dg supérieur à d0
	ct_illu.beginPath();
	var Ylast = -1;
	while (Math.abs(Yi - Ym) > 3) { //laisse 3 px entre l'horizon et le dernier trait
		temp = 2 * (di - dP) * Math.tan(angleChampVertical * Math.PI / 360.0);
		Yi = Ym + dY * Hc / temp;

		if (Math.abs(Ylast - Yi) > 0.5) {
			ct_illu.moveTo(0, Yi);
			ct_illu.lineTo(Wc - 1, Yi);
			Ylast = Yi;
		} else {
			Yi = Ym;
		}

		di += dg;
	}
	ct_illu.stroke();


	ct_illu.fillStyle = color_grillePerspective;
	ct_illu.beginPath();
	ct_illu.fillRect(0, Ym, w_cvs_viseur, Ylast - Ym);


	//--MAP, avant plan et arrière plan
	var X = 1.0;
	var Y = 1.0;
	var l = 1.0;
	var h = 1.0;
	var f = 1.0;

	var bright = 0;

	if (dynamiqueCapteurISOCourant === 0) {
		if (expo > 0)
			bright = 9999;
		if (expo < 0)
			bright = 0;
	} else {
		var cal_temp = expo * 8.0 / dynamiqueCapteurISOCourant;
		bright = Math.pow(2, cal_temp);
	}


	if (flag_drawExposition === 0)
		bright = 1;


	//-PDC
	//TBD: mettre la PDC dans un autre canvas pour ne pas la prendre en compte dans l'histogramme et le viseur en 3D
	temp = 2 * debutPDC * Math.tan(angleChampVertical * Math.PI / 360.0);
	Yav = Ym + dY * Hc / temp;
	temp = 2 * finPDC * Math.tan(angleChampVertical * Math.PI / 360.0);
	Yar = Ym + dY * Hc / temp;
	ct_illu.strokeStyle = 'rgba(' + color_rayonLumineux + ',0.5)';
	ct_illu.fillStyle = 'rgba(' + color_rayonLumineux + ',0.5)';
	ct_illu.beginPath();
	ct_illu.moveTo(0, Yav);
	ct_illu.lineTo(0, Yar);
	ct_illu.lineTo(w_cvs_viseur - 1, Yar);
	ct_illu.lineTo(w_cvs_viseur - 1, Yav);
	ct_illu.lineTo(0, Yav);
	ct_illu.stroke();
	ct_illu.fill();


	//--ILLUSTRATIONS
	//-Arrière
	var blur_min = 0.1;
	var blur_max = 100;

	var k,w;
	var w_img,h_img;
	var w_m_img;
	var offset_y;

	var cvs_temp2;

	if (d_arrierePlan !== 0) {
		l = 2 * d_arrierePlan * Math.tan(angleChampHorizontal * Math.PI / 360.0);
		h = 2 * d_arrierePlan * Math.tan(angleChampVertical * Math.PI / 360.0);
		X = Xm + dX * Wc / l + offset_x_img_arrierePlan * Wc / l;
		Y = Ym + dY * Hc / h;

		w_img = w_img_arrierePlan;
		h_img = h_img_arrierePlan;
		w_m_img = w_m_img_arrierePlan;
		offset_y = offset_y_arrierePlan;

		k = Wc / l; //px.m-1
		w = k * w_m_img;
		h = k * w_m_img * h_img / w_img;

		X -= w / 2;
		Y -= (w_m_img * h_img / w_img - offset_y) * k;

		f = flouArrierePlan * Wc / (l_capteur / 1000.0);
		if (f > blur_max)
			f = blur_max;
		if (f < blur_min)
			f = 0;

		if (flag_drawFlou === 0)
			f = 0;

		if (f !== 0) {
			stackBlurImage(img_arrierePlan, 'id_cvs_inter', f, 1);
			cvs_temp2 = document.getElementById("id_cvs_inter");
			ct_illu.drawImage(cvs_temp2, X, Y, w, h);
		} else
			ct_illu.drawImage(img_arrierePlan, X, Y, w, h);
	}



	//-MAP
	l = 2 * d_map * Math.tan(angleChampHorizontal * Math.PI / 360.0);
	h = 2 * d_map * Math.tan(angleChampVertical * Math.PI / 360.0);
	X = Xm + dX * Wc / l;
	Y = Ym + dY * Hc / h;

	w_img = w_img_map;
	h_img = h_img_map;
	w_m_img = w_m_img_map;
	offset_y = offset_y_map;

	k = Wc / l;
	w = k * w_m_img;
	h = k * w_m_img * h_img / w_img;

	X -= w / 2;
	Y -= (w_m_img * h_img / w_img - offset_y) * k;

	ct_illu.drawImage(img_map, X, Y, w, h);

	//-Avant
	if (d_avantPlan !== 0) {
		l = 2 * d_avantPlan * Math.tan(angleChampHorizontal * Math.PI / 360.0);
		h = 2 * d_avantPlan * Math.tan(angleChampVertical * Math.PI / 360.0);
		X = Xm + dX * Wc / l + offset_x_img_avantPlan * Wc / l;
		Y = Ym + dY * Hc / h;

		w_img = w_img_avantPlan;
		h_img = h_img_avantPlan;
		w_m_img = w_m_img_avantPlan;
		offset_y = offset_y_avantPlan;

		k = Wc / l; //px.m-1
		w = k * w_m_img;
		h = k * w_m_img * h_img / w_img;

		X -= w / 2;
		Y -= (w_m_img * h_img / w_img - offset_y) * k;


		f = flouAvantPlan * Wc / (l_capteur / 1000.0);
		if (f > blur_max)
			f = blur_max;
		if (f < blur_min)
			f = 0;

		if (flag_drawFlou === 0)
			f = 0;

		if (f !== 0) {
			stackBlurImage(img_avantPlan, 'id_cvs_inter', f, 1);
			cvs_temp2 = document.getElementById("id_cvs_inter");
			ct_illu.drawImage(cvs_temp2, X, Y, w, h);
		} else
			ct_illu.drawImage(img_avantPlan, X, Y, w, h);

	}



	//--Luminosité
	var imgData = ct_illu.getImageData(0, 0, w_cvs_viseur, h_cvs_Viseur);

	var imgData_temp;
	if (flag_drawExposition) {
		imgData_temp = luminosite(imgData, bright).imgData_lum;
		ct_illu.putImageData(imgData_temp, 0, 0);
	} else
		imgData_temp = imgData;



	//--Récupère les valeurs des pixels pour le calcul de l'histogramme
	//TBD: utiliser directement imgData_temp dans calcHisto
	for (i = 0; i < w_cvs_viseur * h_cvs_Viseur; i++) {
		valPixR[i] = imgData_temp.data[4 * i];
		valPixV[i] = imgData_temp.data[4 * i + 1];
		valPixB[i] = imgData_temp.data[4 * i + 2];
		ValPixA[i] = imgData_temp.data[4 * i + 3];
	}

	
	//TBD: à ne lancer que si visible
	calcHistos();
	drawGraphPDC();
}

//Maj des dataURL des img av,ar et map

function majIllustrations() {

	switch (cpt_illustrationAvantPlan) {

		case 1:
			img_avantPlan.src = dataURL_chat_avantPlan;
			w_img_avantPlan = 150;
			h_img_avantPlan = 300;
			w_m_img_avantPlan = 0.26469;
			offset_y_avantPlan = 0.0794;
			break;

		case 2:
			img_avantPlan.src = dataURL_parapluie_avantPlan;
			w_img_avantPlan = 133;
			h_img_avantPlan = 300;
			w_m_img_avantPlan = 0.8202;
			offset_y_avantPlan = 0.0;
			break;

		case 3:
			img_avantPlan.src = dataURL_bigben_avantPlan;
			w_img_avantPlan = 300;
			h_img_avantPlan = 197;
			w_m_img_avantPlan = 147.71;
			offset_y_avantPlan = 0;
			break;

		case 4:
			img_avantPlan.src = dataURL_arbre_avantPlan;
			w_img_avantPlan = 262;
			h_img_avantPlan = 300;
			w_m_img_avantPlan = 3.49;
			offset_y_avantPlan = 0;
			break;
	}

	img_avantPlan.onload = function() {

		switch (cpt_illustrationArrierePlan) {
			case 1:
				img_arrierePlan.src = dataURL_chat_arrierePlan;
				w_img_arrierePlan = 150;
				h_img_arrierePlan = 300;
				w_m_img_arrierePlan = 0.26469;
				offset_y_arrierePlan = 0.0794;
				break;

			case 2:
				img_arrierePlan.src = dataURL_parapluie_arrierePlan;
				w_img_arrierePlan = 133;
				h_img_arrierePlan = 300;
				w_m_img_arrierePlan = 0.8202;
				offset_y_arrierePlan = 0.0;
				break;

			case 3:
				img_arrierePlan.src = dataURL_bigben_arrierePlan;
				w_img_arrierePlan = 300;
				h_img_arrierePlan = 197;
				w_m_img_arrierePlan = 147.71;
				offset_y_arrierePlan = 0;
				break;

			case 4:
				img_arrierePlan.src = dataURL_arbre_arrierePlan;
				w_img_arrierePlan = 262;
				h_img_arrierePlan = 300;
				w_m_img_arrierePlan = 3.49;
				offset_y_arrierePlan = 0;
				break;
		}
	};


	img_arrierePlan.onload = function() {

		switch (cpt_illustrationMap) {
			case 1:
				img_map.src = dataURL_chat_map;
				w_img_map = 150;
				h_img_map = 300;
				w_m_img_map = 0.26469;
				offset_y_map = 0.0794;
				break;

			case 2:
				img_map.src = dataURL_parapluie_map;
				w_img_map = 133;
				h_img_map = 300;
				w_m_img_map = 0.8202;
				offset_y_map = 0.0;
				break;

			case 3:
				img_map.src = dataURL_bigben_map;
				w_img_map = 300;
				h_img_map = 197;
				w_m_img_map = 147.71;
				offset_y_map = 0;
				break;

			case 4:
				img_map.src = dataURL_arbre_map;
				w_img_map = 262;
				h_img_map = 300;
				w_m_img_map = 3.49;
				offset_y_map = 0;
				break;

		}
	};

	img_map.onload = function() {

		if (flag_init) {
			drawViseur();
			drawFenetre3D();
			flag_init = 0;
		}

	};

}


//Initialise les dataURL

function initImageData() {

	//Images temporaires
	var img_temp_chat = document.createElement("IMG");
	var img_temp_parapluie = document.createElement("IMG");
	var img_temp_bigben = document.createElement("IMG");
	var img_temp_arbre = document.createElement("IMG");

	//CHAT
	img_temp_chat.crossOrigin = "anonymous";
	img_temp_chat.src = "silhouettes/Chat.png";

	img_temp_chat.onload = function() {

		//- 1 - Met l'image dans le canvas
		var cvs = document.getElementById('id_cvs_inter');
		var ct = cvs.getContext('2d');
		var w = img_temp_chat.width;
		var h = img_temp_chat.height;
		cvs.width = w;
		cvs.height = h;

		ct.drawImage(img_temp_chat, 0, 0, w, h);

		var RVB_avantPlan = color_avantPlan.split(',');
		var RVB_arrierePlan = color_arrierePlan.split(',');
		var RVB_map = color_map.split(',');
		//- 2 - Récupère l'image dans un imageData
		var imageData_avantPlan = ct.getImageData(0, 0, w, h);
		var imageData_arrierePlan = ct.getImageData(0, 0, w, h);
		var imageData_map = ct.getImageData(0, 0, w, h);

		// - 3 - Change la couleur de l'image data
		for (var i = 0; i < imageData_avantPlan.data.length; i += 4) {

			if (imageData_avantPlan.data[i] === 0 && imageData_avantPlan.data[i + 1] === 0 && imageData_avantPlan.data[i + 2] === 0 && imageData_avantPlan.data[i + 3] !== 1) {

				imageData_avantPlan.data[i] = RVB_avantPlan[0];
				imageData_avantPlan.data[i + 1] = RVB_avantPlan[1];
				imageData_avantPlan.data[i + 2] = RVB_avantPlan[2];

				imageData_arrierePlan.data[i] = RVB_arrierePlan[0];
				imageData_arrierePlan.data[i + 1] = RVB_arrierePlan[1];
				imageData_arrierePlan.data[i + 2] = RVB_arrierePlan[2];

				imageData_map.data[i] = RVB_map[0];
				imageData_map.data[i + 1] = RVB_map[1];
				imageData_map.data[i + 2] = RVB_map[2];
			}
		}

		ct.putImageData(imageData_avantPlan, 0, 0);
		dataURL_chat_avantPlan = cvs.toDataURL("image/png");

		ct.putImageData(imageData_arrierePlan, 0, 0);
		dataURL_chat_arrierePlan = cvs.toDataURL("image/png");

		ct.putImageData(imageData_map, 0, 0);
		dataURL_chat_map = cvs.toDataURL("image/png");


		//BIG BEN
		img_temp_bigben.crossOrigin = "anonymous";
		img_temp_bigben.src = "silhouettes/London.png";
	};


	img_temp_bigben.onload = function() {

		//- 1 - Met l'image dans le canvas
		var cvs = document.getElementById('id_cvs_inter');
		var ct = cvs.getContext('2d');
		var w = img_temp_bigben.width;
		var h = img_temp_bigben.height;
		cvs.width = w;
		cvs.height = h;

		ct.drawImage(img_temp_bigben, 0, 0, w, h);

		var RVB_avantPlan = color_avantPlan.split(',');
		var RVB_arrierePlan = color_arrierePlan.split(',');
		var RVB_map = color_map.split(',');
		//- 2 - Récupère l'image dans un imageData
		var imageData_avantPlan = ct.getImageData(0, 0, w, h);
		var imageData_arrierePlan = ct.getImageData(0, 0, w, h);
		var imageData_map = ct.getImageData(0, 0, w, h);

		// - 3 - Change la couleur de l'image data
		for (var i = 0; i < imageData_avantPlan.data.length; i += 4) {

			if (imageData_avantPlan.data[i] === 0 && imageData_avantPlan.data[i + 1] === 0 && imageData_avantPlan.data[i + 2] === 0 && imageData_avantPlan.data[i + 3] !== 1) {

				imageData_avantPlan.data[i] = RVB_avantPlan[0];
				imageData_avantPlan.data[i + 1] = RVB_avantPlan[1];
				imageData_avantPlan.data[i + 2] = RVB_avantPlan[2];

				imageData_arrierePlan.data[i] = RVB_arrierePlan[0];
				imageData_arrierePlan.data[i + 1] = RVB_arrierePlan[1];
				imageData_arrierePlan.data[i + 2] = RVB_arrierePlan[2];

				imageData_map.data[i] = RVB_map[0];
				imageData_map.data[i + 1] = RVB_map[1];
				imageData_map.data[i + 2] = RVB_map[2];
			}
		}

		ct.putImageData(imageData_avantPlan, 0, 0);
		dataURL_bigben_avantPlan = cvs.toDataURL("image/png");

		ct.putImageData(imageData_arrierePlan, 0, 0);
		dataURL_bigben_arrierePlan = cvs.toDataURL("image/png");

		ct.putImageData(imageData_map, 0, 0);
		dataURL_bigben_map = cvs.toDataURL("image/png");

		img_temp_parapluie.crossOrigin = "anonymous";
		img_temp_parapluie.src = "silhouettes/Femme-parapluie.png";
	};


	img_temp_parapluie.onload = function() {

		//- 1 - Met l'image dans le canvas
		var cvs = document.getElementById('id_cvs_inter');
		var ct = cvs.getContext('2d');
		var w = img_temp_parapluie.width;
		var h = img_temp_parapluie.height;
		cvs.width = w;
		cvs.height = h;

		ct.drawImage(img_temp_parapluie, 0, 0, w, h);

		var RVB_avantPlan = color_avantPlan.split(',');
		var RVB_arrierePlan = color_arrierePlan.split(',');
		var RVB_map = color_map.split(',');
		//- 2 - Récupère l'image dans un imageData
		var imageData_avantPlan = ct.getImageData(0, 0, w, h);
		var imageData_arrierePlan = ct.getImageData(0, 0, w, h);
		var imageData_map = ct.getImageData(0, 0, w, h);

		// - 3 - Change la couleur de l'image data
		for (var i = 0; i < imageData_avantPlan.data.length; i += 4) {

			if (imageData_avantPlan.data[i] === 0 && imageData_avantPlan.data[i + 1] === 0 && imageData_avantPlan.data[i + 2] === 0 && imageData_avantPlan.data[i + 3] !== 1) {

				imageData_avantPlan.data[i] = RVB_avantPlan[0];
				imageData_avantPlan.data[i + 1] = RVB_avantPlan[1];
				imageData_avantPlan.data[i + 2] = RVB_avantPlan[2];

				imageData_arrierePlan.data[i] = RVB_arrierePlan[0];
				imageData_arrierePlan.data[i + 1] = RVB_arrierePlan[1];
				imageData_arrierePlan.data[i + 2] = RVB_arrierePlan[2];

				imageData_map.data[i] = RVB_map[0];
				imageData_map.data[i + 1] = RVB_map[1];
				imageData_map.data[i + 2] = RVB_map[2];
			}
		}

		ct.putImageData(imageData_avantPlan, 0, 0);
		dataURL_parapluie_avantPlan = cvs.toDataURL("image/png");

		ct.putImageData(imageData_arrierePlan, 0, 0);
		dataURL_parapluie_arrierePlan = cvs.toDataURL("image/png");

		ct.putImageData(imageData_map, 0, 0);
		dataURL_parapluie_map = cvs.toDataURL("image/png");

		//ARBRE
		img_temp_arbre.crossOrigin = "anonymous";
		img_temp_arbre.src = "silhouettes/arbre.png";
	};


	img_temp_arbre.onload = function() {

		//- 1 - Met l'image dans le canvas
		var cvs = document.getElementById('id_cvs_inter');
		var ct = cvs.getContext('2d');
		var w = img_temp_arbre.width;
		var h = img_temp_arbre.height;
		cvs.width = w;
		cvs.height = h;

		ct.drawImage(img_temp_arbre, 0, 0, w, h);

		var RVB_avantPlan = color_avantPlan.split(',');
		var RVB_arrierePlan = color_arrierePlan.split(',');
		var RVB_map = color_map.split(',');
		//- 2 - Récupère l'image dans un imageData
		var imageData_avantPlan = ct.getImageData(0, 0, w, h);
		var imageData_arrierePlan = ct.getImageData(0, 0, w, h);
		var imageData_map = ct.getImageData(0, 0, w, h);

		// - 3 - Change la couleur de l'image data
		for (var i = 0; i < imageData_avantPlan.data.length; i += 4) {

			if (imageData_avantPlan.data[i] === 0 && imageData_avantPlan.data[i + 1] === 0 && imageData_avantPlan.data[i + 2] === 0 && imageData_avantPlan.data[i + 3] !== 1) {

				imageData_avantPlan.data[i] = RVB_avantPlan[0];
				imageData_avantPlan.data[i + 1] = RVB_avantPlan[1];
				imageData_avantPlan.data[i + 2] = RVB_avantPlan[2];

				imageData_arrierePlan.data[i] = RVB_arrierePlan[0];
				imageData_arrierePlan.data[i + 1] = RVB_arrierePlan[1];
				imageData_arrierePlan.data[i + 2] = RVB_arrierePlan[2];

				imageData_map.data[i] = RVB_map[0];
				imageData_map.data[i + 1] = RVB_map[1];
				imageData_map.data[i + 2] = RVB_map[2];
			}
		}

		ct.putImageData(imageData_avantPlan, 0, 0);
		dataURL_arbre_avantPlan = cvs.toDataURL("image/png");


		ct.putImageData(imageData_arrierePlan, 0, 0);
		dataURL_arbre_arrierePlan = cvs.toDataURL("image/png");

		ct.putImageData(imageData_map, 0, 0);
		dataURL_arbre_map = cvs.toDataURL("image/png");


		ct.putImageData(imageData_map, 0, 0);
		dataURL_arbre_map = cvs.toDataURL("image/png");

		majIllustrations();
	};
}


function majIllustrationMap() {

	switch (cpt_illustrationMap) {
		case 1:
			img_map.src = dataURL_chat_map;
			w_img_map = 150;
			h_img_map = 300;
			w_m_img_map = 0.26469;
			offset_y_map = 0.0794;
			break;

		case 2:
			img_map.src = dataURL_parapluie_map;
			w_img_map = 133;
			h_img_map = 300;
			w_m_img_map = 0.8202;
			offset_y_map = 0.0;
			break;

		case 3:
			img_map.src = dataURL_bigben_map;
			w_img_map = 300;
			h_img_map = 197;
			w_m_img_map = 147.71;
			offset_y_map = 0;
			break;

		case 4:
			img_map.src = dataURL_arbre_map;
			w_img_map = 262;
			h_img_map = 300;
			w_m_img_map = 3.49;
			offset_y_map = 0;
			break;
	}

	img_map.onload = function() {
		drawViseur();
	};

}

function majIllustrationArrierePlan() {

	switch (cpt_illustrationArrierePlan) {
		case 1:
			img_arrierePlan.src = dataURL_chat_arrierePlan;
			w_img_arrierePlan = 150;
			h_img_arrierePlan = 300;
			w_m_img_arrierePlan = 0.26469;
			offset_y_arrierePlan = 0.0794;
			break;

		case 2:
			img_arrierePlan.src = dataURL_parapluie_arrierePlan;
			w_img_arrierePlan = 133;
			h_img_arrierePlan = 300;
			w_m_img_arrierePlan = 0.8202;
			offset_y_arrierePlan = 0.0;
			break;

		case 3:
			img_arrierePlan.src = dataURL_bigben_arrierePlan;
			w_img_arrierePlan = 300;
			h_img_arrierePlan = 197;
			w_m_img_arrierePlan = 147.71;
			offset_y_arrierePlan = 0;
			break;

		case 4:
			img_arrierePlan.src = dataURL_arbre_arrierePlan;
			w_img_arrierePlan = 262;
			h_img_arrierePlan = 300;
			w_m_img_arrierePlan = 3.49;
			offset_y_arrierePlan = 0;
			break;
	}

	img_arrierePlan.onload = function() {
		drawViseur();
	};
}

function majIllustrationAvantPlan() {

	switch (cpt_illustrationAvantPlan) {

		case 1:
			img_avantPlan.src = dataURL_chat_avantPlan;
			w_img_avantPlan = 150;
			h_img_avantPlan = 300;
			w_m_img_avantPlan = 0.26469;
			offset_y_avantPlan = 0.0794;
			break;

		case 2:
			img_avantPlan.src = dataURL_parapluie_avantPlan;
			w_img_avantPlan = 133;
			h_img_avantPlan = 300;
			w_m_img_avantPlan = 0.8202;
			offset_y_avantPlan = 0.0;
			break;

		case 3:
			img_avantPlan.src = dataURL_bigben_avantPlan;
			w_img_avantPlan = 300;
			h_img_avantPlan = 197;
			w_m_img_avantPlan = 147.71;
			offset_y_avantPlan = 0;
			break;

		case 4:
			img_avantPlan.src = dataURL_arbre_avantPlan;
			w_img_avantPlan = 262;
			h_img_avantPlan = 300;
			w_m_img_avantPlan = 3.49;
			offset_y_avantPlan = 0;
			break;
	}

	img_avantPlan.onload = function() {
		drawViseur();
	};

}


function majDistancePhotographe(Delta) {
	
	var temp = 1.0 * d_map;

	if (Delta > 0)
		temp = temp / 1.05;
	else
		temp = 1.05 * temp;

	if (temp > (focale / 1000)) {
		dP += d_map - temp;
		d_arrierePlan += (temp - d_map);
		d_avantPlan += (temp - d_map);
		d_map = temp;

		if (d_avantPlan < 0)
			d_avantPlan = 0;

		calculs();
		drawDistances();
		drawViseur();
		initPtsFenetre3D();	//TBC
		drawFenetre3D();
	}
}


//-dX et dY = f(déplacement de la souris)

function sourisPositionPhotographe(e) {

	//Déplacement de la souris
	var posX = e.clientX;
	var posY = e.clientY;

	var tempX = posX - Xt0_cvs_viseur;
	var tempY = posY - Yt0_cvs_viseur;

	//Dimensions de la scène

	tempX = tempX * w_m_map / w_cvs_viseur;
	tempY = tempY * h_m_map / (w_cvs_viseur * h_capteur / l_capteur);

	//1px => 1cm
	if (flag_clicViseur) {
		dX += tempX;
		dY += tempY;
	}

	if (dY < h_capteur / 2000)
		dY = h_capteur / 2000;

	Xt0_cvs_viseur = posX;
	Yt0_cvs_viseur = posY;

	drawViseur();
	initPtsFenetre3D();
	drawFenetre3D();

}


function rouletteViseur(e) {
	var Delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

	if (!e) {
		e = window.event;
	}
	if (e.preventDefault) {
		e.preventDefault();
	}

	majDistancePhotographe(Delta);

	flag_cadrageConstant = 0;
	//document.getElementById('id_chk_cadrage_cst').checked=false;
}



//Viseur: Roulette (chrome)
document.getElementById('id_cvs_viseur_illustrations').addEventListener('mousewheel', function(e) {
	rouletteViseur(e);
}, false);

//Viseur: Clic
document.getElementById('id_cvs_viseur_illustrations').addEventListener('mousedown', function(e) {
	flag_clicViseur = 1;
	Xt0_cvs_viseur = e.clientX;
	Yt0_cvs_viseur = e.clientY;
	document.body.style.cursor = 'all-scroll';
}, false);

//Viseur: Relache clic
document.getElementById('id_cvs_viseur_illustrations').addEventListener('mouseup', function() {
	flag_clicViseur = 0;
	document.body.style.cursor = 'all-scroll';
}, false);

//Viseur: Souris bouge
document.getElementById('id_cvs_viseur_illustrations').addEventListener('mousemove', function(e) {
	if (flag_clicViseur)
		sourisPositionPhotographe(e);
}, false);

//Viseur: Souris entre
document.getElementById('id_cvs_viseur_illustrations').addEventListener('mouseover', function() {
	document.body.style.cursor = 'all-scroll';
}, false);

//Viseur: Souris sort
document.getElementById('id_cvs_viseur_illustrations').addEventListener('mouseout', function() {
	document.body.style.cursor = 'auto';
}, false);