"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var hierarchical_data_1 = require("../../datas/hierarchical-data");
var AppComponent = (function () {
    function AppComponent() {
        this.selectedItems1 = null;
        this.selectedItems2 = [
            { id: 2, text: 'item 2' },
            { id: 3, text: 'item 3' },
        ];
        this.selectedItems3 = {
            id: 'LU',
            name: 'Luxembourg',
            capital: 'Luxembourg',
            phone: '352',
            currency: 'EUR'
        };
        this.selectedItems4 = [
            {
                id: 'LU',
                name: 'Luxembourg',
                capital: 'Luxembourg',
                phone: '352',
                currency: 'EUR'
            },
            {
                id: 'FR',
                name: 'France',
                capital: 'Paris',
                phone: '33',
                currency: 'EUR'
            }
        ];
        this.disabledSelectedItems1 = { id: 1, text: 'item 1' };
        this.disabledSelectedItems2 = [
            { id: 1, text: 'item 1' },
            { id: 2, text: 'item 2' }
        ];
        this.disabledSelectedItems3 = { id: 11, text: 'item 1.1' };
        this.disabledSelectedItems4 = [
            { id: 21, text: 'item 2.1' },
            { id: 22, text: 'item 2.2' },
            { id: 23, text: 'item 2.3' }
        ];
        this.items = [
            { id: 1, text: 'item 1' },
            { id: 2, text: 'item 2' },
            { id: 3, text: 'item 3' },
            { id: 4, text: 'item 4' },
            { id: 5, text: 'item 5' },
        ];
        this.itemsTree = hierarchical_data_1.HierarchicalCountries;
    }
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'demo-app',
        templateUrl: './app.component.html'
    })
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map