//-Dessine le canvas
function DrawDistances(){

var cvs_distances = document.getElementById('id_canvas_distances');
var ct_distances = cvs_distances.getContext('2d');

var marge_y=30;
var temp=1.0;
var temp2=1.0;
var i=0;

cvs_distances.width  = largeur_canvas_distances+2*marge_x_distance;
cvs_distances.height = hauteur_canvas_distances;

var h_axe=20;

if(flag_clic_distance==0)
d_dernier_point=1.5*d_arriere_plan;

//--RAZ
ct_distances.fillStyle ='#FFFFFF';
ct_distances.strokeStyle ='#FFFFFF';
ct_distances.beginPath();
ct_distances.fillRect( 0,0, largeur_canvas_distances+2*marge_x_distance-1, hauteur_canvas_distances-1 );
ct_distances.stroke();

//--Axes
ct_distances.fillStyle ='#777777';
demi_fleche_H(ct_distances,h_axe,marge_x_distance,largeur_canvas_distances+marge_x_distance);

//--Regarde les extrémums et calcul les coeff de flou et distance vers pixel
var f_m=focale/1000;										//focale en m
var k_distance=largeur_canvas_distances/d_dernier_point;	//pour passer d'une distance en m à des px


var demi_h_trait_d=20;

//Avant plan
ct_distances.fillStyle ='rgb('+avant_color+')';
ct_distances.font="12px 'Trebuchet MS'";
temp=k_distance*d_avant_plan;	//distance en px
ct_distances.beginPath();
ct_distances.fillRect( marge_x_distance+temp,h_axe-demi_h_trait_d, 1, 1+demi_h_trait_d);
ct_distances.beginPath(); 
ct_distances.fillText(d_avant_plan.toFixed(2)+'m',marge_x_distance+temp-5,h_axe+12);

if(surbrillance=='av'){
ct_distances.beginPath(); 
ct_distances.arc(marge_x_distance+temp,h_axe,4,0,2*Math.PI);
ct_distances.fill(); 
}


//Distance de map
ct_distances.beginPath(); 
ct_distances.fillStyle ='rgb('+map_color+')';
temp=k_distance*d_map;	
ct_distances.beginPath();
ct_distances.fillRect( marge_x_distance+temp,h_axe-demi_h_trait_d, 1, 1+demi_h_trait_d);
ct_distances.fillText(d_map.toFixed(2)+'m',marge_x_distance+temp-5,h_axe+23);

if(surbrillance=='map'){
ct_distances.beginPath(); 
ct_distances.arc(marge_x_distance+temp,h_axe,4,0,2*Math.PI);
ct_distances.fill(); 
}

//Arrière plan
ct_distances.fillStyle ='rgb('+arriere_color+')';
temp=k_distance*d_arriere_plan;	//distance en px
ct_distances.beginPath();
ct_distances.fillRect( marge_x_distance+temp,h_axe-demi_h_trait_d, 1, 1+demi_h_trait_d );
ct_distances.beginPath(); 
ct_distances.fillText(d_arriere_plan.toFixed(2)+'m',marge_x_distance+temp-5,h_axe+34);



if(surbrillance=='ar'){
ct_distances.beginPath(); 
ct_distances.arc(marge_x_distance+temp,h_axe,4,0,2*Math.PI);
ct_distances.fill(); 
}


ct_distances.font="12px 'Trebuchet MS'";

//Rectangle pour marquer la PDC
ct_distances.fillStyle ='rgba('+cdc_color+',0.3)';
temp=k_distance*pdc_pres;	//distance en px
temp2=k_distance*pdc_loin;	//distance en px

if(temp2>largeur_canvas_distances)
temp2=largeur_canvas_distances;

ct_distances.beginPath();
ct_distances.fillRect( marge_x_distance+temp,0,temp2-temp,h_axe+34);

}

//-Dessine une demie fleche horizontale
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
