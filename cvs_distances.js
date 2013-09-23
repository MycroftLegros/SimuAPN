<<<<<<< HEAD
﻿function drawDistances() {

	h_cvs_distances = 55; //hauteur du canvas en px
	var Y_axe = 17; //position Y de l'axe dans le canvas
	var h_trait = 15; //hauteur des traits, en px
	var k = w_cvs_Distances / d_DernierPoint_cvs_pdc; //pour conversion m / px

	var temp, temp2;
=======
﻿function distance2PdcColor(distance) {


	var temp = focale / 1000; //en m
	var flou;

	//Calcul de la valeur du flou
	if (distance < d_map)
		flou = (temp * temp * (d_map - distance)) / (ouverture * distance * (d_map - temp));
	else if (distance > d_map)
		flou = (temp * temp * (distance - d_map)) / (ouverture * distance * (d_map - temp));
	else
		flou = 0;

	RVB = color_pdc.split(',');

	var k = Math.sqrt(cdc / (flou));

	var R = k * RVB[0];
	var V = k * RVB[1];
	var B = k * RVB[2];

	R = Math.round(R);
	V = Math.round(V);
	B = Math.round(B);

	return {
		color: R + "," + V + "," + B
	};
}

function drawDistances() {

	h_cvs_distances = 55; //hauteur du canvas en px
	var Y_axe = 17.5; //position Y de l'axe dans le canvas
	var h_trait = 15; //hauteur des traits, en px
	var k = w_cvs_Distances / d_DernierPoint; //pour conversion m / px

	var temp;
>>>>>>> ménage, tuning et fix

	var cvs = document.getElementById('id_cvs_Distances');
	var ct = cvs.getContext('2d');

<<<<<<< HEAD
=======
	var i;

>>>>>>> ménage, tuning et fix
	cvs.width = w_cvs_Distances + 2 * marge_X_distances;
	cvs.height = h_cvs_distances;


	//on fait en sorte que le max des abscisses soit à 1.5*arrière plan, sauf lorsque la souris est cliquée
<<<<<<< HEAD
	if (flag_clicDistances === 0)
		d_DernierPoint_cvs_pdc = 1.5 * d_arrierePlan;
=======
	if (flag_clicPdc === 0 && flag_clicDistances === 0)
		d_DernierPoint = 1.5 * d_arrierePlan;
>>>>>>> ménage, tuning et fix

	//-FOND & AXE
	//fond blanc
	ct.fillStyle = '#FFFFFF';
	ct.beginPath();
	ct.fillRect(0, 0, w_cvs_Distances + 2 * marge_X_distances - 1, h_cvs_distances - 1);

	//Axes
	ct.strokeStyle = '#777777';
	demiFlecheHorizontale(ct, Y_axe, marge_X_distances, w_cvs_Distances + marge_X_distances);

	//dessine les 3 distances, la distance selectionée est mise en évidence avec un petit rond
	//TBD: faire un truc + sexy si selectionnée
	ct.font = "12px 'Trebuchet MS'";
<<<<<<< HEAD

	//Avant plan
	ct.fillStyle = 'rgb(' + color_avantPlan + ')';
	temp = k * d_avantPlan; //distance en px
	ct.beginPath();
	ct.fillRect(marge_X_distances + temp, Y_axe - h_trait, 1, 1 + h_trait);
	ct.fillText(d_avantPlan.toFixed(2) + 'm', marge_X_distances + temp - 5, Y_axe + 12);

	if (distanceSelectionnee === 'av') {
		ct.beginPath();
		ct.arc(marge_X_distances + temp, Y_axe, 4, 0, 2 * Math.PI);
		ct.fill();
	}


	//map
	ct.fillStyle = 'rgb(' + color_map + ')';
	temp = k * d_map;
	ct.beginPath();
	ct.fillRect(marge_X_distances + temp, Y_axe - h_trait, 1, 1 + h_trait);
	ct.fillText(d_map.toFixed(2) + 'm', marge_X_distances + temp - 5, Y_axe + 23);

	if (distanceSelectionnee === 'map') {
		ct.beginPath();
		ct.arc(marge_X_distances + temp, Y_axe, 4, 0, 2 * Math.PI);
		ct.fill();
	}

	//Arrière plan
	ct.fillStyle = 'rgb(' + color_arrierePlan + ')';
	temp = k * d_arrierePlan;
	ct.beginPath();
	ct.fillRect(marge_X_distances + temp, Y_axe - h_trait, 1, 1 + h_trait);
	ct.fillText(d_arrierePlan.toFixed(2) + 'm', marge_X_distances + temp - 5, Y_axe + 34);

	if (distanceSelectionnee === 'ar') {
		ct.beginPath();
		ct.arc(marge_X_distances + temp, Y_axe, 4, 0, 2 * Math.PI);
		ct.fill();
	}


	//PDC
	ct.fillStyle = 'rgba(' + color_cdc + ',0.3)';
	temp = k * debutPDC;
	temp2 = k * finPDC;

	if (temp2 > w_cvs_Distances)
		temp2 = w_cvs_Distances;

	ct.beginPath();
	ct.fillRect(marge_X_distances + temp, 0, temp2 - temp, h_cvs_distances - 1);
}

//----IHM
//Clic
document.getElementById('id_cvs_Distances').addEventListener('mousedown', function(e) {

	flag_clicDistances = 1;

	//MAj de la position initiale
	var cvs = document.getElementById('id_cvs_Distances');
	Xt0_cvs_Distances = e.clientX - cvs.getBoundingClientRect().left - document.documentElement.scrollLeft - marge_X_distances;

}, false);

//Relache clic
document.getElementById('id_cvs_Distances').addEventListener('mouseup', function() {
	flag_clicDistances = 0;
	drawDistances(); //pour faire la MAJ de la largeur des abscisses
}, false);

=======

	//Avant plan
	ct.fillStyle = 'rgb(' + color_avantPlan + ')';
	temp = k * d_avantPlan; //distance en px
	ct.beginPath();
	ct.fillRect(marge_X_distances + temp, Y_axe - h_trait, 1, 1 + h_trait);
	ct.fillText(d_avantPlan.toFixed(2) + 'm', marge_X_distances + temp - 5, Y_axe + 12);

	if (distanceSelectionnee === 'av') {
		ct.beginPath();
		ct.arc(marge_X_distances + temp, Y_axe, 4, 0, 2 * Math.PI);
		ct.fill();
	}


	//map
	ct.fillStyle = 'rgb(' + color_map + ')';
	temp = k * d_map;
	ct.beginPath();
	ct.fillRect(marge_X_distances + temp, Y_axe - h_trait, 1, 1 + h_trait);
	ct.fillText(d_map.toFixed(2) + 'm', marge_X_distances + temp - 5, Y_axe + 23);

	if (distanceSelectionnee === 'map') {
		ct.beginPath();
		ct.arc(marge_X_distances + temp, Y_axe, 4, 0, 2 * Math.PI);
		ct.fill();
	}

	//Arrière plan
	ct.fillStyle = 'rgb(' + color_arrierePlan + ')';
	temp = k * d_arrierePlan;
	ct.beginPath();
	ct.fillRect(marge_X_distances + temp, Y_axe - h_trait, 1, 1 + h_trait);
	ct.fillText(d_arrierePlan.toFixed(2) + 'm', marge_X_distances + temp - 5, Y_axe + 34);

	if (distanceSelectionnee === 'ar') {
		ct.beginPath();
		ct.arc(marge_X_distances + temp, Y_axe, 4, 0, 2 * Math.PI);
		ct.fill();
	}


	var color_temp;
	for (i = debutPDC; i < finPDC; i += 1 / k) {
		color_temp = distance2PdcColor(i).color;
		ct.fillStyle = 'rgba(' + color_temp + ',0.3)';
		ct.fillRect(marge_X_distances + k * i, 0, 1, h_cvs_distances - 1);

	}


}



//----IHM
//Clic
document.getElementById('id_cvs_Distances').addEventListener('mousedown', function(e) {

	flag_clicDistances = 1;

	//MAj de la position initiale
	var cvs = document.getElementById('id_cvs_Distances');
	Xt0_cvs_Distances = e.clientX - cvs.getBoundingClientRect().left - document.documentElement.scrollLeft - marge_X_distances;

}, false);

//Relache clic
document.getElementById('id_cvs_Distances').addEventListener('mouseup', function() {
	flag_clicDistances = 0;
	drawDistances(); //pour faire la MAJ de la largeur des abscisses
}, false);

>>>>>>> ménage, tuning et fix
//bouge
document.getElementById('id_cvs_Distances').addEventListener('mousemove', function(e) {

	//pour passer d'une distance en m à des px
<<<<<<< HEAD
	var k = w_cvs_Distances / d_DernierPoint_cvs_pdc;
=======
	var k = w_cvs_Distances / d_DernierPoint;
>>>>>>> ménage, tuning et fix

	//position des points sur l'axe
	var X_avantPlan = k * d_avantPlan;
	var X_map = k * d_map;
	var X_arrierePlan = k * d_arrierePlan;

	//position de la souris
	var canvas = document.getElementById('id_cvs_Distances');
	var X = e.clientX - canvas.getBoundingClientRect().left - document.documentElement.scrollLeft - marge_X_distances;

	//Regarde dans qu'elle zone se situe la souris (av, map ou ar) pour faire la selection du point en surbrillance
	var distanceSelectionnee_temp = "?";

	//Pas encore cliqué: la zone selectionnée est mise à jour en fonction de la position de la souris
	if (flag_clicDistances === 0) {
		if (X < (X_avantPlan + X_map) / 2) {
			distanceSelectionnee_temp = 'av';
		} else if (X > (X_map + X_arrierePlan) / 2) {
			distanceSelectionnee_temp = 'ar';
		} else {
			distanceSelectionnee_temp = 'map';
		}
	}
	//Déjà cliqué: la souris bouger entre les 2 bornes
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
	if (flag_clicDistances) {

		//avant plan
		switch (distanceSelectionnee_temp) {
			case 'av':
				d_avantPlan += (X - Xt0_cvs_Distances) / k;

				if (d_avantPlan > d_map)
					d_avantPlan = d_map;

				if (d_avantPlan < 0)
					d_avantPlan = 0;

				break;

			case 'ar':

				d_arrierePlan += (X - Xt0_cvs_Distances) / k;

				if (d_arrierePlan < d_map)
					d_arrierePlan = d_map;

				break;

			case 'map':

				d_map += (X - Xt0_cvs_Distances) / k;

				if (d_map < d_avantPlan)
					d_map = d_avantPlan;

				if (d_map > d_arrierePlan)
					d_map = d_arrierePlan;

				break;
		}

		Xt0_cvs_Distances = X;
		calculs();
		drawViseur();
		drawFenetre3D();
	}

	distanceSelectionnee = distanceSelectionnee_temp;
	drawDistances();
}, false);

//Sort
document.getElementById('id_cvs_Distances').addEventListener('mouseout', function() {
	distanceSelectionnee = '?';
	document.body.style.cursor = 'auto';
	flag_clicDistances = 0;
	drawDistances(); //pour virer le point en surbrillance
}, false);

//Entre
document.getElementById('id_cvs_Distances').addEventListener('mouseover', function() {
	document.body.style.cursor = 'e-resize';
	drawDistances();
}, false);