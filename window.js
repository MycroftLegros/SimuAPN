window.onload = function() {
<<<<<<< HEAD
	

	drawBouton('id_div_BtnRotation', 'id_img_BtnRotation', 'css_BtnON');
	drawBouton('id_div_BtnTranslation', 'id_img_BtnTranslation', 'css_BtnOFF');

=======


	drawBouton('id_div_BtnRotation', 'id_img_BtnRotation', 'css_BtnON');
	drawBouton('id_div_BtnTranslation', 'id_img_BtnTranslation', 'css_BtnOFF');

>>>>>>> ménage, tuning et fix
	drawBouton('id_div_Btn1Fenetre', 'id_img_Btn1Fenetre', 'css_BtnOFF');
	drawBouton('id_div_Btn2Fenetres', 'id_img_Btn2Fenetres', 'css_BtnON');
	drawBouton('id_div_Btn4Fenetres', 'id_img_Btn4Fenetres', 'css_BtnOFF');

	nbrFenetres = 2;
	init_dimensionsFenetres();
	positionneFenetres('id_lst_Fenetre11');
	calculs();
	initImageData();
	drawRoueMode();
	drawDistances();
	initPtsMoletteR();
	extrapoleObjectif();
	initPtsFenetre3D();
};