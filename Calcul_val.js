function Maj_calc(){
var temp=1.0;
var temp2=1.0;
var temp3=1.0;


//-GENERAL
//--Crop factor
var diagonale=l_capteur*l_capteur+h_capteur*h_capteur;	//dimensions en mm
diagonale=diagonale/(1000*1000);						//résultat en m
diagonale=Math.sqrt(diagonale);							//diagonale en m
var diag_FF=Math.sqrt(0.036*0.036+0.024*0.024);	
crop_factor=diag_FF/diagonale;

//--cdc
cdc=diagonale/cdc_denom;								//cdc en m

//-APPAREIL PHOTO
//--Format du capteur
//essai le format 3:2
temp=2.0*l_capteur/h_capteur;
temp=temp.toFixed(1);
if(temp==3.0)
format_capteur="3:2";
//essai le format 4:3
else{
	temp=3.0*l_capteur/h_capteur;
	temp=temp.toFixed(1);
	if(temp==4.0)
	format_capteur="4:3";
	else
	format_capteur="?";
}

//--Taille d'un pixel
temp=l_capteur*h_capteur;		//surface du capteur en mm²
temp=temp/(1000*1000);			//surface du capteur en m²
temp=temp/(definition*1000000);	//surface d'un pixel en m²
taille_pixel=Math.sqrt(temp);	//taille d'un pixel en m	

if(y_reel_graph_pdc==-1)
y_reel_graph_pdc=20*taille_pixel;

//--Flou filtre aa
if(filtre_aa)
flou_filtre_aa=2*taille_pixel;
else
flou_filtre_aa=0;

h_debut_visee=h_fin_visee-h_capteur/1000;

//-OBJECTIF
//--Focale équivalente
f_equ=focale*crop_factor;

//--Angles de champ
angle_horiz=2.0*Math.atan(l_capteur/(2.0*focale))*360.0/(2.0*Math.PI);
angle_vert=2.0*Math.atan(h_capteur/(2.0*focale))*360.0/(2.0*Math.PI);

//--Flou dû à la diffraction
flou_diff=2.44*0.00000056*ouverture;

//--Flou dû aux AC
flou_abb_chro=ab_chro/1000000.0;

//--Flou dû à la résolution
flou_res=taille_pixel*(definition/resolution);


//-EXPOSITION
var ISO_= 1.0;
var vitesse_= 1.0;
var ouverture_= 1.0;

switch(ISO){
	case 25 : ISO_=-2; break;
	case 32 : ISO_=-5/3; break;
	case 40 : ISO_=-4/3; break;
	case 50 : ISO_=-1; break;
	case 64 : ISO_=-2/3; break;
	case 80 : ISO_=-1/3; break;
	case 100 : ISO_=0; break;
	case 125 : ISO_=1/3; break;
	case 160 : ISO_=2/3; break;
	case 200 : ISO_=1; break;
	case 250 : ISO_=4/3; break;
	case 320 : ISO_=5/3; break;
	case 400 : ISO_=2; break;
	case 500 : ISO_=7/3; break;
	case 640 : ISO_=8/3; break;
	case 800 : ISO_=3; break;
	case 1000 : ISO_=10/3; break;
	case 1250 : ISO_=11/3; break;
	case 1600 : ISO_=4; break;
	case 2000 : ISO_=13/3; break;
	case 2500 : ISO_=14/3; break;
	case 3200 : ISO_=5; break;
	case 4000 : ISO_=16/3; break;
	case 5000 : ISO_=17/3; break;
	case 6400 : ISO_=6; break;
	case 8000 : ISO_=19/3; break;
	case 10000 : ISO_=20/3; break;
	case 12800 : ISO_=7; break;
	case 16000 : ISO_=22/3; break;
	case 20000 : ISO_=23/3; break;
	case 25600 : ISO_=8; break;
	case 32000 : ISO_=25/3; break;
	case 40000 : ISO_=26/3; break;
	case 51200 : ISO_=9; break;
	case 64000 : ISO_=28/3; break;
	case 80000 : ISO_=29/3; break;
	case 102400 : ISO_=10; break;
	case 128000 : ISO_=31/3; break;
	case 160000 : ISO_=32/3; break;
	case 204800 : ISO_=11; break;
	case 256000 : ISO_=34/3; break;
	case 320000 : ISO_=35/3; break;
}

switch(vitesse){
	case 0.000125 : vitesse_=-13; break;
	case 0.00015625 : vitesse_=-38/3; break;
	case 0.0002 : vitesse_=-37/3; break;
	case 0.00025 : vitesse_=-12; break;
	case 0.0003125 : vitesse_=-35/3; break;
	case 0.0004 : vitesse_=-34/3; break;
	case 0.0005 : vitesse_=-11; break;
	case 0.000625 : vitesse_=-32/3; break;
	case 0.0008 : vitesse_=-31/3; break;
	case 0.001 : vitesse_=-10; break;
	case 0.00125 : vitesse_=-29/3; break;
	case 0.0015625 : vitesse_=-28/3; break;
	case 0.002 : vitesse_=-9; break;
	case 0.0025 : vitesse_=-26/3; break;
	case 0.003125 : vitesse_=-25/3; break;
	case 0.004 : vitesse_=-8; break;
	case 0.005 : vitesse_=-23/3; break;
	case 0.00625 : vitesse_=-22/3; break;
	case 0.008 : vitesse_=-7; break;
	case 0.01 : vitesse_=-20/3; break;
	case 0.0125 : vitesse_=-19/3; break;
	case 0.0166666666666667 : vitesse_=-6; break;
	case 0.02 : vitesse_=-17/3; break;
	case 0.025 : vitesse_=-16/3; break;
	case 0.0333333333333333 : vitesse_=-5; break;
	case 0.04 : vitesse_=-14/3; break;
	case 0.05 : vitesse_=-13/3; break;
	case 0.0666666666666667 : vitesse_=-4; break;
	case 0.0769230769230769 : vitesse_=-11/3; break;
	case 0.1 : vitesse_=-10/3; break;
	case 0.125 : vitesse_=-3; break;
	case 0.166666666666667 : vitesse_=-8/3; break;
	case 0.2 : vitesse_=-7/3; break;
	case 0.25 : vitesse_=-2; break;
	case 0.333333333333333 : vitesse_=-5/3; break;
	case 0.4 : vitesse_=-4/3; break;
	case 0.5 : vitesse_=-1; break;
	case 0.625 : vitesse_=-2/3; break;
	case 0.769230769230769 : vitesse_=-1/3; break;
	case 1 : vitesse_=0; break;
	case 1.3 : vitesse_=1/3; break;
	case 1.6 : vitesse_=2/3; break;
	case 2 : vitesse_=1; break;
	case 2.5 : vitesse_=4/3; break;
	case 3 : vitesse_=5/3; break;
	case 4 : vitesse_=2; break;
	case 5 : vitesse_=7/3; break;
	case 6 : vitesse_=8/3; break;
	case 8 : vitesse_=9; break;
	case 10 : vitesse_=10/3; break;
	case 13 : vitesse_=11/3; break;
	case 15 : vitesse_=4; break;
	case 20 : vitesse_=13/3; break;
	case 25 : vitesse_=14/3; break;
	case 30 : vitesse_=5; break;
	case 40 : vitesse_=16/3; break;
	case 50 : vitesse_=17/3; break;
	case 60 : vitesse_=6; break;
}

switch(ouverture){
	case 0.7 : ouverture_=1; break;
	case 0.8 : ouverture_=2/3; break;
	case 0.9 : ouverture_=1/3; break;
	case 1 : ouverture_=0; break;
	case 1.1 : ouverture_=-1/3; break;
	case 1.2 : ouverture_=-2/3; break;
	case 1.4 : ouverture_=-1; break;
	case 1.6 : ouverture_=-4/3; break;
	case 1.8 : ouverture_=-5/3; break;
	case 2 : ouverture_=-2; break;
	case 2.2 : ouverture_=-7/3; break;
	case 2.5 : ouverture_=-8/3; break;
	case 2.8 : ouverture_=-3; break;
	case 3.2 : ouverture_=-10/3; break;
	case 3.5 : ouverture_=-11/3; break;
	case 4 : ouverture_=-4; break;
	case 4.5 : ouverture_=-13/3; break;
	case 5 : ouverture_=-14/3; break;
	case 5.6 : ouverture_=-5; break;
	case 6.3 : ouverture_=-16/3; break;
	case 7.1 : ouverture_=-17/3; break;
	case 8 : ouverture_=-6; break;
	case 9 : ouverture_=-19/3; break;
	case 10 : ouverture_=-20/3; break;
	case 11 : ouverture_=-7; break;
	case 13 : ouverture_=-22/3; break;
	case 14 : ouverture_=-23/3; break;
	case 16 : ouverture_=-8; break;
	case 18 : ouverture_=-25/3; break;
	case 20 : ouverture_=-26/3; break;
	case 22 : ouverture_=-9; break;
	case 25 : ouverture_=-28/3; break;
	case 29 : ouverture_=-29/3; break;
	case 32 : ouverture_=-10; break;
	case 36 : ouverture_=-31/3; break;
	case 42 : ouverture_=-32/3; break;
	case 45 : ouverture_=-11; break;
}

expo=lum_scene_EV+ISO_+vitesse_+ouverture_;

if(Math.abs(expo)<0.001)
expo=0;


//-DYNAMIQUE DU CAPTEUR
if(ISO>100){

	var temp_iso=0;
	switch(ISO){

		case 100: temp_iso=7; break;
		case 125: temp_iso=8; break;
		case 160: temp_iso=9; break;
		case 200: temp_iso=10; break;
		case 250: temp_iso=11; break;
		case 320: temp_iso=12; break;
		case 400: temp_iso=13; break;
		case 500: temp_iso=14; break;
		case 640: temp_iso=15; break;
		case 800: temp_iso=16; break;
		case 1000: temp_iso=17; break;
		case 1250: temp_iso=18; break;
		case 1600: temp_iso=19; break;
		case 2000: temp_iso=20; break;
		case 2500: temp_iso=21; break;
		case 3200: temp_iso=22; break;
		case 4000: temp_iso=23; break;
		case 5000: temp_iso=24; break;
		case 6400: temp_iso=25; break;
		case 8000: temp_iso=26; break;
		case 10000: temp_iso=27; break;
		case 12800: temp_iso=28; break;
		case 16000: temp_iso=29; break;
		case 20000: temp_iso=30; break;
		case 25600: temp_iso=31; break;
		case 32000: temp_iso=32; break;
		case 40000: temp_iso=33; break;
		case 51200: temp_iso=34; break;
		case 64000: temp_iso=35; break;
		case 80000: temp_iso=36; break;
		case 102400: temp_iso=37; break;
		case 128000: temp_iso=38; break;
		case 160000: temp_iso=39; break;
		case 204800: temp_iso=40; break;
		case 256000: temp_iso=41; break;
		case 320000: temp_iso=42; break;
	}
	dynamique_capteur=dynamique_capteur_0-(temp_iso-7)/3;
	
	if(dynamique_capteur<0)
	dynamique_capteur=0;
	

}
else
dynamique_capteur=dynamique_capteur_0;


//-PDC, HYPERFOCALE, DIMENSIONS
temp=focale/1000;	//en m
//--Pdc
pdc_pres=d_map/(1.0+cdc*ouverture*(d_map-temp)/(temp*temp));
pdc_loin=d_map/(1.0-cdc*ouverture*(d_map-temp)/(temp*temp));
if(pdc_loin<0)
pdc_loin=99999999999999999999999999999999999999999999999999999;

pdc=pdc_loin-pdc_pres;
//-Flous
flou_avant=(temp*temp*(d_map-d_avant_plan))/(ouverture*d_avant_plan*(d_map-temp));
flou_arriere=(temp*temp*(d_arriere_plan-d_map))/(ouverture*d_arriere_plan*(d_map-temp));

//--Hyperfocale
hyperfocale=temp+(temp*temp)/(cdc*ouverture);
//--Dimensions
largeur_arriere=(l_capteur/1000.0)*d_arriere_plan/temp;
hauteur_arriere=(h_capteur/1000.0)*d_arriere_plan/temp;
largeur_avant=(l_capteur/1000.0)*d_avant_plan/temp;
hauteur_avant=(h_capteur/1000.0)*d_avant_plan/temp;
largeur_map=(l_capteur/1000.0)*d_map/temp;
hauteur_map=(h_capteur/1000.0)*d_map/temp;



//-FLOU DE BOUGE ET FLOU DE MOUVEMENT
//--Vitesse de sécurité et flou de bougé
if(anti_vibration)
vitesse_securite=8.0/(crop_factor*focale*tremblement);
else
vitesse_securite=1.0/(crop_factor*focale*tremblement);

flou_bouge=(vitesse/vitesse_securite)*cdc;

//--Flou de mouvement et vitesse minimale
vitesse_anti_mouvement=cdc*((l_capteur/1000.0)*d_map/temp)*3600.0/((l_capteur/1000.0)*v_sujet*1000.0);
flou_mouvement=(vitesse/vitesse_anti_mouvement)*cdc;


//--ECRAN
//-ppi
ppi_ecran=(Math.sqrt(ecran_x*ecran_x+ecran_y*ecran_y))/ecran_diag;
//-format
//16:10
temp=10.0*ecran_x/ecran_y;
temp=temp.toFixed(1);
if(temp==16)
format_ecran="16:10";
//16:9
else{
	temp=9.0*ecran_x/ecran_y;
	temp=temp.toFixed(1);
	if(temp==16.0)
	format_ecran="16:9";
	//5:4
	else{
		temp=4.0*ecran_x/ecran_y;
		temp=temp.toFixed(1);
		if(temp==5.0)
		format_ecran="5:4";
		//4:3
		else{
			temp=3.0*ecran_x/ecran_y;
			temp=temp.toFixed(1);
			if(temp==4.0)
			format_ecran="4:3";
			//2.39:1
			else{
				temp=1.0*ecran_x/ecran_y;
				temp=temp.toFixed(2);
				if(temp==2.39)
				format_ecran="2.39:1";
				//1.9
				else{
					temp=1.0*ecran_x/ecran_y;
					temp=temp.toFixed(1);
					if(temp==1.9)
					format_ecran="1.9:1";
					//1.85
					else{
						temp=1.0*ecran_x/ecran_y;
						temp=temp.toFixed(2);
						if(temp==1.85)
						format_ecran="1.85:1";
						//1.9
						else{
						format_ecran="?";						
						}					
					}				
				}			
			}		
		}	
	}	
}

//-Distance min d'observation
temp=0.0254/ppi_ecran;	//largeur d'un pixel, en m
distance_min_ecran=temp/0.000290888;	//temp/(2*tan(1/120°))

//-Tirage équivalent
//--Largeur
temp2=(l_capteur/1000.0)/taille_pixel;	//nombre de pixel en largeur
temp3=temp2*temp*ecran_zoom/100.0;		//largeur du tirage en m
temp3=temp3.toFixed(2);
tirage_equ_ecran=temp3;

//--Hauteur
temp2=(h_capteur/1000.0)/taille_pixel;	//nombre de pixel en largeur
temp3=temp2*temp*ecran_zoom/100.0;		//largeur du tirage en m
temp3=temp3.toFixed(2);
tirage_equ_ecran+='x'+temp3+'m';


//-TIRAGE
//--Définition min
tirage_y=tirage_x*h_capteur/l_capteur;
tirage_def_min=(tirage_x/2.54)*tirage_resolution*(tirage_y/2.54)*tirage_resolution;

//--Taille
temp=(l_capteur/1000.0)/taille_pixel;	//nombre de pixel en largeur
temp=0.0254*temp/tirage_resolution;
temp=temp*100;	//en cm
taille_tirage=temp.toFixed(1);

temp=(h_capteur/1000.0)/taille_pixel;	//nombre de pixel en largeur
temp=0.0254*temp/tirage_resolution;
temp=temp*100;	//en cm
taille_tirage+='x'+temp.toFixed(1)+'cm';

//--Distance min
temp=0.0254/tirage_resolution;			//largeur d'unpoint, en m
distance_min_tirage=temp/0.000290888;	//temp/(2*tan(1/120°))

//--dpi min
dpi_min_tirage=87.31876736/(tirage_distance_observation/100.0) //87.31=0.0254/(2*tan(1/120°))



//MAJ DE L'IHM
//-ONGLETS REGLAGES
//-Capteur
document.getElementById('dim_capteur').innerHTML='('+h_capteur+'x'+l_capteur+'mm)';	

//-Objectif
document.getElementById('val_focale').innerHTML=focale.toFixed(0)+'mm'

if(crop_factor!=1){
temp=focale*crop_factor;
document.getElementById('val_focale').innerHTML+=' (feq='+temp.toFixed(0)+'mm)'; 
}



/*
//-GENERAL
//--Cdc
temp=(cdc*1000000).toFixed(1);
document.getElementById('calc_cdc_m').innerHTML=temp+'µm';
temp=(cdc/taille_pixel).toFixed(1);
document.getElementById('calc_cdc_px').innerHTML=temp+'px';

//-APPAREIL PHOTO
//--Format du capteur
document.getElementById('calc_format_apn').innerHTML=format_capteur;
//--Cropfactor
temp=crop_factor.toFixed(2);
document.getElementById('calc_crop_factor').innerHTML=temp;
//--Taille d'un pixel
temp=(taille_pixel*1000000).toFixed(1);
document.getElementById('calc_taille_pixel_m').innerHTML=temp+'µm';
temp=(taille_pixel/cdc).toFixed(1);
document.getElementById('calc_taille_pixel_cdc').innerHTML=temp+'cdc';
//--Flou dû au filtre aa
temp=(flou_filtre_aa*1000000).toFixed(1);
document.getElementById('calc_flou_aa_m').innerHTML=temp+'µm';
temp=(flou_filtre_aa/taille_pixel).toFixed(1);
document.getElementById('calc_flou_aa_px').innerHTML=temp+'px';
temp=(flou_filtre_aa/cdc).toFixed(1);
document.getElementById('calc_flou_aa_cdc').innerHTML=temp+'cdc';

//-OBJECTIF
//--Focale équivalente
temp=f_equ.toFixed(0);
document.getElementById('calc_focale_equ').innerHTML=temp+'mm';
//--Angles de champ
temp=angle_horiz.toFixed(1);
document.getElementById('calc_champ_horiz_deg').innerHTML=temp+'°';
temp=angle_vert.toFixed(1);
document.getElementById('calc_champ_vert_deg').innerHTML=temp+'°';
//--Flou dû à la diffraction
temp=(flou_diff*1000000).toFixed(1);
document.getElementById('calc_flou_diffraction_m').innerHTML=temp+'µm';
temp=(flou_diff/taille_pixel).toFixed(1);
document.getElementById('calc_flou_diffraction_px').innerHTML=temp+'px';
temp=(flou_diff/cdc).toFixed(1);
document.getElementById('calc_flou_diffraction_cdc').innerHTML=temp+'cdc';
//--Flou dû aux AC
temp=(flou_abb_chro*1000000).toFixed(1);
document.getElementById('calc_flou_abb_chro_m').innerHTML=temp+'µm';
temp=(flou_abb_chro/taille_pixel).toFixed(1);
document.getElementById('calc_flou_abb_chro_px').innerHTML=temp+'px';
temp=(flou_abb_chro/cdc).toFixed(1);
document.getElementById('calc_flou_abb_chro_cdc').innerHTML=temp+'cdc';
//--Flou dû à la résolution
temp=(flou_res*1000000).toFixed(1);
document.getElementById('calc_flou_res_m').innerHTML=temp+'µm';
temp=(flou_res/taille_pixel).toFixed(1);
document.getElementById('calc_flou_res_px').innerHTML=temp+'px';
temp=(flou_res/cdc).toFixed(1);
document.getElementById('calc_flou_res_cdc').innerHTML=temp+'cdc';

//-EXPOSITION
temp=expo.toFixed(1);
if(temp>0)
document.getElementById('calc_expo').innerHTML='+'+temp+'EV';
else
document.getElementById('calc_expo').innerHTML=temp+'EV';

//-PDC, HYPERFOCALE, DIMENSIONS
//--Pdc
temp=pdc_pres.toFixed(2);
document.getElementById('calc_debut_pdc_m').innerHTML=temp+'m';
if(pdc_loin!=99999999999999999999999999999999999999999999999999999){
temp=pdc_loin.toFixed(2);
document.getElementById('calc_fin_pdc_m').innerHTML=temp+'m';
temp=pdc.toFixed(2);
document.getElementById('calc_pdc').innerHTML=temp+'m';
}
else{
document.getElementById('calc_fin_pdc_m').innerHTML='∞';
document.getElementById('calc_pdc').innerHTML='∞';
}

temp=100.0*pdc_pres/(pdc_pres+pdc_loin);
temp=temp.toFixed(1);
temp2=d_map-pdc_pres;
temp2=temp2.toFixed(2);
document.getElementById('calc_debut_pdc_pour_100').innerHTML='('+temp2+'m / ' +temp+'%)';

temp=100.0*pdc_loin/(pdc_pres+pdc_loin);
temp=temp.toFixed(1);
temp2=pdc_loin-d_map;
temp2=temp2.toFixed(2);
document.getElementById('calc_fin_pdc_pour_100').innerHTML='('+temp2+'m / ' +temp+'%)';
//--Flous
temp=(flou_avant*1000000).toFixed(1);
document.getElementById('calc_flou_avant_plan_m').innerHTML=temp+'µm';
temp=(flou_avant/taille_pixel).toFixed(1);
document.getElementById('calc_flou_avant_plan_px').innerHTML=temp+'px';
temp=(flou_avant/cdc).toFixed(1);
document.getElementById('calc_flou_avant_plan_cdc').innerHTML=temp+'cdc';

temp=(flou_arriere*1000000).toFixed(1);
document.getElementById('calc_flou_arriere_plan_m').innerHTML=temp+'µm';
temp=(flou_arriere/taille_pixel).toFixed(1);
document.getElementById('calc_flou_arriere_plan_px').innerHTML=temp+'px';
temp=(flou_arriere/cdc).toFixed(1);
document.getElementById('calc_flou_arriere_plan_cdc').innerHTML=temp+'cdc';

//--Hyperfocale
temp=hyperfocale.toFixed(1);
document.getElementById('calc_hyperfocale').innerHTML=temp+'m';

//--Dimensions
temp=largeur_arriere.toFixed(1);
document.getElementById('calc_dim_horiz').innerHTML=temp+'m';

temp=hauteur_arriere.toFixed(1);
document.getElementById('calc_dim_vert').innerHTML=temp+'m';

//-FLOU DE BOUGE ET DE MOUVEMENT
//--Bouge
if(vitesse_securite<1){
temp=(1/vitesse_securite).toFixed(0);
document.getElementById('calc_vitesse_securite').innerHTML='1/'+temp;
}
else{
temp=vitesse_securite.toFixed(1);
document.getElementById('calc_vitesse_securite').innerHTML=temp+'"';
}

temp=(flou_bouge*1000000).toFixed(1);
document.getElementById('calc_flou_bouge_m').innerHTML=temp+'µm';
temp=(flou_bouge/taille_pixel).toFixed(1);
document.getElementById('calc_flou_bouge_px').innerHTML=temp+'px';
temp=(flou_bouge/cdc).toFixed(1);
document.getElementById('calc_flou_bouge_cdc').innerHTML=temp+'cdc';

//-Mouvement
if(v_sujet==0)
document.getElementById('calc_vitesse_securite_mvt').innerHTML='N/A';
else{
	if(vitesse_anti_mouvement<1){
	temp=(1/vitesse_anti_mouvement).toFixed(0);
	document.getElementById('calc_vitesse_securite_mvt').innerHTML='1/'+temp;
	}
	else{
	temp=vitesse_anti_mouvement.toFixed(1);
	document.getElementById('calc_vitesse_securite_mvt').innerHTML=temp+'"';
	}
}

temp=(flou_mouvement*1000000).toFixed(1);
document.getElementById('calc_flou_mvt_m').innerHTML=temp+'µm';
temp=(flou_mouvement/taille_pixel).toFixed(1);
document.getElementById('calc_flou_mvt_px').innerHTML=temp+'px';
temp=(flou_mouvement/cdc).toFixed(1);
document.getElementById('calc_flou_mvt_cdc').innerHTML=temp+'cdc';

//-ECRAN
temp=Math.round(ppi_ecran);
document.getElementById('calc_res_ecran').innerHTML=temp+'ppi';
document.getElementById('calc_format_ecran').innerHTML=format_ecran;
temp=distance_min_ecran*100;
temp=Math.round(temp);
document.getElementById('calc_distance_ecran').innerHTML=temp+'cm';
document.getElementById('calc_tirage_equ_ecran').innerHTML=tirage_equ_ecran;


//-TIRAGE
temp=tirage_y.toFixed(1);
document.getElementById('id_dim_tirage_y').innerHTML=temp;
temp=(tirage_def_min/1000000.0).toFixed(1);
document.getElementById('calc_def_min').innerHTML=temp+'Mpx';
document.getElementById('calc_taille_tirage').innerHTML=taille_tirage;
temp=distance_min_tirage.toFixed(2);
document.getElementById('calc_distance_min_tirage').innerHTML=temp+'m';
temp=Math.round(dpi_min_tirage);
document.getElementById('calc_dpi_a_distance').innerHTML=temp+'dpi';
*/

if(flag_init){
	initImageData();
	DrawRoueMode();
	DrawDistances();
	InitPtsMoletteR();
	ExtrapoleObjectif();
	InitPts3D_globale();
	
}

}

