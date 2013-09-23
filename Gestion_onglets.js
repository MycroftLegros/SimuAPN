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

//Init
<<<<<<< HEAD
show('id_menu_reglages','onglet_reglages');
hide('id_menu_apn','onglet_apn');
hide('id_menu_objectif','onglet_objectif');
hide('id_menu_distance','onglet_distance');
hide('id_menu_luminosite','onglet_luminosite');
hide('id_menu_3D','onglet_3D');
hide('id_menu_viseur','onglet_viseur');
hide('id_menu_divers','onglet_divers');
=======
show('id_menu_reglages', 'onglet_reglages');
hide('id_menu_apn', 'onglet_apn');
hide('id_menu_objectif', 'onglet_objectif');
hide('id_menu_distance', 'onglet_distance');
hide('id_menu_luminosite', 'onglet_luminosite');
hide('id_menu_3D', 'onglet_3D');
hide('id_menu_viseur', 'onglet_viseur');
hide('id_menu_divers', 'onglet_divers');
>>>>>>> ménage, tuning et fix


//init
show('id_choix_graph_1_1');
show('id_choix_graph_1_2');
hide('id_choix_graph_2_1');
hide('id_choix_graph_2_2');



document.getElementById('onglet_reglages').addEventListener('click', function() {
<<<<<<< HEAD
show('id_menu_reglages','onglet_reglages');

hide('id_menu_apn','onglet_apn');
hide('id_menu_objectif','onglet_objectif');
hide('id_menu_distance','onglet_distance');
hide('id_menu_luminosite','onglet_luminosite');
hide('id_menu_3D','onglet_3D');
hide('id_menu_viseur','onglet_viseur');
hide('id_menu_divers','onglet_divers');
=======
	show('id_menu_reglages', 'onglet_reglages');

	hide('id_menu_apn', 'onglet_apn');
	hide('id_menu_objectif', 'onglet_objectif');
	hide('id_menu_distance', 'onglet_distance');
	hide('id_menu_luminosite', 'onglet_luminosite');
	hide('id_menu_3D', 'onglet_3D');
	hide('id_menu_viseur', 'onglet_viseur');
	hide('id_menu_divers', 'onglet_divers');
>>>>>>> ménage, tuning et fix

}, false);


document.getElementById('onglet_apn').addEventListener('click', function() {
<<<<<<< HEAD
show('id_menu_apn','onglet_apn');
hide('id_menu_reglages','onglet_reglages');
hide('id_menu_objectif','onglet_objectif');
hide('id_menu_distance','onglet_distance');
hide('id_menu_luminosite','onglet_luminosite');
hide('id_menu_3D','onglet_3D');
hide('id_menu_viseur','onglet_viseur');
hide('id_menu_divers','onglet_divers');
}, false);

document.getElementById('onglet_objectif').addEventListener('click', function() {
show('id_menu_objectif','onglet_objectif');
hide('id_menu_reglages','onglet_reglages');
hide('id_menu_apn','onglet_apn');
hide('id_menu_distance','onglet_distance');
hide('id_menu_luminosite','onglet_luminosite');
hide('id_menu_3D','onglet_3D');
hide('id_menu_viseur','onglet_viseur');
hide('id_menu_divers','onglet_divers');
}, false);

document.getElementById('onglet_distance').addEventListener('click', function() {
show('id_menu_distance','onglet_distance');
hide('id_menu_reglages','onglet_reglages');
hide('id_menu_apn','onglet_apn');
hide('id_menu_objectif','onglet_objectif');
hide('id_menu_luminosite','onglet_luminosite');
hide('id_menu_3D','onglet_3D');
hide('id_menu_viseur','onglet_viseur');
hide('id_menu_divers','onglet_divers');
}, false);

document.getElementById('onglet_luminosite').addEventListener('click', function() {
show('id_menu_luminosite','onglet_luminosite');
hide('id_menu_reglages','onglet_reglages');
hide('id_menu_apn','onglet_apn');
hide('id_menu_objectif','onglet_objectif');
hide('id_menu_distance','onglet_distance');
hide('id_menu_3D','onglet_3D');
hide('id_menu_viseur','onglet_viseur');
hide('id_menu_divers','onglet_divers');
}, false);

document.getElementById('onglet_3D').addEventListener('click', function() {
show('id_menu_3D','onglet_3D');
hide('id_menu_reglages','onglet_reglages');
hide('id_menu_apn','onglet_apn');
hide('id_menu_objectif','onglet_objectif');
hide('id_menu_distance','onglet_distance');
hide('id_menu_luminosite','onglet_luminosite');
hide('id_menu_viseur','onglet_viseur');
hide('id_menu_divers','onglet_divers');
}, false);

document.getElementById('onglet_viseur').addEventListener('click', function() {
show('id_menu_viseur','onglet_viseur');
hide('id_menu_reglages','onglet_reglages');
hide('id_menu_apn','onglet_apn');
hide('id_menu_objectif','onglet_objectif');
hide('id_menu_distance','onglet_distance');
hide('id_menu_luminosite','onglet_luminosite');
hide('id_menu_3D','onglet_3D');
hide('id_menu_divers','onglet_divers');
}, false);

document.getElementById('onglet_divers').addEventListener('click', function() {
show('id_menu_divers','onglet_divers');
hide('id_menu_reglages','onglet_reglages');
hide('id_menu_apn','onglet_apn');
hide('id_menu_objectif','onglet_objectif');
hide('id_menu_distance','onglet_distance');
hide('id_menu_luminosite','onglet_luminosite');
hide('id_menu_3D','onglet_3D');
hide('id_menu_viseur','onglet_viseur');
}, false);


//Affiche/Cache les différents volets
function hide(id1,id2){ 
var o = document.getElementById(id1); 
o.style.display = 'none'; 

if(id2){
//document.getElementById(id2).style.background= 'rgba(0,0,0,0)';
//document.getElementById(id2).style.fontWeight='normal';
//document.getElementById(id2).style.textDecoration='';
document.getElementById(id2).style.color='#eeeeee';	
document.getElementById(id2).style.fontSize='15px';

}
}

function show(id1,id2){ 
var o = document.getElementById(id1); 
o.style.display = '';

if(id2){
//document.getElementById(id2).style.background= 'rgba(0,0,0,0.1)';
//document.getElementById(id2).style.fontWeight="bold"
//document.getElementById(id2).style.textDecoration='underline';
document.getElementById(id2).style.color='#ffffff';	
document.getElementById(id2).style.fontSize='16px';	
}
}
=======
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
>>>>>>> ménage, tuning et fix
