//IN: le cpt de l'ouverture
//OUT: la valeur de l'ouverture

function cpt2ouverture(cpt) {

	var temp = 1.8;

	switch (cpt) {
		case 1:
			temp = 0.7;
			break;
		case 2:
			temp = 0.8;
			break;
		case 3:
			temp = 0.9;
			break;
		case 4:
			temp = 1;
			break;
		case 5:
			temp = 1.1;
			break;
		case 6:
			temp = 1.2;
			break;
		case 7:
			temp = 1.4;
			break;
		case 8:
			temp = 1.6;
			break;
		case 9:
			temp = 1.8;
			break;
		case 10:
			temp = 2;
			break;
		case 11:
			temp = 2.2;
			break;
		case 12:
			temp = 2.5;
			break;
		case 13:
			temp = 2.8;
			break;
		case 14:
			temp = 3.2;
			break;
		case 15:
			temp = 3.5;
			break;
		case 16:
			temp = 4;
			break;
		case 17:
			temp = 4.5;
			break;
		case 18:
			temp = 5;
			break;
		case 19:
			temp = 5.6;
			break;
		case 20:
			temp = 6.3;
			break;
		case 21:
			temp = 7.1;
			break;
		case 22:
			temp = 8;
			break;
		case 23:
			temp = 9;
			break;
		case 24:
			temp = 10;
			break;
		case 25:
			temp = 11;
			break;
		case 26:
			temp = 13;
			break;
		case 27:
			temp = 14;
			break;
		case 28:
			temp = 16;
			break;
		case 29:
			temp = 18;
			break;
		case 30:
			temp = 20;
			break;
		case 31:
			temp = 22;
			break;
		case 32:
			temp = 25;
			break;
		case 33:
			temp = 29;
			break;
		case 34:
			temp = 32;
			break;
		case 35:
			temp = 36;
			break;
		case 36:
			temp = 42;
			break;
		case 37:
			temp = 45;
			break;
	}

	temp = 1.0 * temp; //mouais..

	return {
		N: temp
	};
}


//IN: la valeur de l'ouverture
//OUT: le cpt de l'ouverture

function ouverture2cpt(N) {

	var temp = 1.8;

	switch (N) {

		case 0.7:
			temp = 1;
			break;
		case 0.8:
			temp = 2;
			break;
		case 0.9:
			temp = 3;
			break;
		case 1:
			temp = 4;
			break;
		case 1.1:
			temp = 5;
			break;
		case 1.2:
			temp = 6;
			break;
		case 1.4:
			temp = 7;
			break;
		case 1.6:
			temp = 8;
			break;
		case 1.8:
			temp = 9;
			break;
		case 2:
			temp = 10;
			break;
		case 2.2:
			temp = 11;
			break;
		case 2.5:
			temp = 12;
			break;
		case 2.8:
			temp = 13;
			break;
		case 3.2:
			temp = 14;
			break;
		case 3.5:
			temp = 15;
			break;
		case 4:
			temp = 16;
			break;
		case 4.5:
			temp = 17;
			break;
		case 5:
			temp = 18;
			break;
		case 5.6:
			temp = 19;
			break;
		case 6.3:
			temp = 20;
			break;
		case 7.1:
			temp = 21;
			break;
		case 8:
			temp = 22;
			break;
		case 9:
			temp = 23;
			break;
		case 10:
			temp = 24;
			break;
		case 11:
			temp = 25;
			break;
		case 13:
			temp = 26;
			break;
		case 14:
			temp = 27;
			break;
		case 16:
			temp = 28;
			break;
		case 18:
			temp = 29;
			break;
		case 20:
			temp = 30;
			break;
		case 22:
			temp = 31;
			break;
		case 25:
			temp = 32;
			break;
		case 29:
			temp = 33;
			break;
		case 32:
			temp = 34;
			break;
		case 36:
			temp = 35;
			break;
		case 42:
			temp = 36;
			break;
		case 45:
			temp = 37;
			break;

	} //mouais..

	temp = 1.0 * temp;

	return {
		cpt: temp
	};
}


//-Definition d'un object Polygone

function Objectif(Nom, foc, Nmin, VR, res, AC, Npoly, l, d, e, bague) {
	this.Nom = Nom; //Chaine de caractères
	this.foc = foc; //Focale, en mm
	this.Nmin = Nmin; //Ouverture min
	this.VR = VR; //1 si VR, 0 sinon
	this.res = res; //Resolution, en P-Mpx
	this.AC = AC; //AC, en m
	this.Npoly = Npoly; //Nombre de cylindres
	this.l = l; //tableau contenant les longueurs des cylindres
	this.d = d; //tableau contenant les diamètres des cylindres
	this.e = e; //tableau contenant les distances entre les cylindres
	this.bague = bague; //N° du polynome qui représente la bague de réglage de la map/du zoom
}


var ListeObj = new Array(14);	//Liste contenant tous les objectifs

var ObjExtra = new Objectif("TBD", 0, 0, 0, 0, 0, 0, [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0], 0);	//L'objectif extrapolé

ListeObj[0] = new Objectif('14mm f/2.8', 14, 2.8, 0, 0, 0, 7, [10.3, 23.5, 17.5, 24.9], [63.8, 76.9, 76.9, 87], [5.9, 0, 4.4], 4);
ListeObj[1] = new Objectif('16mm f/2.8', 16, 2.8, 0, 0, 0, 7, [9, 21, 9, 17], [63, 61.9, 61.9, 60.8], [0, 0, 1], 4);
ListeObj[2] = new Objectif('20mm f/2.8', 20, 2.8, 0, 15, 18, 7, [10, 16.5, 10, 6], [65.2, 65.2, 69, 66.5], [0, 0, 0], 4);
ListeObj[3] = new Objectif('24mm f/2.8', 24, 2.8, 0, 0, 0, 7, [15, 14.5, 10.5, 4], [63.4, 64.5, 64.5, 53.8], [2, 0, 0], 4);
ListeObj[4] = new Objectif('28mm f/2.8', 28, 2.8, 0, 15, 16, 7, [12.5, 16, 10, 4.5], [61.6, 65, 65, 53], [1.5, 0, 0], 4);
ListeObj[5] = new Objectif('35mm f/2', 35, 2, 0, 16, 6, 7, [13.5, 16.5, 10, 2], [62.2, 64.5, 64.5, 55.4], [1.5, 0, 0], 4);
ListeObj[6] = new Objectif('50mm f/1.8', 50, 1.8, 0, 17, 7, 7, [11.3, 16, 7.5, 2], [63.5, 63.5, 63.5, 55.4], [2.2, 0, 0], 4);
ListeObj[7] = new Objectif('85mm f/1.8', 85, 1.8, 0, 17, 4, 7, [13.5, 29, 12, 1.5], [62.7, 69, 71.5, 64], [2.5, 0, 0], 4);
ListeObj[8] = new Objectif('105mm f/2', 105, 2, 0, 17, 2, 9, [14, 15, 12, 33.5, 32.1], [62.4, 72.1, 75.5, 77.6, 79], [2.8, 2.8, 0, 1.4], 6);
ListeObj[9] = new Objectif('135mm f/2', 135, 2, 1, 0, 0, 9, [13.5, 13.5, 50.5, 35, 2.5], [64.6, 74.2, 79, 79, 74.2], [5, 3, 0, 0], 4);
ListeObj[10] = new Objectif('180mm f/2.8', 180, 2.8, 0, 0, 0, 7, [14, 54.5, 28, 39.5, 2.9], [65.7, 69.9, 75.6, 78.5, 74.2], [2.1, 3, 3, 0], 4);
ListeObj[11] = new Objectif('200mm f/2', 200, 2, 1, 0, 0, 7, [1, 55, 22, 93], [60.9, 94.7, 101.5, 124], [21, 0, 11], 4);
ListeObj[12] = new Objectif('300mm f/2.8', 300, 2.8, 1, 24, 6, 9, [14.1, 18.8, 107.9, 35, 73], [49.1, 84.2, 100.6, 107.6, 114.6], [7, 0, 4.7, 7], 6);
ListeObj[13] = new Objectif('400mm f/2.8', 400, 2.8, 1, 25, 4, 9, [23.5, 117.5, 44.5, 68, 65], [60.9, 92.8, 107.3, 121.8, 153.7], [6, 6, 9, 18], 4);


//Calcul les dimensions des polygones de ObjExtra en fonction des dimensions de 2 objectifs prédéfinies dont les longueuers focales entourent la courante

function extrapoleObjectif() {
	var i = 0;
	var ii = 0;
	var iii = 0;

	//Cherche les 2 objectifs prédéfinis qui entourent le courant
	for (i = 0; i < ListeObj.length; i++) {
<<<<<<< HEAD
		if ((focale >= ListeObj[i].foc) && ((i == ListeObj.length - 1) || (focale < ListeObj[i + 1].foc)))
=======
		if ((focale >= ListeObj[i].foc) && ((i === ListeObj.length - 1) || (focale < ListeObj[i + 1].foc)))
>>>>>>> ménage, tuning et fix
			ii = i;
	}

	//On tombe sur une valeur connue
<<<<<<< HEAD
	if (focale == ListeObj[ii].foc) {
=======
	if (focale === ListeObj[ii].foc) {
>>>>>>> ménage, tuning et fix

		ObjExtra.Npoly = ListeObj[ii].Npoly;
		ObjExtra.bague = ListeObj[ii].bague;

		i = 0;
		iii = 0;
		while (i !== ObjExtra.Npoly) {

			if (iii !== 0) {
				ObjExtra.e[iii - 1] = ListeObj[ii].e[iii - 1];
				i++;
			}

			ObjExtra.l[iii] = ListeObj[ii].l[iii];
			ObjExtra.d[iii] = ListeObj[ii].d[iii];

			i++;
			iii++;
		}
	}

	//On tombe entre 2 valeurs connues
	else {

		//Nombre de polygones et place de la bague comme sur l'objo dont la focale est la plus proche
		var f1 = ListeObj[ii].foc;
		var f2 = ListeObj[ii + 1].foc;

		ObjExtra.foc = focale;

		if ((focale - f1) < (f2 - focale)) { //plus proche du premier
			ObjExtra.Npoly = ListeObj[ii].Npoly;
			ObjExtra.bague = ListeObj[ii].bague;
		} else { //Plus proche du second
			ObjExtra.Npoly = ListeObj[ii + 1].Npoly;
			ObjExtra.bague = ListeObj[ii + 1].bague;
		}


		var k = (focale - f1) / (f2 - f1); //coeff qui module linéairement les dimensions en fonction de la position de f p/r à f1 et f2

		i = 0;
		iii = 0;
		var l_a, l_b, e_a, e_b, d_a, d_b; //pour stocker les longueurs, diamètres et épaisseurs pour les calculs

		while (i !== ObjExtra.Npoly) {

			//Pour gérer le fait que le nombre de polynomes n'est pas cst d'un objo à l'autre
			if (ListeObj[ii].l[iii])
				l_a = ListeObj[ii].l[iii];
			else
				l_a = 0;

			if (ListeObj[ii + 1].l[iii])
				l_b = ListeObj[ii + 1].l[iii];
			else
				l_b = 0;

			if (ListeObj[ii].e[iii - 1])
				e_a = ListeObj[ii].e[iii - 1];
			else
				e_a = 0;

			if (ListeObj[ii + 1].e[iii - 1])
				e_b = ListeObj[ii + 1].e[iii - 1];
			else
				e_b = 0;

			if (ListeObj[ii].d[iii])
				d_a = ListeObj[ii].d[iii];
			else
				d_a = 0;

			if (ListeObj[ii + 1].d[iii])
				d_b = ListeObj[ii + 1].d[iii];
			else
				d_b = 0;


			if (iii !== 0) {
				ObjExtra.e[iii - 1] = e_a + k * (e_b - e_a);
				i++;
			}

			ObjExtra.l[iii] = l_a + k * (l_b - l_a);
			ObjExtra.d[iii] = d_a + k * (d_b - d_a);

			i++;
			iii++;
		}
	}
}