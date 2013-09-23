//Calculs de toutes les valeurs liées à l'APN, l'objectif, l'exposition, la pdc.. en gros tous les trucs physiques/optique..

function calculs() {

	var temp;

	//----APPAREIL PHOTO
	//Capteur
	var diagonaleCapteur = Math.sqrt((l_capteur * l_capteur + h_capteur * h_capteur) / 1000000); //dimensions en mm
	var diagonaleCapteurFF = Math.sqrt(0.036 * 0.036 + 0.024 * 0.024);
	cropFactor = diagonaleCapteurFF / diagonaleCapteur;
	cdc = diagonaleCapteur / cdc_denominateur; //cdc en m

	//test le format du Capteur du Capteur
	//essai le format 3:2
	temp = 2.0 * l_capteur / h_capteur;
	temp = temp.toFixed(1);
	if (temp === 3.0)
		formatCapteur = "3:2";
	//essai le format 4:3
	else {
		temp = 3.0 * l_capteur / h_capteur;
		temp = temp.toFixed(1);
		if (temp === 4.0)
			formatCapteur = "4:3";
		else
			formatCapteur = "?";
	}

	//taille d'un pixel
	temp = l_capteur * h_capteur; //surface du Capteur en mm²
	temp = temp / (1000 * 1000); //surface du Capteur en m²
	temp = temp / (definition * 1000000); //surface d'un pixel en m²
	taillePixel = Math.sqrt(temp); //taille d'un pixel en m	


	//Taille de l'axe des y du graphe de pdc
	Y_m_cvs_pdc = 20 * taillePixel;

	//Flou filtre aa
	if (filtreAA)
		flouFiltreAA = 2 * taillePixel;
	else
		flouFiltreAA = 0;

	//pour le modele 3D
	h_debutVisee = h_finVisee - h_capteur / 1000; //hauteur du début du viseur dans le modèle 3D



	//----OBJECTIF
	//--Focale équivalente
	focaleEquivalente = focale * cropFactor;

	//--Angles de champ
	angleChampHorizontal = 2.0 * Math.atan(l_capteur / (2.0 * focale)) * 360.0 / (2.0 * Math.PI);
	angleChampVertical = 2.0 * Math.atan(h_capteur / (2.0 * focale)) * 360.0 / (2.0 * Math.PI);

	//--Flou dû à la diffraction
	flouDiffraction = 2.44 * 0.00000056 * ouverture;

	//--Flou dû aux AC
	flouAC = abberationChromatique / 1000000.0;

	//--Flou dû à la résolution
	flouResolution = taillePixel * (definition / resolution);


	//-EXPOSITION
	//variables temporaires pour calculer l'exposition (variables en EV)
	var ISO_EV = 1.0;
	var vitesse_EV = 1.0;
	var ouverture_EV = 1.0;

	switch (ISO) {
		case 25:
			ISO_EV = -2;
			break;
		case 32:
			ISO_EV = -5 / 3;
			break;
		case 40:
			ISO_EV = -4 / 3;
			break;
		case 50:
			ISO_EV = -1;
			break;
		case 64:
			ISO_EV = -2 / 3;
			break;
		case 80:
			ISO_EV = -1 / 3;
			break;
		case 100:
			ISO_EV = 0;
			break;
		case 125:
			ISO_EV = 1 / 3;
			break;
		case 160:
			ISO_EV = 2 / 3;
			break;
		case 200:
			ISO_EV = 1;
			break;
		case 250:
			ISO_EV = 4 / 3;
			break;
		case 320:
			ISO_EV = 5 / 3;
			break;
		case 400:
			ISO_EV = 2;
			break;
		case 500:
			ISO_EV = 7 / 3;
			break;
		case 640:
			ISO_EV = 8 / 3;
			break;
		case 800:
			ISO_EV = 3;
			break;
		case 1000:
			ISO_EV = 10 / 3;
			break;
		case 1250:
			ISO_EV = 11 / 3;
			break;
		case 1600:
			ISO_EV = 4;
			break;
		case 2000:
			ISO_EV = 13 / 3;
			break;
		case 2500:
			ISO_EV = 14 / 3;
			break;
		case 3200:
			ISO_EV = 5;
			break;
		case 4000:
			ISO_EV = 16 / 3;
			break;
		case 5000:
			ISO_EV = 17 / 3;
			break;
		case 6400:
			ISO_EV = 6;
			break;
		case 8000:
			ISO_EV = 19 / 3;
			break;
		case 10000:
			ISO_EV = 20 / 3;
			break;
		case 12800:
			ISO_EV = 7;
			break;
		case 16000:
			ISO_EV = 22 / 3;
			break;
		case 20000:
			ISO_EV = 23 / 3;
			break;
		case 25600:
			ISO_EV = 8;
			break;
		case 32000:
			ISO_EV = 25 / 3;
			break;
		case 40000:
			ISO_EV = 26 / 3;
			break;
		case 51200:
			ISO_EV = 9;
			break;
		case 64000:
			ISO_EV = 28 / 3;
			break;
		case 80000:
			ISO_EV = 29 / 3;
			break;
		case 102400:
			ISO_EV = 10;
			break;
		case 128000:
			ISO_EV = 31 / 3;
			break;
		case 160000:
			ISO_EV = 32 / 3;
			break;
		case 204800:
			ISO_EV = 11;
			break;
		case 256000:
			ISO_EV = 34 / 3;
			break;
		case 320000:
			ISO_EV = 35 / 3;
			break;
	}

	switch (vitesse) {
		case 0.000125:
			vitesse_EV = -13;
			break;
		case 0.00015625:
			vitesse_EV = -38 / 3;
			break;
		case 0.0002:
			vitesse_EV = -37 / 3;
			break;
		case 0.00025:
			vitesse_EV = -12;
			break;
		case 0.0003125:
			vitesse_EV = -35 / 3;
			break;
		case 0.0004:
			vitesse_EV = -34 / 3;
			break;
		case 0.0005:
			vitesse_EV = -11;
			break;
		case 0.000625:
			vitesse_EV = -32 / 3;
			break;
		case 0.0008:
			vitesse_EV = -31 / 3;
			break;
		case 0.001:
			vitesse_EV = -10;
			break;
		case 0.00125:
			vitesse_EV = -29 / 3;
			break;
		case 0.0015625:
			vitesse_EV = -28 / 3;
			break;
		case 0.002:
			vitesse_EV = -9;
			break;
		case 0.0025:
			vitesse_EV = -26 / 3;
			break;
		case 0.003125:
			vitesse_EV = -25 / 3;
			break;
		case 0.004:
			vitesse_EV = -8;
			break;
		case 0.005:
			vitesse_EV = -23 / 3;
			break;
		case 0.00625:
			vitesse_EV = -22 / 3;
			break;
		case 0.008:
			vitesse_EV = -7;
			break;
		case 0.01:
			vitesse_EV = -20 / 3;
			break;
		case 0.0125:
			vitesse_EV = -19 / 3;
			break;
		case 0.0166666666666667:
			vitesse_EV = -6;
			break;
		case 0.02:
			vitesse_EV = -17 / 3;
			break;
		case 0.025:
			vitesse_EV = -16 / 3;
			break;
		case 0.0333333333333333:
			vitesse_EV = -5;
			break;
		case 0.04:
			vitesse_EV = -14 / 3;
			break;
		case 0.05:
			vitesse_EV = -13 / 3;
			break;
		case 0.0666666666666667:
			vitesse_EV = -4;
			break;
		case 0.0769230769230769:
			vitesse_EV = -11 / 3;
			break;
		case 0.1:
			vitesse_EV = -10 / 3;
			break;
		case 0.125:
			vitesse_EV = -3;
			break;
		case 0.166666666666667:
			vitesse_EV = -8 / 3;
			break;
		case 0.2:
			vitesse_EV = -7 / 3;
			break;
		case 0.25:
			vitesse_EV = -2;
			break;
		case 0.333333333333333:
			vitesse_EV = -5 / 3;
			break;
		case 0.4:
			vitesse_EV = -4 / 3;
			break;
		case 0.5:
			vitesse_EV = -1;
			break;
		case 0.625:
			vitesse_EV = -2 / 3;
			break;
		case 0.769230769230769:
			vitesse_EV = -1 / 3;
			break;
		case 1:
			vitesse_EV = 0;
			break;
		case 1.3:
			vitesse_EV = 1 / 3;
			break;
		case 1.6:
			vitesse_EV = 2 / 3;
			break;
		case 2:
			vitesse_EV = 1;
			break;
		case 2.5:
			vitesse_EV = 4 / 3;
			break;
		case 3:
			vitesse_EV = 5 / 3;
			break;
		case 4:
			vitesse_EV = 2;
			break;
		case 5:
			vitesse_EV = 7 / 3;
			break;
		case 6:
			vitesse_EV = 8 / 3;
			break;
		case 8:
			vitesse_EV = 9;
			break;
		case 10:
			vitesse_EV = 10 / 3;
			break;
		case 13:
			vitesse_EV = 11 / 3;
			break;
		case 15:
			vitesse_EV = 4;
			break;
		case 20:
			vitesse_EV = 13 / 3;
			break;
		case 25:
			vitesse_EV = 14 / 3;
			break;
		case 30:
			vitesse_EV = 5;
			break;
		case 40:
			vitesse_EV = 16 / 3;
			break;
		case 50:
			vitesse_EV = 17 / 3;
			break;
		case 60:
			vitesse_EV = 6;
			break;
	}

	switch (ouverture) {
		case 0.7:
			ouverture_EV = 1;
			break;
		case 0.8:
			ouverture_EV = 2 / 3;
			break;
		case 0.9:
			ouverture_EV = 1 / 3;
			break;
		case 1:
			ouverture_EV = 0;
			break;
		case 1.1:
			ouverture_EV = -1 / 3;
			break;
		case 1.2:
			ouverture_EV = -2 / 3;
			break;
		case 1.4:
			ouverture_EV = -1;
			break;
		case 1.6:
			ouverture_EV = -4 / 3;
			break;
		case 1.8:
			ouverture_EV = -5 / 3;
			break;
		case 2:
			ouverture_EV = -2;
			break;
		case 2.2:
			ouverture_EV = -7 / 3;
			break;
		case 2.5:
			ouverture_EV = -8 / 3;
			break;
		case 2.8:
			ouverture_EV = -3;
			break;
		case 3.2:
			ouverture_EV = -10 / 3;
			break;
		case 3.5:
			ouverture_EV = -11 / 3;
			break;
		case 4:
			ouverture_EV = -4;
			break;
		case 4.5:
			ouverture_EV = -13 / 3;
			break;
		case 5:
			ouverture_EV = -14 / 3;
			break;
		case 5.6:
			ouverture_EV = -5;
			break;
		case 6.3:
			ouverture_EV = -16 / 3;
			break;
		case 7.1:
			ouverture_EV = -17 / 3;
			break;
		case 8:
			ouverture_EV = -6;
			break;
		case 9:
			ouverture_EV = -19 / 3;
			break;
		case 10:
			ouverture_EV = -20 / 3;
			break;
		case 11:
			ouverture_EV = -7;
			break;
		case 13:
			ouverture_EV = -22 / 3;
			break;
		case 14:
			ouverture_EV = -23 / 3;
			break;
		case 16:
			ouverture_EV = -8;
			break;
		case 18:
			ouverture_EV = -25 / 3;
			break;
		case 20:
			ouverture_EV = -26 / 3;
			break;
		case 22:
			ouverture_EV = -9;
			break;
		case 25:
			ouverture_EV = -28 / 3;
			break;
		case 29:
			ouverture_EV = -29 / 3;
			break;
		case 32:
			ouverture_EV = -10;
			break;
		case 36:
			ouverture_EV = -31 / 3;
			break;
		case 42:
			ouverture_EV = -32 / 3;
			break;
		case 45:
			ouverture_EV = -11;
			break;
	}

	expo = luminosite_EV + ISO_EV + vitesse_EV + ouverture_EV;

	if (Math.abs(expo) < 0.001)
		expo = 0;


	//-DYNAMIQUE DU CAPTEUR
	//dynamiqueCapteur100ISO: dynamique mesurée à 100ISO
	//dynamiqueCapteurISOCourant: dynamiqueCapteur100ISO possiblement réduite si les ISO sont > 100

	if (ISO > 100) {

		var temp_iso = 0;
		switch (ISO) {

			case 100:
				temp_iso = 7;
				break;
			case 125:
				temp_iso = 8;
				break;
			case 160:
				temp_iso = 9;
				break;
			case 200:
				temp_iso = 10;
				break;
			case 250:
				temp_iso = 11;
				break;
			case 320:
				temp_iso = 12;
				break;
			case 400:
				temp_iso = 13;
				break;
			case 500:
				temp_iso = 14;
				break;
			case 640:
				temp_iso = 15;
				break;
			case 800:
				temp_iso = 16;
				break;
			case 1000:
				temp_iso = 17;
				break;
			case 1250:
				temp_iso = 18;
				break;
			case 1600:
				temp_iso = 19;
				break;
			case 2000:
				temp_iso = 20;
				break;
			case 2500:
				temp_iso = 21;
				break;
			case 3200:
				temp_iso = 22;
				break;
			case 4000:
				temp_iso = 23;
				break;
			case 5000:
				temp_iso = 24;
				break;
			case 6400:
				temp_iso = 25;
				break;
			case 8000:
				temp_iso = 26;
				break;
			case 10000:
				temp_iso = 27;
				break;
			case 12800:
				temp_iso = 28;
				break;
			case 16000:
				temp_iso = 29;
				break;
			case 20000:
				temp_iso = 30;
				break;
			case 25600:
				temp_iso = 31;
				break;
			case 32000:
				temp_iso = 32;
				break;
			case 40000:
				temp_iso = 33;
				break;
			case 51200:
				temp_iso = 34;
				break;
			case 64000:
				temp_iso = 35;
				break;
			case 80000:
				temp_iso = 36;
				break;
			case 102400:
				temp_iso = 37;
				break;
			case 128000:
				temp_iso = 38;
				break;
			case 160000:
				temp_iso = 39;
				break;
			case 204800:
				temp_iso = 40;
				break;
			case 256000:
				temp_iso = 41;
				break;
			case 320000:
				temp_iso = 42;
				break;
		}

		dynamiqueCapteurISOCourant = dynamiqueCapteur100ISO - (temp_iso - 7) / 3;

		if (dynamiqueCapteurISOCourant < 0)
			dynamiqueCapteurISOCourant = 0;


	} else
		dynamiqueCapteurISOCourant = dynamiqueCapteur100ISO;



	//-PDC
	temp = focale / 1000; //en m
	debutPDC = d_map / (1.0 + cdc * ouverture * (d_map - temp) / (temp * temp));
	finPDC = d_map / (1.0 - cdc * ouverture * (d_map - temp) / (temp * temp));
	if (finPDC < 0)
		finPDC = 99999999999999999999999999999999999999999999999999999;

	pdc = finPDC - debutPDC;
	//Flous de mise au point
	flouAvantPlan = (temp * temp * (d_map - d_avantPlan)) / (ouverture * d_avantPlan * (d_map - temp));
	flouArrierePlan = (temp * temp * (d_arrierePlan - d_map)) / (ouverture * d_arrierePlan * (d_map - temp));

	//--HYPERFOCALE
	hyperfocale = temp + (temp * temp) / (cdc * ouverture);

	//-SCENE
	w_m_arrierePlan = (l_capteur / 1000.0) * d_arrierePlan / temp;
	h_m_arrierePlan = (h_capteur / 1000.0) * d_arrierePlan / temp;
	w_m_avantPlan = (l_capteur / 1000.0) * d_avantPlan / temp;
	h_m_avantPlan = (h_capteur / 1000.0) * d_avantPlan / temp;
	w_m_map = (l_capteur / 1000.0) * d_map / temp;
	h_m_map = (h_capteur / 1000.0) * d_map / temp;


	//-FLOU DE BOUGE ET FLOU DE MOUVEMENT
	//--Vitesse de sécurité et flou de bougé
	if (antiVibration)
		vitesseSecurite = 8.0 / (cropFactor * focale * tremblement);
	else
		vitesseSecurite = 1.0 / (cropFactor * focale * tremblement);

	flouBouge = (vitesse / vitesseSecurite) * cdc;

	//--Flou de mouvement et vitesse minimale
	vitesseSecuriteMvt = cdc * ((l_capteur / 1000.0) * d_map / temp) * 3600.0 / ((l_capteur / 1000.0) * vitesseSujet * 1000.0);
	flouMvt = (vitesse / vitesseSecuriteMvt) * cdc;

	/*
	//--ECRAN
	//-ppi
	ppi_ecran = (Math.sqrt(ecran_x * ecran_x + ecran_y * ecran_y)) / ecran_diag;
	//-format
	//16:10
	temp = 10.0 * ecran_x / ecran_y;
	temp = temp.toFixed(1);
	if (temp == 16)
		format_ecran = "16:10";
	//16:9
	else {
		temp = 9.0 * ecran_x / ecran_y;
		temp = temp.toFixed(1);
		if (temp == 16.0)
			format_ecran = "16:9";
		//5:4
		else {
			temp = 4.0 * ecran_x / ecran_y;
			temp = temp.toFixed(1);
			if (temp == 5.0)
				format_ecran = "5:4";
			//4:3
			else {
				temp = 3.0 * ecran_x / ecran_y;
				temp = temp.toFixed(1);
				if (temp == 4.0)
					format_ecran = "4:3";
				//2.39:1
				else {
					temp = 1.0 * ecran_x / ecran_y;
					temp = temp.toFixed(2);
					if (temp == 2.39)
						format_ecran = "2.39:1";
					//1.9
					else {
						temp = 1.0 * ecran_x / ecran_y;
						temp = temp.toFixed(1);
						if (temp == 1.9)
							format_ecran = "1.9:1";
						//1.85
						else {
							temp = 1.0 * ecran_x / ecran_y;
							temp = temp.toFixed(2);
							if (temp == 1.85)
								format_ecran = "1.85:1";
							//1.9
							else {
								format_ecran = "?";
							}
						}
					}
				}
			}
		}
	}

	//-Distance min d'observation
	temp = 0.0254 / ppi_ecran; //largeur d'un pixel, en m
	distance_min_ecran = temp / 0.000290888; //temp/(2*tan(1/120°))

	//-Tirage équivalent
	//--Largeur
	temp2 = (l_capteur / 1000.0) / taillePixel; //nombre de pixel en largeur
	temp3 = temp2 * temp * ecran_zoom / 100.0; //largeur du tirage en m
	temp3 = temp3.toFixed(2);
	tirage_equ_ecran = temp3;

	//--Hauteur
	temp2 = (h_capteur / 1000.0) / taillePixel; //nombre de pixel en largeur
	temp3 = temp2 * temp * ecran_zoom / 100.0; //largeur du tirage en m
	temp3 = temp3.toFixed(2);
	tirage_equ_ecran += 'x' + temp3 + 'm';


	//-TIRAGE
	//--Définition min
	tirage_y = tirage_x * h_capteur / l_capteur;
	tirage_def_min = (tirage_x / 2.54) * tirage_resolution * (tirage_y / 2.54) * tirage_resolution;

	//--Taille
	temp = (l_capteur / 1000.0) / taillePixel; //nombre de pixel en largeur
	temp = 0.0254 * temp / tirage_resolution;
	temp = temp * 100; //en cm
	taille_tirage = temp.toFixed(1);

	temp = (h_capteur / 1000.0) / taillePixel; //nombre de pixel en largeur
	temp = 0.0254 * temp / tirage_resolution;
	temp = temp * 100; //en cm
	taille_tirage += 'x' + temp.toFixed(1) + 'cm';

	//--Distance min
	temp = 0.0254 / tirage_resolution; //largeur d'unpoint, en m
	distance_min_tirage = temp / 0.000290888; //temp/(2*tan(1/120°))

	//--dpi min
	dpi_min_tirage = 87.31876736 / (tirage_distance_observation / 100.0); //87.31=0.0254/(2*tan(1/120°))



	//MAJ DE L'IHM
	//-ONGLETS REGLAGES
	//-Capteur
	document.getElementById('dim_capteur').innerHTML = '(' + h_capteur + 'x' + l_capteur + 'mm)';

	//-Objectif
	document.getElementById('val_focale').innerHTML = focale.toFixed(0) + 'mm';

	if (cropFactor != 1) {
		temp = focale * cropFactor;
		document.getElementById('val_focale').innerHTML += ' (feq=' + temp.toFixed(0) + 'mm)';
	}




//-GENERAL
//--Cdc
temp=(cdc*1000000).toFixed(1);
document.getElementById('calc_cdc_m').innerHTML=temp+'µm';
temp=(cdc/taillePixel).toFixed(1);
document.getElementById('calc_cdc_px').innerHTML=temp+'px';

//-APPAREIL PHOTO
//--Format du Capteur
document.getElementById('calc_format_apn').innerHTML=formatCapteur;
//--Cropfactor
temp=cropFactor.toFixed(2);
document.getElementById('calc_cropFactor').innerHTML=temp;
//--Taille d'un pixel
temp=(taillePixel*1000000).toFixed(1);
document.getElementById('calc_taillePixel_m').innerHTML=temp+'µm';
temp=(taillePixel/cdc).toFixed(1);
document.getElementById('calc_taillePixel_cdc').innerHTML=temp+'cdc';
//--Flou dû au filtre aa
temp=(flouFiltreAA*1000000).toFixed(1);
document.getElementById('calc_flou_aa_m').innerHTML=temp+'µm';
temp=(flouFiltreAA/taillePixel).toFixed(1);
document.getElementById('calc_flou_aa_px').innerHTML=temp+'px';
temp=(flouFiltreAA/cdc).toFixed(1);
document.getElementById('calc_flou_aa_cdc').innerHTML=temp+'cdc';

//-OBJECTIF
//--Focale équivalente
temp=focaleEquivalente.toFixed(0);
document.getElementById('calc_focale_equ').innerHTML=temp+'mm';
//--Angles de champ
temp=angleChampHorizontal.toFixed(1);
document.getElementById('calc_champ_horiz_deg').innerHTML=temp+'°';
temp=angleChampVertical.toFixed(1);
document.getElementById('calc_champ_vert_deg').innerHTML=temp+'°';
//--Flou dû à la diffraction
temp=(flouDiffraction*1000000).toFixed(1);
document.getElementById('calc_flouDiffractionraction_m').innerHTML=temp+'µm';
temp=(flouDiffraction/taillePixel).toFixed(1);
document.getElementById('calc_flouDiffractionraction_px').innerHTML=temp+'px';
temp=(flouDiffraction/cdc).toFixed(1);
document.getElementById('calc_flouDiffractionraction_cdc').innerHTML=temp+'cdc';
//--Flou dû aux AC
temp=(flouAC*1000000).toFixed(1);
document.getElementById('calc_flouAC_m').innerHTML=temp+'µm';
temp=(flouAC/taillePixel).toFixed(1);
document.getElementById('calc_flouAC_px').innerHTML=temp+'px';
temp=(flouAC/cdc).toFixed(1);
document.getElementById('calc_flouAC_cdc').innerHTML=temp+'cdc';
//--Flou dû à la résolution
temp=(flouResolution*1000000).toFixed(1);
document.getElementById('calc_flouResolution_m').innerHTML=temp+'µm';
temp=(flouResolution/taillePixel).toFixed(1);
document.getElementById('calc_flouResolution_px').innerHTML=temp+'px';
temp=(flouResolution/cdc).toFixed(1);
document.getElementById('calc_flouResolution_cdc').innerHTML=temp+'cdc';

//-EXPOSITION
temp=expo.toFixed(1);
if(temp>0)
document.getElementById('calc_expo').innerHTML='+'+temp+'EV';
else
document.getElementById('calc_expo').innerHTML=temp+'EV';

//-PDC, HYPERFOCALE, DIMENSIONS
//--Pdc
temp=debutPDC.toFixed(2);
document.getElementById('calc_debut_pdc_m').innerHTML=temp+'m';
if(finPDC!=99999999999999999999999999999999999999999999999999999){
temp=finPDC.toFixed(2);
document.getElementById('calc_fin_pdc_m').innerHTML=temp+'m';
temp=pdc.toFixed(2);
document.getElementById('calc_pdc').innerHTML=temp+'m';
}
else{
document.getElementById('calc_fin_pdc_m').innerHTML='∞';
document.getElementById('calc_pdc').innerHTML='∞';
}

temp=100.0*debutPDC/(debutPDC+finPDC);
temp=temp.toFixed(1);
temp2=d_map-debutPDC;
temp2=temp2.toFixed(2);
document.getElementById('calc_debut_pdc_pour_100').innerHTML='('+temp2+'m / ' +temp+'%)';

temp=100.0*finPDC/(debutPDC+finPDC);
temp=temp.toFixed(1);
temp2=finPDC-d_map;
temp2=temp2.toFixed(2);
document.getElementById('calc_fin_pdc_pour_100').innerHTML='('+temp2+'m / ' +temp+'%)';
//--Flous
temp=(flouAvantPlan*1000000).toFixed(1);
document.getElementById('calc_flouAvantPlan_plan_m').innerHTML=temp+'µm';
temp=(flouAvantPlan/taillePixel).toFixed(1);
document.getElementById('calc_flouAvantPlan_plan_px').innerHTML=temp+'px';
temp=(flouAvantPlan/cdc).toFixed(1);
document.getElementById('calc_flouAvantPlan_plan_cdc').innerHTML=temp+'cdc';

temp=(flouArrierePlan*1000000).toFixed(1);
document.getElementById('calc_flouArrierePlan_plan_m').innerHTML=temp+'µm';
temp=(flouArrierePlan/taillePixel).toFixed(1);
document.getElementById('calc_flouArrierePlan_plan_px').innerHTML=temp+'px';
temp=(flouArrierePlan/cdc).toFixed(1);
document.getElementById('calc_flouArrierePlan_plan_cdc').innerHTML=temp+'cdc';

//--Hyperfocale
temp=hyperfocale.toFixed(1);
document.getElementById('calc_hyperfocale').innerHTML=temp+'m';

//--Dimensions
temp=w_m_arrierePlan.toFixed(1);
document.getElementById('calc_dim_horiz').innerHTML=temp+'m';

temp=h_m_arrierePlan.toFixed(1);
document.getElementById('calc_dim_vert').innerHTML=temp+'m';

//-FLOU DE BOUGE ET DE MOUVEMENT
//--Bouge
if(vitesseSecurite<1){
temp=(1/vitesseSecurite).toFixed(0);
document.getElementById('calc_vitesseSecurite').innerHTML='1/'+temp;
}
else{
temp=vitesseSecurite.toFixed(1);
document.getElementById('calc_vitesseSecurite').innerHTML=temp+'"';
}

temp=(flouBouge*1000000).toFixed(1);
document.getElementById('calc_flouBouge_m').innerHTML=temp+'µm';
temp=(flouBouge/taillePixel).toFixed(1);
document.getElementById('calc_flouBouge_px').innerHTML=temp+'px';
temp=(flouBouge/cdc).toFixed(1);
document.getElementById('calc_flouBouge_cdc').innerHTML=temp+'cdc';

//-Mouvement
if(vitesseSujet==0)
document.getElementById('calc_vitesseSecurite_mvt').innerHTML='N/A';
else{
	if(vitesseSecuriteMvt<1){
	temp=(1/vitesseSecuriteMvt).toFixed(0);
	document.getElementById('calc_vitesseSecurite_mvt').innerHTML='1/'+temp;
	}
	else{
	temp=vitesseSecuriteMvt.toFixed(1);
	document.getElementById('calc_vitesseSecurite_mvt').innerHTML=temp+'"';
	}
}

temp=(flouMvt*1000000).toFixed(1);
document.getElementById('calc_flou_mvt_m').innerHTML=temp+'µm';
temp=(flouMvt/taillePixel).toFixed(1);
document.getElementById('calc_flou_mvt_px').innerHTML=temp+'px';
temp=(flouMvt/cdc).toFixed(1);
document.getElementById('calc_flou_mvt_cdc').innerHTML=temp+'cdc';

//-ECRAN
temp=Math.round(ppi_ecran);
document.getElementById('calc_res_ecran').innerHTML=temp+'ppi';
document.getElementById('calc_format_ecran').innerHTML=format_ecran;
temp=distance_min_ecran*100;
temp=Math.round(temp);
document.getElementById('calc_distance_ecran').innerHTML=temp+'cm';
document.getElementById('calc_tirage_equ_ecran').innerHTML=tirage_equ_ecran;


//-TIRAGE
temp=tirage_y.toFixed(1);
document.getElementById('id_dim_tirage_y').innerHTML=temp;
temp=(tirage_def_min/1000000.0).toFixed(1);
document.getElementById('calc_def_min').innerHTML=temp+'Mpx';
document.getElementById('calc_taille_tirage').innerHTML=taille_tirage;
temp=distance_min_tirage.toFixed(2);
document.getElementById('calc_distance_min_tirage').innerHTML=temp+'m';
temp=Math.round(dpi_min_tirage);
document.getElementById('calc_dpi_a_distance').innerHTML=temp+'dpi';
*/
<<<<<<< HEAD
=======



document.getElementById('val_focale').innerHTML = focale.toFixed(0) + "mm";

>>>>>>> ménage, tuning et fix
}