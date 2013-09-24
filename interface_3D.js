//Met à jour les variables utiles à la 3D en fonction du canvas traité
//TBD: voir si ça ne craint pas (traitemant assynchone des canvas et ce genre de couille)

function init_3D(id) {

	switch (id) {

		case "Fenetre3D":
			w_cvs_3D = w_cvs_Fenetre3D;
			h_cvs_3D = 2 * w_cvs_3D / 3;

			X0_3D = 1 * w_cvs_3D / 3;
			Y0_3D = (h_cvs_3D - 1) / 2;

			h_m_3D = h_m_Fenetre3D;

			k_3D = 1 / (h_m_3D / 2);

			cos_x_3D = Math.cos(theta_x_Fenetre3D);
			sin_x_3D = Math.sin(theta_x_Fenetre3D);
			cos_y_3D = Math.cos(theta_y_Fenetre3D);
			sin_y_3D = Math.sin(theta_y_Fenetre3D);
			cos_z_3D = Math.cos(theta_p_Fenetre3D);
			sin_z_3D = Math.sin(theta_p_Fenetre3D);

			cvs_3D = "Fenetre3D";

			Rot1_1_3D = Rot1_1_Fenetre3D;
			Rot1_2_3D = Rot1_2_Fenetre3D;
			Rot1_3_3D = Rot1_3_Fenetre3D;
			Rot2_1_3D = Rot2_1_Fenetre3D;
			Rot2_2_3D = Rot2_2_Fenetre3D;
			Rot2_3_3D = Rot2_3_Fenetre3D;
			Rot3_1_3D = Rot3_1_Fenetre3D;
			Rot3_2_3D = Rot3_2_Fenetre3D;
			Rot3_3_3D = Rot3_3_Fenetre3D;

			Tx_3D = Tx_Fenetre3D;
			Ty_3D = Ty_Fenetre3D;
			Tp_3D = Tp_Fenetre3D;

			ct_3D = document.getElementById("id_cvs_Fenetre3D").getContext("2d"); //TBD: à sécuriser, pointer sur le cvs plutot que le contexte
			break;


		case "MoletteReglage":
			w_cvs_3D = w_cvs_moletteReglage;
			h_cvs_3D = w_cvs_3D;

			X0_3D = (w_cvs_3D - 1) / 2;
			Y0_3D = (h_cvs_3D - 1) / 2;

			h_m_3D = h_m_moletteReglage;

			k_3D = 1 / (h_m_3D / 2);

			cos_x_3D = Math.cos(theta_x_moletteReglage);
			sin_x_3D = Math.sin(theta_x_moletteReglage);
			cos_y_3D = Math.cos(theta_y_moletteReglage);
			sin_y_3D = Math.sin(theta_y_moletteReglage);
			cos_z_3D = Math.cos(theta_p_moletteReglage);
			sin_z_3D = Math.sin(theta_p_moletteReglage);

			cvs_3D = "MoletteReglage";

			Rot1_1_3D = Rot1_1_moletteReglage;
			Rot1_2_3D = Rot1_2_moletteReglage;
			Rot1_3_3D = Rot1_3_moletteReglage;
			Rot2_1_3D = Rot2_1_moletteReglage;
			Rot2_2_3D = Rot2_2_moletteReglage;
			Rot2_3_3D = Rot2_3_moletteReglage;
			Rot3_1_3D = Rot3_1_moletteReglage;
			Rot3_2_3D = Rot3_2_moletteReglage;
			Rot3_3_3D = Rot3_3_moletteReglage;

			Tx_3D = 0;
			Ty_3D = 0;
			Tp_3D = 0;

			ct_3D = document.getElementById("id_cvs_moletteReglage").getContext("2d");
			break;
	}
}



//IN: xyp dans le système sans rotation
//OUT: XY dans le canvas

function xyp2XY(x, y, p) {

	var X, Y;


	x = k_3D * x;
	y = k_3D * y;
	p = k_3D * p;


	X = X0_3D + x * X0_3D;
	Y = Y0_3D - y * Y0_3D;

	return {
		X: X,
		Y: Y
	};
}



//3 types de changements possibles: 
// - rotation autour d'un axe (x,y,p)
// - rotation autour d'un vecteur (fonction type arcball)
// - translation
//IN: xyp    dans le système sans rotation/translation
//OUT:x'y'p' coordonées dans xyp après rotation/translation
//TBD: claculer la matrice de rotation (p/r aux axes)à part, car elle ne change que rarement

function majCoord3D(x, y, p, flag) {


	var temp_x, temp_y, temp_p;

	x = k_3D * x;
	y = k_3D * y;
	p = k_3D * p;

	//-Pour rester centré sur le centre du Capteur
	if (flag !== "pas_de_translation") {
		x = x - dX * k_3D;
		y = y - dY * k_3D;
		p = p - dP * k_3D;
	}

	//-Rotations selon les axes
	//tetha_x
	temp_x = x;
	temp_y = y * cos_x_3D - p * sin_x_3D;
	temp_p = y * sin_x_3D + p * cos_x_3D;
	x = temp_x;
	y = temp_y;
	p = temp_p;

	//tetha_y
	temp_x = x * cos_y_3D + p * sin_y_3D;
	temp_y = y;
	temp_p = -1 * x * sin_y_3D + p * cos_y_3D;
	x = temp_x;
	y = temp_y;
	p = temp_p;

	//tetha_p
	temp_x = x * cos_z_3D - y * sin_z_3D;
	temp_y = x * sin_z_3D + y * cos_z_3D;
	temp_p = p;
	x = temp_x;
	y = temp_y;
	p = temp_p;

	//-Rotation autour d'un vecteur qq (arcball)
	temp_x = x * Rot1_1_3D + y * Rot1_2_3D + p * Rot1_3_3D;
	temp_y = x * Rot2_1_3D + y * Rot2_2_3D + p * Rot2_3_3D;
	temp_p = x * Rot3_1_3D + y * Rot3_2_3D + p * Rot3_3_3D;

	//-Translation
	if (flag !== "pas_de_translation") {
		temp_x = temp_x + Tx_3D;
		temp_y = temp_y + Ty_3D;
		temp_p = temp_p + Tp_3D;
	}

	return {
		x: temp_x,
		y: temp_y,
		p: temp_p
	};
}


//IN: XY dans le canvas
//OUT: xyp dans le système sans rotation

function XY2xyp(X, Y, flag) {

	var temp_x, temp_y, temp_p;
	var temp_xyp;
	var temp_XY;
	var X0, Y0;


	//Pour tenir compte du déplacement du centre par translation
	if (cvs_3D === "Fenetre3D" && flag !== "pas_de_translation") {

		temp_x = mod_capteurCourant.CDG[0];
		temp_y = mod_capteurCourant.CDG[1];
		temp_p = mod_capteurCourant.CDG[2];

		temp_xyp = majCoord3D(temp_x, temp_y, temp_p);
		temp_x = temp_xyp.x / k_3D;
		temp_y = temp_xyp.y / k_3D;
		temp_p = temp_xyp.p / k_3D;

		temp_XY = xyp2XY(temp_x, temp_y, temp_p);
		X0 = temp_XY.X;
		Y0 = temp_XY.Y;

		temp_x = (X - X0) / X0;
		temp_y = (Y0 - Y) / Y0;

		if (((X - X0) * (X - X0) + (Y - Y0) * (Y - Y0)) < X0 * X0)
			temp_p = Math.sqrt(X0 * X0 - (X - X0) * (X - X0) - (Y - Y0) * (Y - Y0)) / X0;
		else
			temp_p = 0;
	} else {
		temp_x = (X - X0_3D) / X0_3D;
		temp_y = (Y0_3D - Y) / Y0_3D;

		if (((X - X0_3D) * (X - X0_3D) + (Y - Y0_3D) * (Y - Y0_3D)) < X0_3D * X0_3D)
			temp_p = Math.sqrt(X0_3D * X0_3D - (X - X0_3D) * (X - X0_3D) - (Y - Y0_3D) * (Y - Y0_3D)) / X0_3D;
		else
			temp_p = 0;
	}
	return {
		x: temp_x,
		y: temp_y,
		p: temp_p
	};
}



//IN: xyp dans le système sans rotation/translation
//OUT: XY dans le canvas, après rotation/translation


function xyp2XYmaj(x, y, p) {



	var temp_XY;
	var temp_xyp;
	var temp_x, temp_y, temp_p;
	var X, Y;

	if (cvs_3D === "Fenetre3D")
		temp_xyp = majCoord3D(x, y, p);
	else
		temp_xyp = majCoord3D(x, y, p, "pas_de_translation");

	temp_x = (temp_xyp.x) / k_3D;
	temp_y = (temp_xyp.y) / k_3D;
	temp_p = (temp_xyp.p) / k_3D;


	temp_XY = xyp2XY(temp_x, temp_y, temp_p);
	X = temp_XY.X;
	Y = temp_XY.Y;

	return {
		X: X,
		Y: Y
	};
}

//IN: x,y,p sans rotation/translation
//OUT: dessine un point en X,Y = (x,y,p) après rotation

function drawPoint3D(x, y, p) {

	var coord_3D = xyp2XYmaj(x, y, p);
	var X = coord_3D.X;
	var Y = coord_3D.Y;

	ct_3D.beginPath();
	ct_3D.lineTo(X, Y);
	ct_3D.arc(X, Y, 3, 0, 2 * Math.PI);
	ct_3D.fill();
}

//IN: (xd,yd,pd) et (xf,yf,pf) coordonées des points sans rotation/translation
//OUT: tracé d'une ligne d'un point à l'autre

function drawLine3D(xd, yd, pd, xf, yf, pf) {

	//1ier point
	var temp_xyp = majCoord3D(xd, yd, pd);
	var temp_x = temp_xyp.x;
	var temp_y = temp_xyp.y;
	var temp_p = temp_xyp.p;

	temp_x = temp_x / k_3D;
	temp_y = temp_y / k_3D;
	temp_p = temp_p / k_3D;

	var temp_XY = xyp2XY(temp_x, temp_y, temp_p);
	X = temp_XY.X;
	Y = temp_XY.Y;

	ct_3D.beginPath();
	ct_3D.moveTo(X, Y);

	//2nd point
	temp_xyp = majCoord3D(xf, yf, pf);
	temp_x = temp_xyp.x;
	temp_y = temp_xyp.y;
	temp_p = temp_xyp.p;

	temp_x = temp_x / k_3D;
	temp_y = temp_y / k_3D;
	temp_p = temp_p / k_3D;

	temp_XY = xyp2XY(temp_x, temp_y, temp_p);
	X = temp_XY.X;
	Y = temp_XY.Y;

	ct_3D.lineTo(X, Y);
	ct_3D.stroke();
}

//Gère la rotation de la sphère selon arc ball ou gère la translation
//TBD: choisir un rayon plus grand pour la sphère (necessaire si translation importante du centre)
//TBD: IHM pour faire comprendre la rotation (point au centre, petits arcs selon la sphère au niveau de la souris,..)

function souris3D(id, e) {


	var Xt0, Yt0;
	var Xt1, Yt1;
	var temp_xyp;
	var Ax, Ay, Ap;
	var Bx, By, Bp;

	var cvs;


	//-INIT de la 3D avec le canvas adpté + MAJ des cos et sin
	init_3D(id);

	//Canvas
	if (cvs_3D === "Fenetre3D")
		cvs = document.getElementById("id_cvs_Fenetre3D");

	if (cvs_3D === "MoletteReglage")
		cvs = document.getElementById("id_cvs_moletteReglage");

	var rect = cvs.getBoundingClientRect(),
		root = document.documentElement;


	//Coordonnées dans le canvas de la souris à l'instant 0
	if (cvs_3D === "Fenetre3D") {
		Xt0 = Xt0_Fenetre3D;
		Yt0 = Yt0_Fenetre3D;
	}

	if (cvs_3D === "MoletteReglage") {
		Xt0 = Xt0_cvs_moletteReglage;
		Yt0 = h_cvs_3D / 2; //rotation selon y uniquement
	}

	//Coordonnées dans le canvas de la souris à l'instant courant
	Xt1 = e.clientX - rect.left - root.scrollLeft;
	Yt1 = e.clientY - rect.top - root.scrollTop;


	//A: point de départ de la souris (à l'instant précédent)
	temp_xyp = XY2xyp(Xt0, Yt0);
	Ax = temp_xyp.x;
	Ay = temp_xyp.y;
	Ap = temp_xyp.p;

	//B: point final de la souris
	temp_xyp = XY2xyp(Xt1, Yt1);
	Bx = temp_xyp.x;
	By = temp_xyp.y;
	Bp = temp_xyp.p;



	//ROTATION
	if (cvs_3D === "MoletteReglage" || typeDeplacementFenetre3D === "rotation") {


		//Rotation autour de y
		if (cvs_3D === "MoletteReglage") {

			var Ax_temp = (Xt0 - X0_3D) / X0_3D;
			var Ay_temp = 0;
			var Ap_temp = 1;

			var Bx_temp = (Xt1 - X0_3D) / X0_3D;
			var By_temp = 0;
			var Bp_temp = 1;

			temp_xyp = majCoord3D(Ax_temp, Ay_temp, Ap_temp, "pas_de_translation");
			Ax = temp_xyp.x;
			Ay = temp_xyp.y;
			Ap = temp_xyp.p;

			temp_xyp = majCoord3D(Bx_temp, By_temp, Bp_temp, "pas_de_translation");
			Bx = temp_xyp.x;
			By = temp_xyp.y;
			Bp = temp_xyp.p;
		}


		//M: OM=OA v OB  ; |OM| = |OA|.|OB|.sin
		var Mx = Ay * Bp - Ap * By;
		var My = Ap * Bx - Ax * Bp;
		var Mp = Ax * By - Ay * Bx;

		//Produit scalaire: |OA|.|OB|.cos
		var prod_scal = Ax * Bx + Ay * By + Ap * Bp;

		//Normes des vecteurs
		var norme_OA = Math.sqrt(Ax * Ax + Ay * Ay + Ap * Ap);
		var norme_OB = Math.sqrt(Bx * Bx + By * By + Bp * Bp);
		var norme_OM = Math.sqrt(Mx * Mx + My * My + Mp * Mp);

		//Cos et Sin
		var cos_theta = prod_scal / (norme_OA * norme_OB);
		var sin_theta = norme_OM / (norme_OA * norme_OB);

		//on doit avoir Mx²+My²+Mp²=1
		var normalise = Mx * Mx + My * My + Mp * Mp;

		if (normalise !== 0) {

			normalise = 1 / normalise;
			normalise = Math.sqrt(normalise);

			Mx = Mx * normalise;
			My = My * normalise;
			Mp = Mp * normalise;

			//Mise à jour des coordonées de la matrice de rotation autour d'un axe
			//1ière ligne
			var M1_1 = Mx * Mx + (1 - Mx * Mx) * cos_theta;
			var M1_2 = Mx * My * (1 - cos_theta) - Mp * sin_theta;
			var M1_3 = Mx * Mp * (1 - cos_theta) + My * sin_theta;

			//2nde ligne
			var M2_1 = Mx * My * (1 - cos_theta) + Mp * sin_theta;
			var M2_2 = My * My + (1 - My * My) * cos_theta;
			var M2_3 = My * Mp * (1 - cos_theta) - Mx * sin_theta;

			//3ième ligne
			var M3_1 = Mx * Mp * (1 - cos_theta) - My * sin_theta;
			var M3_2 = My * Mp * (1 - cos_theta) + Mx * sin_theta;
			var M3_3 = Mp * Mp + (1 - Mp * Mp) * cos_theta;

			//Multiplie les anciennes coordonées par les nouvelles
			var Rot1_1_temp = M1_1 * Rot1_1_3D + M1_2 * Rot2_1_3D + M1_3 * Rot3_1_3D;
			var Rot1_2_temp = M1_1 * Rot1_2_3D + M1_2 * Rot2_2_3D + M1_3 * Rot3_2_3D;
			var Rot1_3_temp = M1_1 * Rot1_3_3D + M1_2 * Rot2_3_3D + M1_3 * Rot3_3_3D;

			var Rot2_1_temp = M2_1 * Rot1_1_3D + M2_2 * Rot2_1_3D + M2_3 * Rot3_1_3D;
			var Rot2_2_temp = M2_1 * Rot1_2_3D + M2_2 * Rot2_2_3D + M2_3 * Rot3_2_3D;
			var Rot2_3_temp = M2_1 * Rot1_3_3D + M2_2 * Rot2_3_3D + M2_3 * Rot3_3_3D;

			var Rot3_1_temp = M3_1 * Rot1_1_3D + M3_2 * Rot2_1_3D + M3_3 * Rot3_1_3D;
			var Rot3_2_temp = M3_1 * Rot1_2_3D + M3_2 * Rot2_2_3D + M3_3 * Rot3_2_3D;
			var Rot3_3_temp = M3_1 * Rot1_3_3D + M3_2 * Rot2_3_3D + M3_3 * Rot3_3_3D;

			//MAj de la matrice de rotation
			Rot1_1_3D = Rot1_1_temp;
			Rot1_2_3D = Rot1_2_temp;
			Rot1_3_3D = Rot1_3_temp;
			Rot2_1_3D = Rot2_1_temp;
			Rot2_2_3D = Rot2_2_temp;
			Rot2_3_3D = Rot2_3_temp;
			Rot3_1_3D = Rot3_1_temp;
			Rot3_2_3D = Rot3_2_temp;
			Rot3_3_3D = Rot3_3_temp;

			//Sauvegarde
			if (cvs_3D === "Fenetre3D") {
				//TBD; bloquer si tête en bas
				//Bloque les rotations qui emmènent en dessous du niveau du sol
				majOrientationFenetre3D();

				if (haut) {
					Rot1_1_Fenetre3D = Rot1_1_temp;
					Rot1_2_Fenetre3D = Rot1_2_temp;
					Rot1_3_Fenetre3D = Rot1_3_temp;
					Rot2_1_Fenetre3D = Rot2_1_temp;
					Rot2_2_Fenetre3D = Rot2_2_temp;
					Rot2_3_Fenetre3D = Rot2_3_temp;
					Rot3_1_Fenetre3D = Rot3_1_temp;
					Rot3_2_Fenetre3D = Rot3_2_temp;
					Rot3_3_Fenetre3D = Rot3_3_temp;
				} else {
					Rot1_1_3D = Rot1_1_Fenetre3D;
					Rot1_2_3D = Rot1_2_Fenetre3D;
					Rot1_3_3D = Rot1_3_Fenetre3D;
					Rot2_1_3D = Rot2_1_Fenetre3D;
					Rot2_2_3D = Rot2_2_Fenetre3D;
					Rot2_3_3D = Rot2_3_Fenetre3D;
					Rot3_1_3D = Rot3_1_Fenetre3D;
					Rot3_2_3D = Rot3_2_Fenetre3D;
					Rot3_3_3D = Rot3_3_Fenetre3D;

					majOrientationFenetre3D();
				}
			}

			if (cvs_3D === "MoletteReglage") {

				Rot1_1_moletteReglage = Rot1_1_temp;
				Rot1_2_moletteReglage = Rot1_2_temp;
				Rot1_3_moletteReglage = Rot1_3_temp;
				Rot2_1_moletteReglage = Rot2_1_temp;
				Rot2_2_moletteReglage = Rot2_2_temp;
				Rot2_3_moletteReglage = Rot2_3_temp;
				Rot3_1_moletteReglage = Rot3_1_temp;
				Rot3_2_moletteReglage = Rot3_2_temp;
				Rot3_3_moletteReglage = Rot3_3_temp;

			}
		}
	}

	//TRANSLATION
	else {

		temp_xyp = XY2xyp(Xt0, Yt0, "pas_de_translation");

		Ax = temp_xyp.x;
		Ay = temp_xyp.y;
		Ap = temp_xyp.p;

		//B: point final de la souris
		temp_xyp = XY2xyp(Xt1, Yt1, "pas_de_translation");
		Bx = temp_xyp.x;
		By = temp_xyp.y;
		Bp = temp_xyp.p;


		Tx_3D += (Bx - Ax);
		Ty_3D += (By - Ay);
		Tp_3D += (Bp - Ap);

		if (cvs_3D === "Fenetre3D") {
			Tx_Fenetre3D = Tx_3D;
			Ty_Fenetre3D = Ty_3D;
			Tp_Fenetre3D = Tp_3D;
		}
	}


	//Sauvegarde les coordonées de la souris
	if (cvs_3D === "Fenetre3D") {
		Xt0_Fenetre3D = Xt1;
		Yt0_Fenetre3D = Yt1;
	}



	//MAJ du canvas
	if (cvs_3D === "Fenetre3D")
		drawFenetre3D();


	if (cvs_3D === "MoletteReglage") {
		drawMoletteReglage();
		setTimeout(function() {
			majTriangleExpo(Xt1);
		}, 1);
	}

}