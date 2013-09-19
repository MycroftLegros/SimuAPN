function fleche_H(ctx,y_,x_1,x_2){
var size_f=3;
var temp;

if( x_2<x_1){
 temp=x_1;
 x_1=x_2;
 x_2=temp;
}

ctx.beginPath();
ctx.strokeStyle='#000000';
ctx.moveTo( x_1+size_f, y_-size_f);
ctx.lineTo(x_1, y_);
ctx.lineTo( x_1+size_f, y_+size_f);
ctx.lineTo(x_1, y_);
ctx.lineTo(x_2, y_);
ctx.lineTo( x_2-size_f, y_-size_f);
ctx.lineTo(x_2, y_);
ctx.lineTo( x_2-size_f, y_+size_f);
ctx.stroke();
}

function demi_fleche_H(ctx,y_,x_1,x_2){
var size_f=3;
var temp;

if( x_2<x_1){
 temp=x_1;
 x_1=x_2;
 x_2=temp;
}

ctx.beginPath();
ctx.strokeStyle='#000000';
ctx.lineTo(x_1, y_);
ctx.lineTo(x_2, y_);
ctx.lineTo( x_2-size_f, y_-size_f);
ctx.lineTo(x_2, y_);
ctx.lineTo( x_2-size_f, y_+size_f);
ctx.stroke();
}

function fleche_V(ctx,x_,y_1,y_2){
var size_f=3;
var temp;

if( y_1<y_2){
 temp=y_1;
 y_1=y_2;
 y_2=temp;
}

ctx.beginPath();
ctx.strokeStyle='#000000';
ctx.moveTo( x_-size_f, y_1-size_f);
ctx.lineTo(x_, y_1);
ctx.lineTo(x_+size_f, y_1-size_f);
ctx.lineTo(x_, y_1);
ctx.lineTo(x_, y_2);
ctx.lineTo(x_-size_f, y_2+size_f);
ctx.lineTo(x_, y_2);
ctx.lineTo(x_+size_f, y_2+size_f);

ctx.stroke();

}

function demi_fleche_V(ctx,x_,y_1,y_2){
var size_f=3;
var temp;

if( y_1<y_2){
 temp=y_1;
 y_1=y_2;
 y_2=temp;
}
ctx.beginPath();
ctx.strokeStyle='#000000';
ctx.lineTo(x_, y_1);
ctx.lineTo(x_, y_2);
ctx.lineTo(x_-size_f, y_2+size_f);
ctx.lineTo(x_, y_2);
ctx.lineTo(x_+size_f, y_2+size_f);

ctx.stroke();

}




function DrawGraphPDC(){

var cvs_graph_pdc = document.getElementById('id_canvas_PDC');
var ct_graph_pdc = cvs_graph_pdc.getContext('2d');


var temp=1.0;
var temp2=1.0;
var i=0;

cvs_graph_pdc.width  = largeur_canvas_graph_pdc+marge_x_cvs_PDC+marge_x_fin_cvs_PDC;
cvs_graph_pdc.height = hauteur_canvas_graph_pdc+marge_y_cvs_PDC;


if(flag_clic_illu_pdc==0)
d_dernier_point=1.5*d_arriere_plan;



//Fond
ct_graph_pdc.fillStyle ='#FFFFFF';
ct_graph_pdc.beginPath();
ct_graph_pdc.fillRect( 0,0, cvs_graph_pdc.width-1, cvs_graph_pdc.height-1 );


//--Axes
demi_fleche_H(ct_graph_pdc,hauteur_canvas_graph_pdc-1,marge_x_cvs_PDC,largeur_canvas_graph_pdc+marge_x_cvs_PDC-1);
demi_fleche_V(ct_graph_pdc,marge_x_cvs_PDC,hauteur_canvas_graph_pdc-1,0);

//--Regarde les extrémums et calcul les coeff de flou et distance vers pixel

var f_m=focale/1000;						//focale en m
var k_flou=hauteur_canvas_graph_pdc/y_reel_graph_pdc;		//20 pixels TBC
var k_distance=largeur_canvas_graph_pdc/d_dernier_point;	//pour passer d'une distance en m à des px


//--Trace la courbe de flou de mise au point
ct_graph_pdc.strokeStyle ='rgb('+color_pdc+')';
ct_graph_pdc.lineWidth=1;
ct_graph_pdc.beginPath();

for(i=0;i!=largeur_canvas_graph_pdc-1;i++){

	temp2=i/k_distance;
	
	//pour être sûr de placer un point à d_map
	if(temp2<d_map && ((i+1)/k_distance)>d_map && ((d_map-temp2)<=((i+1)/k_distance-d_map)))
	temp2=d_map;
	else if( i>0 && ((i-1)/k_distance)<d_map && temp2>d_map && ((d_map-temp2)>((i+1)/k_distance-d_map)))	
	temp2=d_map;
	
	
	
	//calcul du flou en m
	if(temp2==d_map)
	temp=0;
	else if(temp2<d_map)
	temp=(f_m*f_m*(d_map-temp2))/(ouverture*temp2*(d_map-f_m));
	else
	temp=(f_m*f_m*(temp2-d_map))/(ouverture*temp2*(d_map-f_m));

	//trace le point
	if(i==0)
	ct_graph_pdc.moveTo(i+marge_x_cvs_PDC,hauteur_canvas_graph_pdc-k_flou*temp);
	else
	ct_graph_pdc.lineTo(i+marge_x_cvs_PDC,hauteur_canvas_graph_pdc-k_flou*temp);
	
}
ct_graph_pdc.stroke();

//Trait au niveau du flou d'avant plan
ct_graph_pdc.fillStyle ='rgb('+avant_color+')';
ct_graph_pdc.font="12px 'Trebuchet MS'";

temp=k_distance*d_avant_plan;	//distance en px
temp2=(f_m*f_m*(d_map-d_avant_plan))/(ouverture*d_avant_plan*(d_map-f_m));	//flou en m
ct_graph_pdc.beginPath();
ct_graph_pdc.fillRect( marge_x_cvs_PDC+temp,hauteur_canvas_graph_pdc-k_flou*temp2, 1, k_flou*temp2 );
/*
if(surbrillance=='av')
ct_graph_pdc.font="14px 'Trebuchet MS'";
else
ct_graph_pdc.font="12px 'Trebuchet MS'";
*/
ct_graph_pdc.beginPath(); 
ct_graph_pdc.fillText(d_avant_plan.toFixed(2)+'m',marge_x_cvs_PDC+temp-5,hauteur_canvas_graph_pdc+10);

if(surbrillance=='av'){
ct_graph_pdc.beginPath(); 
ct_graph_pdc.arc(marge_x_cvs_PDC+temp,hauteur_canvas_graph_pdc,3,0,2*Math.PI);
ct_graph_pdc.fill(); 
}


//Distance de map
ct_graph_pdc.beginPath(); 
/*
if(surbrillance=='map')
ct_graph_pdc.font="14px 'Trebuchet MS'";
else
ct_graph_pdc.font="12px 'Trebuchet MS'";
*/
ct_graph_pdc.fillStyle ='rgb('+map_color+')';
temp=k_distance*d_map;	//distance en px
ct_graph_pdc.fillText(d_map.toFixed(2)+'m',marge_x_cvs_PDC+temp-5,hauteur_canvas_graph_pdc+20);

if(surbrillance=='map'){
ct_graph_pdc.beginPath(); 
ct_graph_pdc.arc(marge_x_cvs_PDC+temp,hauteur_canvas_graph_pdc,3,0,2*Math.PI);
ct_graph_pdc.fill(); 
}


//Trait au niveau du flou d'arrière plan
/*
if(surbrillance=='ar')
ct_graph_pdc.font="14px 'Trebuchet MS'";
else
ct_graph_pdc.font="12px 'Trebuchet MS'";
*/
ct_graph_pdc.fillStyle ='rgb('+arriere_color+')';
temp=k_distance*d_arriere_plan;	//distance en px
temp2=(f_m*f_m*(d_arriere_plan-d_map))/(ouverture*d_arriere_plan*(d_map-f_m));
ct_graph_pdc.beginPath();


ct_graph_pdc.fillRect( marge_x_cvs_PDC+temp,hauteur_canvas_graph_pdc-k_flou*temp2, 1, k_flou*temp2 );


ct_graph_pdc.beginPath(); 
ct_graph_pdc.fillText(d_arriere_plan.toFixed(2)+'m',marge_x_cvs_PDC+temp-5,hauteur_canvas_graph_pdc+30);


if(surbrillance=='ar'){
ct_graph_pdc.beginPath(); 
ct_graph_pdc.arc(marge_x_cvs_PDC+temp,hauteur_canvas_graph_pdc,3,0,2*Math.PI);
ct_graph_pdc.fill(); 
}


ct_graph_pdc.font="12px 'Trebuchet MS'";

//Rectangle pour marquer la pdC
ct_graph_pdc.fillStyle ='rgba('+cdc_color+',0.15)';
temp=k_distance*pdc_pres;	//distance en px
temp2=k_distance*pdc_loin;	//distance en px

if(temp2>largeur_canvas_graph_pdc)
temp2=largeur_canvas_graph_pdc;

ct_graph_pdc.beginPath();
ct_graph_pdc.fillRect( marge_x_cvs_PDC+temp,0,temp2-temp,hauteur_canvas_graph_pdc);


//Cdc
temp=k_flou*cdc;

if(temp<hauteur_canvas_graph_pdc){

	ct_graph_pdc.fillStyle ='rgb('+cdc_color+')';
	ct_graph_pdc.beginPath(); 
	ct_graph_pdc.fillText('cdc',7,hauteur_canvas_graph_pdc-temp+4);
	
	ct_graph_pdc.fillStyle ='rgba('+cdc_color+',0.35)';
	ct_graph_pdc.fillRect( marge_x_cvs_PDC,hauteur_canvas_graph_pdc-temp,largeur_canvas_graph_pdc,1);
	

	
}

//Echelle: 1,10 ou 100px
if(y_reel_graph_pdc>100*taille_pixel)
temp=100;
else if(y_reel_graph_pdc>10*taille_pixel)
temp=10;
else 
temp=1;

hauteur_canvas_graph_pdc

temp2=k_flou*temp*taille_pixel;

//fleche_V(ct_graph_pdc,largeur_canvas_graph_pdc+marge_x_cvs_PDC+5,(hauteur_canvas_graph_pdc+temp2)/2,(hauteur_canvas_graph_pdc-temp2)/2)
fleche_V(ct_graph_pdc,largeur_canvas_graph_pdc+marge_x_cvs_PDC+5,hauteur_canvas_graph_pdc,hauteur_canvas_graph_pdc-temp2)

ct_graph_pdc.fillStyle="#333333";
ct_graph_pdc.beginPath(); 
ct_graph_pdc.fillText(temp+'px',largeur_canvas_graph_pdc+marge_x_cvs_PDC+10,hauteur_canvas_graph_pdc-temp2/2+3);






}