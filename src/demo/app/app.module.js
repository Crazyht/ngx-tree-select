var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ExpandMode, NgxTreeSelectModule } from 'ngx-tree-select';
import { Ng2BootstrapModule } from 'ngx-bootstrap';
import { AppComponent } from './app.component';
import { FlatComponent } from './flat/flat.component';
import { HierarchicalComponent } from './hierarchical/hierarchical.component';
import { AppRoutes } from './app.routes';
import { SimpleValueComponent } from './simple-value/simple-value.component';
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        NgModule({
            imports: [
                BrowserModule,
                FormsModule,
                RouterModule.forRoot(AppRoutes),
                Ng2BootstrapModule.forRoot(),
                NgxTreeSelectModule.forRoot({
                    idField: 'id',
                    textField: 'name',
                    expandMode: ExpandMode.Selection
                })
            ],
            declarations: [
                AppComponent,
                FlatComponent,
                HierarchicalComponent,
                SimpleValueComponent
            ],
            bootstrap: [AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
export { AppModule };
//# sourceMappingURL=app.module.js.map