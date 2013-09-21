'use strict';

describe('Service: distancePainter', function () {

  // load the service's module
  beforeEach(module('testYoAngularApp'));

  // instantiate service
  var distancePainter;
  beforeEach(inject(function (_distancePainter_) {
    distancePainter = _distancePainter_;
  }));

  it('should do something', function () {
    expect(!!distancePainter).toBe(true);
  });

});
