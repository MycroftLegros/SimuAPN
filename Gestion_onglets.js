//Affiche/Cache les différents volets

function hide(id1, id2) {
	var o = document.getElementById(id1);
	o.style.display = 'none';

	if (id2) {
		document.getElementById(id2).style.color = '#eeeeee';
		document.getElementById(id2).style.fontSize = '15px';

	}
}

function show(id1, id2) {
	var o = document.getElementById(id1);
	o.style.display = '';

	if (id2) {
		document.getElementById(id2).style.color = '#ffffff';
		document.getElementById(id2).style.fontSize = '16px';
	}
}



document.getElementById('onglet_reglages').addEventListener('click', function() {

	show('id_menu_reglages', 'onglet_reglages');

	hide('id_menu_apn', 'onglet_apn');
	hide('id_menu_objectif', 'onglet_objectif');
	hide('id_menu_distance', 'onglet_distance');
	hide('id_menu_luminosite', 'onglet_luminosite');
	hide('id_menu_3D', 'onglet_3D');
	hide('id_menu_viseur', 'onglet_viseur');
	hide('id_menu_divers', 'onglet_divers');


}, false);


document.getElementById('onglet_apn').addEventListener('click', function() {

	show('id_menu_apn', 'onglet_apn');
	hide('id_menu_reglages', 'onglet_reglages');
	hide('id_menu_objectif', 'onglet_objectif');
	hide('id_menu_distance', 'onglet_distance');
	hide('id_menu_luminosite', 'onglet_luminosite');
	hide('id_menu_3D', 'onglet_3D');
	hide('id_menu_viseur', 'onglet_viseur');
	hide('id_menu_divers', 'onglet_divers');
}, false);

document.getElementById('onglet_objectif').addEventListener('click', function() {
	show('id_menu_objectif', 'onglet_objectif');
	hide('id_menu_reglages', 'onglet_reglages');
	hide('id_menu_apn', 'onglet_apn');
	hide('id_menu_distance', 'onglet_distance');
	hide('id_menu_luminosite', 'onglet_luminosite');
	hide('id_menu_3D', 'onglet_3D');
	hide('id_menu_viseur', 'onglet_viseur');
	hide('id_menu_divers', 'onglet_divers');
}, false);

document.getElementById('onglet_distance').addEventListener('click', function() {
	show('id_menu_distance', 'onglet_distance');
	hide('id_menu_reglages', 'onglet_reglages');
	hide('id_menu_apn', 'onglet_apn');
	hide('id_menu_objectif', 'onglet_objectif');
	hide('id_menu_luminosite', 'onglet_luminosite');
	hide('id_menu_3D', 'onglet_3D');
	hide('id_menu_viseur', 'onglet_viseur');
	hide('id_menu_divers', 'onglet_divers');
}, false);

document.getElementById('onglet_luminosite').addEventListener('click', function() {
	show('id_menu_luminosite', 'onglet_luminosite');
	hide('id_menu_reglages', 'onglet_reglages');
	hide('id_menu_apn', 'onglet_apn');
	hide('id_menu_objectif', 'onglet_objectif');
	hide('id_menu_distance', 'onglet_distance');
	hide('id_menu_3D', 'onglet_3D');
	hide('id_menu_viseur', 'onglet_viseur');
	hide('id_menu_divers', 'onglet_divers');
}, false);

document.getElementById('onglet_3D').addEventListener('click', function() {
	show('id_menu_3D', 'onglet_3D');
	hide('id_menu_reglages', 'onglet_reglages');
	hide('id_menu_apn', 'onglet_apn');
	hide('id_menu_objectif', 'onglet_objectif');
	hide('id_menu_distance', 'onglet_distance');
	hide('id_menu_luminosite', 'onglet_luminosite');
	hide('id_menu_viseur', 'onglet_viseur');
	hide('id_menu_divers', 'onglet_divers');
}, false);

document.getElementById('onglet_viseur').addEventListener('click', function() {
	show('id_menu_viseur', 'onglet_viseur');
	hide('id_menu_reglages', 'onglet_reglages');
	hide('id_menu_apn', 'onglet_apn');
	hide('id_menu_objectif', 'onglet_objectif');
	hide('id_menu_distance', 'onglet_distance');
	hide('id_menu_luminosite', 'onglet_luminosite');
	hide('id_menu_3D', 'onglet_3D');
	hide('id_menu_divers', 'onglet_divers');
}, false);

document.getElementById('onglet_divers').addEventListener('click', function() {
	show('id_menu_divers', 'onglet_divers');
	hide('id_menu_reglages', 'onglet_reglages');
	hide('id_menu_apn', 'onglet_apn');
	hide('id_menu_objectif', 'onglet_objectif');
	hide('id_menu_distance', 'onglet_distance');
	hide('id_menu_luminosite', 'onglet_luminosite');
	hide('id_menu_3D', 'onglet_3D');
	hide('id_menu_viseur', 'onglet_viseur');
}, false);