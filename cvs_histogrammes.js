function Calc_histograms() {

var i=0;	var ii=0;	var iii=0;
var r=0;	var v=0;	var b=0;	var t=0;
var lum=1.0;

//Init
for(i=0;i<256;i++){
R[i]=0;	V[i]=0;	B[i]=0;	L[i]=0;
}

	
for(i=0;i<largeur_vh*hauteur_vh;i++){

	t=Pix_T[i];

	if(t!=0){
		//Histogramme RVB
		r=Pix_R[i];
		v=Pix_V[i];
		b=Pix_B[i];
		
		R[r]++;
		V[v]++;
		B[b]++;

		lum=0.3*r+0.6*v+0.1*b;
		lum=Math.round(lum);
		
		if(r!=v || r!=b || v!=b)
		flag_nb=0;	
				
		//Histogramme de luminosité
		L[lum]++;	
	}
}			



//setTimeout(function() {Draw_histogrammes();},1);
Draw_histogrammes();
}


function Draw_histogrammes(){

var max=0.0;

var R_norm=new Array (256);
var V_norm=new Array (256);
var B_norm=new Array (256);
var L_norm=new Array (256);

//RVB
var cvs_rvb = document.getElementById('id_canvas_histo_RVB');
var ct_rvb = cvs_rvb.getContext('2d');

cvs_rvb.width  = w_rvb;
cvs_rvb.height = h_rvb;

//Image couleur
if(flag_nb==0){

	//RAZ
	ct_rvb.fillStyle ='#FFFFFF';
	ct_rvb.beginPath();
	ct_rvb.fillRect( 0,0, w_rvb-1, h_rvb-1 );


	//Axes
	ct_rvb.fillStyle =color_axes_rvb;
	ct_rvb.beginPath();
	//R
	ct_rvb.fillRect( offset_x_rvb,offset_y_rvb, 1, max_y_rvb+1 );
	ct_rvb.fillRect( offset_x_rvb,offset_y_rvb + max_y_rvb + 1, 256, 1);	
	//V
	ct_rvb.fillRect( offset_x_rvb,2*offset_y_rvb + max_y_rvb + 1, 1, max_y_rvb+1 );
	ct_rvb.fillRect( offset_x_rvb,2*offset_y_rvb + 2*max_y_rvb + 2, 256, 1);	
	//B
	ct_rvb.fillRect( offset_x_rvb,3*offset_y_rvb + 2*max_y_rvb + 2, 1, max_y_rvb+1 );
	ct_rvb.fillRect( offset_x_rvb,3*offset_y_rvb + 3*max_y_rvb + 3, 256, 1);				
		

	//Histogramme R
	//Cherche le max
	max=0;
	for(i=0;i<=255;i++){
		if(R[i]>max)
		max=R[i];		
	}

	//Ramène le max à max_y
	for(i=0;i<=255;i++)
	R_norm[i]=Math.round(max_y_rvb*R[i]/max);

	//Trace l'histogramme
	for(i=0;i<=255;i++){
		ct_rvb.beginPath();
		ct_rvb.fillStyle = 'rgb('+i+',0,0)';
		ct_rvb.fillRect( offset_x_rvb+i, offset_y_rvb+max_y_rvb-R_norm[i]+1, 1, R_norm[i] );
	}


	//Histogramme V
	//Cherche le max
	max=0;
	for(i=0;i<=255;i++){
		if(V[i]>max)
		max=V[i];
	}

	//Ramène le max à max_y
	for(i=0;i<=255;i++)
	V_norm[i]=Math.round(max_y_rvb*V[i]/max);

	//Trace l'histogramme
	for(i=0;i<=255;i++){
		ct_rvb.beginPath();
		ct_rvb.fillStyle = 'rgb(0,'+i+',0)';
		ct_rvb.fillRect( offset_x_rvb+i, 2*offset_y_rvb+2*max_y_rvb-V_norm[i]+2, 1, V_norm[i] );
	}

	//Histogramme B
	//Cherche le max
	max=0;
	for(i=0;i<=255;i++){
		if(B[i]>max)
		max=B[i];
	}

	//Ramène le max à max_y
	for(i=0;i<=255;i++)
	B_norm[i]=Math.round(max_y_rvb*B[i]/max);

	//Trace l'histogramme
	for(i=0;i<=255;i++){
		ct_rvb.beginPath();
		ct_rvb.fillStyle = 'rgb(0,0,'+i+')';
		ct_rvb.fillRect( offset_x_rvb+i, 3*offset_y_rvb+3*max_y_rvb-B_norm[i]+3, 1, B_norm[i] );
	}
}
//Image N&B
else{
	cvs_rvb.width  = w_rvb;
	cvs_rvb.height = 30;
	
	//RAZ
	ct_rvb.fillStyle ='#FFFFFF';
	ct_rvb.beginPath();
	ct_rvb.fillRect( 0,0, w_rvb-1, cvs_rvb.height-1 );

	//Efface axes
	ct_rvb.beginPath();
	ct_rvb.rect(0, 0, w, 30);
	ct_rvb.fillStyle = '#FFFFFF';
	ct_rvb.fill();
	ct_rvb.lineWidth = 7;
	ct_rvb.strokeStyle = 'FFFFFF';
	ct_rvb.stroke();	
	
	//Msg
	ct_rvb.font="12px 'Trebuchet MS'";
	ct_rvb.fillStyle="#333333";
	ct_rvb.beginPath(); 
	ct_rvb.fillText(chrome.i18n.getMessage("n_et_b"),offset_x_rvb+95,20);	
		
	document.getElementById('td_chk_R').style.height='10px';
	document.getElementById('td_chk_V').style.height='0px';
	document.getElementById('td_chk_B').style.height='0px';
}


//Histo de luminosité
var cvs_lum = document.getElementById('id_canvas_histo_lum');
var ct_lum = cvs_lum.getContext('2d');
cvs_lum.width  = w_lum;
cvs_lum.height = h_lum;

	//RAZ
	ct_lum.fillStyle ='#FFFFFF';
	ct_lum.beginPath();
	ct_lum.fillRect( 0,0, w_lum-1, h_lum-1 );


//Axes
ct_lum.fillStyle =color_axes_lum;
ct_lum.beginPath();
ct_lum.fillRect( offset_x_lum,offset_y_lum, 1, max_y_lum+1 );
ct_lum.fillRect( offset_x_lum,offset_y_lum + max_y_lum + 1, 256, 1);	


//Cherche le max
max=0;
for(i=0;i<=255;i++){
	if(L[i]>max)
	max=L[i];
}

//Ramène le max à max_y
for(i=0;i<=255;i++)
L_norm[i]=Math.round(max_y_lum*L[i]/max);

//Trace l'histogramme
for(i=0;i<=255;i++){

	ct_lum.beginPath();
	ct_lum.fillStyle = 'rgb('+i+','+i+','+i+')';
	ct_lum.fillRect( offset_x_lum+i, offset_y_lum+max_y_lum-L_norm[i]+1, 1, L_norm[i] );


	//Contour noir
	ct_lum.beginPath();
	ct_lum.fillStyle = '#000000';
	
	if( i==255){
	ct_lum.fillRect( offset_x_lum+i, offset_y_lum+max_y_lum-L_norm[i]-1+1, 1,1 );	
	if(L_norm[i]!=0)
	ct_lum.fillRect( offset_x_lum+i+1, offset_y_lum+max_y_lum-L_norm[i]-1+1, 1,L_norm[i]+1 );	
	}
	
	else if(L_norm[i+1]>L_norm[i]){
	ct_lum.fillRect( offset_x_lum+i, offset_y_lum+max_y_lum-L_norm[i+1]-1+1, 1,L_norm[i+1]-L_norm[i]+1 );	
	}
	else{
	ct_lum.fillRect( offset_x_lum+i, offset_y_lum+max_y_lum-L_norm[i]-1+1, 1,1 );
	ct_lum.fillRect( offset_x_lum+i+1, offset_y_lum+max_y_lum-L_norm[i]-1+1, 1,L_norm[i]-L_norm[i+1]+1 );
	}
	
}


}