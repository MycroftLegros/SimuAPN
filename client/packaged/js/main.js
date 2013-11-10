;(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var FlouDeMAPView = require('./view/fenetres/FlouDeMAPView');
var Sujet = require('./model/Sujet');

window.onload = function() {
    // Init model
    var sujets = [
        new Sujet("Masque", 10),
        new Sujet("Walt", 30),
        new Sujet("Camion", 100)
    ];

    // Init views
    new FlouDeMAPView(sujets);
};
},{"./model/Sujet":2,"./view/fenetres/FlouDeMAPView":3}],2:[function(require,module,exports){
Sujet = function(nom, distance) {
    this.nom = nom;
    this.distance = distance;
};

module.exports = Sujet;
},{}],3:[function(require,module,exports){
var COLORS = [
    "red",
    "green",
    "blue"
];

FlouDeMAPView = function(sujets) {
    console.log("init FlouDeMAPView");

    this.dom = {
        root: document.getElementById("FlouDeMAPView"),
        canvas: document.getElementById("FlouDeMAPCanvas")
    };

    this.sujets = sujets;

    this.render();
};

FlouDeMAPView.prototype.render = function() {

    var ct = this.dom.canvas.getContext('2d');
    this.dom.canvas.width = 200;
    this.dom.canvas.height = 50;

    var distanceMax = this.sujets.reduce(function(previousValue, currentValue){
        return previousValue.distance > currentValue.distance ? previousValue : currentValue;
    }).distance;

    this.sujets.forEach(function(sujet, index){
        var positionEnPixels = Math.round(sujet.distance *  200 / (1.25 * distanceMax));
        ct.fillStyle = COLORS[index];
        ct.fillText(sujet.distance.toFixed(2) + 'm', positionEnPixels, 50-10*index);
    });

    /*
    var ct = this.dom.canvas.getContext('2d');

    var temp, temp2;
    var i;

    this.dom.canvas.width = 100;
    this.dom.canvas.height = 35;


    if (flag_clicPdc === 0 && flag_clicDistances === 0)
        d_DernierPoint = 1.5 * d_arrierePlan;

    //Fond
    ct.fillStyle = 'rgba(255,255,255,0.9)';

    ct.beginPath();
    ct.fillRect(0, 0, cvs.width - 1, cvs.height - 1);

    //--Axes
    demiFlecheHorizontale(ct, marge_Y_haut_cvs_PDC + h_cvs_Pdc - 1, marge_X_cvs_PDC, w_cvs_Pdc + marge_X_cvs_PDC - 1);
    demiFlecheVerticale(ct, marge_X_cvs_PDC, marge_Y_haut_cvs_PDC + h_cvs_Pdc - 1, marge_Y_haut_cvs_PDC);


    //--Noms des axes
    ct.fillStyle = '#000000';
    ct.font = "italic  12px 'Trebuchet MS'";
    ct.fillText(translateName("flou"), 2, marge_Y_haut_cvs_PDC + 10);
    ct.fillText('distance', w_cvs_Pdc + marge_X_cvs_PDC - 15, marge_Y_haut_cvs_PDC + h_cvs_Pdc + 15);
    ct.font = "12px 'Trebuchet MS'";
    //--Regarde les extrémums et calcul les coeff de flou et distance vers pixel

    var f_m = focale / 1000; //focale en m
    var k_flou = h_cvs_Pdc / Y_m_cvs_pdc; //convertion m / px pour les tailles de flou
    var k_distance = w_cvs_Pdc / d_DernierPoint; //convertion m / px pour les distances


    //--Trace la courbe de flou de mise au point
    ct.strokeStyle = 'rgb(' + color_pdc + ')';
    ct.lineWidth = 1;
    ct.beginPath();

    for (i = 0; i !== w_cvs_Pdc - 1; i++) {

        temp2 = i / k_distance;

        //pour être sûr de placer un point à d_map
        if (temp2 < d_map2 && ((i + 1) / k_distance) > d_map2 && ((d_map2 - temp2) <= ((i + 1) / k_distance - d_map2)))
            temp2 = d_map2;
        else if (i > 0 && ((i - 1) / k_distance) < d_map2 && temp2 > d_map2 && ((d_map2 - temp2) > ((i + 1) / k_distance - d_map2)))
            temp2 = d_map2;

        //calcul du flou en m
        if (temp2 === d_map2)
            temp = 0;
        else if (temp2 < d_map2)
            temp = (f_m * f_m * (d_map2 - temp2)) / (ouverture * temp2 * (d_map2 - f_m));
        else
            temp = (f_m * f_m * (temp2 - d_map2)) / (ouverture * temp2 * (d_map2 - f_m));

        //trace le point
        if (i === 0)
            ct.moveTo(i + marge_X_cvs_PDC, marge_Y_haut_cvs_PDC + h_cvs_Pdc - k_flou * temp);
        else
            ct.lineTo(i + marge_X_cvs_PDC, marge_Y_haut_cvs_PDC + h_cvs_Pdc - k_flou * temp);

    }
    ct.stroke();

    //Trait au niveau du flou d'avant plan
    ct.fillStyle = 'rgb(' + color_avantPlan + ')';


    temp = k_distance * d_avantPlan; //distance en px
    //temp2 = (f_m * f_m * (d_map - d_avantPlan)) / (ouverture * d_avantPlan * (d_map - f_m)); //flou en m
    temp2 = flouAvantPlan;
    if (d_avantPlan < d_min)
        temp2 = 0;

    ct.fillRect(marge_X_cvs_PDC + temp, marge_Y_haut_cvs_PDC + h_cvs_Pdc - k_flou * temp2, 1, k_flou * temp2);
    ct.fillText(d_avantPlan.toFixed(2) + 'm', marge_X_cvs_PDC + temp - 5, marge_Y_haut_cvs_PDC + h_cvs_Pdc + 10);

    if (distanceSelectionnee === 'av') {
        ct.beginPath();
        ct.arc(marge_X_cvs_PDC + temp, marge_Y_haut_cvs_PDC + h_cvs_Pdc, 3, 0, 2 * Math.PI);
        ct.fill();
    }


    //Distance de map
    ct.fillStyle = 'rgb(' + color_map + ')';
    temp = k_distance * d_map; //distance en px
    temp2 = flouSujet;
    ct.fillRect(marge_X_cvs_PDC + temp, marge_Y_haut_cvs_PDC + h_cvs_Pdc - k_flou * temp2, 1, k_flou * temp2);
    ct.fillText(d_map.toFixed(2) + 'm', marge_Y_haut_cvs_PDC + marge_X_cvs_PDC + temp - 5, marge_Y_haut_cvs_PDC + h_cvs_Pdc + 20);


    if (distanceSelectionnee === 'map') {
        ct.beginPath();
        ct.arc(marge_X_cvs_PDC + temp, marge_Y_haut_cvs_PDC + h_cvs_Pdc, 3, 0, 2 * Math.PI);
        ct.fill();
    }


    //Trait au niveau du flou d'arrière plan
    ct.fillStyle = 'rgb(' + color_arrierePlan + ')';
    temp = k_distance * d_arrierePlan; //distance en px
    temp2 = flouArrierePlan;
    ct.beginPath();

    ct.fillRect(marge_X_cvs_PDC + temp, marge_Y_haut_cvs_PDC + h_cvs_Pdc - k_flou * temp2, 1, k_flou * temp2);
    ct.fillText(d_arrierePlan.toFixed(2) + 'm', marge_X_cvs_PDC + temp - 5, marge_Y_haut_cvs_PDC + h_cvs_Pdc + 30);

    if (distanceSelectionnee === 'ar') {
        ct.beginPath();
        ct.arc(marge_X_cvs_PDC + temp, marge_Y_haut_cvs_PDC + h_cvs_Pdc, 3, 0, 2 * Math.PI);
        ct.fill();
    }


    ct.font = "12px 'Trebuchet MS'";

    //Rectangle pour marquer la pdC
    ct.fillStyle = 'rgba(' + color_cdc + ',0.15)';
    temp = k_distance * debutPDC; //distance en px
    temp2 = k_distance * finPDC; //distance en px

    if (temp2 > w_cvs_Pdc)
        temp2 = w_cvs_Pdc;

    //ct.beginPath();
    ct.fillRect(marge_X_cvs_PDC + temp, marge_Y_haut_cvs_PDC, temp2 - temp, h_cvs_Pdc);


    //Cdc
    temp = k_flou * cdc;

    if (temp < h_cvs_Pdc) {

        ct.fillStyle = 'rgb(' + color_cdc + ')';
        ct.fillText(translateName("cdc_abv"), 7, h_cvs_Pdc - temp + 4);
        ct.fillStyle = 'rgba(' + color_cdc + ',0.35)';
        ct.fillRect(marge_X_cvs_PDC, marge_Y_haut_cvs_PDC + h_cvs_Pdc - temp, w_cvs_Pdc, 1);

    }

    //Echelle: 0.1,1,10,1000 ou 1000px
    if (Y_m_cvs_pdc > 1000 * taillePixel)
        temp = 1000;
    else if (Y_m_cvs_pdc > 100 * taillePixel)
        temp = 100;
    else if (Y_m_cvs_pdc > 10 * taillePixel)
        temp = 10;
    else if (Y_m_cvs_pdc > 1 * taillePixel)
        temp = 1;
    else
        temp = 0.1;

    temp2 = k_flou * temp * taillePixel;
    flecheVerticale(ct, w_cvs_Pdc + marge_X_cvs_PDC + 2, marge_Y_haut_cvs_PDC + h_cvs_Pdc, marge_Y_haut_cvs_PDC + h_cvs_Pdc - temp2);
    ct.fillStyle = "#333333";
    ct.fillText(temp + 'px', w_cvs_Pdc + marge_X_cvs_PDC + 3, marge_Y_haut_cvs_PDC + h_cvs_Pdc - temp2 / 2 + 3);
    */
};

FlouDeMAPView.prototype.drawSujet = function(sujet) {


};

module.exports = FlouDeMAPView;
},{}]},{},[1])
;