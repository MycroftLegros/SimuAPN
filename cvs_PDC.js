function drawGraphPDC() {

	var cvs = document.getElementById('id_canvas_PDC');
	var ct = cvs.getContext('2d');

	var temp, temp2;
	var i;

	cvs.width = w_cvs_Pdc + marge_X_cvs_PDC + marge_X_fin_cvs_PDC;
	cvs.height = h_cvs_Pdc + marge_Y_cvs_PDC;


<<<<<<< HEAD
	if (flag_clicPdc === 0)
		d_DernierPoint_cvs_pdc = 1.5 * d_arrierePlan;

	//Fond
	ct.fillStyle = '#FFFFFF';
=======
	if (flag_clicPdc === 0 && flag_clicDistances === 0)
		d_DernierPoint = 1.5 * d_arrierePlan;

	//Fond
	ct.fillStyle = 'rgba(255,255,255,0.9)';
>>>>>>> ménage, tuning et fix
	ct.beginPath();
	ct.fillRect(0, 0, cvs.width - 1, cvs.height - 1);

	//--Axes
	demiFlecheHorizontale(ct, h_cvs_Pdc - 1, marge_X_cvs_PDC, w_cvs_Pdc + marge_X_cvs_PDC - 1);
	demiFlecheVerticale(ct, marge_X_cvs_PDC, h_cvs_Pdc - 1, 0);

	//--Regarde les extrémums et calcul les coeff de flou et distance vers pixel

	var f_m = focale / 1000; //focale en m
	var k_flou = h_cvs_Pdc / Y_m_cvs_pdc; //convertion m / px pour les tailles de flou
<<<<<<< HEAD
	var k_distance = w_cvs_Pdc / d_DernierPoint_cvs_pdc; //convertion m / px pour les distances
=======
	var k_distance = w_cvs_Pdc / d_DernierPoint; //convertion m / px pour les distances
>>>>>>> ménage, tuning et fix


	//--Trace la courbe de flou de mise au point
	ct.strokeStyle = 'rgb(' + color_pdc + ')';
	ct.lineWidth = 1;
	ct.beginPath();

	for (i = 0; i !== w_cvs_Pdc - 1; i++) {

		temp2 = i / k_distance;

		//pour être sûr de placer un point à d_map
		if (temp2 < d_map && ((i + 1) / k_distance) > d_map && ((d_map - temp2) <= ((i + 1) / k_distance - d_map)))
			temp2 = d_map;
		else if (i > 0 && ((i - 1) / k_distance) < d_map && temp2 > d_map && ((d_map - temp2) > ((i + 1) / k_distance - d_map)))
			temp2 = d_map;

		//calcul du flou en m
		if (temp2 === d_map)
			temp = 0;
		else if (temp2 < d_map)
			temp = (f_m * f_m * (d_map - temp2)) / (ouverture * temp2 * (d_map - f_m));
		else
			temp = (f_m * f_m * (temp2 - d_map)) / (ouverture * temp2 * (d_map - f_m));

		//trace le point
		if (i === 0)
			ct.moveTo(i + marge_X_cvs_PDC, h_cvs_Pdc - k_flou * temp);
		else
			ct.lineTo(i + marge_X_cvs_PDC, h_cvs_Pdc - k_flou * temp);

	}
	ct.stroke();

	//Trait au niveau du flou d'avant plan
	ct.fillStyle = 'rgb(' + color_avantPlan + ')';
	ct.font = "12px 'Trebuchet MS'";

	temp = k_distance * d_avantPlan; //distance en px
	temp2 = (f_m * f_m * (d_map - d_avantPlan)) / (ouverture * d_avantPlan * (d_map - f_m)); //flou en m
	ct.beginPath();
	ct.fillRect(marge_X_cvs_PDC + temp, h_cvs_Pdc - k_flou * temp2, 1, k_flou * temp2);

	ct.beginPath();
	ct.fillText(d_avantPlan.toFixed(2) + 'm', marge_X_cvs_PDC + temp - 5, h_cvs_Pdc + 10);

	if (distanceSelectionnee === 'av') {
		ct.beginPath();
		ct.arc(marge_X_cvs_PDC + temp, h_cvs_Pdc, 3, 0, 2 * Math.PI);
		ct.fill();
	}


	//Distance de map
	ct.beginPath();

	ct.fillStyle = 'rgb(' + color_map + ')';
	temp = k_distance * d_map; //distance en px
	ct.fillText(d_map.toFixed(2) + 'm', marge_X_cvs_PDC + temp - 5, h_cvs_Pdc + 20);

	if (distanceSelectionnee === 'map') {
		ct.beginPath();
		ct.arc(marge_X_cvs_PDC + temp, h_cvs_Pdc, 3, 0, 2 * Math.PI);
		ct.fill();
	}


	//Trait au niveau du flou d'arrière plan

	ct.fillStyle = 'rgb(' + color_arrierePlan + ')';
	temp = k_distance * d_arrierePlan; //distance en px
	temp2 = (f_m * f_m * (d_arrierePlan - d_map)) / (ouverture * d_arrierePlan * (d_map - f_m));
	ct.beginPath();


	ct.fillRect(marge_X_cvs_PDC + temp, h_cvs_Pdc - k_flou * temp2, 1, k_flou * temp2);


	ct.beginPath();
	ct.fillText(d_arrierePlan.toFixed(2) + 'm', marge_X_cvs_PDC + temp - 5, h_cvs_Pdc + 30);


	if (distanceSelectionnee === 'ar') {
		ct.beginPath();
		ct.arc(marge_X_cvs_PDC + temp, h_cvs_Pdc, 3, 0, 2 * Math.PI);
		ct.fill();
	}
<<<<<<< HEAD


	ct.font = "12px 'Trebuchet MS'";

	//Rectangle pour marquer la pdC
	ct.fillStyle = 'rgba(' + color_cdc + ',0.15)';
	temp = k_distance * debutPDC; //distance en px
	temp2 = k_distance * finPDC; //distance en px

	if (temp2 > w_cvs_Pdc)
		temp2 = w_cvs_Pdc;

	ct.beginPath();
	ct.fillRect(marge_X_cvs_PDC + temp, 0, temp2 - temp, h_cvs_Pdc);


	//Cdc
	temp = k_flou * cdc;

	if (temp < h_cvs_Pdc) {

		ct.fillStyle = 'rgb(' + color_cdc + ')';
		ct.beginPath();
		ct.fillText('cdc', 7, h_cvs_Pdc - temp + 4);

		ct.fillStyle = 'rgba(' + color_cdc + ',0.35)';
		ct.fillRect(marge_X_cvs_PDC, h_cvs_Pdc - temp, w_cvs_Pdc, 1);



	}

	//Echelle: 1,10 ou 100px
	if (Y_m_cvs_pdc > 100 * taillePixel)
		temp = 100;
	else if (Y_m_cvs_pdc > 10 * taillePixel)
		temp = 10;
	else
		temp = 1;

	temp2 = k_flou * temp * taillePixel;


	flecheVerticale(ct, w_cvs_Pdc + marge_X_cvs_PDC + 5, h_cvs_Pdc, h_cvs_Pdc - temp2);

	ct.fillStyle = "#333333";
	ct.beginPath();
	ct.fillText(temp + 'px', w_cvs_Pdc + marge_X_cvs_PDC + 10, h_cvs_Pdc - temp2 / 2 + 3);
}
=======


	ct.font = "12px 'Trebuchet MS'";

	//Rectangle pour marquer la pdC
	ct.fillStyle = 'rgba(' + color_cdc + ',0.15)';
	temp = k_distance * debutPDC; //distance en px
	temp2 = k_distance * finPDC; //distance en px

	if (temp2 > w_cvs_Pdc)
		temp2 = w_cvs_Pdc;
>>>>>>> ménage, tuning et fix

	ct.beginPath();
	ct.fillRect(marge_X_cvs_PDC + temp, 0, temp2 - temp, h_cvs_Pdc);


<<<<<<< HEAD
//CANVAS DE PDC
//--GRAPH DE PDC
//Graph pdc: Roulette
document.getElementById('id_canvas_PDC').addEventListener('mousewheel', function() {
	var Delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

	if (!e) {
		e = window.event;
	}
	if (e.preventDefault) {
		e.preventDefault();
	}

	if (Delta > 0)
		Y_m_cvs_pdc = Y_m_cvs_pdc / 1.1;
	else
		Y_m_cvs_pdc = 1.1 * Y_m_cvs_pdc;

	drawGraphPDC();

}, false);

//Graph pdc: Clic
//TBD: mieux gérer la position de la souris (faire comme pour les autres cvs)
document.getElementById('id_canvas_PDC').addEventListener('mousedown', function(e) {
	flag_clicPdc = 1;
	document.body.style.cursor = 'move';
	Xt0_cvs_pdc = e.clientX;
}, false);


//Graph pdc: Relache clic
document.getElementById('id_canvas_PDC').addEventListener('mouseup', function() {
	flag_clicPdc = 0;
	document.body.style.cursor = 'auto';
	drawGraphPDC(); //pour MAJ de la largeur des abscisses
}, false);

//Graph pdc: bouge
document.getElementById('id_canvas_PDC').addEventListener('mousemove', function(e) {

	//pour passer d'une distance en m à des px
	var k_distance = w_cvs_Pdc / d_DernierPoint_cvs_pdc; //pour passer d'une distance en m à des px

	//MAJ de la position des points sur l'axe
	var X_avantPlan = k_distance * d_avantPlan;
	var X_map = k_distance * d_map;
	var X_arrierePlan = k_distance * d_arrierePlan;

	//MAJ de la position de la souris
	var canvas = document.getElementById('id_canvas_PDC');
	var rect = canvas.getBoundingClientRect(),
		root = document.documentElement;
	var posX = e.clientX;
	var X = posX - rect.left - root.scrollLeft - marge_X_cvs_PDC;
=======
	//Cdc
	temp = k_flou * cdc;

	if (temp < h_cvs_Pdc) {

		ct.fillStyle = 'rgb(' + color_cdc + ')';
		ct.beginPath();
		ct.fillText('cdc', 7, h_cvs_Pdc - temp + 4);

		ct.fillStyle = 'rgba(' + color_cdc + ',0.35)';
		ct.fillRect(marge_X_cvs_PDC, h_cvs_Pdc - temp, w_cvs_Pdc, 1);
>>>>>>> ménage, tuning et fix

	//Regarde dans qeulle zone se situe la souris
	var distanceSelectionnee_temp = "?";

<<<<<<< HEAD
=======

	}

	//Echelle: 1,10 ou 100px
	if (Y_m_cvs_pdc > 100 * taillePixel)
		temp = 100;
	else if (Y_m_cvs_pdc > 10 * taillePixel)
		temp = 10;
	else
		temp = 1;

	temp2 = k_flou * temp * taillePixel;


	flecheVerticale(ct, w_cvs_Pdc + marge_X_cvs_PDC + 5, h_cvs_Pdc, h_cvs_Pdc - temp2);

	ct.fillStyle = "#333333";
	ct.beginPath();
	ct.fillText(temp + 'px', w_cvs_Pdc + marge_X_cvs_PDC + 10, h_cvs_Pdc - temp2 / 2 + 3);
}
>>>>>>> ménage, tuning et fix

	//Pas encore cliqué: souris entre 2 zones pour mettre en distanceSelectionnee
	if (flag_clicPdc === 0) {
		if (X < (X_avantPlan + X_map) / 2) {
			distanceSelectionnee_temp = 'av';
		} else if (X > (X_map + X_arrierePlan) / 2) {
			distanceSelectionnee_temp = 'ar';
		} else {
			distanceSelectionnee_temp = 'map';
		}
	}
	//Déjà cliqué: la souris peut bouger entre les 2 bornes
	else {
		if (distanceSelectionnee === 'av') {
			if (d_avantPlan <= d_map)
				distanceSelectionnee_temp = 'av';
		}
		if (distanceSelectionnee === 'map') {
			if (d_avantPlan <= d_map <= d_arrierePlan)
				distanceSelectionnee_temp = 'map';
		}
		if (distanceSelectionnee === 'ar') {
			if (d_map <= d_arrierePlan)
				distanceSelectionnee_temp = 'ar';
		}
	}

<<<<<<< HEAD
	//La souris est cliquée => modification des distances	
	if (flag_clicPdc) {

		//avant plan
		if (distanceSelectionnee_temp === 'av') {

			d_avantPlan += (X - Xt0_cvs_pdc) / k_distance;

			if (d_avantPlan > d_map)
				d_avantPlan = d_map;

			if (d_avantPlan < 0)
				d_avantPlan = 0;

			calculs();
			drawViseur();
			drawFenetre3D();

			Xt0_cvs_pdc = X;
		}
		//arrière plan
		if (distanceSelectionnee_temp === 'ar') {

			d_arrierePlan += (X - Xt0_cvs_pdc) / k_distance;

			if (d_arrierePlan < d_map)
				d_arrierePlan = d_map;

			Xt0_cvs_pdc = X;

			calculs();
			drawViseur();
			drawFenetre3D();

			Xt0_cvs_pdc = X;
		}
		//MAP
		if (distanceSelectionnee_temp === 'map') {

			d_map += (X - Xt0_cvs_pdc) / k_distance;

			if (d_map < d_avantPlan)
				d_map = d_avantPlan;

			if (d_map > d_arrierePlan)
				d_map = d_arrierePlan;

			Xt0_cvs_pdc = X;

			calculs();
			drawViseur();
			drawFenetre3D();

			Xt0_cvs_pdc = X;
		}
	}

	distanceSelectionnee = distanceSelectionnee_temp;

	drawGraphPDC();
=======

//CANVAS DE PDC
//--GRAPH DE PDC
//Graph pdc: Roulette
document.getElementById('id_canvas_PDC').addEventListener('mousewheel', function(e) {
	var Delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

	if (!e) {
		e = window.event;
	}
	if (e.preventDefault) {
		e.preventDefault();
	}

	if (Delta > 0)
		Y_m_cvs_pdc = Y_m_cvs_pdc / 1.1;
	else
		Y_m_cvs_pdc = 1.1 * Y_m_cvs_pdc;

	drawGraphPDC();

}, false);

//Graph pdc: Clic
document.getElementById('id_canvas_PDC').addEventListener('mousedown', function(e) {
	flag_clicPdc = 1;
	document.body.style.cursor = 'move';
	var cvs = document.getElementById('id_canvas_PDC');
	Xt0_cvs_pdc = e.clientX - cvs.getBoundingClientRect().left - document.documentElement.scrollLeft - marge_X_cvs_PDC;
}, false);


//Graph pdc: Relache clic
document.getElementById('id_canvas_PDC').addEventListener('mouseup', function() {
	flag_clicPdc = 0;
	document.body.style.cursor = 'auto';
	drawGraphPDC(); //pour MAJ de la largeur des abscisses
}, false);

//Graph pdc: bouge
document.getElementById('id_canvas_PDC').addEventListener('mousemove', function(e) {

	//pour passer d'une distance en m à des px
	var k_distance = w_cvs_Pdc / d_DernierPoint; //pour passer d'une distance en m à des px

	//MAJ de la position des points sur l'axe
	var X_avantPlan = k_distance * d_avantPlan;
	var X_map = k_distance * d_map;
	var X_arrierePlan = k_distance * d_arrierePlan;

	//MAJ de la position de la souris
	var cvs = document.getElementById('id_canvas_PDC');
	var Xt1 = e.clientX - cvs.getBoundingClientRect().left - document.documentElement.scrollLeft - marge_X_cvs_PDC;

	//Regarde dans qeulle zone se situe la souris
	var distanceSelectionnee_temp = "?";


	//Pas encore cliqué: souris entre 2 zones pour mettre en distanceSelectionnee
	if (flag_clicPdc === 0) {
		if (Xt1 < (X_avantPlan + X_map) / 2) {
			distanceSelectionnee_temp = 'av';
		} else if (Xt1 > (X_map + X_arrierePlan) / 2) {
			distanceSelectionnee_temp = 'ar';
		} else {
			distanceSelectionnee_temp = 'map';
		}
	}
	//Déjà cliqué: la souris peut bouger entre les 2 bornes
	else {
		if (distanceSelectionnee === 'av') {
			if (d_avantPlan <= d_map)
				distanceSelectionnee_temp = 'av';
		}
		if (distanceSelectionnee === 'map') {
			if (d_avantPlan <= d_map <= d_arrierePlan)
				distanceSelectionnee_temp = 'map';
		}
		if (distanceSelectionnee === 'ar') {
			if (d_map <= d_arrierePlan)
				distanceSelectionnee_temp = 'ar';
		}
	}

	//La souris est cliquée => modification des distances	
	if (flag_clicPdc) {

		//avant plan
		if (distanceSelectionnee_temp === 'av') {

			d_avantPlan += (Xt1 - Xt0_cvs_pdc) / k_distance;

			if (d_avantPlan > d_map)
				d_avantPlan = d_map;

			if (d_avantPlan < 0)
				d_avantPlan = 0;
		}
		//arrière plan
		if (distanceSelectionnee_temp === 'ar') {

			d_arrierePlan += (Xt1 - Xt0_cvs_pdc) / k_distance;

			if (d_arrierePlan < d_map)
				d_arrierePlan = d_map;
		}
		//MAP
		if (distanceSelectionnee_temp === 'map') {
>>>>>>> ménage, tuning et fix

			d_map += (Xt1 - Xt0_cvs_pdc) / k_distance;

<<<<<<< HEAD
}, false);
=======
			if (d_map < d_avantPlan)
				d_map = d_avantPlan;
>>>>>>> ménage, tuning et fix

			if (d_map > d_arrierePlan)
				d_map = d_arrierePlan;
		}

		Xt0_cvs_pdc = Xt1;

		calculs();
		drawViseur();
		drawFenetre3D();
		drawDistances();

	} else
		drawGraphPDC(); //sinon appelé par drawViseur()


<<<<<<< HEAD
=======
	distanceSelectionnee = distanceSelectionnee_temp;
}, false);



>>>>>>> ménage, tuning et fix
//Graph pdc: Sort
document.getElementById('id_canvas_PDC').addEventListener('mouseout', function() {
	distanceSelectionnee = '?';
	drawGraphPDC();
}, false);