"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var interceptor_service_1 = require("./interceptor.service");
describe('InterceptorServiceService', function () {
    var service;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(interceptor_service_1.Interceptor);
    });
    it('should be created', function () {
        expect(service).toBeTruthy();
    });
});
