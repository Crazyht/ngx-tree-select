var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input } from '@angular/core';
import { SelectableItem } from '../models/selectable-item';
import { SelectService } from '../services/select.service';
var TreeSelectItemComponent = /** @class */ (function () {
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
    Object.defineProperty(TreeSelectItemComponent.prototype, "allowParentSelection", {
        get: function () {
            return this.svc.Configuration.allowParentSelection;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeSelectItemComponent.prototype, "restructureWhenChildSameName", {
        get: function () {
            return this.svc.Configuration.restructureWhenChildSameName;
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
            if (this.restructureWhenChildSameName && this.item && this.item.children
                && this.item.children.length === 1 && this.item.text === this.item.children[0].text) {
                this.item = this.item.children[0];
            }
            return this.item && this.item.children && this.item.children.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    TreeSelectItemComponent.prototype.select = function ($event) {
        $event.stopPropagation();
        if (this.svc.Configuration.allowMultiple ||
            !this.haveChildren ||
            this.svc.Configuration.allowParentSelection) {
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
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], TreeSelectItemComponent.prototype, "onTouchedCallBack", void 0);
    __decorate([
        Input(),
        __metadata("design:type", SelectableItem)
    ], TreeSelectItemComponent.prototype, "item", void 0);
    TreeSelectItemComponent = __decorate([
        Component({
            selector: 'tree-select-item',
            templateUrl: './tree-select-item.component.html',
            styleUrls: ['./tree-select-item.component.scss']
        }),
        __metadata("design:paramtypes", [SelectService])
    ], TreeSelectItemComponent);
    return TreeSelectItemComponent;
}());
export { TreeSelectItemComponent };
//# sourceMappingURL=tree-select-item.component.js.map