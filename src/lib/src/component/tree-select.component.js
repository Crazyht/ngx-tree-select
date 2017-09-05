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
var tree_select_default_options_1 = require("./../model/tree-select-default-options");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var select_service_1 = require("../service/select.service");
var noop = function () {
};
exports.CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return TreeSelectComponent; }),
    multi: true
};
var TreeSelectComponent = (function () {
    function TreeSelectComponent(svc, defaultOpts) {
        var _this = this;
        this.svc = svc;
        this.defaultOpts = defaultOpts;
        this._isOpen = false;
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
        this.haveFocus = false;
        this.inputFocus = false;
        this.disabled = false;
        this.filterPlaceholder = 'Type here for filtering items...';
        this.allowFilter = true;
        this.clickedOutside = this.clickedOutside.bind(this);
        this.svc.configurationChanged$.subscribe(function (options) {
        });
        this.svc.itemsChanged$.subscribe(function (items) {
            // this.onChangeCallback(this.svc.getSelection());
        });
        this.svc.itemSelectionChanged$.subscribe(function (items) {
        });
        this.svc.modelChanged$.subscribe(function (result) {
            _this.onChangeCallback(_this.svc.getSelection());
        });
        this.maxVisibleItemCount = (defaultOpts.maxVisibleItemCount || 0);
        this.filterPlaceholder = (defaultOpts.filterPlaceholder || 'Type here for filtering items...');
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
    Object.defineProperty(TreeSelectComponent.prototype, "onlySelectParent", {
        get: function () {
            return this.svc.Configuration.onlySelectParent;
        },
        set: function (value) {
            this.svc.setConfiguration(function (opt) { return opt.onlySelectParent = value; }, true);
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
    Object.defineProperty(TreeSelectComponent.prototype, "loadAllItems", {
        get: function () {
            return this.svc.Configuration.loadAllItems;
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
            if (this.maxVisibleItemCount && ((this.svc.getInternalSelection().length - this.maxVisibleItemCount) > 0)) {
                this.svc.setConfiguration(function (opt) { return opt.loadAllItems = true; }, false);
            }
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
        },
        enumerable: true,
        configurable: true
    });
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
    // Placeholders for the callbacks which are later provided by the Control Value Accessor
    TreeSelectComponent.prototype.writeValue = function (value) {
        this.svc.setSelection(value);
    };
    TreeSelectComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    TreeSelectComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    TreeSelectComponent.prototype.loadMore = function () {
        this.svc.setConfiguration(function (opt) { return opt.loadAllItems = false; }, false);
        this.svc.setConfiguration(function (opt) { return opt.maxVisibleItemCount = 0; }, false);
    };
    TreeSelectComponent.prototype.ProcessMatchFilterTreeItem = function (tree, filter) {
        var result = false;
        if (tree && tree.children && tree.children.length > 0) {
            for (var _i = 0, _a = tree.children; _i < _a.length; _i++) {
                var child = _a[_i];
                result = this.ProcessMatchFilterTreeItem(child, filter) || result;
            }
        }
        tree.matchFilter = (tree.id.indexOf(filter) > -1 || tree.text.indexOf(filter) > -1 || result);
        // console.info(`${tree.id} -> ${tree.text} => ${filter} ==> ${tree.matchFilter}`)
        return tree.matchFilter;
    };
    return TreeSelectComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], TreeSelectComponent.prototype, "disabled", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], TreeSelectComponent.prototype, "filterPlaceholder", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], TreeSelectComponent.prototype, "allowFilter", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array),
    __metadata("design:paramtypes", [Array])
], TreeSelectComponent.prototype, "items", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], TreeSelectComponent.prototype, "idField", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], TreeSelectComponent.prototype, "textField", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], TreeSelectComponent.prototype, "onlySelectParent", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", String),
    __metadata("design:paramtypes", [String])
], TreeSelectComponent.prototype, "childrenField", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean),
    __metadata("design:paramtypes", [Boolean])
], TreeSelectComponent.prototype, "multiple", null);
__decorate([
    core_1.Input(),
    __metadata("design:type", Number),
    __metadata("design:paramtypes", [Number])
], TreeSelectComponent.prototype, "maxVisibleItemCount", null);
__decorate([
    core_1.HostListener('blur'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TreeSelectComponent.prototype, "onTouched", null);
TreeSelectComponent = __decorate([
    core_1.Component({
        selector: 'tree-select',
        templateUrl: './tree-select.component.html',
        providers: [exports.CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR, select_service_1.SelectService],
        styleUrls: ['./tree-select.component.css']
    }),
    __metadata("design:paramtypes", [select_service_1.SelectService,
        tree_select_default_options_1.TreeSelectDefaultOptions])
], TreeSelectComponent);
exports.TreeSelectComponent = TreeSelectComponent;
//# sourceMappingURL=tree-select.component.js.map