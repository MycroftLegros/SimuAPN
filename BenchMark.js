cpt_bench = 1;

//Ctrl+B
window.addEventListener('keydown', function(event) {

	if (event.ctrlKey && event.keyCode === 66)
		Bench();

}, false);


//Lance la suite des fonctions à tester

function Bench() {

	//InitPts3D_globale: OK
	//Draw3D_globale: KO
	//DrawViseur: KO
	//Calc_histograms: Bof
	//Maj_calc: OK
	//DrawMoletteR: Bof
	//DrawGraphPDC: OK
	//ROTPts3D_globale: Bof+

	var liste_fonctions = [Draw3D_globale, DrawViseur, Calc_histograms,  DrawMoletteR,  ROTPts3D_globale];

	cpt_bench = 1;

	document.getElementById('en_tete').style.height = liste_fonctions.length * 25 + 'px';
	document.getElementById('id_info_utilisateur').innerHTML = 'Début du test...';

	for (var i = 0; i != liste_fonctions.length; i++)
		Chrono(liste_fonctions[i]);

}

//Lance un test décalé par rapport au précédent

function Chrono(fct) {
	setTimeout(function() {
		Chrono2(fct);
	}, 1000 * cpt_bench);
	cpt_bench++;
}


//Boucle sur une fonction et affiche sa durée

function Chrono2(fct) {

	var N = 10;

	var debut = new Date().getTime();

	for (var i = 0; i != N; i++)
		fct();

	var fin = new Date().getTime();
	var time = fin - debut;


	if (time / N >= 1)
		document.getElementById('id_info_utilisateur').innerHTML += '<br/>' + fct.name + ':  ' + Math.round(time / N) + 'ms';
	else if (time / N >= 0.1)
		document.getElementById('id_info_utilisateur').innerHTML += '<br/>' + fct.name + ':  ' + (time / N).toFixed(1) + 'ms';
	else if (time / N >= 0.01)
		document.getElementById('id_info_utilisateur').innerHTML += '<br/>' + fct.name + ':  ' + (time / N).toFixed(2) + 'ms';
	else
		document.getElementById('id_info_utilisateur').innerHTML += '<br/>' + fct.name + ':  ' + (time / N).toFixed(3) + 'ms';

}