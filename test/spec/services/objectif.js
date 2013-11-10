'use strict';

describe('Service: objectif', function () {

  // load the service's module
  beforeEach(module('testYoAngularApp'));

  // instantiate service
  var objectif;
  beforeEach(inject(function (_objectif_) {
    objectif = _objectif_;
  }));

  it('should do something', function () {
    expect(!!objectif).toBe(true);
  });

});
