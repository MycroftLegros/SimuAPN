var tailleDeLaPointeDeLaFleche = 3;

DrawingHelper = function() {};

DrawingHelper.demiFlecheHorizontale = function(ct, y, xDebut, xFin, couleur) {

    var temp;

    if (xFin < xDebut) {
        temp = xDebut;
        xDebut = xFin;
        xFin = temp;
    }
    ct.beginPath();
    ct.strokeStyle = couleur;
    ct.moveTo(xDebut, y);
    ct.lineTo(xFin, y);
    ct.lineTo(xFin - tailleDeLaPointeDeLaFleche, y - tailleDeLaPointeDeLaFleche);
    ct.lineTo(xFin, y);
    ct.lineTo(xFin - tailleDeLaPointeDeLaFleche, y + tailleDeLaPointeDeLaFleche);
    ct.stroke();
};


DrawingHelper.flecheHorizontale = function(ct, y, xDebut, xFin, couleur) {

    var temp;

    if (xFin < xDebut) {
        temp = xDebut;
        xDebut = xFin;
        xFin = temp;
    }
    ct.strokeStyle = couleur;
    ct.beginPath();
    ct.moveTo(xDebut + tailleDeLaPointeDeLaFleche, y - tailleDeLaPointeDeLaFleche);
    ct.lineTo(xDebut, y);
    ct.lineTo(xDebut + tailleDeLaPointeDeLaFleche, y + tailleDeLaPointeDeLaFleche);
    ct.lineTo(xDebut, y);
    ct.lineTo(xFin, y);
    ct.lineTo(xFin - tailleDeLaPointeDeLaFleche, y - tailleDeLaPointeDeLaFleche);
    ct.lineTo(xFin, y);
    ct.lineTo(xFin - tailleDeLaPointeDeLaFleche, y + tailleDeLaPointeDeLaFleche);
    ct.stroke();
};

DrawingHelper.flecheVerticale = function(ct, x, yDebut, yFin, couleur) {

    var temp;

    if (yDebut < yFin) {
        temp = yDebut;
        yDebut = yFin;
        yFin = temp;
    }

    ct.beginPath();
    ct.strokeStyle = couleur;
    ct.moveTo(x - tailleDeLaPointeDeLaFleche, yDebut - tailleDeLaPointeDeLaFleche);
    ct.lineTo(x, yDebut);
    ct.lineTo(x + tailleDeLaPointeDeLaFleche, yDebut - tailleDeLaPointeDeLaFleche);
    ct.lineTo(x, yDebut);
    ct.lineTo(x, yFin);
    ct.lineTo(x - tailleDeLaPointeDeLaFleche, yFin + tailleDeLaPointeDeLaFleche);
    ct.lineTo(x, yFin);
    ct.lineTo(x + tailleDeLaPointeDeLaFleche, yFin + tailleDeLaPointeDeLaFleche);

    ct.stroke();

};

DrawingHelper.demiFlecheVerticale = function(ct, x, yDebut, yFin, couleur) {

    var temp;

    if (yDebut < yFin) {
        temp = yDebut;
        yDebut = yFin;
        yFin = temp;
    }
    ct.beginPath();
    ct.strokeStyle = couleur;
    ct.lineTo(x, yDebut);
    ct.lineTo(x, yFin);
    ct.lineTo(x - tailleDeLaPointeDeLaFleche, yFin + tailleDeLaPointeDeLaFleche);
    ct.lineTo(x, yFin);
    ct.lineTo(x + tailleDeLaPointeDeLaFleche, yFin + tailleDeLaPointeDeLaFleche);

    ct.stroke();

};

module.exports = DrawingHelper;