//Initialise les dataURL
function initImageData(){

//Images temporaires
var img_temp_chat= document.createElement("IMG");
var img_temp_parapluie= document.createElement("IMG");
var img_temp_bigben= document.createElement("IMG");
var img_temp_arbre= document.createElement("IMG");

//CHAT
img_temp_chat.crossOrigin = "anonymous";
img_temp_chat.src ="silhouettes/Chat.png";

img_temp_chat.onload =  function(){

	//- 1 - Met l'image dans le canvas
	var cvs = document.getElementById('id_cvs_viseur_av');
	var ct = cvs.getContext('2d');
	var w=img_temp_chat.width;
	var h=img_temp_chat.height;
	cvs.width  = w;
	cvs.height = h;

	ct.drawImage(img_temp_chat,0,0,w,h);
	
	var RVB_av=avant_color.split(',');
	var RVB_ar=arriere_color.split(',');
	var RVB_map=map_color.split(',');
	//- 2 - Récupère l'image dans un imageData
	var imageData_av = ct.getImageData(0, 0, w, h);
	var imageData_ar = ct.getImageData(0, 0, w, h);
	var imageData_map = ct.getImageData(0, 0, w, h);

	// - 3 - Change la couleur de l'image data
	for (var i=0;i<imageData_av.data.length;i+=4){
		  // is this pixel the old rgb?
		  if(imageData_av.data[i]==0 && imageData_av.data[i+1]==0 && imageData_av.data[i+2]==0 && imageData_av.data[i+3]!=1){
			  // change to your new rgb
			  imageData_av.data[i]=RVB_av[0];
			  imageData_av.data[i+1]=RVB_av[1];
			  imageData_av.data[i+2]=RVB_av[2];		
			  
			  imageData_ar.data[i]=RVB_ar[0];
			  imageData_ar.data[i+1]=RVB_ar[1];
			  imageData_ar.data[i+2]=RVB_ar[2];		
			  
			  imageData_map.data[i]=RVB_map[0];
			  imageData_map.data[i+1]=RVB_map[1];
			  imageData_map.data[i+2]=RVB_map[2];				  
		  }
	  }

	ct.putImageData(imageData_av,0,0);
	dataURL_chat_av = cvs.toDataURL("image/png");
	
	ct.putImageData(imageData_ar,0,0);
	dataURL_chat_ar = cvs.toDataURL("image/png");
	
	ct.putImageData(imageData_map,0,0);
	dataURL_chat_map = cvs.toDataURL("image/png");

	
	//BIG BEN
	img_temp_bigben.crossOrigin = "anonymous";
	img_temp_bigben.src ="silhouettes/London.png";
};


img_temp_bigben.onload =  function(){

	//- 1 - Met l'image dans le canvas
	var cvs = document.getElementById('id_cvs_viseur_ar');
	var ct = cvs.getContext('2d');
	var w=img_temp_bigben.width;
	var h=img_temp_bigben.height;
	cvs.width  = w;
	cvs.height = h;
	
	var RVB=arriere_color.split(',');
	
	ct.drawImage(img_temp_bigben,0,0,w,h);

	var RVB_av=avant_color.split(',');
	var RVB_ar=arriere_color.split(',');
	var RVB_map=map_color.split(',');
	//- 2 - Récupère l'image dans un imageData
	var imageData_av = ct.getImageData(0, 0, w, h);
	var imageData_ar = ct.getImageData(0, 0, w, h);
	var imageData_map = ct.getImageData(0, 0, w, h);

	// - 3 - Change la couleur de l'image data
	for (var i=0;i<imageData_av.data.length;i+=4){
		  // is this pixel the old rgb?
		  if(imageData_av.data[i]==0 && imageData_av.data[i+1]==0 && imageData_av.data[i+2]==0 && imageData_av.data[i+3]!=1){
			  // change to your new rgb
			  imageData_av.data[i]=RVB_av[0];
			  imageData_av.data[i+1]=RVB_av[1];
			  imageData_av.data[i+2]=RVB_av[2];		
			  
			  imageData_ar.data[i]=RVB_ar[0];
			  imageData_ar.data[i+1]=RVB_ar[1];
			  imageData_ar.data[i+2]=RVB_ar[2];		
			  
			  imageData_map.data[i]=RVB_map[0];
			  imageData_map.data[i+1]=RVB_map[1];
			  imageData_map.data[i+2]=RVB_map[2];				  
		  }
	  }

	ct.putImageData(imageData_av,0,0);
	dataURL_bigben_av = cvs.toDataURL("image/png");
	
	ct.putImageData(imageData_ar,0,0);
	dataURL_bigben_ar = cvs.toDataURL("image/png");
	
	ct.putImageData(imageData_map,0,0);
	dataURL_bigben_map = cvs.toDataURL("image/png");
	
	img_temp_parapluie.crossOrigin = "anonymous";
	img_temp_parapluie.src ="silhouettes/Femme-parapluie.png";
	
	
};


img_temp_parapluie.onload =  function(){

	//- 1 - Met l'image dans le canvas
	var cvs = document.getElementById('id_cvs_viseur_map');
	var ct = cvs.getContext('2d');
	var w=img_temp_parapluie.width;
	var h=img_temp_parapluie.height;
	cvs.width  = w;
	cvs.height = h;
	
	var RVB=map_color.split(',');
	
	ct.drawImage(img_temp_parapluie,0,0,w,h);

	var RVB_av=avant_color.split(',');
	var RVB_ar=arriere_color.split(',');
	var RVB_map=map_color.split(',');
	//- 2 - Récupère l'image dans un imageData
	var imageData_av = ct.getImageData(0, 0, w, h);
	var imageData_ar = ct.getImageData(0, 0, w, h);
	var imageData_map = ct.getImageData(0, 0, w, h);

	// - 3 - Change la couleur de l'image data
	for (var i=0;i<imageData_av.data.length;i+=4){
		  // is this pixel the old rgb?
		  if(imageData_av.data[i]==0 && imageData_av.data[i+1]==0 && imageData_av.data[i+2]==0 && imageData_av.data[i+3]!=1){
			  // change to your new rgb
			  imageData_av.data[i]=RVB_av[0];
			  imageData_av.data[i+1]=RVB_av[1];
			  imageData_av.data[i+2]=RVB_av[2];		
			  
			  imageData_ar.data[i]=RVB_ar[0];
			  imageData_ar.data[i+1]=RVB_ar[1];
			  imageData_ar.data[i+2]=RVB_ar[2];		
			  
			  imageData_map.data[i]=RVB_map[0];
			  imageData_map.data[i+1]=RVB_map[1];
			  imageData_map.data[i+2]=RVB_map[2];				  
		  }
	  }

	ct.putImageData(imageData_av,0,0);
	dataURL_parapluie_av = cvs.toDataURL("image/png");
	
	ct.putImageData(imageData_ar,0,0);
	dataURL_parapluie_ar = cvs.toDataURL("image/png");
	
	ct.putImageData(imageData_map,0,0);
	dataURL_parapluie_map = cvs.toDataURL("image/png");
		
	//ARBRE
	img_temp_arbre.crossOrigin = "anonymous";
	img_temp_arbre.src ="silhouettes/arbre.png";
			
};


img_temp_arbre.onload =  function(){

	//- 1 - Met l'image dans le canvas
	var cvs = document.getElementById('id_cvs_viseur_av');
	var ct = cvs.getContext('2d');
	var w=img_temp_arbre.width;
	var h=img_temp_arbre.height;
	cvs.width  = w;
	cvs.height = h;

	ct.drawImage(img_temp_arbre,0,0,w,h);
	
	var RVB_av=avant_color.split(',');
	var RVB_ar=arriere_color.split(',');
	var RVB_map=map_color.split(',');
	//- 2 - Récupère l'image dans un imageData
	var imageData_av = ct.getImageData(0, 0, w, h);
	var imageData_ar = ct.getImageData(0, 0, w, h);
	var imageData_map = ct.getImageData(0, 0, w, h);

	// - 3 - Change la couleur de l'image data
	for (var i=0;i<imageData_av.data.length;i+=4){
		  // is this pixel the old rgb?
		  if(imageData_av.data[i]==0 && imageData_av.data[i+1]==0 && imageData_av.data[i+2]==0 && imageData_av.data[i+3]!=1){
			  // change to your new rgb
			  imageData_av.data[i]=RVB_av[0];
			  imageData_av.data[i+1]=RVB_av[1];
			  imageData_av.data[i+2]=RVB_av[2];		
			  
			  imageData_ar.data[i]=RVB_ar[0];
			  imageData_ar.data[i+1]=RVB_ar[1];
			  imageData_ar.data[i+2]=RVB_ar[2];		
			  
			  imageData_map.data[i]=RVB_map[0];
			  imageData_map.data[i+1]=RVB_map[1];
			  imageData_map.data[i+2]=RVB_map[2];				  
		  }
	  }

	ct.putImageData(imageData_av,0,0);
	dataURL_arbre_av = cvs.toDataURL("image/png");
	
	ct.putImageData(imageData_ar,0,0);
	dataURL_arbre_ar = cvs.toDataURL("image/png");
	
	ct.putImageData(imageData_map,0,0);
	dataURL_arbre_map = cvs.toDataURL("image/png");

	
	MAJ_illus();
};

}

//Maj des dataURL des img av,ar et map
function MAJ_illus(){

switch(cpt_choix_illu_av){

	case 1: img_av.src = dataURL_chat_av;
			w_img_av=150;
			h_img_av=300;
			l_img_av=0.26469;
			offset_y_av=0.0794;
			break;
	
	
	case 2: img_av.src = dataURL_parapluie_av;
			w_img_av=133;		
			h_img_av=300;		
			l_img_av=0.8202;	
			offset_y_av=0.0;
			break;
							
	case 3: img_av.src = dataURL_bigben_av;			
			w_img_av=300;
			h_img_av=197;
			l_img_av=147.71;
			offset_y_av=0;
			break;
			
	case 4: img_av.src = dataURL_arbre_av;			
			w_img_av=262;
			h_img_av=300;
			l_img_av=3.49;
			offset_y_av=0;
			break;
}

img_av.onload =  function(){

switch(cpt_choix_illu_ar){
	case 1: img_ar.src = dataURL_chat_ar;		
			w_img_ar=150;
			h_img_ar=300;
			l_img_ar=0.26469;
			offset_y_ar=0.0794;
			break;
							
	case 2: img_ar.src = dataURL_parapluie_ar;
			w_img_ar=133;		
			h_img_ar=300;		
			l_img_ar=0.8202;	
			offset_y_ar=0.0;
			break;
							
	case 3: img_ar.src = dataURL_bigben_ar;		
			w_img_ar=300;
			h_img_ar=197;
			l_img_ar=147.71;
			offset_y_ar=0;
			break;
			
	case 4: img_ar.src = dataURL_arbre_ar;			
			w_img_ar=262;
			h_img_ar=300;
			l_img_ar=3.49;
			offset_y_ar=0;
			break;
}
};


img_ar.onload =  function(){

switch(cpt_choix_illu_map){
	case 1: img_map.src = dataURL_chat_map;		
			w_img_map=150;
			h_img_map=300;
			l_img_map=0.26469;
			offset_y_map=0.0794;
			break;
	
	case 2: img_map.src = dataURL_parapluie_map;
			w_img_map=133;		
			h_img_map=300;		
			l_img_map=0.8202;	
			offset_y_map=0.0;
			break;
							
	case 3: img_map.src = dataURL_bigben_map;	
			w_img_map=300;
			h_img_map=197;
			l_img_map=147.71;
			offset_y_map=0;
			break;
			
	case 4: img_map.src = dataURL_arbre_map;			
			w_img_map=262;
			h_img_map=300;
			l_img_map=3.49;
			offset_y_map=0;
			break;			

}
};

img_map.onload =  function(){

if(flag_init){
DrawViseur();
Draw3D_globale();
flag_init=0;
}

};

}


function MAJ_illu_map(){

switch(cpt_choix_illu_map){
	case 1: img_map.src = dataURL_chat_map;		
			w_img_map=150;
			h_img_map=300;
			l_img_map=0.26469;
			offset_y_map=0.0794;
			break;
	
	case 2: img_map.src = dataURL_parapluie_map;
			w_img_map=133;		
			h_img_map=300;		
			l_img_map=0.8202;	
			offset_y_map=0.0;
			break;
							
	case 3: img_map.src = dataURL_bigben_map;	
			dataURL_bigben_ar;		
			w_img_map=300;
			h_img_map=197;
			l_img_map=147.71;
			offset_y_map=0;
			break;
			
	case 4: img_map.src = dataURL_arbre_map;			
			w_img_map=262;
			h_img_map=300;
			l_img_map=3.49;
			offset_y_map=0;
			break;				

}

img_map.onload =  function(){
DrawViseur();
};

}

function MAJ_illu_ar(){

switch(cpt_choix_illu_ar){
	case 1: img_ar.src = dataURL_chat_ar;		
			w_img_ar=150;
			h_img_ar=300;
			l_img_ar=0.26469;
			offset_y_ar=0.0794;
			break;
							
	case 2: img_ar.src = dataURL_parapluie_ar;
			w_img_ar=133;		
			h_img_ar=300;		
			l_img_ar=0.8202;	
			offset_y_ar=0.0;
			break;
							
	case 3: img_ar.src = dataURL_bigben_ar;		
			w_img_ar=300;
			h_img_ar=197;
			l_img_ar=147.71;
			offset_y_ar=0;
			break;
			
	case 4: img_ar.src = dataURL_arbre_ar;			
			w_img_ar=262;
			h_img_ar=300;
			l_img_ar=3.49;
			offset_y_ar=0;
			break;			
}

img_ar.onload =  function(){
DrawViseur();
};

}

function MAJ_illu_av(){

switch(cpt_choix_illu_av){

	case 1: img_av.src = dataURL_chat_av;
			w_img_av=150;
			h_img_av=300;
			l_img_av=0.26469;
			offset_y_av=0.0794;
			break;	
	
	case 2: img_av.src = dataURL_parapluie_av;
			w_img_av=133;		
			h_img_av=300;		
			l_img_av=0.8202;	
			offset_y_av=0.0;
			break;
							
	case 3: img_av.src = dataURL_bigben_av;			
			w_img_av=300;
			h_img_av=197;
			l_img_av=147.71;
			offset_y_av=0;
			break;
			
	case 4: img_av.src = dataURL_arbre_av;			
			w_img_av=262;
			h_img_av=300;
			l_img_av=3.49;
			offset_y_av=0;
			break;			
}

img_av.onload =  function(){
DrawViseur();
};

}


//Dessine le viseur
function DrawViseur(){

//-OUVERTURE DES CANVAS
//Hauteur du canvas dépend de la largeur et du format du capteur
var hauteur_canvas_viseur=h_capteur*largeur_canvas_viseur/l_capteur;

//Dimensions des canvas
var cvs_scene_cadre = document.getElementById('id_cvs_viseur_cadre');
var ct_scene_cadre = cvs_scene_cadre.getContext('2d');
cvs_scene_cadre.width  = largeur_canvas_viseur;
cvs_scene_cadre.height = hauteur_canvas_viseur;

ct_scene_cadre.fillStyle="#FFFFFF";
ct_scene_cadre.fillRect( 0,0, largeur_canvas_viseur, hauteur_canvas_viseur );

var cvs_scene_av = document.getElementById('id_cvs_viseur_av');
var ct_scene_av = cvs_scene_av.getContext('2d');
cvs_scene_av.width  = largeur_canvas_viseur;
cvs_scene_av.height = hauteur_canvas_viseur;

var cvs_scene_map = document.getElementById('id_cvs_viseur_map');
var ct_scene_map = cvs_scene_map.getContext('2d');
cvs_scene_map.width  = largeur_canvas_viseur;
cvs_scene_map.height = hauteur_canvas_viseur;

var cvs_scene_ar = document.getElementById('id_cvs_viseur_ar');
var ct_scene_ar = cvs_scene_ar.getContext('2d');
cvs_scene_ar.width  = largeur_canvas_viseur;
cvs_scene_ar.height = hauteur_canvas_viseur;

//--VISEUR
var marge_x_viseur=10;

document.getElementById('id_cvs_viseur_cadre').style.cssText='position: absolute; left: '+marge_x_viseur+'px; top: '+marge_Y+'px; z-index: 2;'; 
document.getElementById('id_cvs_viseur_av').style.cssText='position: absolute; left: '+marge_x_viseur+'px; top: '+marge_Y+'px; z-index: 5;'; 
document.getElementById('id_cvs_viseur_map').style.cssText='position: absolute; left: '+marge_x_viseur+'px; top: '+marge_Y+'px; z-index: 4;'; 
document.getElementById('id_cvs_viseur_ar').style.cssText='position: absolute; left: '+marge_x_viseur+'px; top: '+marge_Y+'px; z-index: 3;'; 
marge_x_viseur-=marge_X;
document.getElementById('id_cvs_viseur_viseur').style.cssText='position: absolute; left: '+marge_x_viseur+'px; top: 0px; z-index: 1;'; 
marge_x_viseur+=marge_X;

var cvs_scene_viseur = document.getElementById('id_cvs_viseur_viseur');
var ct_scene_viseur = cvs_scene_viseur.getContext('2d');

var W_viseur=largeur_canvas_viseur+2*marge_X;
var H_viseur=hauteur_canvas_viseur+marge_Y+marge_Y_bas;
cvs_scene_viseur.width  = W_viseur;
cvs_scene_viseur.height = H_viseur;


ct_scene_viseur.fillStyle ='#000000';
ct_scene_viseur.fillRect( 0,0, W_viseur-1, H_viseur-1 );


//--INDICATIONS SOUS LE VISEUR
var y_text=H_viseur-0.5*marge_Y_bas+5;

ct_scene_viseur.font="12px 'Trebuchet MS'";
ct_scene_viseur.fillStyle="#ffffff";
ct_scene_viseur.beginPath(); 
//-vitesse
temp=0.083333*W_viseur;
ct_scene_viseur.fillText(vitesse_string,temp,y_text);
//-ouverture
temp=0.25*W_viseur;
ct_scene_viseur.fillText('f/'+ouverture,temp,y_text);
//-iso
temp=0.75*W_viseur;
ct_scene_viseur.fillText('ISO'+ISO,temp,y_text);
//-exposition
temp=0.5*W_viseur;
var temp2=expo;
if(temp2!=0)
temp2=temp2.toFixed(1);
if(temp2>0)
temp2='+'+temp2;


//-Curseur d'exposition
var X0=(W_viseur-1)/2;
var Y0=y_text-5;

var c=3;	//côté d'un carré de l'indicateur d'EV
var e=1;	//espace entre 2 indications


ct_scene_viseur.beginPath(); 

//trait en haut
ct_scene_viseur.fillRect( X0,Y0-c-e, c, 3*c+e );

for(i=1;i!=3;i++){
ct_scene_viseur.fillRect( X0+i*3*(c+e),Y0-c-e, c, c );
ct_scene_viseur.fillRect( X0-i*3*(c+e),Y0-c-e, c, c );
}

//ct_scene_viseur.beginPath(); 
ct_scene_viseur.fillText('-',X0-6*(c+e)-4,Y0-2*c);
ct_scene_viseur.fillText(temp2+'EV',X0-10,Y0-2*c-2);
ct_scene_viseur.fillText('+',X0+7*(c+e),Y0-2*c);

//traits dynamiques
var ii=0;

for(i=Math.abs(expo);i>=0 & ii<7;i-=0.333){
	if(expo>0)
	ct_scene_viseur.fillRect( X0+ii*(c+e),Y0, c, 2*c );
	else
	ct_scene_viseur.fillRect( X0-ii*(c+e),Y0, c, 2*c );
ii++;
}

if(expo>2){
	ct_scene_viseur.moveTo( X0+7*(c+e), Y0);
	ct_scene_viseur.lineTo( X0+7*(c+e)+1.732*c, Y0+c);
	ct_scene_viseur.lineTo( X0+7*(c+e), Y0+2*c);
	ct_scene_viseur.lineTo( X0+7*(c+e), Y0);
	ct_scene_viseur.fill();
}
if(expo<-2){
	ct_scene_viseur.moveTo( X0-6*(c+e), Y0);
	ct_scene_viseur.lineTo( X0-6*(c+e)-1.732*c, Y0+c);
	ct_scene_viseur.lineTo( X0-6*(c+e), Y0+2*c);
	ct_scene_viseur.lineTo( X0-6*(c+e), Y0);
	ct_scene_viseur.fill();
}

var temp=1.0;

var Wc=largeur_canvas_viseur;
var Hc=hauteur_canvas_viseur;

var Xm=(Wc-1)/2;
var Ym=(Hc-1)/2;

var d0=focale/1000+dY*Math.tan( (Math.PI - (angle_vert*2*Math.PI/360.0))/2);	//distance de la scène au bas du cadre
var l0=2*d0*Math.tan(angle_horiz*Math.PI/360.0);							//largeur de la scène au niveau du cadre


//--GRILLE DE PERSPECTIVE
//Couleur de fond
ct_scene_cadre.fillStyle =color_fond_perspective;
ct_scene_cadre.beginPath();
ct_scene_cadre.fillRect( 0,Ym, largeur_canvas_viseur, hauteur_canvas_viseur/2 );

//Couleur des lignes
ct_scene_cadre.strokeStyle =color_grille_perspective;
ct_scene_cadre.lineWidth=1;

//-Lignes de fuite
var dg=1.0*pas_perspective;	
temp=(Hc/2)*Math.tan(0.99*Math.PI/2);	//ecart en X à l'angle final
var Xi=0;
var flag=0;
i=0;
while(flag!=3){
	//Trait vers la droite
	if(dY>=0)
	Xi=Xm+i*dg*Wc/l0+dX*Wc/l0;
	else
	Xi=Xm+i*dg*Wc/l0-dX*Wc/l0	;
	
	//ct_scene_cadre.beginPath();
	ct_scene_cadre.moveTo(Xm,Ym);
	if(dY>=0)
	ct_scene_cadre.lineTo(Xi,Hc-1);
	else
	ct_scene_cadre.lineTo(Xi,0);
	ct_scene_cadre.stroke();
	
	if(Math.abs(Xm-Xi)>=temp)
	flag|=0x01;
	
	//Trait vers la gauche
	if(dY>=0)
	Xi=Xm-i*dg*Wc/l0+dX*Wc/l0;
	else
	Xi=Xm-i*dg*Wc/l0-dX*Wc/l0;
	
	ct_scene_cadre.beginPath();
	ct_scene_cadre.moveTo(Xm,Ym);
	if(dY>=0)
	ct_scene_cadre.lineTo(Xi,Hc-1);
	else
	ct_scene_cadre.lineTo(Xi,0);
	ct_scene_cadre.stroke();
	
	if(Math.abs(Xm-Xi)>=temp)
	flag|=0x02;
	
i++;
}

//-Traits horizontaux
var Yi=0;
var di=dg*Math.ceil((d0+dP)/dg)	//multiple entier de dg supérieur à d0
ct_scene_cadre.beginPath();
var Ylast=-1;
while(Math.abs(Yi-Ym)>3){	//laisse 3 px entre l'horizon et le dernier trait
	temp=2*(di-dP)*Math.tan(angle_vert*Math.PI/360.0);	
	Yi=Ym+dY*Hc/temp;	
	
	if(Math.abs(Ylast-Yi)>0.5){
	ct_scene_cadre.moveTo(0,Yi);
	ct_scene_cadre.lineTo(Wc-1,Yi);
	Ylast=Yi;
	}
	else{
	Yi=Ym;	
	}
	
di+=dg;
}
ct_scene_cadre.stroke();


ct_scene_cadre.fillStyle =color_grille_perspective;
ct_scene_cadre.beginPath();
ct_scene_cadre.fillRect( 0,Ym, largeur_canvas_viseur, Ylast-Ym);




//--MAP, avant plan et arrière plan
var X=1.0;	var Y=1.0;
var l=1.0;
var h=1.0;
var c=1.0;
var f=1.0;

var bright=0;

if(dynamique_capteur==0){
	if(expo>0)
	bright=9999;
	if(expo<0)
	bright=0;
}
else{
var cal_temp=expo*8.0/dynamique_capteur;
bright=Math.pow(2,cal_temp);
}


if(flag_draw_expo==0)
bright=1;


//-PDC
temp=2*pdc_pres*Math.tan(angle_vert*Math.PI/360.0);	
Yav=Ym+dY*Hc/temp;
temp=2*pdc_loin*Math.tan(angle_vert*Math.PI/360.0);	
Yar=Ym+dY*Hc/temp;
ct_scene_cadre.strokeStyle ='rgba('+rayon_color+',0.5)';
ct_scene_cadre.fillStyle ='rgba('+rayon_color+',0.5)';
ct_scene_cadre.beginPath();
ct_scene_cadre.moveTo(0,Yav);
ct_scene_cadre.lineTo(0,Yar);
ct_scene_cadre.lineTo(largeur_canvas_viseur-1,Yar);
ct_scene_cadre.lineTo(largeur_canvas_viseur-1,Yav);
ct_scene_cadre.lineTo(0,Yav);
ct_scene_cadre.stroke();
ct_scene_cadre.fill();






//-MAP
l=2*d_map*Math.tan(angle_horiz*Math.PI/360.0);
h=2*d_map*Math.tan(angle_vert*Math.PI/360.0);
X=Xm+dX*Wc/l;
Y=Ym+dY*Hc/h;

var w_img=w_img_map;		
var h_img=h_img_map;		
var l_img=l_img_map;		
var offset_y=offset_y_map;

var k=Wc/l;	//px.m-1
var w=k*l_img;
var h=k*l_img*h_img/w_img;

X-=w/2;
Y-= (l_img*h_img/w_img-offset_y)*k;



if(Navigateur=="Chrome" || Navigateur=="Safari" || Navigateur=="Opera"){
	if(bright!=1)
	cvs_scene_map.style.webkitFilter = 'brightness('+bright+')';
	else
	cvs_scene_map.style.webkitFilter = '';
}
if(Navigateur=="FireFox"){
	if(bright!=1)
	document.getElementById('id_cvs_viseur_map').style.cssText='position: absolute; left: '+marge_x_viseur+'px; top: '+marge_Y+'px; z-index: 4; filter: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'filtre_map\'><feComponentTransfer><feFuncR type=\'linear\' slope=\''+bright+'\'/><feFuncG type=\'linear\' slope=\''+bright+'\'/><feFuncB type=\'linear\' slope=\''+bright+'\'/></feComponentTransfer></filter></svg>#filtre_map");'; 
	else
	document.getElementById('id_cvs_viseur_map').style.cssText='position: absolute; left: '+marge_x_viseur+'px; top: '+marge_Y+'px; z-index: 4; '; 
}


ct_scene_map.drawImage(img_map,X,Y,w,h);

//-Arrière

var blur_min=0.1;
var blur_max=100;

if(d_arriere_plan!=0){
	l=2*d_arriere_plan*Math.tan(angle_horiz*Math.PI/360.0);
	h=2*d_arriere_plan*Math.tan(angle_vert*Math.PI/360.0);
	X=Xm+dX*Wc/l+dX_img_ar*Wc/l;
	Y=Ym+dY*Hc/h;

	w_img=w_img_ar;		
	h_img=h_img_ar;		
	l_img=l_img_ar;		
	offset_y=offset_y_ar;

	k=Wc/l;	//px.m-1
	w=k*l_img;
	h=k*l_img*h_img/w_img;

	X-=w/2;
	Y-= (l_img*h_img/w_img-offset_y)*k;



	f=flou_arriere*Wc/(l_capteur/1000.0);
	if(f>blur_max)
	f=blur_max;
	if(f<blur_min)
	f=0;
	
	if(flag_draw_flou==0)
	f=0;


	if(Navigateur=="Chrome" || Navigateur=="Opera" || Navigateur=="Safari"){
		if(bright!=1 && f!=0)
		cvs_scene_ar.style.webkitFilter = 'brightness('+bright+')blur('+f+'px)';
		else if(bright!=1 && f==0)
		cvs_scene_ar.style.webkitFilter = 'brightness('+bright+')';
		else if(bright==1 && f!=0)
		cvs_scene_ar.style.webkitFilter = 'blur('+f+'px)';
		else
		cvs_scene_ar.style.webkitFilter = '';
	}
	if(Navigateur=="FireFox" ){
		if(bright!=1 && f!=0)
		document.getElementById('id_cvs_viseur_ar').style.cssText='position: absolute; left: '+marge_x_viseur+'px; top: '+marge_Y+'px; z-index: 3; filter: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'filtre_av\'><feGaussianBlur stdDeviation = \''+f+'\'/><feComponentTransfer><feFuncR type=\'linear\' slope=\''+bright+'\'/><feFuncG type=\'linear\' slope=\''+bright+'\'/><feFuncB type=\'linear\' slope=\''+bright+'\'/></feComponentTransfer></filter></svg>#filtre_av");'; 
		else if(bright!=1 && f==0)
		document.getElementById('id_cvs_viseur_ar').style.cssText='position: absolute; left: '+marge_x_viseur+'px; top: '+marge_Y+'px; z-index: 3; filter: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'filtre_av\'><feComponentTransfer><feFuncR type=\'linear\' slope=\''+bright+'\'/><feFuncG type=\'linear\' slope=\''+bright+'\'/><feFuncB type=\'linear\' slope=\''+bright+'\'/></feComponentTransfer></filter></svg>#filtre_av");'; 
		else if(bright==1 && f!=0)
		document.getElementById('id_cvs_viseur_ar').style.cssText='position: absolute; left: '+marge_x_viseur+'px; top: '+marge_Y+'px; z-index: 3; filter: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'filtre_av\'><feGaussianBlur stdDeviation = \''+f+'\'/></filter></svg>#filtre_av");'; 
	}

	ct_scene_ar.drawImage(img_ar,X,Y,w,h);
}

//-Avant
if(d_avant_plan!=0){
	l=2*d_avant_plan*Math.tan(angle_horiz*Math.PI/360.0);
	h=2*d_avant_plan*Math.tan(angle_vert*Math.PI/360.0);
	X=Xm+dX*Wc/l+dX_img_av*Wc/l;
	Y=Ym+dY*Hc/h;

	w_img=w_img_av;		
	h_img=h_img_av;		
	l_img=l_img_av;		
	offset_y=offset_y_av;

	var k=Wc/l;	//px.m-1
	var w=k*l_img;
	var h=k*l_img*h_img/w_img;

	X-=w/2;
	Y-= (l_img*h_img/w_img-offset_y)*k;


	f=flou_avant*Wc/(l_capteur/1000.0);
	if(f>blur_max)
	f=blur_max;
	if(f<blur_min)
	f=0;
	
	if(flag_draw_flou==0)
	f=0;


	//Flou et luminosité
	if(Navigateur=="Chrome" || Navigateur=="Opera" || Navigateur=="Safari"){
		if(bright!=1 && f!=0)
		cvs_scene_av.style.webkitFilter = 'brightness('+bright+')blur('+f+'px)';
		else if(bright!=1 && f==0)
		cvs_scene_av.style.webkitFilter = 'brightness('+bright+')';
		else if(bright==1 && f!=0)
		cvs_scene_av.style.webkitFilter = 'blur('+f+'px)';
		else
		cvs_scene_av.style.webkitFilter = '';
	}
	if(Navigateur=="FireFox" ){
		if(bright!=1 && f!=0)
		document.getElementById('id_cvs_viseur_av').style.cssText='position: absolute; left: '+marge_x_viseur+'px; top: '+marge_Y+'px; z-index: 5; filter: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'filtre_av\'><feGaussianBlur stdDeviation = \''+f+'\'/><feComponentTransfer><feFuncR type=\'linear\' slope=\''+bright+'\'/><feFuncG type=\'linear\' slope=\''+bright+'\'/><feFuncB type=\'linear\' slope=\''+bright+'\'/></feComponentTransfer></filter></svg>#filtre_av");'; 
		else if(bright!=1 && f==0)
		document.getElementById('id_cvs_viseur_av').style.cssText='position: absolute; left: '+marge_x_viseur+'px; top: '+marge_Y+'px; z-index: 5; filter: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'filtre_av\'><feComponentTransfer><feFuncR type=\'linear\' slope=\''+bright+'\'/><feFuncG type=\'linear\' slope=\''+bright+'\'/><feFuncB type=\'linear\' slope=\''+bright+'\'/></feComponentTransfer></filter></svg>#filtre_av");'; 
		else if(bright==1 && f!=0)
		document.getElementById('id_cvs_viseur_av').style.cssText='position: absolute; left: '+marge_x_viseur+'px; top: '+marge_Y+'px; z-index: 5; filter: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'filtre_av\'><feGaussianBlur stdDeviation = \''+f+'\'/></filter></svg>#filtre_av");'; 
	}


	ct_scene_av.drawImage(img_av,X,Y,w,h);
}

//dessine le cadre + fond
ct_scene_cadre.fillStyle ='#000000';
ct_scene_cadre.beginPath();
ct_scene_cadre.fillRect( 0,0, largeur_canvas_viseur, 1 );
ct_scene_cadre.fillRect( 0,hauteur_canvas_viseur-1, largeur_canvas_viseur, 1 );
ct_scene_cadre.fillRect( 0,0, 1, hauteur_canvas_viseur );
ct_scene_cadre.fillRect( largeur_canvas_viseur-1,0, 1, hauteur_canvas_viseur );


if(Navigateur=="Chrome" || Navigateur=="Safari" || Navigateur=="Opera"){
	if(bright!=1)
	cvs_scene_cadre.style.webkitFilter = 'brightness('+bright+')';
	else
	cvs_scene_cadre.style.webkitFilter = '';
}
if(Navigateur=="FireFox"){
	if(bright!=1)
	document.getElementById('id_cvs_viseur_cadre').style.cssText='position: absolute; left: '+marge_x_viseur+'px; top: '+marge_Y+'px; z-index: 2; filter: url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\'><filter id=\'filtre_map\'><feComponentTransfer><feFuncR type=\'linear\' slope=\''+bright+'\'/><feFuncG type=\'linear\' slope=\''+bright+'\'/><feFuncB type=\'linear\' slope=\''+bright+'\'/></feComponentTransfer></filter></svg>#filtre_map");'; 
	else
	document.getElementById('id_cvs_viseur_cadre').style.cssText='position: absolute; left: '+marge_x_viseur+'px; top: '+marge_Y+'px; z-index: 2;'; 
}


}
