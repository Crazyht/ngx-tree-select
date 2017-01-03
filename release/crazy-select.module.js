"use strict";
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var select_component_1 = require('./select.component');
var select_item_component_1 = require('./select-item.component');
var off_click_directive_1 = require('./off-click.directive');
var CrazySelectModule = (function () {
    function CrazySelectModule() {
    }
    /* optional: in case you need users to override your providers */
    CrazySelectModule.forRoot = function (configuredProviders) {
        return {
            ngModule: CrazySelectModule,
            providers: configuredProviders
        };
    };
    CrazySelectModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [
                        common_1.CommonModule
                    ],
                    declarations: [
                        select_component_1.TreeSelectComponent,
                        select_item_component_1.TreeSelectItemComponent,
                        off_click_directive_1.OffClickDirective
                    ],
                    exports: [
                        select_component_1.TreeSelectComponent
                    ]
                },] },
    ];
    /** @nocollapse */
    CrazySelectModule.ctorParameters = function () { return []; };
    return CrazySelectModule;
}());
exports.CrazySelectModule = CrazySelectModule;
//# sourceMappingURL=crazy-select.module.js.map