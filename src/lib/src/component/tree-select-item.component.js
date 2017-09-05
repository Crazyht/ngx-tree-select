"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var selectable_item_1 = require("../model/selectable-item");
var select_service_1 = require("../service/select.service");
var TreeSelectItemComponent = (function () {
    function TreeSelectItemComponent(svc) {
        this.svc = svc;
    }
    Object.defineProperty(TreeSelectItemComponent.prototype, "isOpen", {
        get: function () {
            return this.item.isOpen;
        },
        enumerable: true,
        configurable: true
    });
    TreeSelectItemComponent.prototype.toggleOpen = function ($event) {
        $event.stopPropagation();
        if (this.haveChildren) {
            this.item.isOpen = !this.item.isOpen;
        }
        else {
            this.select($event);
        }
    };
    Object.defineProperty(TreeSelectItemComponent.prototype, "onlySelectParent", {
        get: function () {
            return this.svc.Configuration.onlySelectParent;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeSelectItemComponent.prototype, "needCheckBox", {
        get: function () {
            return this.svc.Configuration.isHierarchy() && this.svc.Configuration.allowMultiple;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeSelectItemComponent.prototype, "haveChildren", {
        get: function () {
            return this.item && this.item.children && this.item.children.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    TreeSelectItemComponent.prototype.select = function ($event) {
        $event.stopPropagation();
        if (this.svc.Configuration.allowMultiple || !this.haveChildren || this.svc.Configuration.onlySelectParent) {
            this.svc.toggleItemSelection(this.item);
        }
        this.onTouchedCallBack();
    };
    Object.defineProperty(TreeSelectItemComponent.prototype, "filter", {
        get: function () {
            return this.svc.Configuration.filter;
        },
        enumerable: true,
        configurable: true
    });
    return TreeSelectItemComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Function)
], TreeSelectItemComponent.prototype, "onTouchedCallBack", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", selectable_item_1.SelectableItem)
], TreeSelectItemComponent.prototype, "item", void 0);
TreeSelectItemComponent = __decorate([
    core_1.Component({
        selector: 'tree-select-item',
        templateUrl: './tree-select-item.component.html',
        styleUrls: ['./tree-select-item.component.css']
    }),
    __metadata("design:paramtypes", [select_service_1.SelectService])
], TreeSelectItemComponent);
exports.TreeSelectItemComponent = TreeSelectItemComponent;
//# sourceMappingURL=tree-select-item.component.js.map