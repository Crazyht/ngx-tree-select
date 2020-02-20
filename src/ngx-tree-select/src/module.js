var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ItemPipe } from './pipes/item.pipe';
import { NgModule } from '@angular/core';
import { OffClickDirective } from './directives/off-click.directive';
import { TreeSelectComponent } from './components/tree-select.component';
import { TreeSelectDefaultOptions } from './models/tree-select-default-options';
import { TreeSelectItemComponent } from './components/tree-select-item.component';
var NgxTreeSelectModule = /** @class */ (function () {
    function NgxTreeSelectModule() {
    }
    NgxTreeSelectModule_1 = NgxTreeSelectModule;
    NgxTreeSelectModule.forRoot = function (options) {
        return {
            ngModule: NgxTreeSelectModule_1,
            providers: [
                { provide: TreeSelectDefaultOptions, useValue: options }
            ]
        };
    };
    NgxTreeSelectModule = NgxTreeSelectModule_1 = __decorate([
        NgModule({
            imports: [
                CommonModule,
                FormsModule
            ],
            declarations: [
                TreeSelectComponent,
                TreeSelectItemComponent,
                OffClickDirective,
                ItemPipe
            ],
            exports: [
                TreeSelectComponent
            ]
        })
    ], NgxTreeSelectModule);
    return NgxTreeSelectModule;
    var NgxTreeSelectModule_1;
}());
export { NgxTreeSelectModule };
//# sourceMappingURL=module.js.map