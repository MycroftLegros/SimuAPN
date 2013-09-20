//Met à jour les variables utiles à la 3D en fonction du canvas traité

function init_3D(id) {

	switch (id) {

		case "3D_globale":
			Wc_3D = Wc_3D_globale;
			Hc_3D = 2 * Wc_3D / 3;

			X0_3D = 1 * Wc_3D / 3;
			Y0_3D = (Hc_3D - 1) / 2;

			hc_3D = h_cvs_3D_globale;

			k_px_3D = 1 / (hc_3D / 2);

			cos_x_3D = Math.cos(theta_x_3D_globale);
			sin_x_3D = Math.sin(theta_x_3D_globale);
			cos_y_3D = Math.cos(theta_y_3D_globale);
			sin_y_3D = Math.sin(theta_y_3D_globale);
			cos_z_3D = Math.cos(theta_p_3D_globale);
			sin_z_3D = Math.sin(theta_p_3D_globale);

			cvs_3d = "3D_globale";

			Rot1_1_3D = Rot1_1_3D_globale;
			Rot1_2_3D = Rot1_2_3D_globale;
			Rot1_3_3D = Rot1_3_3D_globale;
			Rot2_1_3D = Rot2_1_3D_globale;
			Rot2_2_3D = Rot2_2_3D_globale;
			Rot2_3_3D = Rot2_3_3D_globale;
			Rot3_1_3D = Rot3_1_3D_globale;
			Rot3_2_3D = Rot3_2_3D_globale;
			Rot3_3_3D = Rot3_3_3D_globale;

			Tx_3D = Tx_3D_globale;
			Ty_3D = Ty_3D_globale;
			Tp_3D = Tp_3D_globale;

			ct_3D = document.getElementById("id_canvas_3D_globale").getContext("2d");
			break;


		case "molette_R":
			Wc_3D = Wc_molette_R;
			Hc_3D = Wc_3D;


			X0_3D = (Wc_3D - 1) / 2;
			Y0_3D = (Hc_3D - 1) / 2;

			hc_3D = h_cvs_molette_R;

			k_px_3D = 1 / (hc_3D / 2);

			cos_x_3D = Math.cos(theta_x_molette_R);
			sin_x_3D = Math.sin(theta_x_molette_R);
			cos_y_3D = Math.cos(theta_y_molette_R);
			sin_y_3D = Math.sin(theta_y_molette_R);
			cos_z_3D = Math.cos(theta_p_molette_R);
			sin_z_3D = Math.sin(theta_p_molette_R);

			cvs_3d = "molette_R";

			Rot1_1_3D = Rot1_1_molette_R;
			Rot1_2_3D = Rot1_2_molette_R;
			Rot1_3_3D = Rot1_3_molette_R;
			Rot2_1_3D = Rot2_1_molette_R;
			Rot2_2_3D = Rot2_2_molette_R;
			Rot2_3_3D = Rot2_3_molette_R;
			Rot3_1_3D = Rot3_1_molette_R;
			Rot3_2_3D = Rot3_2_molette_R;
			Rot3_3_3D = Rot3_3_molette_R;

			Tx_3D = 0;
			Ty_3D = 0;
			Tp_3D = 0;

			ct_3D = document.getElementById("id_canvas_molette_R").getContext("2d");
			break;
	}
}

//IN: XY dans le canvas
//OUT: xyp dans le système sans rotation

function XY2xyp(X, Y, flag) {


	//Pour tenir compte du déplacement du centre par translation
	if (cvs_3d === "3D_globale" && flag !== "pas_de_translation") {

		var temp_x = mod_capteurCourant.cdg[0];
		var temp_y = mod_capteurCourant.cdg[1];
		var temp_p = mod_capteurCourant.cdg[2];


		var toto = Rotation3D(temp_x, temp_y, temp_p);
		temp_x = toto.x / k_px_3D;
		temp_y = toto.y / k_px_3D;
		temp_p = toto.p / k_px_3D;

		var titi = xyp2XY(temp_x, temp_y, temp_p);

		var X0 = titi.X;
		var Y0 = titi.Y;

		var x = (X - X0) / X0;
		var y = (Y0 - Y) / Y0;

		if (((X - X0) * (X - X0) + (Y - Y0) * (Y - Y0)) < X0 * X0)
			p = Math.sqrt(X0 * X0 - (X - X0) * (X - X0) - (Y - Y0) * (Y - Y0)) / X0;
		else
			p = 0;
	} else {
		var x = (X - X0_3D) / X0_3D;
		var y = (Y0_3D - Y) / Y0_3D

		if (((X - X0_3D) * (X - X0_3D) + (Y - Y0_3D) * (Y - Y0_3D)) < X0_3D * X0_3D)
			p = Math.sqrt(X0_3D * X0_3D - (X - X0_3D) * (X - X0_3D) - (Y - Y0_3D) * (Y - Y0_3D)) / X0_3D;
		else
			p = 0;
	}
	return {
		x: x,
		y: y,
		p: p
	};
}

//IN: xyp dans le système sans rotation
//OUT: XY dans le canvas

function xyp2XY(x, y, p) {

	x = k_px_3D * x;
	y = k_px_3D * y;
	p = k_px_3D * p;

	var X = X0_3D + x * X0_3D;
	var Y = Y0_3D - y * Y0_3D;

	return {
		X: X,
		Y: Y
	};
}

//IN: xyp    dans le système sans rotation
//OUT:x'y'p' coordonées dans xyp après rotation

function Rotation3D(x, y, p, flag) {

	x = k_px_3D * x;
	y = k_px_3D * y;
	p = k_px_3D * p;


	//Pour rester centré sur le capteur
	if (flag !== "pas_de_translation") {
		x = x - dX * k_px_3D;
		y = y - dY * k_px_3D;
		p = p - dP * k_px_3D;
	}


	//tetha_x
	var x_p = x;
	var y_p = y * cos_x_3D - p * sin_x_3D;
	var p_p = y * sin_x_3D + p * cos_x_3D;

	x = x_p;
	y = y_p;
	p = p_p;


	//tetha_y
	x_p = x * cos_y_3D + p * sin_y_3D;
	y_p = y;
	p_p = -1 * x * sin_y_3D + p * cos_y_3D;

	x = x_p;
	y = y_p;
	p = p_p;


	//tetha_p
	x_p = x * cos_z_3D - y * sin_z_3D;
	y_p = x * sin_z_3D + y * cos_z_3D;
	p_p = p;

	x = x_p;
	y = y_p;
	p = p_p;


	//rotation autour d"un axe
	x_p = x * Rot1_1_3D + y * Rot1_2_3D + p * Rot1_3_3D;
	y_p = x * Rot2_1_3D + y * Rot2_2_3D + p * Rot2_3_3D;
	p_p = x * Rot3_1_3D + y * Rot3_2_3D + p * Rot3_3_3D;

	//Translation
	if (flag !== "pas_de_translation") {
		x_p = x_p + Tx_3D;
		y_p = y_p + Ty_3D;
		p_p = p_p + Tp_3D;
	}


	return {
		x: x_p,
		y: y_p,
		p: p_p
	};
}

//IN: xyp dans le système sans rotation
//OUT: XY dans le canvas, après rotation

function proj_3D(x, y, p) {

	if (cvs_3d === "3D_globale")
		var temp1 = Rotation3D(x, y, p);
	else
		var temp1 = Rotation3D(x, y, p, "pas_de_translation");

	var xp = temp1.x;
	var yp = temp1.y;
	var pp = temp1.p;

	xp = xp / k_px_3D;
	yp = yp / k_px_3D;
	pp = pp / k_px_3D;

	var temp2 = xyp2XY(xp, yp, pp);
	X = temp2.X;
	Y = temp2.Y;

	return {
		X: X,
		Y: Y
	};
}

//IN: x,y,p sans rotation
//OUT: dessine un point en X,Y = (x,y,p) après rotation

function Point3D(x, y, p) {

	var coord_3D = proj_3D(x, y, p);
	var X = coord_3D.X;
	var Y = coord_3D.Y;

	ct_3D.beginPath();
	ct_3D.lineTo(X, Y);
	ct_3D.arc(X, Y, 3, 0, 2 * Math.PI);
	ct_3D.fill();
}

//IN: (xd,yd,pd) et (xf,yf,pf) coordonées des points sans rotation
//OUT: tracé d'une ligne d'un point à l'autre

function Line3D(xd, yd, pd, xf, yf, pf) {

	//1ier point
	var temp1 = Rotation3D(xd, yd, pd);
	var xp = temp1.x;
	var yp = temp1.y;
	var pp = temp1.p;

	xp = xp / k_px_3D;
	yp = yp / k_px_3D;
	pp = pp / k_px_3D;

	var temp2 = xyp2XY(xp, yp, pp);
	X = temp2.X;
	Y = temp2.Y;

	ct_3D.beginPath();
	ct_3D.moveTo(X, Y);

	//2nd point
	temp1 = Rotation3D(xf, yf, pf);
	xp = temp1.x;
	yp = temp1.y;
	pp = temp1.p;

	xp = xp / k_px_3D;
	yp = yp / k_px_3D;
	pp = pp / k_px_3D;

	temp2 = xyp2XY(xp, yp, pp);
	X = temp2.X;
	Y = temp2.Y;

	ct_3D.lineTo(X, Y);
	ct_3D.stroke();
}

//Gère la rotation de la sphère selon arc ball

function Souris_3D(id, e) {

	//-INIT de la 3D avec le canvas adpté + MAJ des cos et sin
	init_3D(id);

	//Canvas
	if (cvs_3d === "3D_globale")
		var cvs = document.getElementById("id_canvas_3D_globale");

	if (cvs_3d === "molette_R")
		var cvs = document.getElementById("id_canvas_molette_R");

	var rect = cvs.getBoundingClientRect(),
		root = document.documentElement;


	//-COORDONNÉES DANS LE CANVAS DE LA SOURIS, AVANT/APRÉS ET DE X0,Y0
	//Coordonnées dans le canvas de la souris à l'instant 0
	if (cvs_3d === "3D_globale") {
		var Xt0 = X_3D_save;
		var Yt0 = Y_3D_save;
	}

	if (cvs_3d === "molette_R") {
		var Xt0 = X_molette_R_save;
		var Yt0 = Hc_3D / 2;
	}

	//Coordonnées dans le canvas de la souris à l'instant courant
	var Xt1 = e.clientX - rect.left - root.scrollLeft;
	var Yt1 = e.clientY - rect.top - root.scrollTop;



	//A: point de départ de la souris (à l'instant précédent)
	//coordonées dans x,y,p
	var temp2 = XY2xyp(Xt0, Yt0);
	var Ax = temp2.x;
	var Ay = temp2.y;
	var Ap = temp2.p;

	//B: point final de la souris
	//coordonées dans x,y,p
	temp2 = XY2xyp(Xt1, Yt1);
	var Bx = temp2.x;
	var By = temp2.y;
	var Bp = temp2.p;



	if (cvs_3d === "molette_R" || flag_mvt_3D === "rotation") {

		if (cvs_3d === "molette_R") {

			var Ax_temp = (Xt0 - X0_3D) / X0_3D;
			var Ay_temp = 0;
			var Ap_temp = 1;

			var Bx_temp = (Xt1 - X0_3D) / X0_3D;
			var By_temp = 0;
			var Bp_temp = 1;

			var toto = Rotation3D(Ax_temp, Ay_temp, Ap_temp, "pas_de_translation");
			Ax = toto.x;
			Ay = toto.y;
			Ap = toto.p;

			var tata = Rotation3D(Bx_temp, By_temp, Bp_temp, "pas_de_translation");
			Bx = tata.x;
			By = tata.y;
			Bp = tata.p;
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
			if (cvs_3d === "3D_globale") {
				//TBD; bloquer si tête en bas
				//Bloque les rotations qui emmènent en dessous du niveau du sol
				MajOrientation();

				if (haut) {
					Rot1_1_3D_globale = Rot1_1_temp;
					Rot1_2_3D_globale = Rot1_2_temp;
					Rot1_3_3D_globale = Rot1_3_temp;
					Rot2_1_3D_globale = Rot2_1_temp;
					Rot2_2_3D_globale = Rot2_2_temp;
					Rot2_3_3D_globale = Rot2_3_temp;
					Rot3_1_3D_globale = Rot3_1_temp;
					Rot3_2_3D_globale = Rot3_2_temp;
					Rot3_3_3D_globale = Rot3_3_temp;
				} else {
					Rot1_1_3D = Rot1_1_3D_globale;
					Rot1_2_3D = Rot1_2_3D_globale;
					Rot1_3_3D = Rot1_3_3D_globale;
					Rot2_1_3D = Rot2_1_3D_globale;
					Rot2_2_3D = Rot2_2_3D_globale;
					Rot2_3_3D = Rot2_3_3D_globale;
					Rot3_1_3D = Rot3_1_3D_globale;
					Rot3_2_3D = Rot3_2_3D_globale;
					Rot3_3_3D = Rot3_3_3D_globale;

					MajOrientation();

				}


			}

			if (cvs_3d === "molette_R") {
				Rot1_1_molette_R = Rot1_1_temp;
				Rot1_2_molette_R = Rot1_2_temp;
				Rot1_3_molette_R = Rot1_3_temp;
				Rot2_1_molette_R = Rot2_1_temp;
				Rot2_2_molette_R = Rot2_2_temp;
				Rot2_3_molette_R = Rot2_3_temp;
				Rot3_1_molette_R = Rot3_1_temp;
				Rot3_2_molette_R = Rot3_2_temp;
				Rot3_3_molette_R = Rot3_3_temp;
			}

		}


	} //si rotation

	//Si translation
	else {

		var temp2 = XY2xyp(Xt0, Yt0, "pas_de_translation");
		var Ax = temp2.x;
		var Ay = temp2.y;
		var Ap = temp2.p;

		//B: point final de la souris
		//coordonées dans x,y,p
		temp2 = XY2xyp(Xt1, Yt1, "pas_de_translation");
		var Bx = temp2.x;
		var By = temp2.y;
		var Bp = temp2.p;


		Tx_3D += (Bx - Ax); //k_px_3D;
		Ty_3D += (By - Ay); //k_px_3D;
		Tp_3D += (Bp - Ap); //k_px_3D;


		if (cvs_3d === "3D_globale") {
			Tx_3D_globale = Tx_3D;
			Ty_3D_globale = Ty_3D;
			Tp_3D_globale = Tp_3D;
		}


	}


	//Sauvegarde les coordonées de la souris
	if (cvs_3d === "3D_globale") {
		X_3D_save = Xt1;
		Y_3D_save = Yt1;
	}

	if (cvs_3d === "molette_R") {
		X_molette_R_save = Xt1;
		MAJ_triangle_expo(Xt1);
	}

	if (cvs_3d === "3D_globale")
		Draw3D_globale();

	if (cvs_3d === "molette_R")
		DrawMoletteR();
}