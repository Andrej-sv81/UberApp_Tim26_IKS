"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ReportComponent = void 0;
var core_1 = require("@angular/core");
var chart_js_1 = require("node_modules/chart.js");
chart_js_1.Chart.register.apply(chart_js_1.Chart, chart_js_1.registerables);
var ReportComponent = /** @class */ (function () {
    function ReportComponent(service) {
        this.service = service;
        this.labels = ['JAN', 'FEB', "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    }
    ReportComponent.prototype.ngOnInit = function () {
        var data1 = this.service.ReturnMonthlyRides();
        var data2 = this.service.ReturnMonthlyEarnings();
        this.RenderChart1(data1);
        this.RenderChart2(data2);
    };
    ReportComponent.prototype.RenderChart1 = function (data1) {
        var data = {
            labels: this.labels,
            datasets: [{
                    axis: 'x',
                    label: 'Number of Rides',
                    data: data1,
                    fill: false,
                    backgroundColor: [
                        'rgba(0, 0, 0, 0.8)',
                    ],
                    borderColor: [
                        'rgb(255, 99, 132)',
                    ],
                    borderWidth: 1
                }]
        };
        var mychart = new chart_js_1.Chart("chart", {
            type: 'bar',
            data: data,
            options: {
                indexAxis: 'x'
            }
        });
    };
    ReportComponent.prototype.RenderChart2 = function (data2) {
        var data = {
            labels: this.labels,
            datasets: [{
                    axis: 'x',
                    label: 'Monthly Earnings',
                    data: data2,
                    fill: false,
                    backgroundColor: [
                        'rgba(0, 120, 255, 0.8)',
                    ],
                    borderColor: [
                        'rgb(255, 99, 132)',
                    ],
                    borderWidth: 1
                }]
        };
        var mychart = new chart_js_1.Chart("chart2", {
            type: 'bar',
            data: data,
            options: {
                indexAxis: 'x'
            }
        });
    };
    ReportComponent = __decorate([
        core_1.Component({
            selector: 'app-report',
            templateUrl: './report.component.html',
            styleUrls: ['./report.component.css']
        })
    ], ReportComponent);
    return ReportComponent;
}());
exports.ReportComponent = ReportComponent;
