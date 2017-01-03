"use strict";
var core_1 = require('@angular/core');
var forms_1 = require('@angular/forms');
var selectable_item_1 = require('./selectable-item');
var noop = function () {
};
exports.CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR = {
    provide: forms_1.NG_VALUE_ACCESSOR,
    useExisting: core_1.forwardRef(function () { return TreeSelectComponent; }),
    multi: true
};
var TreeSelectComponent = (function () {
    function TreeSelectComponent() {
        this.multiple = false;
        this._childrenField = '';
        this._idField = '';
        this._textField = '';
        this._isOpen = false;
        this._items = [];
        this.internalItems = [];
        this.selection = [];
        this.onTouchedCallback = noop;
        this.onChangeCallback = noop;
    }
    Object.defineProperty(TreeSelectComponent.prototype, "items", {
        set: function (value) {
            this._items = value;
            this.changeInputParameters();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeSelectComponent.prototype, "idField", {
        set: function (value) {
            this._idField = value;
            this.changeInputParameters();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeSelectComponent.prototype, "textField", {
        set: function (value) {
            this._textField = value;
            this.changeInputParameters();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TreeSelectComponent.prototype, "childrenField", {
        set: function (value) {
            this._childrenField = value;
            this.changeInputParameters();
        },
        enumerable: true,
        configurable: true
    });
    TreeSelectComponent.prototype.keyUp = function ($event) { };
    TreeSelectComponent.prototype.open = function ($event) {
        // $event.preventDefault();
        this._isOpen = true;
    };
    Object.defineProperty(TreeSelectComponent.prototype, "isOpen", {
        get: function () {
            return this._isOpen;
        },
        enumerable: true,
        configurable: true
    });
    TreeSelectComponent.prototype.modifySelection = function () {
        console.log('Start modifySelection');
        this.selection = this.getSelectedItems(this.internalItems);
        console.log('End modifySelection');
    };
    TreeSelectComponent.prototype.getSelectedItems = function (array) {
        var _this = this;
        var res = [];
        array.forEach(function (v) {
            if (v.children && v.children.length > 0) {
                res = res.concat(_this.getSelectedItems(v.children));
            }
            else if (v.selected === true) {
                res.push(v);
            }
        });
        return res;
    };
    Object.defineProperty(TreeSelectComponent.prototype, "isHierarchic", {
        get: function () {
            return (this._childrenField && this._childrenField.trim().length > 0);
        },
        enumerable: true,
        configurable: true
    });
    TreeSelectComponent.prototype.changeInputParameters = function () {
        this.internalItems = [];
        if (!this._idField || this._idField.trim().length === 0) {
            return;
        }
        else if (!this._textField || this._textField.trim().length === 0) {
            return;
        }
        else if (!this._items || !Array.isArray(this._items)) {
            return;
        }
        this.internalItems = this.transformItems(this._items);
        this.changeSelection();
    };
    // Recursive copy items to internal items
    TreeSelectComponent.prototype.transformItems = function (sources) {
        var _this = this;
        if (sources && Array.isArray(sources)) {
            return sources.map(function (srcItem) {
                var item = new selectable_item_1.SelectableItem(srcItem[_this._idField], srcItem[_this._textField], srcItem);
                if (_this.isHierarchic) {
                    item.children = _this.transformItems(srcItem[_this._childrenField]);
                }
                return item;
            });
        }
        return [];
    };
    TreeSelectComponent.prototype.changeSelection = function () {
        var _this = this;
        try {
            if (!this._idField || this._idField.trim().length === 0) {
                return;
            }
            var model = void 0;
            if (!this._model) {
                model = [];
            }
            else if (!Array.isArray(this._model)) {
                model = [this._model];
            }
            else {
                model = this._model;
            }
            var select_1 = [];
            model.forEach(function (v) {
                select_1 = select_1.concat(_this.getItemForModel(v, _this.internalItems));
            });
            select_1.forEach(function (v) { return v.selected = true; });
            this.modifySelection();
        }
        catch (error) {
            console.error('Error while changeSelection : ', error);
        }
    };
    TreeSelectComponent.prototype.getItemForModel = function (value, array) {
        var _this = this;
        var result = [];
        array.forEach(function (v) {
            if (v.id === value[_this._idField]) {
                result.push(v);
            }
            if (_this.isHierarchic && v.children && v.children.length > 0) {
                result = result.concat(_this.getItemForModel(value, v.children));
            }
        });
        return result;
    };
    // Set touched on blur
    TreeSelectComponent.prototype.onTouched = function () {
        this.onTouchedCallback();
    };
    // Placeholders for the callbacks which are later provided by the Control Value Accessor
    TreeSelectComponent.prototype.writeValue = function (value) {
        if (value !== this._model) {
            this._model = value;
            this.changeSelection();
        }
    };
    TreeSelectComponent.prototype.registerOnChange = function (fn) {
        this.onChangeCallback = fn;
    };
    TreeSelectComponent.prototype.registerOnTouched = function (fn) {
        this.onTouchedCallback = fn;
    };
    TreeSelectComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'cra-select',
                    template: "\n<div tabindex=\"0\" (keyup)=\"keyUp($event)\" [cra-OffClick]=\"clickedOutside\" class=\"ui-select-container dropdown open\">\n    <div [ngClass]=\"{'ui-disabled': disabled}\"></div>\n    <!-- Control display -->\n    <div class=\"ui-select-match\">\n        <span tabindex=\"-1\"\n              class=\"btn btn-default btn-secondary form-control ui-select-toggle\"\n              (click)=\"open($event)\"\n              style=\"outline: 0;\">\n            <span *ngIf=\"selection.length <= 0\" class=\"ui-select-placeholder text-muted\">{{placeholder}}</span>\n            <span *ngIf=\"!multiple && selection.length > 0\" class=\"ui-select-match-text pull-left\">{{selection[0].text}}</span>\n            <i class=\"dropdown-toggle pull-right\"></i>\n            <i class=\"caret pull-right\"></i>\n        </span>\n    </div>\n    <!-- options template -->\n    <ul *ngIf=\"isOpen && internalItems && internalItems.length > 0\"\n        class=\"ui-select-choices dropdown-menu\"\n        role=\"menu\">\n        <li *ngFor=\"let o of internalItems\" role=\"menuitem\">\n            <cra-select-item [item]=\"o\"></cra-select-item>\n\n        </li>\n    </ul>\n</div>\n",
                    providers: [exports.CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
                },] },
    ];
    /** @nocollapse */
    TreeSelectComponent.ctorParameters = function () { return []; };
    TreeSelectComponent.propDecorators = {
        'multiple': [{ type: core_1.Input },],
        'items': [{ type: core_1.Input },],
        'idField': [{ type: core_1.Input },],
        'textField': [{ type: core_1.Input },],
        'childrenField': [{ type: core_1.Input },],
        'onTouched': [{ type: core_1.HostListener, args: ['blur',] },],
    };
    return TreeSelectComponent;
}());
exports.TreeSelectComponent = TreeSelectComponent;
//# sourceMappingURL=select.component.js.map