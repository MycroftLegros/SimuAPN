'use strict';

angular.module('testYoAngularApp').service('distancePainter', function distancePainter() {
    this.drawDistances = function drawDistances(sujets) {

        var HAUTEUR = 55;
        var LARGEUR = 400;
        var MARGE_X = 10;
        var H_AXE = 20;
        
        var canvas = document.getElementById('display-distances');

        // TODO sécurité pour les tests, à virer
        if (canvas) {
            canvas.width = LARGEUR + 2 * MARGE_X;
            canvas.height = HAUTEUR;

            var context = canvas.getContext('2d');

            //--Axes
            context.fillStyle = '#777777';
            this.printDemiFlecheH(context, H_AXE, MARGE_X, LARGEUR + MARGE_X);

            //--Regarde les extrémums et calcul les coeff de flou et distance vers pixel
            // var f_m = $objectif.focale / 1000; //focale en m
            var k_distance = LARGEUR / 19; // TODO utiliser cette variable à la place du 19 d_dernier_point; //pour passer d'une distance en m à des px


            var demi_h_trait_d = 20;


            sujets.forEach(function(sujet) {
                this.printSujet(sujet, context, k_distance, MARGE_X, H_AXE, demi_h_trait_d);
            }.bind(this));
        }
    };

    this.printDemiFlecheH = function printDemiFlecheH(ctx, y_, x_1, x_2) {

        var size_f = 3;
        var temp;

        if (x_2 < x_1) {
            temp = x_1;
            x_1 = x_2;
            x_2 = temp;
        }

        ctx.beginPath();
        ctx.strokeStyle = '#000000';
        ctx.lineTo(x_1, y_);
        ctx.lineTo(x_2, y_);
        ctx.lineTo(x_2 - size_f, y_ - size_f);
        ctx.lineTo(x_2, y_);
        ctx.lineTo(x_2 - size_f, y_ + size_f);
        ctx.stroke();
    };

    this.printSujet = function printSujet(sujet, context, k_distance, MARGE_X, H_AXE, demi_h_trait_d) {
        context.fillStyle = 'rgb(' + sujet.couleur + ')';
        context.font = "12px 'Trebuchet MS'";
        var distance = k_distance * sujet.distance; //distance en px
        context.beginPath();
        context.fillRect(MARGE_X + distance, H_AXE - demi_h_trait_d, 1, 1 + demi_h_trait_d);
        context.beginPath();
        context.fillText(sujet.printableDistance() + 'm', MARGE_X + distance - 5, H_AXE + 12);
    };
});