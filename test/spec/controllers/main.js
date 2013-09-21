'use strict';

describe('Le controller principal', function () {

    // load the controller's module
    beforeEach(module('testYoAngularApp'));
  
    var MainCtrl, scope;
  
    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        MainCtrl = $controller('MainCtrl', {
            $scope: scope
        });
    }));
  
    it('doit créer une liste d\'objectifs dans le scope', function() {
        expect(scope.model.objectifs.length).toBe(14);
    });

    it('doit créer une 3 sujets dans le scope', function() {
        expect(scope.model.sujets.length).toBe(3);
    });
});
