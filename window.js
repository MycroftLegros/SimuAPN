function initHTML() {

	drawBouton('id_div_BtnRotation', 'id_img_BtnRotation', 'css_BtnON');
	drawBouton('id_div_BtnTranslation', 'id_img_BtnTranslation', 'css_BtnOFF');

	drawBouton('id_div_Btn1Fenetre', 'id_img_Btn1Fenetre', 'css_BtnOFF');
	drawBouton('id_div_Btn2Fenetres', 'id_img_Btn2Fenetres', 'css_BtnON');
	drawBouton('id_div_Btn4Fenetres', 'id_img_Btn4Fenetres', 'css_BtnOFF');

	show('id_menu_reglages', 'onglet_reglages');
	hide('id_menu_apn', 'onglet_apn');
	hide('id_menu_objectif', 'onglet_objectif');
	hide('id_menu_distance', 'onglet_distance');
	hide('id_menu_luminosite', 'onglet_luminosite');
	hide('id_menu_3D', 'onglet_3D');
	hide('id_menu_viseur', 'onglet_viseur');
	hide('id_menu_divers', 'onglet_divers');

	show('id_choix_graph_1_1');
	show('id_choix_graph_1_2');
	hide('id_choix_graph_2_1');
	hide('id_choix_graph_2_2');

	nbrFenetres = 2;

	init_dimensionsFenetres();
	positionneFenetres('id_lst_Fenetre11');
}


window.onload = function() {
	initHTML();
	calculs();
	initImageData();
	drawRoueMode();
	drawDistances();
	initPtsMoletteR();
	extrapoleObjectif();
	initPtsFenetre3D();
};