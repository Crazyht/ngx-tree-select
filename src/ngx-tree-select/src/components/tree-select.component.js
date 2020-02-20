var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { SelectService } from '../services/select.service';
import { TreeSelectDefaultOptions } from '../models/tree-select-default-options';
import { ExpandMode } from '../models/expand-mode';
// tslint:disable-next-line:no-empty
var noop = function () { };
export var CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    // tslint:disable-next-line:no-forward-ref
    useExisting: forwardRef(function () { return TreeSelectComponent; }),
    multi: true
};
var TreeSelectComponent = /** @class */ (function () {
    function TreeSelectComponent(svc, defaultOpts) {
        var _this = this;
        this.svc = svc;
        this.defaultOpts = defaultOpts;
        this.onTouchedCallback = noop;
        this.showMoreLink = false;
        this.moreLoaded = false;
        this.disabled = false;
        this.placeholder = '';
        this.filterPlaceholder = 'Type here for filtering items...';
        this.allowFilter = true;
        this._isOpen = false;
        this.onChangeCallback = noop;
        this.haveFocus = false;
        this.inputFocus = false;
        this.clickedOutside = this.clickedOutside.bind(this);
        this.svc.modelChanged$.subscribe(function (result) {
            _this.onChangeCallback(result);
        });
        this.maxVisibleItemCount = (defaultOpts.maxVisibleItemCount || 0);
        this.allowParentSelection = ((defaultOpts.allowParentSelection === undefined ||
            defaultOpts.allowParentSelection === null) ?
            true :
            defaultOpts.allowParentSelection);
        this.allowFilter = ((defaultOpts.allowFilter === undefined || defaultOpts.allowFilter === null) ?
            true :
            defaultOpts.allowFilter);
        this.filterCaseSensitive = ((defaultOpts.filterCaseSensitive === undefined || defaultOpts.filterCaseSensitive === null) ?
            false :
            defaultOpts.filterCaseSensitive);
        this.filterPlaceholder = (defaultOpts.filterPlaceholder || 'Type here for filtering items...');
        this.idField = (defaultOpts.idField || 'id');
        this.textField = (defaultOpts.textField || 'id');
        this.childrenField = (defaultOpts.childrenField || '');
        this.expandMode = (defaultOpts.expandMode || ExpandMode.None);
    }
    Object.defineProperty(TreeSelectComponent.prototype, "items", {
        set: function (value) {
            this.svc.setItems(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeSelectComponent.prototype, "idField", {
        set: function (value) {
            this.svc.setConfiguration(function (opt) { return opt.idProperty = value; }, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeSelectComponent.prototype, "textField", {
        set: function (value) {
            this.svc.setConfiguration(function (opt) { return opt.textProperty = value; }, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeSelectComponent.prototype, "allowParentSelection", {
        get: function () {
            return this.svc.Configuration.allowParentSelection;
        },
        set: function (value) {
            this.svc.setConfiguration(function (opt) { return opt.allowParentSelection = value; }, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeSelectComponent.prototype, "restructureWhenChildSameName", {
        get: function () {
            return this.svc.Configuration.restructureWhenChildSameName;
        },
        set: function (value) {
            this.svc.setConfiguration(function (opt) { return opt.restructureWhenChildSameName = value; }, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeSelectComponent.prototype, "childrenField", {
        set: function (value) {
            this.svc.setConfiguration(function (opt) { return opt.childProperty = value; }, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeSelectComponent.prototype, "multiple", {
        get: function () {
            return this.svc.Configuration.allowMultiple;
        },
        set: function (value) {
            this.svc.setConfiguration(function (opt) { return opt.allowMultiple = value; }, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeSelectComponent.prototype, "filterCaseSensitive", {
        get: function () {
            return this.svc.Configuration.filterCaseSensitive;
        },
        set: function (value) {
            this.svc.setConfiguration(function (opt) { return opt.filterCaseSensitive = value; }, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeSelectComponent.prototype, "expandMode", {
        get: function () {
            return this.svc.Configuration.expandMode;
        },
        set: function (value) {
            this.svc.setConfiguration(function (opt) { return opt.expandMode = value; }, true);
            this.svc.setExpand();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeSelectComponent.prototype, "maxVisibleItemCount", {
        get: function () {
            return this.svc.Configuration.maxVisibleItemCount;
        },
        set: function (value) {
            this.svc.setConfiguration(function (opt) { return opt.maxVisibleItemCount = value; }, true);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeSelectComponent.prototype, "internalItems", {
        get: function () {
            return this.svc.getInternalItems() || [];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeSelectComponent.prototype, "selection", {
        get: function () {
            this.showMoreLink = (this.maxVisibleItemCount > 0 &&
                ((this.svc.getInternalSelection().length - this.maxVisibleItemCount) > 0));
            return this.svc.getInternalSelection();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeSelectComponent.prototype, "filter", {
        get: function () {
            return this.svc.Configuration.filter;
        },
        set: function (value) {
            this.svc.setConfiguration(function (opt) { return opt.filter = value; }, false);
            for (var _i = 0, _a = this.internalItems; _i < _a.length; _i++) {
                var item = _a[_i];
                this.ProcessMatchFilterTreeItem(item, this.svc.Configuration.filter);
            }
            this.svc.setExpand();
        },
        enumerable: true,
        configurable: true
    });
    // tslint:disable-next-line:no-empty
    TreeSelectComponent.prototype.keyUp = function ($event) { };
    TreeSelectComponent.prototype.toggle = function ($event) {
        $event.preventDefault();
        this.haveFocus = true;
        this.svc.toggleOpen();
    };
    TreeSelectComponent.prototype.removeItem = function ($event, item) {
        $event.stopPropagation();
        this.svc.toggleItemSelection(item);
    };
    Object.defineProperty(TreeSelectComponent.prototype, "isOpen", {
        get: function () {
            return this.svc.Configuration.isOpen;
        },
        enumerable: true,
        configurable: true
    });
    TreeSelectComponent.prototype.clickedOutside = function () {
        if (!this.inputFocus) {
            if (!this.haveFocus && this.isOpen || this.haveFocus && !this.isOpen) {
                this.onTouched();
            }
            this.haveFocus = false;
        }
    };
    // Set touched on blur
    TreeSelectComponent.prototype.onTouched = function () {
        this.svc.close();
        this.onTouchedCallback();
    };
    TreeSelectComponent.prototype.setInputFocus = function () {
        this.inputFocus = true;
    };
    TreeSelectComponent.prototype.setInputFocusOut = function () {
        this.inputFocus = false;
    };
    /**
     * Write a new value to the element.
     *
     * @param {*} value
     * @memberof TreeSelectComponent
     */
    TreeSelectComponent.prototype.writeValue = function (value) {
        this.svc.setSelection(value);
    };
    /**
     * Set the function to be called when the control receives a change event.
     *
     * @param {*} fn
     * @memberof TreeSelectComponent
     */
    TreeSelectComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    /**
     * Set the function to be called when the control receives a touch event.
     *
     * @param {*} fn
     * @memberof TreeSelectComponent
     */
    TreeSelectComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    /**
     * This function is called when the control status changes to or from "DISABLED".
     * Depending on the value, it will enable or disable the appropriate DOM element.
     *
     * @param {boolean} isDisabled
     * @memberof TreeSelectComponent
     */
    TreeSelectComponent.prototype.setDisabledState = function (isDisabled) {
        this.disabled = isDisabled;
    };
    /**
     * This finction is called when user click on show more link.
     *
     * @param {*} $event
     * @memberof TreeSelectComponent
     */
    TreeSelectComponent.prototype.loadMore = function ($event) {
        $event.stopPropagation();
        this.moreLoaded = !this.moreLoaded;
    };
    TreeSelectComponent.prototype.ProcessMatchFilterTreeItem = function (tree, filter) {
        var result = false;
        if (tree && tree.children && tree.children.length > 0) {
            for (var _i = 0, _a = tree.children; _i < _a.length; _i++) {
                var child = _a[_i];
                result = this.ProcessMatchFilterTreeItem(child, filter) || result;
            }
        }
        tree.matchFilter = this.filterCaseSensitive ?
            (tree.id.indexOf(filter) > -1 ||
                tree.text.indexOf(filter) > -1 ||
                result) :
            (tree.id.toLowerCase().indexOf(filter.toLowerCase()) > -1 ||
                tree.text.toLowerCase().indexOf(filter.toLowerCase()) > -1 ||
                result);
        return tree.matchFilter;
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TreeSelectComponent.prototype, "disabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TreeSelectComponent.prototype, "placeholder", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TreeSelectComponent.prototype, "filterPlaceholder", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], TreeSelectComponent.prototype, "allowFilter", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array),
        __metadata("design:paramtypes", [Array])
    ], TreeSelectComponent.prototype, "items", null);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], TreeSelectComponent.prototype, "idField", null);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], TreeSelectComponent.prototype, "textField", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], TreeSelectComponent.prototype, "allowParentSelection", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], TreeSelectComponent.prototype, "restructureWhenChildSameName", null);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], TreeSelectComponent.prototype, "childrenField", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], TreeSelectComponent.prototype, "multiple", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], TreeSelectComponent.prototype, "filterCaseSensitive", null);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], TreeSelectComponent.prototype, "expandMode", null);
    __decorate([
        Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], TreeSelectComponent.prototype, "maxVisibleItemCount", null);
    TreeSelectComponent = __decorate([
        Component({
            selector: 'tree-select',
            templateUrl: './tree-select.component.html',
            providers: [CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR, SelectService],
            styleUrls: ['./tree-select.component.scss']
        }),
        __metadata("design:paramtypes", [SelectService,
            TreeSelectDefaultOptions])
    ], TreeSelectComponent);
    return TreeSelectComponent;
}());
export { TreeSelectComponent };
//# sourceMappingURL=tree-select.component.js.map