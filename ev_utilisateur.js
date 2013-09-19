h_tt=320; 	w_tt=800;	
h_ss=320;	w_ss=400;	
h_cvs=0;	w_cvs=400;
w_hiden=100;



//SOURIS & 3D_globales
//Roulette: Zoom & dé-zoom
document.getElementById('id_canvas_3D_globale').addEventListener('mousewheel', function(e) {
	var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

	if(!e){ e = window.event; }
    if(e.preventDefault) { e.preventDefault(); }
		
	if(delta>0)
	h_cvs_3D_globale=h_cvs_3D_globale/1.05;
	else 
	h_cvs_3D_globale=1.05*h_cvs_3D_globale;
		
	Draw3D_globale();
}, false);

//Clic
document.getElementById('id_canvas_3D_globale').addEventListener('mousedown', function(e) {

document.getElementById('liste_camera').selectedIndex=0;

flag_clic_3D_globale=1;
document.body.style.cursor = 'move';

var canvas=document.getElementById('id_canvas_3D_globale');
var rect = canvas.getBoundingClientRect(), root = document.documentElement;

X_3D_save= e.clientX - rect.left - root.scrollLeft;
Y_3D_save= e.clientY - rect.top - root.scrollTop;

}, false);

//Relache clic
document.getElementById('id_canvas_3D_globale').addEventListener('mouseup', function(e) {
flag_clic_3D_globale=0;
document.body.style.cursor = 'auto';
}, false);

//bouge
document.getElementById('id_canvas_3D_globale').addEventListener('mousemove', function(e) {
if(flag_clic_3D_globale)
Souris_3D("3D_globale",e);
}, false);



//TRANSLATION VS ROTATION
document.getElementById('btn_tra').onclick = function() {
if(flag_mvt_3D!="translation"){
	flag_mvt_3D="translation";
	DrawBouton('btn_rot','id_img_rot','btn_OFF');
	DrawBouton('btn_tra','id_img_tra','btn_ON');
}
}




document.getElementById('btn_rot').onclick = function() {
if(flag_mvt_3D!="rotation"){
	flag_mvt_3D="rotation";
	DrawBouton('btn_rot','id_img_rot','btn_ON');
	DrawBouton('btn_tra','id_img_tra','btn_OFF');
}
}







//--ONGLETS DE REGLAGE
//-MOLETTE DE SELECTION DU MODE
//Clic
document.getElementById('id_canvas_roue_mode').addEventListener('mousedown', function(e) {

//Flag passe à 1
flag_clic_roue_mode=1;

//MAj de la position 0
var canvas=document.getElementById('id_canvas_roue_mode');
var rect = canvas.getBoundingClientRect(), root = document.documentElement;
Y0_roue_mode = e.clientY - rect.top - root.scrollTop;

}, false);

//Relache clic
document.getElementById('id_canvas_roue_mode').addEventListener('mouseup', function(e) {
flag_clic_roue_mode=0;
}, false);

//Bouge
document.getElementById('id_canvas_roue_mode').addEventListener('mousemove', function(e) {
if(flag_clic_roue_mode){

	var canvas=document.getElementById('id_canvas_roue_mode');
	var rect = canvas.getBoundingClientRect(), root = document.documentElement;
	Y1_roue_mode = e.clientY - rect.top - root.scrollTop;
	
	if(Math.abs(Y1_roue_mode-Y0_roue_mode)>10){
	
		if(flag_reglage_expo=='ouverture' && Y1_roue_mode>Y0_roue_mode)
		flag_reglage_expo='manuel';
		
		else if(flag_reglage_expo=='ouverture' && Y1_roue_mode<Y0_roue_mode)
		flag_reglage_expo='vitesse';
		
		else if(flag_reglage_expo=='manuel' && Y1_roue_mode<Y0_roue_mode)
		flag_reglage_expo='ouverture';
		
		else if(flag_reglage_expo=='vitesse' && Y1_roue_mode>Y0_roue_mode)
		flag_reglage_expo='ouverture';
		
		Y0_roue_mode=Y1_roue_mode;
		
		//MAJ du retour pour l'utilisateur
		switch(flag_reglage_expo){		
			case 'manuel':document.getElementById('id_nom_mode').innerHTML=chrome.i18n.getMessage("PrioMan"); break;
			case 'ouverture':document.getElementById('id_nom_mode').innerHTML=chrome.i18n.getMessage("PrioOuv"); break;
			case 'vitesse':document.getElementById('id_nom_mode').innerHTML=chrome.i18n.getMessage("PrioVit"); break;		
		}
		
		
		DrawRoueMode();
	
	}


}

}, false);

//Sort
document.getElementById('id_canvas_roue_mode').addEventListener('mouseout', function(e) {
document.body.style.cursor = 'auto';
flag_clic_roue_mode=0;
}, false);

//Entre
document.getElementById('id_canvas_roue_mode').addEventListener('mouseover', function(e) {
document.body.style.cursor = 'e-resize';
}, false);


//RB DE SELECTION DU PARAMTERE DU TRIANGLE D'EXPOSITION
document.getElementById('rb_triangle_vitesse').addEventListener('change', function() {
flag_triangle_expo="vitesse";
}, false);

document.getElementById('rb_triangle_ouverture').addEventListener('change', function() {
flag_triangle_expo="ouverture";
}, false);

document.getElementById('rb_triangle_ISO').addEventListener('change', function() {
flag_triangle_expo="ISO";
}, false);


//-MOLETTE DE REGLAGE DU TRIANGLE D'EXPO
//Clic
document.getElementById('id_canvas_molette_R').addEventListener('mousedown', function(e) {

//Flag passe à 1
flag_clic_molette_R=1;

//MAj de la position 0
var canvas=document.getElementById('id_canvas_molette_R');
var rect = canvas.getBoundingClientRect(), root = document.documentElement;
var posX = e.clientX;

X_molette_R_save = posX - rect.left - root.scrollLeft-marge_x_distance; 
d_x_molette_R_save=X_molette_R_save;
}, false);

//Relache clic
document.getElementById('id_canvas_molette_R').addEventListener('mouseup', function(e) {
flag_clic_molette_R=0;
}, false);

//Bouge
document.getElementById('id_canvas_molette_R').addEventListener('mousemove', function(e) {
if(flag_clic_molette_R)
Souris_3D("molette_R",e);
}, false);

//Sort
document.getElementById('id_canvas_molette_R').addEventListener('mouseout', function(e) {
document.body.style.cursor = 'auto';
flag_clic_molette_R=0;
}, false);

//Entre
document.getElementById('id_canvas_molette_R').addEventListener('mouseover', function(e) {
document.body.style.cursor = 'e-resize';
}, false);

function MAJ_triangle_expo(Xt1){

var dx_cran=1/5;

var dx=(Xt1-d_x_molette_R_save);
dx=dx/X0_3D;

//Incrément de la valeur
if(dx>0){
	if(dx> dx_cran){
		MAJ_val_triangle_expo(Math.round(dx/dx_cran));
		d_x_molette_R_save=Xt1;
	}
}
//Décrément de la valeur
if(dx<0){
	if(-dx> dx_cran){
		MAJ_val_triangle_expo(Math.round(dx/dx_cran));
		d_x_molette_R_save=Xt1;
	}
}
}


function MAJ_val_triangle_expo(incr){

	//Vitesse
	if(flag_triangle_expo=="vitesse"){
	
		if(flag_reglage_expo!="ouverture"){
		
			cpt_vitesse+=incr;
			
			if(cpt_vitesse<1){
			cpt_vitesse=1;
			incr=0;
			}
			if(cpt_vitesse>58){
			cpt_vitesse=58;
			incr=0;
			}
			
			switch(cpt_vitesse){

				case 1: temp='1/8000'; vitesse=0.000125; break;
				case 2: temp='1/6400'; vitesse=0.00015625; break;
				case 3: temp='1/5000'; vitesse=0.0002; break;
				case 4: temp='1/4000'; vitesse=0.00025; break;
				case 5: temp='1/3200'; vitesse=0.0003125; break;
				case 6: temp='1/2500'; vitesse=0.0004; break;
				case 7: temp='1/2000'; vitesse=0.0005; break;
				case 8: temp='1/1600'; vitesse=0.000625; break;
				case 9: temp='1/1250'; vitesse=0.0008; break;
				case 10: temp='1/1000'; vitesse=0.001; break;
				case 11: temp='1/800'; vitesse=0.00125; break;
				case 12: temp='1/640'; vitesse=0.0015625; break;
				case 13: temp='1/500'; vitesse=0.002; break;
				case 14: temp='1/400'; vitesse=0.0025; break;
				case 15: temp='1/320'; vitesse=0.003125; break;
				case 16: temp='1/250'; vitesse=0.004; break;
				case 17: temp='1/200'; vitesse=0.005; break;
				case 18: temp='1/160'; vitesse=0.00625; break;
				case 19: temp='1/125'; vitesse=0.008; break;
				case 20: temp='1/100'; vitesse=0.01; break;
				case 21: temp='1/80'; vitesse=0.0125; break;
				case 22: temp='1/60'; vitesse=0.0166666666666667; break;
				case 23: temp='1/50'; vitesse=0.02; break;
				case 24: temp='1/40'; vitesse=0.025; break;
				case 25: temp='1/30'; vitesse=0.0333333333333333; break;
				case 26: temp='1/25'; vitesse=0.04; break;
				case 27: temp='1/20'; vitesse=0.05; break;
				case 28: temp='1/15'; vitesse=0.0666666666666667; break;
				case 29: temp='1/13'; vitesse=0.0769230769230769; break;
				case 30: temp='1/10'; vitesse=0.1; break;
				case 31: temp='1/8'; vitesse=0.125; break;
				case 32: temp='1/6'; vitesse=0.166666666666667; break;
				case 33: temp='1/5'; vitesse=0.2; break;
				case 34: temp='1/4'; vitesse=0.25; break;
				case 35: temp='1/3'; vitesse=0.333333333333333; break;
				case 36: temp='1/2.5'; vitesse=0.4; break;
				case 37: temp='1/2'; vitesse=0.5; break;
				case 38: temp='1/1.6'; vitesse=0.625; break;
				case 39: temp='1/1.3'; vitesse=0.769230769230769; break;
				case 40: temp='1"'; vitesse=1; break;
				case 41: temp='1.3"'; vitesse=1.3; break;
				case 42: temp='1.6"'; vitesse=1.6; break;
				case 43: temp='2"'; vitesse=2; break;
				case 44: temp='2.5"'; vitesse=2.5; break;
				case 45: temp='3"'; vitesse=3; break;
				case 46: temp='4"'; vitesse=4; break;
				case 47: temp='5"'; vitesse=5; break;
				case 48: temp='6"'; vitesse=6; break;
				case 49: temp='8"'; vitesse=8; break;
				case 50: temp='10"'; vitesse=10; break;
				case 51: temp='13"'; vitesse=13; break;
				case 52: temp='15"'; vitesse=15; break;
				case 53: temp='20"'; vitesse=20; break;
				case 54: temp='25"'; vitesse=25; break;
				case 55: temp='30"'; vitesse=30; break;
				case 56: temp='40"'; vitesse=40; break;
				case 57: temp='50"'; vitesse=50; break;
				case 58: temp='60"'; vitesse=60; break;
			}

			if(temp!='')
			vitesse_string=temp;
			
			if(flag_reglage_expo=="vitesse" && incr!=0){
				
				cpt_ouverture+=(Math.round(expo/(1/3))+incr);
				
				if(cpt_ouverture<cpt_ouverture_min)
				cpt_ouverture=cpt_ouverture_min;
				if(cpt_ouverture>37)
				cpt_ouverture=37;
				
				
				ouverture=Cpt2N(cpt_ouverture).N;
				
			}

			Maj_calc();
			DrawViseur();
		}
	}
	
	
	//Ouverture
	else if(flag_triangle_expo=="ouverture"){
		if(flag_reglage_expo!="vitesse"){
			incr=-1*incr;
			
			cpt_ouverture+=incr;
			
			
			

			if(cpt_ouverture<cpt_ouverture_min){
			cpt_ouverture=cpt_ouverture_min;
			incr=0;
			}
			if(cpt_ouverture>37){
			cpt_ouverture=37;
			incr=0;
			}
			
			ouverture=Cpt2N(cpt_ouverture).N;

			
			
			if(flag_reglage_expo=="ouverture" && incr!=0){
				
				cpt_vitesse-=(Math.round(expo/(1/3))-incr);
				
				if(cpt_vitesse<1)
				cpt_vitesse=1;
				if(cpt_vitesse>58)
				cpt_vitesse=58;
				
				temp='';
				
				switch(cpt_vitesse){

					case 1: temp='1/8000'; vitesse=0.000125; break;
					case 2: temp='1/6400'; vitesse=0.00015625; break;
					case 3: temp='1/5000'; vitesse=0.0002; break;
					case 4: temp='1/4000'; vitesse=0.00025; break;
					case 5: temp='1/3200'; vitesse=0.0003125; break;
					case 6: temp='1/2500'; vitesse=0.0004; break;
					case 7: temp='1/2000'; vitesse=0.0005; break;
					case 8: temp='1/1600'; vitesse=0.000625; break;
					case 9: temp='1/1250'; vitesse=0.0008; break;
					case 10: temp='1/1000'; vitesse=0.001; break;
					case 11: temp='1/800'; vitesse=0.00125; break;
					case 12: temp='1/640'; vitesse=0.0015625; break;
					case 13: temp='1/500'; vitesse=0.002; break;
					case 14: temp='1/400'; vitesse=0.0025; break;
					case 15: temp='1/320'; vitesse=0.003125; break;
					case 16: temp='1/250'; vitesse=0.004; break;
					case 17: temp='1/200'; vitesse=0.005; break;
					case 18: temp='1/160'; vitesse=0.00625; break;
					case 19: temp='1/125'; vitesse=0.008; break;
					case 20: temp='1/100'; vitesse=0.01; break;
					case 21: temp='1/80'; vitesse=0.0125; break;
					case 22: temp='1/60'; vitesse=0.0166666666666667; break;
					case 23: temp='1/50'; vitesse=0.02; break;
					case 24: temp='1/40'; vitesse=0.025; break;
					case 25: temp='1/30'; vitesse=0.0333333333333333; break;
					case 26: temp='1/25'; vitesse=0.04; break;
					case 27: temp='1/20'; vitesse=0.05; break;
					case 28: temp='1/15'; vitesse=0.0666666666666667; break;
					case 29: temp='1/13'; vitesse=0.0769230769230769; break;
					case 30: temp='1/10'; vitesse=0.1; break;
					case 31: temp='1/8'; vitesse=0.125; break;
					case 32: temp='1/6'; vitesse=0.166666666666667; break;
					case 33: temp='1/5'; vitesse=0.2; break;
					case 34: temp='1/4'; vitesse=0.25; break;
					case 35: temp='1/3'; vitesse=0.333333333333333; break;
					case 36: temp='1/2.5'; vitesse=0.4; break;
					case 37: temp='1/2'; vitesse=0.5; break;
					case 38: temp='1/1.6'; vitesse=0.625; break;
					case 39: temp='1/1.3'; vitesse=0.769230769230769; break;
					case 40: temp='1"'; vitesse=1; break;
					case 41: temp='1.3"'; vitesse=1.3; break;
					case 42: temp='1.6"'; vitesse=1.6; break;
					case 43: temp='2"'; vitesse=2; break;
					case 44: temp='2.5"'; vitesse=2.5; break;
					case 45: temp='3"'; vitesse=3; break;
					case 46: temp='4"'; vitesse=4; break;
					case 47: temp='5"'; vitesse=5; break;
					case 48: temp='6"'; vitesse=6; break;
					case 49: temp='8"'; vitesse=8; break;
					case 50: temp='10"'; vitesse=10; break;
					case 51: temp='13"'; vitesse=13; break;
					case 52: temp='15"'; vitesse=15; break;
					case 53: temp='20"'; vitesse=20; break;
					case 54: temp='25"'; vitesse=25; break;
					case 55: temp='30"'; vitesse=30; break;
					case 56: temp='40"'; vitesse=40; break;
					case 57: temp='50"'; vitesse=50; break;
					case 58: temp='60"'; vitesse=60; break;
				}

				if(temp!='')
				vitesse_string=temp;
			
			}

			Maj_calc();
			Draw3D_globale();
			DrawViseur();
			
		}
	}
	
	
	//ISO
	else if(flag_triangle_expo=="ISO"){
		
		
		cpt_ISO+=incr;
		

		if(cpt_ISO<1){
		cpt_ISO=1;
		incr=0;
		}
		if(cpt_ISO>42){
		cpt_ISO=42;
		incr=0;
		}

		switch(cpt_ISO){
			case 1: ISO=25; break;
			case 2: ISO=32; break;
			case 3: ISO=40; break;
			case 4: ISO=50; break;
			case 5: ISO=64; break;
			case 6: ISO=80; break;
			case 7: ISO=100; break;
			case 8: ISO=125; break;
			case 9: ISO=160; break;
			case 10: ISO=200; break;
			case 11: ISO=250; break;
			case 12: ISO=320; break;
			case 13: ISO=400; break;
			case 14: ISO=500; break;
			case 15: ISO=640; break;
			case 16: ISO=800; break;
			case 17: ISO=1000; break;
			case 18: ISO=1250; break;
			case 19: ISO=1600; break;
			case 20: ISO=2000; break;
			case 21: ISO=2500; break;
			case 22: ISO=3200; break;
			case 23: ISO=4000; break;
			case 24: ISO=5000; break;
			case 25: ISO=6400; break;
			case 26: ISO=8000; break;
			case 27: ISO=10000; break;
			case 28: ISO=12800; break;
			case 29: ISO=16000; break;
			case 30: ISO=20000; break;
			case 31: ISO=25600; break;
			case 32: ISO=32000; break;
			case 33: ISO=40000; break;
			case 34: ISO=51200; break;
			case 35: ISO=64000; break;
			case 36: ISO=80000; break;
			case 37: ISO=102400; break;
			case 38: ISO=128000; break;
			case 39: ISO=160000; break;
			case 40: ISO=204800; break;
			case 41: ISO=256000; break;
			case 42: ISO=320000; break;
		}
		
		if(incr!=0){
		
			//Prio vitesse => modifie l'ouverture
			if(flag_reglage_expo=="vitesse"){
			
				cpt_ouverture+=(Math.round(expo/(1/3))+incr);
				
				if(cpt_ouverture<cpt_ouverture_min)
				cpt_ouverture=cpt_ouverture_min;
				if(cpt_ouverture>37)
				cpt_ouverture=37;
				
				ouverture=Cpt2N(cpt_ouverture).N;
				
				

			}
			
			//Prio ouverture => modifie la vitesse
			if(flag_reglage_expo=="ouverture"){
			
				cpt_vitesse-=(Math.round(expo/(1/3))+incr);
				
				if(cpt_vitesse<1)
				cpt_vitesse=1;
				if(cpt_vitesse>58)
				cpt_vitesse=58;
				
				temp='';
				
				switch(cpt_vitesse){

					case 1: temp='1/8000'; vitesse=0.000125; break;
					case 2: temp='1/6400'; vitesse=0.00015625; break;
					case 3: temp='1/5000'; vitesse=0.0002; break;
					case 4: temp='1/4000'; vitesse=0.00025; break;
					case 5: temp='1/3200'; vitesse=0.0003125; break;
					case 6: temp='1/2500'; vitesse=0.0004; break;
					case 7: temp='1/2000'; vitesse=0.0005; break;
					case 8: temp='1/1600'; vitesse=0.000625; break;
					case 9: temp='1/1250'; vitesse=0.0008; break;
					case 10: temp='1/1000'; vitesse=0.001; break;
					case 11: temp='1/800'; vitesse=0.00125; break;
					case 12: temp='1/640'; vitesse=0.0015625; break;
					case 13: temp='1/500'; vitesse=0.002; break;
					case 14: temp='1/400'; vitesse=0.0025; break;
					case 15: temp='1/320'; vitesse=0.003125; break;
					case 16: temp='1/250'; vitesse=0.004; break;
					case 17: temp='1/200'; vitesse=0.005; break;
					case 18: temp='1/160'; vitesse=0.00625; break;
					case 19: temp='1/125'; vitesse=0.008; break;
					case 20: temp='1/100'; vitesse=0.01; break;
					case 21: temp='1/80'; vitesse=0.0125; break;
					case 22: temp='1/60'; vitesse=0.0166666666666667; break;
					case 23: temp='1/50'; vitesse=0.02; break;
					case 24: temp='1/40'; vitesse=0.025; break;
					case 25: temp='1/30'; vitesse=0.0333333333333333; break;
					case 26: temp='1/25'; vitesse=0.04; break;
					case 27: temp='1/20'; vitesse=0.05; break;
					case 28: temp='1/15'; vitesse=0.0666666666666667; break;
					case 29: temp='1/13'; vitesse=0.0769230769230769; break;
					case 30: temp='1/10'; vitesse=0.1; break;
					case 31: temp='1/8'; vitesse=0.125; break;
					case 32: temp='1/6'; vitesse=0.166666666666667; break;
					case 33: temp='1/5'; vitesse=0.2; break;
					case 34: temp='1/4'; vitesse=0.25; break;
					case 35: temp='1/3'; vitesse=0.333333333333333; break;
					case 36: temp='1/2.5'; vitesse=0.4; break;
					case 37: temp='1/2'; vitesse=0.5; break;
					case 38: temp='1/1.6'; vitesse=0.625; break;
					case 39: temp='1/1.3'; vitesse=0.769230769230769; break;
					case 40: temp='1"'; vitesse=1; break;
					case 41: temp='1.3"'; vitesse=1.3; break;
					case 42: temp='1.6"'; vitesse=1.6; break;
					case 43: temp='2"'; vitesse=2; break;
					case 44: temp='2.5"'; vitesse=2.5; break;
					case 45: temp='3"'; vitesse=3; break;
					case 46: temp='4"'; vitesse=4; break;
					case 47: temp='5"'; vitesse=5; break;
					case 48: temp='6"'; vitesse=6; break;
					case 49: temp='8"'; vitesse=8; break;
					case 50: temp='10"'; vitesse=10; break;
					case 51: temp='13"'; vitesse=13; break;
					case 52: temp='15"'; vitesse=15; break;
					case 53: temp='20"'; vitesse=20; break;
					case 54: temp='25"'; vitesse=25; break;
					case 55: temp='30"'; vitesse=30; break;
					case 56: temp='40"'; vitesse=40; break;
					case 57: temp='50"'; vitesse=50; break;
					case 58: temp='60"'; vitesse=60; break;
				}

				if(temp!='')
				vitesse_string=temp;

			}
		
		}
		Maj_calc();
		DrawViseur();
		
	}

}






//-APN
//Capteur
document.getElementById('liste_capteur').addEventListener('change', function() {
capteur=document.getElementById('liste_capteur').options[document.getElementById('liste_capteur').selectedIndex].value;

switch(capteur){
	case "1/2.3":		l_capteur=5.1;	h_capteur=3.8;	break;
	case "1/1.8":		l_capteur=7.1;	h_capteur=5.3;	break;
	case "1/1.7":		l_capteur=7.5;	h_capteur=5.6;	break;
	case "1/1.6":		l_capteur=8;	h_capteur=6;	break;
	case "2/3":			l_capteur=8.8;	h_capteur=6.6;	break;
	case "CX":			l_capteur=13.2;	h_capteur=8.8;	break;
	case "4/3":			l_capteur=17.8;	h_capteur=13.4;	break;
	case "aps-c":		l_capteur=23.4;	h_capteur=15.6;	break;
	case "aps-h":		l_capteur=28.7;	h_capteur=19.1;	break;
	case "full-frame":	l_capteur=36;	h_capteur=24;	break;
}


if(flag_cadrage_constant){
	focale=l_capteur*d_map/largeur_map;	//nouvelle focale
	
	if(focale<4)
	focale=4;
	if(focale>250)
	focale=250;

	document.getElementById("slider_focale").value=focale;
	document.getElementById('val_focale').innerHTML=focale.toFixed(0)+"mm"; 
}


Maj_calc();
DrawViseur();
InitPtsCapteurs();
InitPtsViseeReflex();

if(flag_cadrage_constant)
InitPtsObjectif();

Draw3D_globale();

}, false);

//Definition
document.getElementById('input_definition').addEventListener('change', function() {
definition=1.0*document.getElementById('input_definition').value;

if(definition<0.1){
definition=0.1;
document.getElementById('input_definition').value=definition;
}

/*
if(resolution>definition){
resolution=definition;
document.getElementById('input_resolution').value=resolution;
}
*/
Maj_calc();
}, false);

//Dynamique
document.getElementById('input_dynamique').addEventListener('change', function() {
dynamique_capteur_0=1.0*document.getElementById('input_dynamique').value;
Maj_calc();
DrawViseur();
}, false);


//-OBJECTIF
//Objectifs pré-définis ou non
document.getElementById('id_chk_obj_predefinis').addEventListener('change', function() {


	//Objectif pré-défini
	if(document.getElementById('id_chk_obj_predefinis').checked){
	
		flag_obj_predefinis=1;
		
		//Cherche la focale prédéfinie la plus proche de la courante (TBD: chercher vraiment la plus proche)
		for( var i=0; i<ListeObj.length;i++){
		
			if( (focale>=ListeObj[i].foc) && ( (i==ListeObj.length-1) || (focale<ListeObj[i+1].foc)) ){
				
				document.getElementById("slider_focale").min=0;
				document.getElementById("slider_focale").max=ListeObj.length-1;
				document.getElementById("slider_focale").value=i;
				
				Maj_objectif();
							
				i=ListeObj.length-1;			//sort de la boucle
			}		
		}			
	}
	
	//Objectif libre
	else{
		flag_obj_predefinis=0;
		document.getElementById("slider_focale").min=14;
		document.getElementById("slider_focale").max=400;
		document.getElementById("slider_focale").value=focale;				
	}





}, false);


function Maj_objectif(){

var temp=1.0*document.getElementById("slider_focale").value;

if(flag_obj_predefinis==0){

	focale=temp;
	ExtrapoleObjectif();
}

else{
		cpt_obj=temp;
		focale=1.0*ListeObj[temp].foc;	
		Ouv_min=1.0*ListeObj[temp].Nmin;
		cpt_ouverture_min=1.0*N2Cpt(Ouv_min).cpt;
		anti_vibration=1.0*ListeObj[temp].VR;	
		resolution=1.0*ListeObj[temp].res;	
		ab_chro=1.0*ListeObj[temp].AC;	
			
		document.getElementById('liste_N_min').selectedIndex=cpt_ouverture_min-1;
		document.getElementById('liste_anti_vibration').selectedIndex=anti_vibration;
		document.getElementById('input_resolution').value=resolution;
		document.getElementById('input_aberrations_chromatiques').value=ab_chro;
				 		
		
		if(ouverture<Ouv_min){
			ouverture=Ouv_min;
			cpt_ouverture=cpt_ouverture_min;
		}
		
}
		

if(flag_cadrage_constant){

	temp=largeur_map*focale/l_capteur;	//nouvelle dmap
	
	if(temp<-1*(d_map-(focale/1000.0+0.001)))
	temp=-1*(d_map-(focale/1000.0+0.001));

	
	dP+=d_map-temp;
	d_arriere_plan+=(temp-d_map);
	
	if(d_avant_plan<0)
	d_avant_plan=0;
	
	d_avant_plan+=(temp-d_map);
	d_map=temp;
}
else{
	if(d_map<(focale/1000.0+0.001)){
	d_map=(focale/1000.0+0.001).toFixed(3);	
	}
}

if(d_avant_plan>d_map)
d_avant_plan=d_map;

if(d_arriere_plan<d_map)
d_arriere_plan=d_map;

Maj_calc();
DrawViseur();
InitPtsObjectif();

if(crop_factor!=1)
InitPtsCapteurs();

Draw3D_globale();

}


//Longueur focale
document.getElementById("slider_focale").oninput =function(e){
Maj_objectif();
}


//Ouverture min
document.getElementById('liste_N_min').addEventListener('change', function() {
cpt_ouverture_min=1.0*document.getElementById('liste_N_min').options[document.getElementById('liste_N_min').selectedIndex].value;

Ouv_min=Cpt2N(cpt_ouverture_min).N;


if(ouverture<Ouv_min){
	ouverture=Ouv_min;
	cpt_ouverture=cpt_ouverture_min;
	Maj_calc();
	DrawViseur();
}

InitPtsObjectif();

Draw3D_globale();


}, false);






//-DISTANCES
//Distances: Clic
document.getElementById('id_canvas_distances').addEventListener('mousedown', function(e) {

//Flag passe à 1
flag_clic_distance=1;

//MAj de la position 0
var canvas=document.getElementById('id_canvas_distances');
var rect = canvas.getBoundingClientRect(), root = document.documentElement;
var posX = e.clientX;

mouseX_0_distance = posX - rect.left - root.scrollLeft-marge_x_distance; 
}, false);

//Distances: Relache clic
document.getElementById('id_canvas_distances').addEventListener('mouseup', function(e) {
flag_clic_distance=0;
DrawDistances();	//pour MAJ de la largeur des abscisses
}, false);

//Distances: bouge
document.getElementById('id_canvas_distances').addEventListener('mousemove', function(e) {

//pour passer d'une distance en m à des px
var k_distance=largeur_canvas_distances/d_dernier_point;	

//MAJ de la position des points sur l'axe
var X_av=k_distance*d_avant_plan;
var X_map=k_distance*d_map;
var X_ar=k_distance*d_arriere_plan;

//MAJ de la position de la souris
var canvas=document.getElementById('id_canvas_distances');
var rect = canvas.getBoundingClientRect(), root = document.documentElement;
var posX = e.clientX;
var mouseX = posX - rect.left - root.scrollLeft - marge_x_distance;

//Regarde dans qeulle zone se situe la souris
var surbrillance_temp="?";

//Pas encore cliqué: souris entre 2 zone spour mettre en surbrillance
if(flag_clic_distance==0){
	if(mouseX<(X_av+X_map)/2){
	surbrillance_temp='av';
	}
	else if(mouseX>(X_map+X_ar)/2){
	surbrillance_temp='ar';
	}
	else{
	surbrillance_temp='map';
	}
}
//Déjà cliqué: la souris peut bouger entre les 2 bornes
else{
	if(surbrillance=='av'){
		if(d_avant_plan<=d_map)
		surbrillance_temp='av';
	}
	if(surbrillance=='map'){
		if(d_avant_plan<=d_map<=d_arriere_plan)
		surbrillance_temp='map';
	}
	if(surbrillance=='ar'){
		if(d_map<=d_arriere_plan)
		surbrillance_temp='ar';
	}
}

//La souris est cliquée => modification des distances	
if(flag_clic_distance){

	//avant plan
	if(surbrillance_temp=='av'){

		d_avant_plan+=(mouseX-mouseX_0_distance)/k_distance;
			
		if(d_avant_plan>d_map)
		d_avant_plan=d_map;
		
		if(d_avant_plan<0)
		d_avant_plan=0;				
		
		Maj_calc();
		DrawViseur();		
		Draw3D_globale();

		mouseX_0_distance=mouseX;
	}
	//arrière plan
	if(surbrillance_temp=='ar'){

		d_arriere_plan+=(mouseX-mouseX_0_distance)/k_distance;
			
		if(d_arriere_plan<d_map)
		d_arriere_plan=d_map;		
		
		mouseX_0_distance=mouseX;		
		
		Maj_calc();	
		DrawViseur();
		Draw3D_globale();

		mouseX_0_distance=mouseX;
	}
	//MAP
	if(surbrillance_temp=='map'){

		d_map+=(mouseX-mouseX_0_distance)/k_distance;
			
		if(d_map<d_avant_plan)
		d_map=d_avant_plan;
		
		if(d_map>d_arriere_plan)
		d_map=d_arriere_plan;		
		
		mouseX_0_distance=mouseX;
		
		Maj_calc();	
		DrawViseur();
		Draw3D_globale();

		mouseX_0_distance=mouseX;
	}
}

surbrillance=surbrillance_temp

DrawDistances();
}, false);

//Distances: Sort
document.getElementById('id_canvas_distances').addEventListener('mouseout', function(e) {
surbrillance='?';
document.body.style.cursor = 'auto';

flag_clic_distance=0;
DrawDistances();
}, false);

//Distances: Entre
document.getElementById('id_canvas_distances').addEventListener('mouseover', function(e) {
document.body.style.cursor = 'e-resize';
DrawDistances();
}, false);


//--LUMINOSITE
document.getElementById('liste_scene').addEventListener('change', function() {

lum_scene_EV=1.0*document.getElementById('liste_scene').options[document.getElementById('liste_scene').selectedIndex].value;
Maj_calc();


//Prio vitesse => modifie l'ouverture
if(flag_reglage_expo=="vitesse"){

	cpt_ouverture+=(Math.round(expo/(1/3)));
	
	if(cpt_ouverture<cpt_ouverture_min)
	cpt_ouverture=cpt_ouverture_min;
	if(cpt_ouverture>37)
	cpt_ouverture=37;
	
	
	ouverture=Cpt2N(cpt_ouverture).N;
	
	
}

//Prio ouverture => modifie la vitesse
if(flag_reglage_expo=="ouverture"){

	cpt_vitesse-=(Math.round(expo/(1/3)));
	
	if(cpt_vitesse<1)
	cpt_vitesse=1;
	if(cpt_vitesse>58)
	cpt_vitesse=58;
	
	temp='';
	
	switch(cpt_vitesse){

		case 1: temp='1/8000'; vitesse=0.000125; break;
		case 2: temp='1/6400'; vitesse=0.00015625; break;
		case 3: temp='1/5000'; vitesse=0.0002; break;
		case 4: temp='1/4000'; vitesse=0.00025; break;
		case 5: temp='1/3200'; vitesse=0.0003125; break;
		case 6: temp='1/2500'; vitesse=0.0004; break;
		case 7: temp='1/2000'; vitesse=0.0005; break;
		case 8: temp='1/1600'; vitesse=0.000625; break;
		case 9: temp='1/1250'; vitesse=0.0008; break;
		case 10: temp='1/1000'; vitesse=0.001; break;
		case 11: temp='1/800'; vitesse=0.00125; break;
		case 12: temp='1/640'; vitesse=0.0015625; break;
		case 13: temp='1/500'; vitesse=0.002; break;
		case 14: temp='1/400'; vitesse=0.0025; break;
		case 15: temp='1/320'; vitesse=0.003125; break;
		case 16: temp='1/250'; vitesse=0.004; break;
		case 17: temp='1/200'; vitesse=0.005; break;
		case 18: temp='1/160'; vitesse=0.00625; break;
		case 19: temp='1/125'; vitesse=0.008; break;
		case 20: temp='1/100'; vitesse=0.01; break;
		case 21: temp='1/80'; vitesse=0.0125; break;
		case 22: temp='1/60'; vitesse=0.0166666666666667; break;
		case 23: temp='1/50'; vitesse=0.02; break;
		case 24: temp='1/40'; vitesse=0.025; break;
		case 25: temp='1/30'; vitesse=0.0333333333333333; break;
		case 26: temp='1/25'; vitesse=0.04; break;
		case 27: temp='1/20'; vitesse=0.05; break;
		case 28: temp='1/15'; vitesse=0.0666666666666667; break;
		case 29: temp='1/13'; vitesse=0.0769230769230769; break;
		case 30: temp='1/10'; vitesse=0.1; break;
		case 31: temp='1/8'; vitesse=0.125; break;
		case 32: temp='1/6'; vitesse=0.166666666666667; break;
		case 33: temp='1/5'; vitesse=0.2; break;
		case 34: temp='1/4'; vitesse=0.25; break;
		case 35: temp='1/3'; vitesse=0.333333333333333; break;
		case 36: temp='1/2.5'; vitesse=0.4; break;
		case 37: temp='1/2'; vitesse=0.5; break;
		case 38: temp='1/1.6'; vitesse=0.625; break;
		case 39: temp='1/1.3'; vitesse=0.769230769230769; break;
		case 40: temp='1"'; vitesse=1; break;
		case 41: temp='1.3"'; vitesse=1.3; break;
		case 42: temp='1.6"'; vitesse=1.6; break;
		case 43: temp='2"'; vitesse=2; break;
		case 44: temp='2.5"'; vitesse=2.5; break;
		case 45: temp='3"'; vitesse=3; break;
		case 46: temp='4"'; vitesse=4; break;
		case 47: temp='5"'; vitesse=5; break;
		case 48: temp='6"'; vitesse=6; break;
		case 49: temp='8"'; vitesse=8; break;
		case 50: temp='10"'; vitesse=10; break;
		case 51: temp='13"'; vitesse=13; break;
		case 52: temp='15"'; vitesse=15; break;
		case 53: temp='20"'; vitesse=20; break;
		case 54: temp='25"'; vitesse=25; break;
		case 55: temp='30"'; vitesse=30; break;
		case 56: temp='40"'; vitesse=40; break;
		case 57: temp='50"'; vitesse=50; break;
		case 58: temp='60"'; vitesse=60; break;
	}

	if(temp!='')
	vitesse_string=temp;

}

Maj_calc();
DrawViseur();
}, false);



//3D
//Choix du phénomène optique à afficher
document.getElementById('rb_3D_aucune').addEventListener('change', function() {
	Rayons_3D='aucune';
	Draw3D_globale();
}, false);

document.getElementById('rb_3D_dim').addEventListener('change', function() {
	Rayons_3D='dim';
	Draw3D_globale();
}, false);

document.getElementById('rb_3D_flou_av').addEventListener('change', function() {
	Rayons_3D='flou_av';
	Draw3D_globale();
}, false);

document.getElementById('rb_3D_flou_ar').addEventListener('change', function() {
	Rayons_3D='flou_ar';
	Draw3D_globale();
}, false);

document.getElementById('rb_3D_visee').addEventListener('change', function() {
	Rayons_3D='visee_reflex';
	Draw3D_globale();
}, false);

//Placement de la caméra
function RAZPosition3DGlobale(){
theta_x_3D_globale=0;
theta_y_3D_globale=0;
theta_p_3D_globale=0;

Rot1_1_3D_globale=1;
Rot1_2_3D_globale=0;
Rot1_3_3D_globale=0;
Rot2_1_3D_globale=0;
Rot2_2_3D_globale=1;
Rot2_3_3D_globale=0;
Rot3_1_3D_globale=0;
Rot3_2_3D_globale=0;
Rot3_3_3D_globale=1;


Tx_3D_globale=0;
Ty_3D_globale=0;
Tp_3D_globale=0;
}



document.getElementById('liste_camera').addEventListener('change', function() {
var camera=document.getElementById('liste_camera').options[document.getElementById('liste_camera').selectedIndex].value;

switch(camera){
	case 'Derrière':	RAZPosition3DGlobale();	theta_y_3D_globale=Math.PI;		Draw3D_globale();	break;
	case 'Côté':		RAZPosition3DGlobale();	theta_y_3D_globale=Math.PI/2;	Draw3D_globale();	break;
	case 'Devant':		RAZPosition3DGlobale();									Draw3D_globale();	break;
	case 'Haut':		RAZPosition3DGlobale();	theta_x_3D_globale=Math.PI/2;	theta_p_3D_globale=Math.PI/2;	Draw3D_globale();	break;
}

}, false);








//--VISEUR
//Flou
document.getElementById('id_chk_flou').addEventListener('change', function() {
	if(document.getElementById('id_chk_flou').checked)
	flag_draw_flou=1;
	else
	flag_draw_flou=0;

DrawViseur();	
}, false);

//Expo
document.getElementById('id_chk_expo').addEventListener('change', function() {
	if(document.getElementById('id_chk_expo').checked)
	flag_draw_expo=1;
	else
	flag_draw_expo=0;

DrawViseur();		
}, false);



//--DIVERS
//CDC
document.getElementById('liste_cdc').addEventListener('change', function() {
cdc_denom=1.0*document.getElementById('liste_cdc').options[document.getElementById('liste_cdc').selectedIndex].value;
Maj_calc();
}, false);





//Nbr de graph à afficher
document.getElementById('btn_1_graph').onclick = function() {
if(Nbr_graph!=1){
	Nbr_graph=1;
	DrawBouton('btn_1_graph','id_img_1_graph','btn_ON');
	DrawBouton('btn_2_graph','id_img_2_graph','btn_OFF');
	DrawBouton('btn_4_graph','id_img_4_graph','btn_OFF');
	InitDimGraph();	
}
}
document.getElementById('btn_2_graph').onclick = function() {
if(Nbr_graph!=2){
	Nbr_graph=2;
	DrawBouton('btn_1_graph','id_img_1_graph','btn_OFF');
	DrawBouton('btn_2_graph','id_img_2_graph','btn_ON');
	DrawBouton('btn_4_graph','id_img_4_graph','btn_OFF');
	InitDimGraph();	
}
}
document.getElementById('btn_4_graph').onclick = function() {
if(Nbr_graph!=4){
	Nbr_graph=4;
	DrawBouton('btn_1_graph','id_img_1_graph','btn_OFF');
	DrawBouton('btn_2_graph','id_img_2_graph','btn_OFF');
	DrawBouton('btn_4_graph','id_img_4_graph','btn_ON');
	InitDimGraph();	
}
}




function InitDimGraph(){
	
	
	
	
	switch(Nbr_graph){

		case 1: h_tt=540; 	w_tt=800;	
				h_ss=520;	w_ss=800;	
				h_cvs=0;	w_cvs=700;
				document.getElementById("id_choix_graph_1_1").style.display='';
				document.getElementById("id_choix_graph_1_2").style.display='none';
				document.getElementById("id_choix_graph_2_1").style.display='none';
				document.getElementById("id_choix_graph_2_2").style.display='none';
				break;
				
		case 2: h_tt=320; 	w_tt=800;	
				h_ss=300;	w_ss=400;	
				h_cvs=0;	w_cvs=380;
				document.getElementById("id_choix_graph_1_1").style.display='';
				document.getElementById("id_choix_graph_1_2").style.display='';
				document.getElementById("id_choix_graph_2_1").style.display='none';
				document.getElementById("id_choix_graph_2_2").style.display='none';
				break;	

		case 4: h_tt=460; 	w_tt=800;	
				h_ss=220;	w_ss=400;	
				h_cvs=0;	w_cvs=250;
				document.getElementById("id_choix_graph_1_1").style.display='';
				document.getElementById("id_choix_graph_1_2").style.display='';
				document.getElementById("id_choix_graph_2_1").style.display='';
				document.getElementById("id_choix_graph_2_2").style.display='';
				break;
	}
	
	//Zone graphique totale
	document.getElementById("id_zone_graph").style.height=h_tt+'px';
	document.getElementById("id_zone_graph").style.width=w_tt+'px';
	
	var left_temp=Math.round((w_ss-207)/2);
	document.getElementById("menu_3D").style.left=left_temp+'px';
	
	
	MAJgraph('liste_graph_1_1');
}







//MAJ d'un choix de graphique dans une liste
//MAJ de la position du graphique selectionné
//MAJ de la position du graphique anciennement à la position
//Affiche/cache
document.getElementById('liste_graph_1_1').addEventListener('change', function() {
MAJgraph('liste_graph_1_1');
}, false);
document.getElementById('liste_graph_1_2').addEventListener('change', function() {
MAJgraph('liste_graph_1_2');
}, false);
document.getElementById('liste_graph_2_1').addEventListener('change', function() {
MAJgraph('liste_graph_2_1');
}, false);
document.getElementById('liste_graph_2_2').addEventListener('change', function() {
MAJgraph('liste_graph_2_2');
}, false);




function MAJgraph(id_liste){


	//Commence par tout cacher
	Hide('id_graph_3D');
	Hide('id_graph_Viseur');
	Hide('id_graph_PDC');
	Hide('id_graph_Histo');
	
	
	//Cherche l'ancienne place du graph selectionné dans la liste courante
	if( id_liste!='liste_graph_1_1' && (document.getElementById('liste_graph_1_1').options[document.getElementById('liste_graph_1_1').selectedIndex].value==document.getElementById(id_liste).options[document.getElementById(id_liste).selectedIndex].value))
	var liste_old='liste_graph_1_1';
	
	if( id_liste!='liste_graph_1_2' && (document.getElementById('liste_graph_1_2').options[document.getElementById('liste_graph_1_2').selectedIndex].value==document.getElementById(id_liste).options[document.getElementById(id_liste).selectedIndex].value))
	var liste_old='liste_graph_1_2';
	
	if( id_liste!='liste_graph_2_1' && (document.getElementById('liste_graph_2_1').options[document.getElementById('liste_graph_2_1').selectedIndex].value==document.getElementById(id_liste).options[document.getElementById(id_liste).selectedIndex].value))
	var liste_old='liste_graph_2_1';
	
	if( id_liste!='liste_graph_2_2' && (document.getElementById('liste_graph_2_2').options[document.getElementById('liste_graph_2_2').selectedIndex].value==document.getElementById(id_liste).options[document.getElementById(id_liste).selectedIndex].value))
	var liste_old='liste_graph_2_2';
	
	
	if(liste_old){
		//Cherche le graph qui n'est plus selectionné
		if(	document.getElementById('liste_graph_1_1').options[document.getElementById('liste_graph_1_1').selectedIndex].value!='id_graph_3D' &&
			document.getElementById('liste_graph_1_2').options[document.getElementById('liste_graph_1_2').selectedIndex].value!='id_graph_3D' &&
			document.getElementById('liste_graph_2_1').options[document.getElementById('liste_graph_2_1').selectedIndex].value!='id_graph_3D' &&
			document.getElementById('liste_graph_2_2').options[document.getElementById('liste_graph_2_2').selectedIndex].value!='id_graph_3D' )
		var graph_old='id_graph_3D';
		
		if(	document.getElementById('liste_graph_1_1').options[document.getElementById('liste_graph_1_1').selectedIndex].value!='id_graph_Viseur' &&
			document.getElementById('liste_graph_1_2').options[document.getElementById('liste_graph_1_2').selectedIndex].value!='id_graph_Viseur' &&
			document.getElementById('liste_graph_2_1').options[document.getElementById('liste_graph_2_1').selectedIndex].value!='id_graph_Viseur' &&
			document.getElementById('liste_graph_2_2').options[document.getElementById('liste_graph_2_2').selectedIndex].value!='id_graph_Viseur' )
		var graph_old='id_graph_Viseur';
		
		if(	document.getElementById('liste_graph_1_1').options[document.getElementById('liste_graph_1_1').selectedIndex].value!='id_graph_PDC' &&
			document.getElementById('liste_graph_1_2').options[document.getElementById('liste_graph_1_2').selectedIndex].value!='id_graph_PDC' &&
			document.getElementById('liste_graph_2_1').options[document.getElementById('liste_graph_2_1').selectedIndex].value!='id_graph_PDC' &&
			document.getElementById('liste_graph_2_2').options[document.getElementById('liste_graph_2_2').selectedIndex].value!='id_graph_PDC' )
		var graph_old='id_graph_PDC';
		
		if(	document.getElementById('liste_graph_1_1').options[document.getElementById('liste_graph_1_1').selectedIndex].value!='id_graph_Histo' &&
			document.getElementById('liste_graph_1_2').options[document.getElementById('liste_graph_1_2').selectedIndex].value!='id_graph_Histo' &&
			document.getElementById('liste_graph_2_1').options[document.getElementById('liste_graph_2_1').selectedIndex].value!='id_graph_Histo' &&
			document.getElementById('liste_graph_2_2').options[document.getElementById('liste_graph_2_2').selectedIndex].value!='id_graph_Histo' )
		var graph_old='id_graph_Histo';
		
		
		//Met le graph non selectionné à l'ancienne place du nouveau
		if(graph_old=='id_graph_3D')
		document.getElementById(liste_old).selectedIndex=0;
		if(graph_old=='id_graph_Viseur')
		document.getElementById(liste_old).selectedIndex=1;
		if(graph_old=='id_graph_PDC')
		document.getElementById(liste_old).selectedIndex=2;
		if(graph_old=='id_graph_Histo')
		document.getElementById(liste_old).selectedIndex=3;
	}
	
	//Place les graph 	

document.getElementById((document.getElementById('liste_graph_1_1').options[document.getElementById('liste_graph_1_1').selectedIndex].value)).style.position='absolute';
document.getElementById((document.getElementById('liste_graph_1_1').options[document.getElementById('liste_graph_1_1').selectedIndex].value)).style.top='0px';
document.getElementById((document.getElementById('liste_graph_1_1').options[document.getElementById('liste_graph_1_1').selectedIndex].value)).style.bottom=h_ss+'px';
document.getElementById((document.getElementById('liste_graph_1_1').options[document.getElementById('liste_graph_1_1').selectedIndex].value)).style.left='0px';
document.getElementById((document.getElementById('liste_graph_1_1').options[document.getElementById('liste_graph_1_1').selectedIndex].value)).style.right=w_ss+'px';

document.getElementById((document.getElementById('liste_graph_1_2').options[document.getElementById('liste_graph_1_2').selectedIndex].value)).style.position='absolute';
document.getElementById((document.getElementById('liste_graph_1_2').options[document.getElementById('liste_graph_1_2').selectedIndex].value)).style.top='0px';
document.getElementById((document.getElementById('liste_graph_1_2').options[document.getElementById('liste_graph_1_2').selectedIndex].value)).style.bottom=h_ss+'px';
document.getElementById((document.getElementById('liste_graph_1_2').options[document.getElementById('liste_graph_1_2').selectedIndex].value)).style.left=w_ss+'px';
document.getElementById((document.getElementById('liste_graph_1_2').options[document.getElementById('liste_graph_1_2').selectedIndex].value)).style.right='0px';

document.getElementById((document.getElementById('liste_graph_2_1').options[document.getElementById('liste_graph_2_1').selectedIndex].value)).style.position='absolute';
document.getElementById((document.getElementById('liste_graph_2_1').options[document.getElementById('liste_graph_2_1').selectedIndex].value)).style.top=h_ss+'px';
document.getElementById((document.getElementById('liste_graph_2_1').options[document.getElementById('liste_graph_2_1').selectedIndex].value)).style.bottom='0px';
document.getElementById((document.getElementById('liste_graph_2_1').options[document.getElementById('liste_graph_2_1').selectedIndex].value)).style.left='0px';
document.getElementById((document.getElementById('liste_graph_2_1').options[document.getElementById('liste_graph_2_1').selectedIndex].value)).style.right=w_ss+'px';

document.getElementById((document.getElementById('liste_graph_2_2').options[document.getElementById('liste_graph_2_2').selectedIndex].value)).style.position='absolute';
document.getElementById((document.getElementById('liste_graph_2_2').options[document.getElementById('liste_graph_2_2').selectedIndex].value)).style.top=h_ss+'px';
document.getElementById((document.getElementById('liste_graph_2_2').options[document.getElementById('liste_graph_2_2').selectedIndex].value)).style.bottom='0px';
document.getElementById((document.getElementById('liste_graph_2_2').options[document.getElementById('liste_graph_2_2').selectedIndex].value)).style.left=w_ss+'px';
document.getElementById((document.getElementById('liste_graph_2_2').options[document.getElementById('liste_graph_2_2').selectedIndex].value)).style.right='0px';

	


	
	//MAJ des dimensions
	switch(Nbr_graph){
	
		//4 graph: tous sont affichés et ont même dim
		case 4: 	document.getElementById("id_graph_3D").style.height=h_ss+'px';
					document.getElementById("id_graph_3D").style.width=w_ss+'px';
					Wc_3D_globale=w_cvs;					
					
					document.getElementById("id_graph_Viseur").style.height=h_ss+'px';
					document.getElementById("id_graph_Viseur").style.width=w_ss+'px';
					largeur_canvas_viseur=w_cvs-2*marge_X;
										
					document.getElementById("id_graph_PDC").style.height=h_ss+'px';
					document.getElementById("id_graph_PDC").style.width=w_ss+'px';
					largeur_canvas_graph_pdc=w_cvs-marge_x_cvs_PDC-marge_x_fin_cvs_PDC;
					hauteur_canvas_graph_pdc=Math.round(largeur_canvas_graph_pdc*2/3);
					
					document.getElementById("id_graph_Histo").style.height=h_ss+'px';
					document.getElementById("id_graph_Histo").style.width=w_ss+'px';
					break;
					
		
		case 2: 	//1ier graph selectionné
					switch(document.getElementById('liste_graph_1_1').options[document.getElementById('liste_graph_1_1').selectedIndex].value){
						
						case 'id_graph_3D':			document.getElementById("id_graph_3D").style.height=h_ss+'px';
													document.getElementById("id_graph_3D").style.width=w_ss+'px';
													Wc_3D_globale=w_cvs;
													break;
											
						case 'id_graph_Viseur':		document.getElementById("id_graph_Viseur").style.height=h_ss+'px';
													document.getElementById("id_graph_Viseur").style.width=w_ss+'px';
													largeur_canvas_viseur=w_cvs-2*marge_X;
													break;
											
						case 'id_graph_PDC':		document.getElementById("id_graph_PDC").style.height=h_ss+'px';
													document.getElementById("id_graph_PDC").style.width=w_ss+'px';
													largeur_canvas_graph_pdc=w_cvs-marge_x_cvs_PDC-marge_x_fin_cvs_PDC;
													hauteur_canvas_graph_pdc=Math.round(largeur_canvas_graph_pdc*2/3);
													break;
											
						case 'id_graph_Histo':		document.getElementById("id_graph_Histo").style.height=h_ss+'px';
													document.getElementById("id_graph_Histo").style.width=w_ss+'px';
													
													break;
					}
					
					//2nd graph selectionné
					switch(document.getElementById('liste_graph_1_2').options[document.getElementById('liste_graph_1_2').selectedIndex].value){
						
						case 'id_graph_3D':			document.getElementById("id_graph_3D").style.height=h_ss+'px';
													document.getElementById("id_graph_3D").style.width=w_ss+'px';
													Wc_3D_globale=w_cvs;
													break;
											
						case 'id_graph_Viseur':		document.getElementById("id_graph_Viseur").style.height=h_ss+'px';
													document.getElementById("id_graph_Viseur").style.width=w_ss+'px';
													largeur_canvas_viseur=w_cvs-2*marge_X;
													break;
											
						case 'id_graph_PDC':		document.getElementById("id_graph_PDC").style.height=h_ss+'px';
													document.getElementById("id_graph_PDC").style.width=w_ss+'px';
													largeur_canvas_graph_pdc=w_cvs-marge_x_cvs_PDC-marge_x_fin_cvs_PDC;
													hauteur_canvas_graph_pdc=Math.round(largeur_canvas_graph_pdc*2/3);
													break;
											
						case 'id_graph_Histo':		document.getElementById("id_graph_Histo").style.height=h_ss+'px';
													document.getElementById("id_graph_Histo").style.width=w_ss+'px';
													
													break;
					}
					
					//1ier graph NON selectionné
					switch(document.getElementById('liste_graph_2_1').options[document.getElementById('liste_graph_2_1').selectedIndex].value){
						
						case 'id_graph_3D':			document.getElementById("id_graph_3D").style.height=h_ss+'px';
													document.getElementById("id_graph_3D").style.width=w_ss+'px';
													Wc_3D_globale=w_hiden;
													break;
											
						case 'id_graph_Viseur':		document.getElementById("id_graph_Viseur").style.height=h_ss+'px';
													document.getElementById("id_graph_Viseur").style.width=w_ss+'px';
													largeur_canvas_viseur=w_hiden-2*marge_X;
													break;
											
						case 'id_graph_PDC':		document.getElementById("id_graph_PDC").style.height=h_ss+'px';
													document.getElementById("id_graph_PDC").style.width=w_ss+'px';
													largeur_canvas_graph_pdc=w_hiden-marge_x_cvs_PDC-marge_x_fin_cvs_PDC;
													hauteur_canvas_graph_pdc=Math.round(largeur_canvas_graph_pdc*2/3);
													break;
											
						case 'id_graph_Histo':		document.getElementById("id_graph_Histo").style.height=h_ss+'px';
													document.getElementById("id_graph_Histo").style.width=w_ss+'px';
													
													break;
					}
					
					//2nd graph NON selectionné
					switch(document.getElementById('liste_graph_2_2').options[document.getElementById('liste_graph_2_2').selectedIndex].value){
						
						case 'id_graph_3D':			document.getElementById("id_graph_3D").style.height=h_ss+'px';
													document.getElementById("id_graph_3D").style.width=w_ss+'px';
													Wc_3D_globale=w_hiden;
													break;
											
						case 'id_graph_Viseur':		document.getElementById("id_graph_Viseur").style.height=h_ss+'px';
													document.getElementById("id_graph_Viseur").style.width=w_ss+'px';
													largeur_canvas_viseur=w_hiden-2*marge_X;
													break;
											
						case 'id_graph_PDC':		document.getElementById("id_graph_PDC").style.height=h_ss+'px';
													document.getElementById("id_graph_PDC").style.width=w_ss+'px';
													largeur_canvas_graph_pdc=w_hiden-marge_x_cvs_PDC-marge_x_fin_cvs_PDC;
													hauteur_canvas_graph_pdc=Math.round(largeur_canvas_graph_pdc*2/3);
													break;
											
						case 'id_graph_Histo':		document.getElementById("id_graph_Histo").style.height=h_ss+'px';
													document.getElementById("id_graph_Histo").style.width=w_ss+'px';
													
													break;
					}
				
					break;		


		case 1: 	//graph selectionné
					switch(document.getElementById('liste_graph_1_1').options[document.getElementById('liste_graph_1_1').selectedIndex].value){
						
						case 'id_graph_3D':			document.getElementById("id_graph_3D").style.height=h_ss+'px';
													document.getElementById("id_graph_3D").style.width=w_ss+'px';
													Wc_3D_globale=w_cvs;
													break;
											
						case 'id_graph_Viseur':		document.getElementById("id_graph_Viseur").style.height=h_ss+'px';
													document.getElementById("id_graph_Viseur").style.width=w_ss+'px';
													largeur_canvas_viseur=w_cvs-2*marge_X;
													break;
											
						case 'id_graph_PDC':		document.getElementById("id_graph_PDC").style.height=h_ss+'px';
													document.getElementById("id_graph_PDC").style.width=w_ss+'px';
													largeur_canvas_graph_pdc=w_cvs-marge_x_cvs_PDC-marge_x_fin_cvs_PDC;
													hauteur_canvas_graph_pdc=Math.round(largeur_canvas_graph_pdc*2/3);
													break;
											
						case 'id_graph_Histo':		document.getElementById("id_graph_Histo").style.height=h_ss+'px';
													document.getElementById("id_graph_Histo").style.width=w_ss+'px';
													
													break;
					}
					
					//1ier graph NON selectionné
					switch(document.getElementById('liste_graph_1_2').options[document.getElementById('liste_graph_1_2').selectedIndex].value){
						
						case 'id_graph_3D':			document.getElementById("id_graph_3D").style.height=h_ss+'px';
													document.getElementById("id_graph_3D").style.width=w_ss+'px';
													Wc_3D_globale=w_hiden;
													break;
											
						case 'id_graph_Viseur':		document.getElementById("id_graph_Viseur").style.height=h_ss+'px';
													document.getElementById("id_graph_Viseur").style.width=w_ss+'px';
													largeur_canvas_viseur=w_hiden-2*marge_X;
													break;
											
						case 'id_graph_PDC':		document.getElementById("id_graph_PDC").style.height=h_ss+'px';
													document.getElementById("id_graph_PDC").style.width=w_ss+'px';
													largeur_canvas_graph_pdc=w_hiden-marge_x_cvs_PDC-marge_x_fin_cvs_PDC;
													hauteur_canvas_graph_pdc=Math.round(largeur_canvas_graph_pdc*2/3);
													break;
											
						case 'id_graph_Histo':		document.getElementById("id_graph_Histo").style.height=h_ss+'px';
													document.getElementById("id_graph_Histo").style.width=w_ss+'px';
													
													break;
					}
					
					//2nd graph NON selectionné
					switch(document.getElementById('liste_graph_2_1').options[document.getElementById('liste_graph_2_1').selectedIndex].value){
						
						case 'id_graph_3D':			document.getElementById("id_graph_3D").style.height=h_ss+'px';
													document.getElementById("id_graph_3D").style.width=w_ss+'px';
													Wc_3D_globale=w_hiden;
													break;
											
						case 'id_graph_Viseur':		document.getElementById("id_graph_Viseur").style.height=h_ss+'px';
													document.getElementById("id_graph_Viseur").style.width=w_ss+'px';
													largeur_canvas_viseur=w_hiden-2*marge_X;
													break;
											
						case 'id_graph_PDC':		document.getElementById("id_graph_PDC").style.height=h_ss+'px';
													document.getElementById("id_graph_PDC").style.width=w_ss+'px';
													largeur_canvas_graph_pdc=w_hiden-marge_x_cvs_PDC-marge_x_fin_cvs_PDC;
													hauteur_canvas_graph_pdc=Math.round(largeur_canvas_graph_pdc*2/3);
													break;
											
						case 'id_graph_Histo':		document.getElementById("id_graph_Histo").style.height=h_ss+'px';
													document.getElementById("id_graph_Histo").style.width=w_ss+'px';
													
													break;
					}
					
					//3ième graph NON selectionné
					switch(document.getElementById('liste_graph_2_2').options[document.getElementById('liste_graph_2_2').selectedIndex].value){
						
						case 'id_graph_3D':			document.getElementById("id_graph_3D").style.height=h_ss+'px';
													document.getElementById("id_graph_3D").style.width=w_ss+'px';
													Wc_3D_globale=w_hiden;
													break;
											
						case 'id_graph_Viseur':		document.getElementById("id_graph_Viseur").style.height=h_ss+'px';
													document.getElementById("id_graph_Viseur").style.width=w_ss+'px';
													largeur_canvas_viseur=w_hiden-2*marge_X;
													break;
											
						case 'id_graph_PDC':		document.getElementById("id_graph_PDC").style.height=h_ss+'px';
													document.getElementById("id_graph_PDC").style.width=w_ss+'px';
													largeur_canvas_graph_pdc=w_hiden-marge_x_cvs_PDC-marge_x_fin_cvs_PDC;
													hauteur_canvas_graph_pdc=Math.round(largeur_canvas_graph_pdc*2/3);
													break;
											
						case 'id_graph_Histo':		document.getElementById("id_graph_Histo").style.height=h_ss+'px';
													document.getElementById("id_graph_Histo").style.width=w_ss+'px';
													
													break;
					}
				
					break;						
	
	}
	
	//Affiche les zones à afficher
	switch(Nbr_graph){

		case 1: Show(document.getElementById('liste_graph_1_1').options[document.getElementById('liste_graph_1_1').selectedIndex].value);
				break;
				
		case 2: Show(document.getElementById('liste_graph_1_1').options[document.getElementById('liste_graph_1_1').selectedIndex].value);
				Show(document.getElementById('liste_graph_1_2').options[document.getElementById('liste_graph_1_2').selectedIndex].value);
				break;	

		case 4: Show(document.getElementById('liste_graph_1_1').options[document.getElementById('liste_graph_1_1').selectedIndex].value);
				Show(document.getElementById('liste_graph_1_2').options[document.getElementById('liste_graph_1_2').selectedIndex].value);
				Show(document.getElementById('liste_graph_2_1').options[document.getElementById('liste_graph_2_1').selectedIndex].value);
				Show(document.getElementById('liste_graph_2_2').options[document.getElementById('liste_graph_2_2').selectedIndex].value);
				break;	
	}
	
	
	//MAJ des canvas
	if(flag_init==0){
	Draw3D_globale();
	DrawViseur();
	DrawGraphPDC();
	}
	
}
















//SOURIS & CANVAS VISEUR
//--VISEUR
//-dP = f(roulette)
function RouletteDistancePhotographe(delta){
delta=-0.1*delta;	//10cm par tour

var temp=1.0*d_map;

if(delta<0)
temp=temp/1.05;
else 
temp=1.05*temp;


if(temp > (focale/1000) ){
	dP+=d_map-temp;
	d_arriere_plan+=(temp-d_map);
	d_avant_plan+=(temp-d_map);
	d_map=temp;
	
	if(d_avant_plan<0)
	d_avant_plan=0;

	Maj_calc();
	DrawDistances();
	DrawViseur();
	InitPts3D_globale();
	Draw3D_globale();	
}
}


//-dX et dY = f(déplacement de la souris)
function SourisPositionPhotographe(e){


	//Déplacement de la souris
	var posX = e.clientX;
	var posY = e.clientY;
	
	var tempX=posX-posX_0;
	var tempY=posY-posY_0;
	
	//Dimensions de la scène
	tempX=tempX*largeur_avant/largeur_canvas_viseur;
	tempY=tempY*hauteur_avant/(largeur_canvas_viseur*h_capteur/l_capteur);
	
	//1px => 1cm
	if(flag_clic_viseur){
		dX+=tempX;
		dY+=tempY;
	}

	if(dY<h_capteur/2000)
	dY=h_capteur/2000;

	
	posX_0=posX;
	posY_0=posY;
	
	DrawViseur();
	InitPts3D_globale();
	Draw3D_globale();	

}


function RouletteViseur(e){
var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

if(!e){ e = window.event; }
if(e.preventDefault) { e.preventDefault(); }

RouletteDistancePhotographe(delta);	

flag_cadrage_constant=0;
//document.getElementById('id_chk_cadrage_cst').checked=false;
}



//Viseur: Roulette (chrome)
document.getElementById('id_cvs_viseur_av').addEventListener('mousewheel', function(e) {
RouletteViseur(e);
}, false);

//Viseur: Clic
document.getElementById('id_cvs_viseur_av').addEventListener('mousedown', function(e) {
flag_clic_viseur=1;
posX_0 = e.clientX;
posY_0 = e.clientY;
document.body.style.cursor = 'all-scroll';
}, false);

//Viseur: Relache clic
document.getElementById('id_cvs_viseur_av').addEventListener('mouseup', function(e) {
flag_clic_viseur=0;
document.body.style.cursor = 'all-scroll';
}, false);

//Viseur: Souris bouge
document.getElementById('id_cvs_viseur_av').addEventListener('mousemove', function(e) {
if(flag_clic_viseur)
SourisPositionPhotographe(e);
}, false);

//Viseur: Souris entre
document.getElementById('id_cvs_viseur_av').addEventListener('mouseover', function(e) {
document.body.style.cursor = 'all-scroll';
}, false);

//Viseur: Souris sort
document.getElementById('id_cvs_viseur_av').addEventListener('mouseout', function(e) {
document.body.style.cursor = 'auto';
}, false);







//CANVAS DE PDC
//--GRAPH DE PDC
//Graph pdc: Roulette
document.getElementById('id_canvas_PDC').addEventListener('mousewheel', function(e) {
	var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

	if(!e){ e = window.event; }
    if(e.preventDefault) { e.preventDefault(); }
	
	if(delta>0)
	y_reel_graph_pdc=y_reel_graph_pdc/1.1;
	else 
	y_reel_graph_pdc=1.1*y_reel_graph_pdc;

	DrawGraphPDC();
	
}, false);

//Graph pdc: Clic
document.getElementById('id_canvas_PDC').addEventListener('mousedown', function(e) {
flag_clic_illu_pdc=1;
document.body.style.cursor = 'move';
posX_0_pdc = e.clientX;
}, false);


//Graph pdc: Relache clic
document.getElementById('id_canvas_PDC').addEventListener('mouseup', function(e) {
flag_clic_illu_pdc=0;
document.body.style.cursor = 'auto';
DrawGraphPDC();	//pour MAJ de la largeur des abscisses
}, false);

//Graph pdc: bouge
document.getElementById('id_canvas_PDC').addEventListener('mousemove', function(e) {


//pour passer d'une distance en m à des px
var k_distance=largeur_canvas_graph_pdc/d_dernier_point;	//pour passer d'une distance en m à des px

//MAJ de la position des points sur l'axe
var X_av=k_distance*d_avant_plan;
var X_map=k_distance*d_map;
var X_ar=k_distance*d_arriere_plan;

//MAJ de la position de la souris
var canvas=document.getElementById('id_canvas_PDC');
var rect = canvas.getBoundingClientRect(), root = document.documentElement;
var posX = e.clientX;
var mouseX = posX - rect.left - root.scrollLeft - marge_x_cvs_PDC;

//Regarde dans qeulle zone se situe la souris
var surbrillance_temp="?";


//Pas encore cliqué: souris entre 2 zones pour mettre en surbrillance
if(flag_clic_illu_pdc==0){
	if(mouseX<(X_av+X_map)/2){
	surbrillance_temp='av';
	}
	else if(mouseX>(X_map+X_ar)/2){
	surbrillance_temp='ar';
	}
	else{
	surbrillance_temp='map';
	}
}
//Déjà cliqué: la souris peut bouger entre les 2 bornes
else{
	if(surbrillance=='av'){
		if(d_avant_plan<=d_map)
		surbrillance_temp='av';
	}
	if(surbrillance=='map'){
		if(d_avant_plan<=d_map<=d_arriere_plan)
		surbrillance_temp='map';
	}
	if(surbrillance=='ar'){
		if(d_map<=d_arriere_plan)
		surbrillance_temp='ar';
	}
}

//La souris est cliquée => modification des distances	
if(flag_clic_illu_pdc){

	//avant plan
	if(surbrillance_temp=='av'){

		d_avant_plan+=(mouseX-posX_0_pdc)/k_distance;
			
		if(d_avant_plan>d_map)
		d_avant_plan=d_map;
		
		if(d_avant_plan<0)
		d_avant_plan=0;				
		
		Maj_calc();
		DrawViseur();		
		Draw3D_globale();

		posX_0_pdc=mouseX;
	}
	//arrière plan
	if(surbrillance_temp=='ar'){

		d_arriere_plan+=(mouseX-posX_0_pdc)/k_distance;
			
		if(d_arriere_plan<d_map)
		d_arriere_plan=d_map;		
		
		posX_0_pdc=mouseX;		
		
		Maj_calc();	
		DrawViseur();
		Draw3D_globale();

		posX_0_pdc=mouseX;
	}
	//MAP
	if(surbrillance_temp=='map'){

		d_map+=(mouseX-posX_0_pdc)/k_distance;
			
		if(d_map<d_avant_plan)
		d_map=d_avant_plan;
		
		if(d_map>d_arriere_plan)
		d_map=d_arriere_plan;		
		
		posX_0_pdc=mouseX;
		
		Maj_calc();	
		DrawViseur();
		Draw3D_globale();

		posX_0_pdc=mouseX;
	}
}

surbrillance=surbrillance_temp

DrawGraphPDC();


}, false);




//Graph pdc: Sort
document.getElementById('id_canvas_PDC').addEventListener('mouseout', function(e) {
surbrillance='?';
DrawGraphPDC();
}, false);






