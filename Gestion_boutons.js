//state=css_BtnON ou css_BtnOFF
<<<<<<< HEAD
function drawBouton(div_id,img_id,state){

	document.getElementById(img_id).style.position='relative';
	
	if(state=='css_BtnOFF'){
	document.getElementById(img_id).style.left='-2px';
	document.getElementById(img_id).style.right='0px';
	document.getElementById(img_id).style.top='1px';
	}
	else{
	document.getElementById(img_id).style.left='0px';
	document.getElementById(img_id).style.right='-1px';
	document.getElementById(img_id).style.top='3px';
	}
	
	
	document.getElementById(div_id).className=state;
}


=======

function drawBouton(div_id, img_id, state) {

	document.getElementById(img_id).style.position = 'relative';

	if (state === 'css_BtnOFF') {
		document.getElementById(img_id).style.left = '-2px';
		document.getElementById(img_id).style.right = '0px';
		document.getElementById(img_id).style.top = '1px';
	} else {
		document.getElementById(img_id).style.left = '0px';
		document.getElementById(img_id).style.right = '-1px';
		document.getElementById(img_id).style.top = '3px';
	}
>>>>>>> ménage, tuning et fix


	document.getElementById(div_id).className = state;
}
