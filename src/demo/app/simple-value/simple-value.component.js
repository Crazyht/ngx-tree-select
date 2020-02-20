var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Component } from '@angular/core';
var SimpleValueComponent = /** @class */ (function () {
    function SimpleValueComponent() {
        this.items = [
            'Jacques',
            'Jad',
            'Jana',
            'Jasmine',
            'Jeremie',
            'Jeremy',
            'Joachim',
            'Johan',
            'Johanna',
            'Jonathan',
            'Jordan',
            'Joseph',
            'Jules',
            'Justin'
        ];
        this.ShowFilter = true;
        this.Disabled = false;
        this.FilterPlaceholder = 'Type here to filter elements...';
        this.MaxDisplayed = 5;
        this.simpleSelected = 'Jeremy';
        this.multipleSelected = ['Jeremy', 'Jordan'];
    }
    SimpleValueComponent = __decorate([
        Component({
            selector: 'simple-value-sample',
            templateUrl: './simple-value.component.html'
        })
    ], SimpleValueComponent);
    return SimpleValueComponent;
}());
export { SimpleValueComponent };
//# sourceMappingURL=simple-value.component.js.map