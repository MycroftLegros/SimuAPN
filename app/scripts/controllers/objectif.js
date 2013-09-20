'use strict';

angular.module('testYoAngularApp').controller('ObjectifCtrl', function($scope) {

    var _objectifJson = '{"objectifs": [{"nom": "14mm f/2.8", "focale": 14, "ouvertureMin": 2.8, "vr": false, "resolution": 0, "ac": 0, "nbCylindres": 7, "longueursPolygones": [10.3, 23.5, 17.5, 24.9], "diametresPolygones": [63.8, 76.9, 76.9, 87], "distancesPolygones": [5.9, 0, 4.4], "indiceBague": 4 }, {"nom": "16mm f/2.8", "focale": 16, "ouvertureMin": 2.8, "vr": false, "resolution": 0, "ac": 0, "nbCylindres": 7, "longueursPolygones": [9, 21, 9, 17], "diametresPolygones": [63, 61.9, 61.9, 60.8], "distancesPolygones": [0, 0, 1], "indiceBague": 4 }, {"nom": "20mm f/2.8", "focale": 20, "ouvertureMin": 2.8, "vr": false, "resolution": 15, "ac": 18, "nbCylindres": 7, "longueursPolygones": [10, 16.5, 10, 6], "diametresPolygones": [65.2, 65.2, 69, 66.5], "distancesPolygones": [0, 0, 0], "indiceBague": 4 }] }';
    var allObjectifs = JSON.parse(_objectifJson);

    $scope.model = {
        objectifs: [],
        selected: null
    };

    allObjectifs.objectifs.forEach(function(item) {
        $scope.model.objectifs.push(Objectif.fromJSON(item));
    });
});