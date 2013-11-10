'use strict';

angular.module('testYoAngularApp').service('distancePainter', function distancePainter() {
    
    var HAUTEUR = 55;
    var LARGEUR = 400;
    var MARGE_X = 10;
    var H_AXE = 20;
    var DEMI_H_TRAIT_D = 20;
    var K_DISTANCE = LARGEUR / 19; // TODO utiliser cette variable à la place du 19 d_dernier_point; //pour passer d'une distance en m à des px

    var canvas = document.getElementById('display-distances');
    var context = canvas.getContext('2d');
    canvas.height = HAUTEUR;
    context.fillStyle = '#777777';
    
    this.drawDistances = function drawDistances(sujets) {

        if (canvas) {
            canvas.width = LARGEUR + 2 * MARGE_X;
            this._paintDemiFlecheH(context, H_AXE, MARGE_X, LARGEUR + MARGE_X);

            //--Regarde les extrémums et calcul les coeff de flou et distance vers pixel
            // var f_m = $objectif.focale / 1000; //focale en m
            sujets.forEach(function(sujet) {
                this._paintSujet(sujet);
            }.bind(this));

            this._paintMAP();
        }
    };

    this._paintDemiFlecheH = function _paintDemiFlecheH(ctx, y, x_1, x_2) {

        var size_f = 5;

        y+=0.5;

        ctx.beginPath();
        ctx.strokeStyle = '#000000';
        ctx.moveTo(x_1, y);
        ctx.lineTo(x_2, y);
        ctx.lineTo(x_2 - size_f, y - size_f);
        ctx.moveTo(x_2, y);
        ctx.lineTo(x_2 - size_f, y + size_f);
        ctx.stroke();
    };

    this._paintSujet = function _paintSujet(sujet) {
        var distance = K_DISTANCE * sujet.distance; //distance en px
        context.fillStyle = 'rgb(' + sujet.couleur + ')';
        context.font = "12px 'Trebuchet MS'";
        context.beginPath();
        context.fillRect(MARGE_X + distance, H_AXE - DEMI_H_TRAIT_D, 1, 1 + DEMI_H_TRAIT_D);
        context.beginPath();
        context.fillText(sujet.printableDistance() + 'm', MARGE_X + distance - 5, H_AXE + 12);
    };

    this._paintMAP = function _paintMAP() {
        //map
        context.fillStyle = 'rgb(51,102,204)';
        var d_map = 6.75; //distance de map en m
        var w_cvs_Distances = 400;
        var d_arrierePlan = 11.35; //distance de l'arrière plan en m
        var d_DernierPoint = 1.5 * d_arrierePlan;
        var k = w_cvs_Distances / d_DernierPoint; //pour conversion m / px
        var temp = k * d_map;
        var h_trait = 15; //hauteur des traits, en px
        var marge_X_distances = 10;
        var Y_axe = 17.5; //position Y de l'axe dans le canvas
        var color_temp;
        for (var i = 0.01; i < 0.5; i += 1 / k) {
            color_temp = this._distance2PdcColor(i).color;
            context.fillStyle = 'rgba(' + color_temp + ',0.3)';
            console.log("fill",marge_X_distances+k*i);
            context.fillRect(marge_X_distances + k * i, 0, 10, HAUTEUR - 1);

        }
    };

    this._distance2PdcColor = function _distance2PdcColor(distance) {
        // var temp = focale / 1000; //en m
        var temp = 50 / 1000; //en m
        var flou = 0;
        var d_map = 6.75; //distance de map en m
        var cdc = 1.0; //cdc en m

        //Calcul de la valeur du flou
        if (distance < d_map) {
            // flou = (temp * temp * (d_map - distance)) / (ouverture * distance * (d_map - temp));
            flou = (temp * temp * (d_map - distance)) / (5.6 * distance * (d_map - temp));
        }
        else if (distance > d_map) {
            flou = (temp * temp * (distance - d_map)) / (5.6 * distance * (d_map - temp));
        }
        else  {
            flou = 0;
        }

        var color_pdc = '220,57,18';
        var RVB = color_pdc.split(',');

        var k = Math.sqrt(cdc / (flou));

        var R = k * RVB[0];
        var V = k * RVB[1];
        var B = k * RVB[2];

        R = Math.round(R);
        V = Math.round(V);
        B = Math.round(B);

        return {
            color: R + "," + V + "," + B
        };
    };
});