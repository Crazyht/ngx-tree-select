"use strict";
var core_1 = require('@angular/core');
var OffClickDirective = (function () {
    function OffClickDirective() {
    }
    /* tslint:enable */
    OffClickDirective.prototype.onClick = function ($event) {
        $event.stopPropagation();
    };
    OffClickDirective.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () { document.addEventListener('click', _this.offClickkHandler); }, 0);
    };
    OffClickDirective.prototype.ngOnDestroy = function () {
        document.removeEventListener('click', this.offClickkHandler);
    };
    OffClickDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[cra-OffClick]'
                },] },
    ];
    /** @nocollapse */
    OffClickDirective.ctorParameters = function () { return []; };
    OffClickDirective.propDecorators = {
        'offClickkHandler': [{ type: core_1.Input, args: ['cra-OffClick',] },],
        'onClick': [{ type: core_1.HostListener, args: ['click', ['$event'],] },],
    };
    return OffClickDirective;
}());
exports.OffClickDirective = OffClickDirective;
//# sourceMappingURL=off-click.directive.js.map