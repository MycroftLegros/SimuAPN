

//state=btn_ON ou btn_OFF
function DrawBouton(div_id,img_id,state){

	if(state=='btn_OFF')
	var pos='position:relative; left:-2px; top:1px;'
	else
	var pos='position:relative; right:-1px; top:3px;'

	//document.getElementById(img_id).style=+pos;
	
	
	document.getElementById(img_id).style.position='relative';
	
	if(state=='btn_OFF'){
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




