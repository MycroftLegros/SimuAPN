//-Dessine une demie fleche horizontale

function demiFlecheHorizontale(ctx, y_, x_1, x_2) {

	var size_f = 3; //taille d'un la pointe de la fleche
	var temp;

	if (x_2 < x_1) {
		temp = x_1;
		x_1 = x_2;
		x_2 = temp;
	}

	ctx.beginPath();
	ctx.moveTo(x_1, y_);
	ctx.lineTo(x_2, y_);
	ctx.lineTo(x_2 - size_f, y_ - size_f);
	ctx.lineTo(x_2, y_);
	ctx.lineTo(x_2 - size_f, y_ + size_f);
	ctx.stroke();
}


function flecheHorizontale(ctx, y_, x_1, x_2) {
	var size_f = 3;
	var temp;

	if (x_2 < x_1) {
		temp = x_1;
		x_1 = x_2;
		x_2 = temp;
	}

	ctx.beginPath();
	ctx.strokeStyle = '#000000';
	ctx.moveTo(x_1 + size_f, y_ - size_f);
	ctx.lineTo(x_1, y_);
	ctx.lineTo(x_1 + size_f, y_ + size_f);
	ctx.lineTo(x_1, y_);
	ctx.lineTo(x_2, y_);
	ctx.lineTo(x_2 - size_f, y_ - size_f);
	ctx.lineTo(x_2, y_);
	ctx.lineTo(x_2 - size_f, y_ + size_f);
	ctx.stroke();
}



function flecheVerticale(ctx, x_, y_1, y_2) {
	var size_f = 3;
	var temp;

	if (y_1 < y_2) {
		temp = y_1;
		y_1 = y_2;
		y_2 = temp;
	}

	ctx.beginPath();
	ctx.strokeStyle = '#000000';
	ctx.moveTo(x_ - size_f, y_1 - size_f);
	ctx.lineTo(x_, y_1);
	ctx.lineTo(x_ + size_f, y_1 - size_f);
	ctx.lineTo(x_, y_1);
	ctx.lineTo(x_, y_2);
	ctx.lineTo(x_ - size_f, y_2 + size_f);
	ctx.lineTo(x_, y_2);
	ctx.lineTo(x_ + size_f, y_2 + size_f);

	ctx.stroke();

}

function demiFlecheVerticale(ctx, x_, y_1, y_2) {
	var size_f = 3;
	var temp;

	if (y_1 < y_2) {
		temp = y_1;
		y_1 = y_2;
		y_2 = temp;
	}
	ctx.beginPath();
	ctx.strokeStyle = '#000000';
	ctx.lineTo(x_, y_1);
	ctx.lineTo(x_, y_2);
	ctx.lineTo(x_ - size_f, y_2 + size_f);
	ctx.lineTo(x_, y_2);
	ctx.lineTo(x_ + size_f, y_2 + size_f);

	ctx.stroke();

}