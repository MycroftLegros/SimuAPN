function drawHistos() {

	var max = 0.0; //pour trouver les valeurs max qui vont définir les échelles des ordonnées

	//Nbr de pixels pour les différentes composantes, le max est ramené à max_*_***
	var nbrPixR_norm = new Array(256);
	var nbrPixV_norm = new Array(256);
	var nbrPixB_norm = new Array(256);
	var nbrPixL_norm = new Array(256);

	//-CANVAS RVB
	var cvs_rvb = document.getElementById('id_canvas_histo_RVB');
	var ct_rvb = cvs_rvb.getContext('2d');

	cvs_rvb.width = w_cvs_HistoRVB;
	cvs_rvb.height = h_cvs_HistoRVB;

	//Image couleur
	if (flag_histoNB === 0) {

		//RAZ
<<<<<<< HEAD
		ct_rvb.fillStyle = '#FFFFFF';
=======
		ct_rvb.fillStyle = 'rgba(255,255,255,0.33)';
>>>>>>> ménage, tuning et fix
		ct_rvb.beginPath();
		ct_rvb.fillRect(0, 0, w_cvs_HistoRVB - 1, h_cvs_HistoRVB - 1);

		//Axes
		ct_rvb.fillStyle = color_axeHisto;
		ct_rvb.beginPath();
		//R
		ct_rvb.fillRect(offset_X_histoRVB, offset_Y_histoRVB, 1, max_Y_histoRVB + 1);
		ct_rvb.fillRect(offset_X_histoRVB, offset_Y_histoRVB + max_Y_histoRVB + 1, 256, 1);
		//V
		ct_rvb.fillRect(offset_X_histoRVB, 2 * offset_Y_histoRVB + max_Y_histoRVB + 1, 1, max_Y_histoRVB + 1);
		ct_rvb.fillRect(offset_X_histoRVB, 2 * offset_Y_histoRVB + 2 * max_Y_histoRVB + 2, 256, 1);
		//B
		ct_rvb.fillRect(offset_X_histoRVB, 3 * offset_Y_histoRVB + 2 * max_Y_histoRVB + 2, 1, max_Y_histoRVB + 1);
		ct_rvb.fillRect(offset_X_histoRVB, 3 * offset_Y_histoRVB + 3 * max_Y_histoRVB + 3, 256, 1);


		//Histogramme R
		//Cherche le max
		max = 0;
		for (i = 0; i <= 255; i++) {
			if (nbrPixR[i] > max)
				max = nbrPixR[i];
		}

		//Ramène le max à max_y
		for (i = 0; i <= 255; i++)
			nbrPixR_norm[i] = Math.round(max_Y_histoRVB * nbrPixR[i] / max);

		//Trace l'histogramme
		for (i = 0; i <= 255; i++) {
			ct_rvb.beginPath();
			ct_rvb.fillStyle = 'rgb(' + i + ',0,0)';
			ct_rvb.fillRect(offset_X_histoRVB + i, offset_Y_histoRVB + max_Y_histoRVB - nbrPixR_norm[i] + 1, 1, nbrPixR_norm[i]);
		}


		//Histogramme V
		//Cherche le max
		max = 0;
		for (i = 0; i <= 255; i++) {
			if (nbrPixV[i] > max)
				max = nbrPixV[i];
		}

		//Ramène le max à max_y
		for (i = 0; i <= 255; i++)
			nbrPixV_norm[i] = Math.round(max_Y_histoRVB * nbrPixV[i] / max);

		//Trace l'histogramme
		for (i = 0; i <= 255; i++) {
			ct_rvb.beginPath();
			ct_rvb.fillStyle = 'rgb(0,' + i + ',0)';
			ct_rvb.fillRect(offset_X_histoRVB + i, 2 * offset_Y_histoRVB + 2 * max_Y_histoRVB - nbrPixV_norm[i] + 2, 1, nbrPixV_norm[i]);
		}

		//Histogramme B
		//Cherche le max
		max = 0;
		for (i = 0; i <= 255; i++) {
			if (nbrPixB[i] > max)
				max = nbrPixB[i];
		}

		//Ramène le max à max_y
		for (i = 0; i <= 255; i++)
			nbrPixB_norm[i] = Math.round(max_Y_histoRVB * nbrPixB[i] / max);

		//Trace l'histogramme
		for (i = 0; i <= 255; i++) {
			ct_rvb.beginPath();
			ct_rvb.fillStyle = 'rgb(0,0,' + i + ')';
			ct_rvb.fillRect(offset_X_histoRVB + i, 3 * offset_Y_histoRVB + 3 * max_Y_histoRVB - nbrPixB_norm[i] + 3, 1, nbrPixB_norm[i]);
		}
	}
	//Image N&B: affiche un message au lieu des histos RVB
	else {
		cvs_rvb.width = w_cvs_HistoRVB;
		cvs_rvb.height = 30;

		//RAZ
<<<<<<< HEAD
		ct_rvb.fillStyle = '#FFFFFF';
=======
		ct_rvb.fillStyle = 'rgba(255,255,255,0.33)';
>>>>>>> ménage, tuning et fix
		ct_rvb.beginPath();
		ct_rvb.fillRect(0, 0, w_cvs_HistoRVB - 1, cvs_rvb.height - 1);

		//Efface axes
		ct_rvb.beginPath();
		ct_rvb.rect(0, 0, w, 30);
		ct_rvb.fillStyle = '#FFFFFF';
		ct_rvb.fill();
		ct_rvb.lineWidth = 7;
		ct_rvb.strokeStyle = 'FFFFFF';
		ct_rvb.stroke();

		//Msg
		ct_rvb.font = "12px 'Trebuchet MS'";
		ct_rvb.fillStyle = "#333333";
		ct_rvb.beginPath();
		ct_rvb.fillText('N&B', offset_X_histoRVB + 95, 20);

		document.getElementById('td_chk_R').style.height = '10px';
		document.getElementById('td_chk_V').style.height = '0px';
		document.getElementById('td_chk_B').style.height = '0px';
	}


	//-CANVAS LUMINOSITE
	var cvs_lum = document.getElementById('id_canvas_histo_lum');
	var ct_lum = cvs_lum.getContext('2d');
	cvs_lum.width = w_cvs_histoLum;
	cvs_lum.height = h_cvs_histoLum;

	//RAZ
<<<<<<< HEAD
	ct_lum.fillStyle = '#FFFFFF';
=======
	ct_lum.fillStyle = 'rgba(255,255,255,0.33)';
>>>>>>> ménage, tuning et fix
	ct_lum.beginPath();
	ct_lum.fillRect(0, 0, w_cvs_histoLum - 1, h_cvs_histoLum - 1);


	//Axes
	ct_lum.fillStyle = color_axeHisto;
	ct_lum.beginPath();
	ct_lum.fillRect(offset_X_histoLum, offset_Y_histoLum, 1, max_Y_histoLum + 1);
	ct_lum.fillRect(offset_X_histoLum, offset_Y_histoLum + max_Y_histoLum + 1, 256, 1);


	//Cherche le max
	max = 0;
	for (i = 0; i <= 255; i++) {
		if (nbrPixL[i] > max)
			max = nbrPixL[i];
	}

	//Ramène le max à max_y
	for (i = 0; i <= 255; i++)
		nbrPixL_norm[i] = Math.round(max_Y_histoLum * nbrPixL[i] / max);

	//Trace l'histogramme
	for (i = 0; i <= 255; i++) {

		ct_lum.beginPath();
		ct_lum.fillStyle = 'rgb(' + i + ',' + i + ',' + i + ')';
		ct_lum.fillRect(offset_X_histoLum + i, offset_Y_histoLum + max_Y_histoLum - nbrPixL_norm[i] + 1, 1, nbrPixL_norm[i]);


		//Contour noir autour des barres verticales
		ct_lum.beginPath();
		ct_lum.fillStyle = '#000000';

		if (i === 255) {
			ct_lum.fillRect(offset_X_histoLum + i, offset_Y_histoLum + max_Y_histoLum - nbrPixL_norm[i] - 1 + 1, 1, 1);
			if (nbrPixL_norm[i] !== 0)
				ct_lum.fillRect(offset_X_histoLum + i + 1, offset_Y_histoLum + max_Y_histoLum - nbrPixL_norm[i] - 1 + 1, 1, nbrPixL_norm[i] + 1);
		} else if (nbrPixL_norm[i + 1] > nbrPixL_norm[i]) {
			ct_lum.fillRect(offset_X_histoLum + i, offset_Y_histoLum + max_Y_histoLum - nbrPixL_norm[i + 1] - 1 + 1, 1, nbrPixL_norm[i + 1] - nbrPixL_norm[i] + 1);
		} else {
			ct_lum.fillRect(offset_X_histoLum + i, offset_Y_histoLum + max_Y_histoLum - nbrPixL_norm[i] - 1 + 1, 1, 1);
			ct_lum.fillRect(offset_X_histoLum + i + 1, offset_Y_histoLum + max_Y_histoLum - nbrPixL_norm[i] - 1 + 1, 1, nbrPixL_norm[i] - nbrPixL_norm[i + 1] + 1);
		}
	}
}


//Met à jour les valeurs de NbrPix*[] en fonction de ValPix*[]
//TBC: appelle drawHistos à la fin

function calcHistos() {

	var lum;

	for (var i = 0; i < 256; i++) {
		nbrPixR[i] = 0;
		nbrPixV[i] = 0;
		nbrPixB[i] = 0;
		nbrPixL[i] = 0;
	}

	var h_cvs_Viseur = h_capteur * w_cvs_viseur / l_capteur;
	for (i = 0; i < w_cvs_viseur * h_cvs_Viseur; i++) {

		if (ValPixA[i] !== 0) {
			//Histogramme RVB
			nbrPixR[valPixR[i]]++;
			nbrPixV[valPixV[i]]++;
			nbrPixB[valPixB[i]]++;

			if (valPixR[i] !== valPixV[i] || valPixR[i] !== valPixB[i] || valPixV[i] !== valPixB[i])
				flag_histoNB = 0;

			//Histogramme de luminosité
			lum = 0.3 * valPixR[i] + 0.6 * valPixV[i] + 0.1 * valPixB[i];
			lum = Math.round(lum);

			nbrPixL[lum]++;
		}
	}

	drawHistos();
}