polygonesMoletteReglage = new Array(2 + 4 * delta_angleMoletteReglage);



function drawMoletteReglage() {

	var i, ii;

	init_3D("MoletteReglage");
	majVecteursLuminosite();

	//Rotation des points
	for (i = 0; i !== 2 + 4 * delta_angleMoletteReglage; i++)
		polygonesMoletteReglage[i].rot_pts();


	//Dimensions du canvas
	var cvs = document.getElementById('id_cvs_moletteReglage');
	var ct = cvs.getContext('2d');
	cvs.width = w_cvs_3D;
	cvs.height = h_cvs_3D;

	//MAJ des CDG
	Ordre = new Array(2 + 4 * delta_angleMoletteReglage);

	for (i = 0; i !== 2 + 4 * delta_angleMoletteReglage; i++)
		Ordre[i] = polygonesMoletteReglage[i].CDGMaj;

	//Tri
	Ordre.sort(sortNumber);


	//Fond noir
	ct.fillStyle = '#000000';
	ct.beginPath();
	ct.fillRect(0, 50, w_cvs_3D, 10);


	//Dessin de la molette
	for (i = 0; i !== Ordre.length; i++) {

		for (ii = 0; ii !== 2 + 4 * delta_angleMoletteReglage; ii++) {
			if (Ordre[i] === polygonesMoletteReglage[ii].CDGMaj) {

				if (polygonesMoletteReglage[ii].Nom !== "MolR1" && polygonesMoletteReglage[ii].Nom !== "MolR0")
					polygonesMoletteReglage[ii].draw();

				polygonesMoletteReglage[ii].CDGMaj = 'X';
				ii = 2 + 4 * delta_angleMoletteReglage - 1;

			}
		}
	}

	polygonesMoletteReglage[0].draw();

	//Efface le dessus de la molette
	ct.fillStyle = 'rgba(0,0,0,0.1)';
	ct.beginPath();
	ct.clearRect(0, 0, w_cvs_3D, 50);
}

//Polygones de la molette

function initPtsMoletteR() {

	var d_theta = Math.PI / delta_angleMoletteReglage;
	var r = 0.018; //rayon interne
	var R = 0.02; //rayon externe
	var e = 0.004; //épaisseur	

	//centre de rotation
	var x0 = 0;
	var y0 = 0;
	var p0 = 0;

	var i, ii;

	var Face_temp_haut = new Array(4 * delta_angleMoletteReglage);
	var Face_temp_bas = new Array(4 * delta_angleMoletteReglage);
	for (i = 0; i < 4 * delta_angleMoletteReglage; i++) {
		Face_temp_haut[i] = new Array(3);
		Face_temp_bas[i] = new Array(3);
	}


	//Mémorise les coordonées des sommets
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
	polygonesMoletteReglage[0] = new Polygone("MolR0", [150, 150, 150, 1], [50, 50, 50], [0, 0, 0, 0], Face_temp_haut, tab_temp1, [x0, y0 + e / 2, p0], 0, [0, 1, 0], [0, 0, 0], initPts, majPtsPolygones, drawPolynome, 5 * R);
	polygonesMoletteReglage[1] = new Polygone("MolR1", [150, 150, 150, 1], [50, 50, 50], [0, 0, 0, 0], Face_temp_bas, tab_temp2, [x0, y0 - e / 2, p0], 0, [0, -1, 0], [0, 0, 0], initPts, majPtsPolygones, drawPolynome, 5 * R);

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

		polygonesMoletteReglage[i + 2] = new Polygone("MolR" + (i + 2), [150, 150, 150, 1], [50, 50, 50], [0, 0, 0, 0], [
			[xa, ya, pa],
			[xb, yb, pb],
			[xc, yc, pc],
			[xd, yd, pd]
		], [
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0],
			[0, 0, 0]
		], [xg, yg, pg], 0, [w_x, w_y, w_p], [0, 0, 0], initPts, majPtsPolygones, drawPolynome, 150 * e);
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

	polygonesMoletteReglage[i + 2] = new Polygone("MolR" + (i + 2), [150, 150, 150, 1], [50, 50, 50], [0, 0, 0, 0], [
		[xa, ya, pa],
		[xb, yb, pb],
		[xc, yc, pc],
		[xd, yd, pd]
	], [
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0],
		[0, 0, 0]
	], [xg, yg, pg], 0, [w_x, w_y, w_p], [0, 0, 0], initPts, majPtsPolygones, drawPolynome, 500 * e);

	if (flag_init)
		drawMoletteReglage();
}


//Clic
document.getElementById('id_cvs_moletteReglage').addEventListener('mousedown', function(e) {

	//Flag passe à 1
	flag_clicMoletteReglage = 1;

	//MAj de la position 0
	var cvs = document.getElementById('id_cvs_moletteReglage');
	Xt0_cvs_moletteReglage = e.clientX - cvs.getBoundingClientRect().left - document.documentElement.scrollLeft - marge_X_distances;

}, false);

//Relache clic
document.getElementById('id_cvs_moletteReglage').addEventListener('mouseup', function() {
	flag_clicMoletteReglage = 0;
}, false);

//Bouge
document.getElementById('id_cvs_moletteReglage').addEventListener('mousemove', function(e) {
	if (flag_clicMoletteReglage)
		souris3D("MoletteReglage", e);
}, false);

//Sort
document.getElementById('id_cvs_moletteReglage').addEventListener('mouseout', function() {
	document.body.style.cursor = 'auto';
	flag_clicMoletteReglage = 0;
}, false);

//Entre
document.getElementById('id_cvs_moletteReglage').addEventListener('mouseover', function() {
	document.body.style.cursor = 'e-resize';
}, false);


//Appelé après souris3D qui gère la rotation de la molette
//:TBD: animer la molette
function majTriangleExpo(Xt1) {

	var dx_cran = 1 / 5;

	var dx = (Xt1 - Xt0_cvs_moletteReglage);
	dx = dx / X0_3D;

	//Incrément de la valeur
	if (dx > 0) {
		if (dx > dx_cran) {
			majValTriangleExpo(Math.round(dx / dx_cran));
			Xt0_cvs_moletteReglage = Xt1;
		}
	}
	//Décrément de la valeur
	if (dx < 0) {
		if (-dx > dx_cran) {
			majValTriangleExpo(Math.round(dx / dx_cran));
			Xt0_cvs_moletteReglage = Xt1;
		}
	}
}

//Appelé par majTriangleExpo si la rotation est suffisante
function majValTriangleExpo(incr) {

	//Vitesse
	if (selectMoletteReglage === "vitesse") {

		if (modeAPN !== "ouverture") {

			cpt_vitesse += incr;

			if (cpt_vitesse < 1) {
				cpt_vitesse = 1;
				incr = 0;
			}
			if (cpt_vitesse > 58) {
				cpt_vitesse = 58;
				incr = 0;
			}

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

			if (modeAPN === "vitesse" && incr !== 0) {

				cpt_ouverture += (Math.round(expo / (1 / 3)) + incr);

				if (cpt_ouverture < cpt_ouvertureMin)
					cpt_ouverture = cpt_ouvertureMin;
				if (cpt_ouverture > 37)
					cpt_ouverture = 37;

				ouverture = cpt2ouverture(cpt_ouverture).N;
			}

			calculs();
			drawViseur();
		}
	}


	//Ouverture
	else if (selectMoletteReglage === "ouverture") {
		if (modeAPN !== "vitesse") {
			incr = -1 * incr;

			cpt_ouverture += incr;

			if (cpt_ouverture < cpt_ouvertureMin) {
				cpt_ouverture = cpt_ouvertureMin;
				incr = 0;
			}
			if (cpt_ouverture > 37) {
				cpt_ouverture = 37;
				incr = 0;
			}

			ouverture = cpt2ouverture(cpt_ouverture).N;


			if (modeAPN === "ouverture" && incr !== 0) {

				cpt_vitesse -= (Math.round(expo / (1 / 3)) - incr);

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
			drawFenetre3D();
			drawViseur();

		}
	}


	//ISO
	else if (selectMoletteReglage === "ISO") {


		cpt_ISO += incr;


		if (cpt_ISO < 1) {
			cpt_ISO = 1;
			incr = 0;
		}
		if (cpt_ISO > 42) {
			cpt_ISO = 42;
			incr = 0;
		}

		switch (cpt_ISO) {
			case 1:
				ISO = 25;
				break;
			case 2:
				ISO = 32;
				break;
			case 3:
				ISO = 40;
				break;
			case 4:
				ISO = 50;
				break;
			case 5:
				ISO = 64;
				break;
			case 6:
				ISO = 80;
				break;
			case 7:
				ISO = 100;
				break;
			case 8:
				ISO = 125;
				break;
			case 9:
				ISO = 160;
				break;
			case 10:
				ISO = 200;
				break;
			case 11:
				ISO = 250;
				break;
			case 12:
				ISO = 320;
				break;
			case 13:
				ISO = 400;
				break;
			case 14:
				ISO = 500;
				break;
			case 15:
				ISO = 640;
				break;
			case 16:
				ISO = 800;
				break;
			case 17:
				ISO = 1000;
				break;
			case 18:
				ISO = 1250;
				break;
			case 19:
				ISO = 1600;
				break;
			case 20:
				ISO = 2000;
				break;
			case 21:
				ISO = 2500;
				break;
			case 22:
				ISO = 3200;
				break;
			case 23:
				ISO = 4000;
				break;
			case 24:
				ISO = 5000;
				break;
			case 25:
				ISO = 6400;
				break;
			case 26:
				ISO = 8000;
				break;
			case 27:
				ISO = 10000;
				break;
			case 28:
				ISO = 12800;
				break;
			case 29:
				ISO = 16000;
				break;
			case 30:
				ISO = 20000;
				break;
			case 31:
				ISO = 25600;
				break;
			case 32:
				ISO = 32000;
				break;
			case 33:
				ISO = 40000;
				break;
			case 34:
				ISO = 51200;
				break;
			case 35:
				ISO = 64000;
				break;
			case 36:
				ISO = 80000;
				break;
			case 37:
				ISO = 102400;
				break;
			case 38:
				ISO = 128000;
				break;
			case 39:
				ISO = 160000;
				break;
			case 40:
				ISO = 204800;
				break;
			case 41:
				ISO = 256000;
				break;
			case 42:
				ISO = 320000;
				break;
		}

		if (incr !== 0) {

			//Prio vitesse => modifie l'ouverture
			if (modeAPN === "vitesse") {

				cpt_ouverture += (Math.round(expo / (1 / 3)) + incr);

				if (cpt_ouverture < cpt_ouvertureMin)
					cpt_ouverture = cpt_ouvertureMin;
				if (cpt_ouverture > 37)
					cpt_ouverture = 37;

				ouverture = cpt2ouverture(cpt_ouverture).N;

			}

			//Prio ouverture => modifie la vitesse
			if (modeAPN === "ouverture") {

				cpt_vitesse -= (Math.round(expo / (1 / 3)) + incr);

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
		}
		calculs();
		drawViseur();
	}
}