"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UpdateComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var UpdateComponent = /** @class */ (function () {
    function UpdateComponent(profile, router) {
        this.profile = profile;
        this.router = router;
        this.updateForm = new forms_1.FormGroup({
            name: new forms_1.FormControl(),
            surname: new forms_1.FormControl(),
            picture: new forms_1.FormControl(),
            phone: new forms_1.FormControl(),
            email: new forms_1.FormControl(),
            address: new forms_1.FormControl()
        });
        this.hasError = false;
        this.uploading = false;
        this.selectedFile = null;
        this.fileData = null;
    }
    UpdateComponent.prototype.onFileSelected = function ($event) {
        this.selectedFile = $event.target.files[0];
        this.uploading = true; //sakrivanje dugmeta u slucaju sporog upload-a
        this.readData();
        this.uploading = false;
    };
    UpdateComponent.prototype.readData = function () {
        var _this = this;
        var reader = new FileReader();
        if (this.selectedFile !== null) {
            reader.readAsDataURL(this.selectedFile);
            reader.onloadend = function () {
                if (reader.readyState === FileReader.DONE) {
                    _this.fileData = reader.result;
                }
            };
        }
    };
    UpdateComponent.prototype.update = function () {
        var _this = this;
        var passenger = {
            name: this.updateForm.value.name === null ? '' : this.updateForm.value.name,
            surname: this.updateForm.value.surname === null ? '' : this.updateForm.value.surname,
            profilePicture: this.fileData === null ? '' : this.fileData,
            telephoneNumber: this.updateForm.value.phone === null ? '' : this.updateForm.value.phone,
            email: this.updateForm.value.email === null ? '' : this.updateForm.value.email,
            address: this.updateForm.value.address === null ? '' : this.updateForm.value.address
        };
        this.profile.updatePassenger(passenger).subscribe({
            next: function (result) {
                _this.router.navigate(['profile/info']);
            },
            error: function (error) {
                _this.hasError = true;
            }
        });
    };
    UpdateComponent = __decorate([
        core_1.Component({
            selector: 'app-update',
            templateUrl: './update.component.html',
            styleUrls: ['./update.component.css']
        })
    ], UpdateComponent);
    return UpdateComponent;
}());
exports.UpdateComponent = UpdateComponent;
