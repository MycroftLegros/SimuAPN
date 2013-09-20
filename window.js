window.onload = function() {
	Nbr_graph = 2;

	DrawBouton('btn_rot', 'id_img_rot', 'btn_ON');
	DrawBouton('btn_tra', 'id_img_tra', 'btn_OFF');

	DrawBouton('btn_1_graph', 'id_img_1_graph', 'btn_OFF');
	DrawBouton('btn_2_graph', 'id_img_2_graph', 'btn_ON');
	DrawBouton('btn_4_graph', 'id_img_4_graph', 'btn_OFF');

	InitDimGraph();
	MAJgraph('liste_graph_1_1');
	Maj_calc();

};