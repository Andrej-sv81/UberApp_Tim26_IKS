"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.StarRatingColor = exports.ReviewComponent = void 0;
var core_1 = require("@angular/core");
var ReviewComponent = /** @class */ (function () {
    function ReviewComponent(route, service, router) {
        this.route = route;
        this.service = service;
        this.router = router;
        this.rating1 = 0;
        this.rating2 = 0;
        this.review1 = "";
        this.review2 = "";
        this.touched1 = false;
        this.touched2 = false;
        this.starCount = 5;
        this.color = 'accent';
        this.ratingArr = [];
    }
    ReviewComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            _this.id = params['id'];
        });
        for (var index = 0; index < this.starCount; index++) {
            this.ratingArr.push(index);
        }
    };
    ReviewComponent.prototype.onClick1 = function (rating) {
        this.rating1 = rating;
        this.touched1 = true;
        return false;
    };
    ReviewComponent.prototype.onClick2 = function (rating) {
        this.rating2 = rating;
        this.touched2 = true;
        return false;
    };
    ReviewComponent.prototype.showIcon1 = function (index) {
        if (this.rating1 >= index + 1) {
            return 'star';
        }
        else {
            return 'star_border';
        }
    };
    ReviewComponent.prototype.showIcon2 = function (index) {
        if (this.rating2 >= index + 1) {
            return 'star';
        }
        else {
            return 'star_border';
        }
    };
    ReviewComponent.prototype.sendReviews = function () {
        if (this.touched1) {
            this.sendDriverReview();
        }
        if (this.touched2) {
            this.sendVehicleReview();
        }
        this.router.navigate(['profile/history']);
    };
    ReviewComponent.prototype.sendDriverReview = function () {
        var reviewBody = {
            rating: this.rating1,
            comment: this.review1
        };
        this.service.sendReviewDriver(reviewBody, this.id).subscribe(function (result) {
        });
    };
    ReviewComponent.prototype.sendVehicleReview = function () {
        var reviewBody = {
            rating: this.rating2,
            comment: this.review2
        };
        this.service.sendReviewVehicle(reviewBody, this.id).subscribe(function (result) {
        });
    };
    ReviewComponent = __decorate([
        core_1.Component({
            selector: 'app-review',
            templateUrl: '../review.component.html',
            styleUrls: ['../review.component.css'],
            encapsulation: core_1.ViewEncapsulation.Emulated
        })
    ], ReviewComponent);
    return ReviewComponent;
}());
exports.ReviewComponent = ReviewComponent;
var StarRatingColor;
(function (StarRatingColor) {
    StarRatingColor["primary"] = "primary";
    StarRatingColor["accent"] = "accent";
    StarRatingColor["warn"] = "warn";
})(StarRatingColor = exports.StarRatingColor || (exports.StarRatingColor = {}));
