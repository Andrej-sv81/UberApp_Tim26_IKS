"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var driver_service_1 = require("./driver.service");
describe('DriverServiceService', function () {
    var service;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(driver_service_1.DriverService);
    });
    it('should be created', function () {
        expect(service).toBeTruthy();
    });
});
