'use strict';

describe('Service: objectf', function () {

  // load the service's module
  beforeEach(module('testYoAngularApp'));

  // instantiate service
  var objectf;
  beforeEach(inject(function (_objectf_) {
    objectf = _objectf_;
  }));

  it('should do something', function () {
    expect(!!objectf).toBe(true);
  });

});
