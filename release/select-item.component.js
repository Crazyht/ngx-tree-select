"use strict";
var core_1 = require('@angular/core');
var TreeSelectItemComponent = (function () {
    function TreeSelectItemComponent() {
    }
    Object.defineProperty(TreeSelectItemComponent.prototype, "haveChildren", {
        get: function () {
            return this.item && this.item.children && this.item.children.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    TreeSelectItemComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'cra-select-item',
                    template: "\n<div class=\"ui-select-choices-row\"\n     [class.active]=\"item.selected\"\n     (click)=\"select($event)\">\n    <a href=\"javascript:void(0)\" class=\"dropdown-item\">\n        <div>{{item.text}}</div>\n    </a>\n</div>\n    "
                },] },
    ];
    /** @nocollapse */
    TreeSelectItemComponent.ctorParameters = function () { return []; };
    TreeSelectItemComponent.propDecorators = {
        'item': [{ type: core_1.Input },],
    };
    return TreeSelectItemComponent;
}());
exports.TreeSelectItemComponent = TreeSelectItemComponent;
//# sourceMappingURL=select-item.component.js.map