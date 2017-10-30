"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var tree_select_default_options_1 = require("./model/tree-select-default-options");
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var forms_1 = require("@angular/forms");
var tree_select_component_1 = require("./component/tree-select.component");
var tree_select_item_component_1 = require("./component/tree-select-item.component");
var off_click_directive_1 = require("./directive/off-click.directive");
var item_pipe_1 = require("./pipe/item.pipe");
var isVisible_pipe_1 = require("./pipe/isVisible.pipe");
var NgxTreeSelectModule = NgxTreeSelectModule_1 = (function () {
    function NgxTreeSelectModule() {
    }
    NgxTreeSelectModule.forRoot = function (options) {
        return {
            ngModule: NgxTreeSelectModule_1,
            providers: [
                { provide: tree_select_default_options_1.TreeSelectDefaultOptions, useValue: options }
            ]
        };
    };
    return NgxTreeSelectModule;
}());
NgxTreeSelectModule = NgxTreeSelectModule_1 = __decorate([
    core_1.NgModule({
        imports: [
            common_1.CommonModule,
            forms_1.FormsModule
        ],
        declarations: [
            tree_select_component_1.TreeSelectComponent,
            tree_select_item_component_1.TreeSelectItemComponent,
            off_click_directive_1.OffClickDirective,
            item_pipe_1.ItemPipe,
            isVisible_pipe_1.IsVisiblePipe
        ],
        exports: [
            tree_select_component_1.TreeSelectComponent
        ]
    })
], NgxTreeSelectModule);
exports.NgxTreeSelectModule = NgxTreeSelectModule;
var NgxTreeSelectModule_1;
//# sourceMappingURL=module.js.map