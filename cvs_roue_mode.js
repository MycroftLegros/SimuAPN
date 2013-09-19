function DrawRoueMode(){

var cvs = document.getElementById('id_canvas_roue_mode');
var ct = cvs.getContext('2d');

Wc_roue_mode=60;
Hc_roue_mode=100;

cvs.width  = Wc_roue_mode+10;
cvs.height = Hc_roue_mode;

ct.fillStyle ='#FFFFFF';
ct.beginPath();
ct.arc(Wc_roue_mode-5,Hc_roue_mode/2,3,0,2*Math.PI);
ct.fill();

ct.translate(0, Hc_roue_mode/2);

if(flag_reglage_expo=="manuel")
ct.rotate(Math.PI/6);

else if(flag_reglage_expo=="ouverture")
ct.rotate(-0.01);

else if(flag_reglage_expo=="vitesse")
ct.rotate(-Math.PI/6);



ct.drawImage(img_MAS, -(img_MAS.width/2), -(img_MAS.height/2));



}
