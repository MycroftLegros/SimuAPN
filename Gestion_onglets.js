//Init
Show('id_menu_reglages','onglet_reglages');
Hide('id_menu_apn','onglet_apn');
Hide('id_menu_objectif','onglet_objectif');
Hide('id_menu_distance','onglet_distance');
Hide('id_menu_luminosite','onglet_luminosite');
Hide('id_menu_3D','onglet_3D');
Hide('id_menu_viseur','onglet_viseur');
Hide('id_menu_divers','onglet_divers');


//init
Show('id_choix_graph_1_1');
Show('id_choix_graph_1_2');
Hide('id_choix_graph_2_1');
Hide('id_choix_graph_2_2');



document.getElementById('onglet_reglages').addEventListener('click', function() {
Show('id_menu_reglages','onglet_reglages');

Hide('id_menu_apn','onglet_apn');
Hide('id_menu_objectif','onglet_objectif');
Hide('id_menu_distance','onglet_distance');
Hide('id_menu_luminosite','onglet_luminosite');
Hide('id_menu_3D','onglet_3D');
Hide('id_menu_viseur','onglet_viseur');
Hide('id_menu_divers','onglet_divers');

}, false);


document.getElementById('onglet_apn').addEventListener('click', function() {
Show('id_menu_apn','onglet_apn');
Hide('id_menu_reglages','onglet_reglages');
Hide('id_menu_objectif','onglet_objectif');
Hide('id_menu_distance','onglet_distance');
Hide('id_menu_luminosite','onglet_luminosite');
Hide('id_menu_3D','onglet_3D');
Hide('id_menu_viseur','onglet_viseur');
Hide('id_menu_divers','onglet_divers');
}, false);

document.getElementById('onglet_objectif').addEventListener('click', function() {
Show('id_menu_objectif','onglet_objectif');
Hide('id_menu_reglages','onglet_reglages');
Hide('id_menu_apn','onglet_apn');
Hide('id_menu_distance','onglet_distance');
Hide('id_menu_luminosite','onglet_luminosite');
Hide('id_menu_3D','onglet_3D');
Hide('id_menu_viseur','onglet_viseur');
Hide('id_menu_divers','onglet_divers');
}, false);

document.getElementById('onglet_distance').addEventListener('click', function() {
Show('id_menu_distance','onglet_distance');
Hide('id_menu_reglages','onglet_reglages');
Hide('id_menu_apn','onglet_apn');
Hide('id_menu_objectif','onglet_objectif');
Hide('id_menu_luminosite','onglet_luminosite');
Hide('id_menu_3D','onglet_3D');
Hide('id_menu_viseur','onglet_viseur');
Hide('id_menu_divers','onglet_divers');
}, false);

document.getElementById('onglet_luminosite').addEventListener('click', function() {
Show('id_menu_luminosite','onglet_luminosite');
Hide('id_menu_reglages','onglet_reglages');
Hide('id_menu_apn','onglet_apn');
Hide('id_menu_objectif','onglet_objectif');
Hide('id_menu_distance','onglet_distance');
Hide('id_menu_3D','onglet_3D');
Hide('id_menu_viseur','onglet_viseur');
Hide('id_menu_divers','onglet_divers');
}, false);

document.getElementById('onglet_3D').addEventListener('click', function() {
Show('id_menu_3D','onglet_3D');
Hide('id_menu_reglages','onglet_reglages');
Hide('id_menu_apn','onglet_apn');
Hide('id_menu_objectif','onglet_objectif');
Hide('id_menu_distance','onglet_distance');
Hide('id_menu_luminosite','onglet_luminosite');
Hide('id_menu_viseur','onglet_viseur');
Hide('id_menu_divers','onglet_divers');
}, false);

document.getElementById('onglet_viseur').addEventListener('click', function() {
Show('id_menu_viseur','onglet_viseur');
Hide('id_menu_reglages','onglet_reglages');
Hide('id_menu_apn','onglet_apn');
Hide('id_menu_objectif','onglet_objectif');
Hide('id_menu_distance','onglet_distance');
Hide('id_menu_luminosite','onglet_luminosite');
Hide('id_menu_3D','onglet_3D');
Hide('id_menu_divers','onglet_divers');
}, false);

document.getElementById('onglet_divers').addEventListener('click', function() {
Show('id_menu_divers','onglet_divers');
Hide('id_menu_reglages','onglet_reglages');
Hide('id_menu_apn','onglet_apn');
Hide('id_menu_objectif','onglet_objectif');
Hide('id_menu_distance','onglet_distance');
Hide('id_menu_luminosite','onglet_luminosite');
Hide('id_menu_3D','onglet_3D');
Hide('id_menu_viseur','onglet_viseur');
}, false);


//Affiche/Cache les différents volets
function Hide(id1,id2){ 
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

function Show(id1,id2){ 
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