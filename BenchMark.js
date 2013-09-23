//Boucle sur une fonction et affiche sa durée moyenne
//les arguments sont optionnels

function chrono2(fct, arg1, arg2) {

	//Lance la fonction N fois
	var N = 100;

	var debut = new Date().getTime();

	for (var i = 0; i !== N; i++) {
		if (arg1) {
			if (arg2)
				fct(arg1, arg2);
			else
				fct(arg1);
		} else
			fct();
	}

	//Calcul le temps et affiche le résultat
	var fin = new Date().getTime();
	var duree = fin - debut;

	document.getElementById('id_info_utilisateur').innerHTML += '<br/>' + fct.name;

	if (arg1) {
		if (arg2)
			document.getElementById('id_info_utilisateur').innerHTML += '(' + arg1 + ',' + arg2 + ')';
		else
			document.getElementById('id_info_utilisateur').innerHTML += '(' + arg1 + ')';
	}


	if (duree / N >= 1)
		document.getElementById('id_info_utilisateur').innerHTML += ':  ' + Math.round(duree / N) + 'ms';
	else if (duree / N >= 0.1)
		document.getElementById('id_info_utilisateur').innerHTML += ':  ' + (duree / N).toFixed(1) + 'ms';
	else if (duree / N >= 0.01)
		document.getElementById('id_info_utilisateur').innerHTML += ':  ' + (duree / N).toFixed(2) + 'ms';
	else
		document.getElementById('id_info_utilisateur').innerHTML += ':  ' + (duree / N).toFixed(3) + 'ms';

}


//Lance un test décalé par rapport au précédent (pour laisser le temps à l'IHM de se rafraichir)

function chrono(fct, arg1, arg2) {
	setTimeout(function() {
		chrono2(fct, arg1, arg2);
	}, 1);
}


//Lance la suite des fonctions à tester

function bench() {

	var FctATester = [drawFenetre3D, drawViseur, calcHistos];
	var Arg1 = [];
	var Arg2 = [];

	document.getElementById('en_tete').style.height = (1 + FctATester.length) * 25 + 'px'; //de la place pour afficher les résultats
	document.getElementById('id_info_utilisateur').innerHTML = 'Début du test...';

	setTimeout(function() {
		for (var i = 0; i !== FctATester.length; i++)
			chrono(FctATester[i], Arg1[i], Arg2[i]);
	}, 1);

}

//Ctrl+B
window.addEventListener('keydown', function(event) {

	if (event.ctrlKey && event.keyCode === 66)
		bench();

}, false);