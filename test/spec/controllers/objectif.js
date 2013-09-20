'use strict';

describe('Controller: ObjectifCtrl', function() {

    // load the controller's module
    beforeEach(module('testYoAngularApp'));
  
    var ObjectifCtrl, scope;
  
    // Initialize the controller and a mock scope
    beforeEach(inject(function($controller, $rootScope) {
        scope = $rootScope.$new();
        ObjectifCtrl = $controller('ObjectifCtrl', {
            $scope: scope
        });
    }));
  
    it('should attach a list of objectif to the scope', function() {
        expect(scope.model.objectifs.length).toBe(3);
    });
});