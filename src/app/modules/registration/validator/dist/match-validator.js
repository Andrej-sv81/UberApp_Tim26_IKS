"use strict";
exports.__esModule = true;
exports.CustomValidators = void 0;
var CustomValidators = /** @class */ (function () {
    function CustomValidators() {
    }
    CustomValidators.MatchValidator = function (source, target) {
        return function (control) {
            var sourceCtrl = control.get(source);
            var targetCtrl = control.get(target);
            return sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value
                ? { mismatch: true }
                : null;
        };
    };
    return CustomValidators;
}());
exports.CustomValidators = CustomValidators;
