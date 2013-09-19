//id_canvas_molette_priorite

PolygonesMoletteReglage=new Array(2+4*N_molette);


//Polygones de la molette
function InitPtsMoletteR(){

	var d_theta=Math.PI/N_molette;
	var r=0.018;				//rayon interne
	var R=0.02;					//rayon externe
	var e=0.004;					//épaisseur	
	
	
	//centre de rotation
	var x0=0;	//OK
	var y0=0;	//OK
	var p0=0;	//OK

	var i=0;
	var ii=0;
	
	var Face_temp_haut=new Array(4*N_molette);
	var Face_temp_bas=new Array(4*N_molette)
	for(i=0; i < 4*N_molette; i++) {
    Face_temp_haut[i] = new Array(3);
	Face_temp_bas[i] = new Array(3);
  }
	
		
	//Mémorise les coordonées des sommets
	var ii=0;
	for(i=0;i!=2*N_molette;i+=2){
		ii=2*i;
		Face_temp_haut[ii][0]=x0-R*Math.cos(i*d_theta);			Face_temp_haut[ii][1]=y0+e/2;		Face_temp_haut[ii][2]=p0+R*Math.sin(i*d_theta);
		Face_temp_bas[ii][0]=Face_temp_haut[ii][0];				Face_temp_bas[ii][1]=y0-e/2;		Face_temp_bas[ii][2]=Face_temp_haut[ii][2];
		
		Face_temp_haut[ii+1][0]=x0-R*Math.cos((i+1)*d_theta);	Face_temp_haut[ii+1][1]=y0+e/2;		Face_temp_haut[ii+1][2]=p0+R*Math.sin((i+1)*d_theta);
		Face_temp_bas[ii+1][0]=Face_temp_haut[ii+1][0];			Face_temp_bas[ii+1][1]=y0-e/2;		Face_temp_bas[ii+1][2]=Face_temp_haut[ii+1][2];
		
		Face_temp_haut[ii+2][0]=x0-r*Math.cos((i+1)*d_theta);	Face_temp_haut[ii+2][1]=y0+e/2;		Face_temp_haut[ii+2][2]=p0+r*Math.sin((i+1)*d_theta);
		Face_temp_bas[ii+2][0]=Face_temp_haut[ii+2][0];			Face_temp_bas[ii+2][1]=y0-e/2;		Face_temp_bas[ii+2][2]=Face_temp_haut[ii+2][2];
		
		Face_temp_haut[ii+3][0]=x0-r*Math.cos((i+2)*d_theta);	Face_temp_haut[ii+3][1]=y0+e/2;		Face_temp_haut[ii+3][2]=p0+r*Math.sin((i+2)*d_theta);
		Face_temp_bas[ii+3][0]=Face_temp_haut[ii+3][0];			Face_temp_bas[ii+3][1]=y0-e/2;		Face_temp_bas[ii+3][2]=Face_temp_haut[ii+3][2];
	}	
	
	var tab_temp1=new Array(4*N_molette,2);
	for(i=0; i < 4*N_molette; i++)
	tab_temp1[i] = new Array(2);		
	
	var tab_temp2=new Array(4*N_molette,2);
	for(i=0; i < 4*N_molette; i++)
	tab_temp2[i] = new Array(2);	
	
	
	//Polygomes des faces haut et bas
	PolygonesMoletteReglage[0]=new Polygone("MolR0",[150,150,150,1],[50,50,50],[0,0,0,0],Face_temp_haut,tab_temp1,[x0,y0+e/2,p0],0,[0,1,0],[0,0,0],InitPts,RotPts,DrawPolynome,5*R);
	PolygonesMoletteReglage[1]=new Polygone("MolR1",[150,150,150,1],[50,50,50],[0,0,0,0],Face_temp_bas,tab_temp2,[x0,y0-e/2,p0],0, [0,-1,0],[0,0,0],InitPts,RotPts,DrawPolynome,5*R);
		
	//Polygones des tranches
	var xa=1.0;var ya=1.0;var pa=1.0;
	var xb=1.0;var yb=1.0;var pb=1.0;
	var xc=1.0;var yc=1.0;var pc=1.0;
	var xd=1.0;var yd=1.0;var pd=1.0;
	var xg=1.0;var yg=1.0;var pg=1.0;	
	var u_x=0; var u_y=1; var u_p=0;
	var v_x=0; var v_y=1; var v_p=0;
	var w_x=0; var w_y=1; var w_p=0;
	
			
	for(i=0;i!=4*N_molette-1;i++){
	
		xa=Face_temp_haut[i][0];	ya=Face_temp_haut[i][1];	pa=Face_temp_haut[i][2];
		xb=Face_temp_haut[i+1][0];	yb=Face_temp_haut[i+1][1];	pb=Face_temp_haut[i+1][2];
		xc=Face_temp_bas[i+1][0];	yc=Face_temp_bas[i+1][1];	pc=Face_temp_bas[i+1][2];
		xd=Face_temp_bas[i][0];		yd=Face_temp_bas[i][1];		pd=Face_temp_bas[i][2];
		
		xg=(xa+xc)/2;	yg=y0;	pg=(pa+pc)/2
		
		//u:ad, v:ab, w=u.v
		u_x=xd-xa; 				u_y=yd-ya; 				u_p=pd-pa;
		v_x=xb-xa; 				v_y=yb-ya; 				v_p=pb-pa;
		w_x=u_y*v_p-u_p*v_y;	w_y=u_p*v_x-u_x*v_p;	w_p=u_x*v_y-u_y*v_x;
		
		PolygonesMoletteReglage[i+2]=new Polygone("MolR"+(i+2),[150,150,150,1],[50,50,50],[0,0,0,0],[[xa,ya,pa],[xb,yb,pb],[xc,yc,pc],[xd,yd,pd]],[[0,0,0],[0,0,0],[0,0,0],[0,0,0]],[xg,yg,pg],0, [w_x,w_y,w_p],[0,0,0],InitPts,RotPts,DrawPolynome,150*e);	
	}
	
		//Dernier
		xa=Face_temp_haut[i][0];	ya=Face_temp_haut[i][1];	pa=Face_temp_haut[i][2];
		xb=Face_temp_haut[0][0];	yb=Face_temp_haut[0][1];	pb=Face_temp_haut[0][2];
		xc=Face_temp_bas[0][0];		yc=Face_temp_bas[0][1];		pc=Face_temp_bas[0][2];
		xd=Face_temp_bas[i][0];		yd=Face_temp_bas[i][1];		pd=Face_temp_bas[i][2];
		
		xg=(xa+xc)/2;	yg=y0;	pg=(pa+pc)/2
		
		//u:ad, v:ab, w=u.v
		u_x=xd-xa; 				u_y=yd-ya; 				u_p=pd-pa;
		v_x=xb-xa; 				v_y=yb-ya; 				v_p=pb-pa;
		w_x=u_y*v_p-u_p*v_y;	w_y=u_p*v_x-u_x*v_p;	w_p=u_x*v_y-u_y*v_x;
		
		PolygonesMoletteReglage[i+2]=new Polygone("MolR"+(i+2),[150,150,150,1],[50,50,50],[0,0,0,0],[[xa,ya,pa],[xb,yb,pb],[xc,yc,pc],[xd,yd,pd]],[[0,0,0],[0,0,0],[0,0,0],[0,0,0]],[xg,yg,pg],0, [w_x,w_y,w_p],[0,0,0],InitPts,RotPts,DrawPolynome,500*e);	

if(flag_init)
DrawMoletteR();
		
		
}


function DrawMoletteR(){

//Init de la 3D
init_3D("molette_R");

//Rotation des points
for(var i=0;i!=2+4*N_molette;i++)
PolygonesMoletteReglage[i].rot_pts();


//Dimensions du canvas
var cvs = document.getElementById('id_canvas_molette_R');
var ct = cvs.getContext('2d');
cvs.width  = Wc_3D;
cvs.height = Hc_3D;

//MAJ des cdg
Ordre = new Array (2+4*N_molette);

for(var i=0;i!=2+4*N_molette;i++)
Ordre[i]=PolygonesMoletteReglage[i].p_cdg;

//Tri
Ordre.sort(sortNumber);	

var cvs = document.getElementById('id_canvas_molette_R');
var ct = cvs.getContext('2d');


//Fond noir
ct.fillStyle ='#000000';
ct.beginPath();
ct.fillRect( 0,50, Wc_3D, 10 );


//Dessin de la molette
for(var i=0;i!=Ordre.length;i++){
	
	for(var ii=0;ii!=2+4*N_molette;ii++){
		if(Ordre[i]==PolygonesMoletteReglage[ii].p_cdg){
		
			if(PolygonesMoletteReglage[ii].nom!="MolR1" && PolygonesMoletteReglage[ii].nom!="MolR0")
			PolygonesMoletteReglage[ii].draw();
			
			PolygonesMoletteReglage[ii].p_cdg='X';
			ii=2+4*N_molette-1;		
			
		}
	}
}

PolygonesMoletteReglage[0].draw();


//Cache le dessus de la molette
ct.drawImage(img_fond,0,0,Wc_3D,50);

ct.fillStyle ='rgba(0,0,0,0.1)';
ct.beginPath();
//ct.fillRect( 0,0, Wc_3D, 50 );
ct.clearRect( 0,0, Wc_3D, 50 );



}


