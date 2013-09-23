function drawRoueMode() {

	var cvs = document.getElementById('id_cvs_RoueMode');
	var ct = cvs.getContext('2d');

	cvs.width = w_cvs_RoueMode + 10;
	cvs.height = h_cvs_RoueMode;

	ct.fillStyle = '#FFFFFF';
	ct.beginPath();
	ct.arc(w_cvs_RoueMode - 5, h_cvs_RoueMode / 2, 3, 0, 2 * Math.PI);
	ct.fill();

	ct.translate(0, h_cvs_RoueMode / 2);

	if (modeAPN === "manuel")
		ct.rotate(Math.PI / 6);

	else if (modeAPN === "ouverture")
		ct.rotate(-0.01);

	else if (modeAPN === "vitesse")
		ct.rotate(-Math.PI / 6);


	ct.drawImage(img_roueMode, -(img_roueMode.width / 2), -(img_roueMode.height / 2));
}


//----IHM
//Clic
document.getElementById('id_cvs_RoueMode').addEventListener('mousedown', function(e) {

	//Flag passe à 1
	flag_clicRoueMode = 1;

	//MAj de la position 0
	var cvs = document.getElementById('id_cvs_RoueMode');
	Yt0_roueMode = e.clientY - cvs.getBoundingClientRect().top - document.documentElement.scrollTop;

}, false);

//Relache clic
document.getElementById('id_cvs_RoueMode').addEventListener('mouseup', function() {
	flag_clicRoueMode = 0;
}, false);

//Bouge
document.getElementById('id_cvs_RoueMode').addEventListener('mousemove', function(e) {
	if (flag_clicRoueMode) {

		var cvs = document.getElementById('id_cvs_RoueMode');
		var Yt1_RoueMode = e.clientY - cvs.getBoundingClientRect().top - document.documentElement.scrollTop;

		if (Math.abs(Yt1_RoueMode - Yt0_roueMode) > 10) {

			if (modeAPN === 'ouverture' && Yt1_RoueMode > Yt0_roueMode)
				modeAPN = 'manuel';

			else if (modeAPN === 'ouverture' && Yt1_RoueMode < Yt0_roueMode)
				modeAPN = 'vitesse';

			else if (modeAPN === 'manuel' && Yt1_RoueMode < Yt0_roueMode)
				modeAPN = 'ouverture';

			else if (modeAPN === 'vitesse' && Yt1_RoueMode > Yt0_roueMode)
				modeAPN = 'ouverture';

			Yt0_roueMode = Yt1_RoueMode;

			//MAJ du retour pour l'utilisateur
			switch (modeAPN) {
				case 'manuel':
					document.getElementById('id_nom_mode').innerHTML = chrome.i18n.getMessage("PrioMan");
<<<<<<< HEAD
					break;
				case 'ouverture':
					document.getElementById('id_nom_mode').innerHTML = chrome.i18n.getMessage("PrioOuv");
					break;
				case 'vitesse':
					document.getElementById('id_nom_mode').innerHTML = chrome.i18n.getMessage("PrioVit");
=======
					document.getElementById('rb_triangle_vitesse').disabled = false;
					document.getElementById('rb_triangle_ouverture').disabled = false;
					break;
				case 'ouverture':
					document.getElementById('id_nom_mode').innerHTML = chrome.i18n.getMessage("PrioOuv");
					document.getElementById('rb_triangle_vitesse').disabled = true;
					document.getElementById('rb_triangle_ouverture').disabled = false;
					document.getElementById('rb_triangle_ouverture').checked = true;
					selectMoletteReglage = "ouverture";
					break;
				case 'vitesse':
					document.getElementById('id_nom_mode').innerHTML = chrome.i18n.getMessage("PrioVit");
					document.getElementById('rb_triangle_ouverture').disabled = true;
					document.getElementById('rb_triangle_vitesse').disabled = false;
					document.getElementById('rb_triangle_vitesse').checked = true;
					selectMoletteReglage = "vitesse";
>>>>>>> ménage, tuning et fix
					break;
			}

			drawRoueMode();
		}
	}
}, false);

//Sort
document.getElementById('id_cvs_RoueMode').addEventListener('mouseout', function() {
	document.body.style.cursor = 'auto';
	flag_clicRoueMode = 0;
}, false);

//Entre
document.getElementById('id_cvs_RoueMode').addEventListener('mouseover', function() {
	document.body.style.cursor = 'e-resize';
}, false);