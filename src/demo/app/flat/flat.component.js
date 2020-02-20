var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@angular/core';
import { FlatCountries } from '../../../datas';
var FlatComponent = /** @class */ (function () {
    function FlatComponent() {
        this.items = FlatCountries;
        this.ShowFilter = true;
        this.Disabled = false;
        this.FilterPlaceholder = 'Type here to filter elements...';
        this.MaxDisplayed = 5;
        this.simpleSelected = {
            id: 'LU',
            name: 'Luxembourg',
            capital: 'Luxembourg',
            phone: '352',
            currency: 'EUR'
        };
        this.multipleSelected = [
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
    }
    FlatComponent = __decorate([
        Component({
            selector: 'flat-sample',
            templateUrl: './flat.component.html'
        })
    ], FlatComponent);
    return FlatComponent;
}());
export { FlatComponent };
//# sourceMappingURL=flat.component.js.map