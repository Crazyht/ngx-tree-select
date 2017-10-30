"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var Rx_1 = require("rxjs/Rx");
var selectable_item_1 = require("../model/selectable-item");
var SelectOption_1 = require("../model/SelectOption");
var core_1 = require("@angular/core");
var SelectService = (function () {
    function SelectService() {
        this._options = new SelectOption_1.SelectOption();
        this.itemSelectionChanged$ = new Rx_1.Subject();
        this.itemsChanged$ = new Rx_1.Subject();
        this.configurationChanged$ = new Rx_1.Subject();
        this.modelChanged$ = new Rx_1.Subject();
    }
    SelectService.prototype.close = function () {
        if (this.Configuration.isOpen) {
            this.setConfiguration(function (opt) { return opt.isOpen = false; }, false);
        }
    };
    SelectService.prototype.open = function () {
        if (!this.Configuration.isOpen) {
            this.setConfiguration(function (opt) { return opt.isOpen = true; }, false);
        }
    };
    SelectService.prototype.toggleOpen = function () {
        this.setConfiguration(function (opt) { return opt.isOpen = !opt.isOpen; }, false);
    };
    SelectService.prototype.setItems = function (value) {
        this.setConfiguration(function (opt) { return opt.items = value; }, true);
    };
    SelectService.prototype.getInternalItems = function () {
        return this._items;
    };
    SelectService.prototype.setSelection = function (values) {
        this.setConfiguration(function (opt) { return opt.model = values; }, true);
    };
    SelectService.prototype.setSelectedItemOrChild = function (items, destination) {
        for (var _i = 0, items_1 = items; _i < items_1.length; _i++) {
            var itm = items_1[_i];
            if (itm.hasChild) {
                if (itm.id === destination) {
                    itm.selected = true;
                }
                this.setSelectedItemOrChild(itm.children, destination);
            }
            else if (itm.id === destination) {
                itm.selected = true;
            }
        }
    };
    SelectService.prototype.getSelection = function () {
        if (this.Configuration.allowMultiple) {
            return this.getInternalSelection().map(function (v) { return v.data; });
        }
        else {
            var result = this.getInternalSelection();
            if (result && result.length > 0) {
                return result[0].data;
            }
        }
        return null;
    };
    SelectService.prototype.getInternalSelection = function () {
        var selectedItems = this.getSelectedItems(this._items);
        if (selectedItems && selectedItems.length > 0) {
            var i = 0;
            var max = this._options.maxVisibleItemCount ? this._options.maxVisibleItemCount : 0;
            for (var _i = 0, selectedItems_1 = selectedItems; _i < selectedItems_1.length; _i++) {
                var item = selectedItems_1[_i];
                item.isVisible = (i < max || max === 0) &&
                    (!item.hasChild || item.children.every(function (child) { return child.selected === false; })); // all my children are unselected
                if (item.isVisible && max > 0) {
                    i++;
                }
            }
        }
        return selectedItems;
    };
    SelectService.prototype.toggleItemSelection = function (item) {
        var _this = this;
        if (!this.Configuration.allowMultiple) {
            this.setAllUnselected(this._items);
        }
        item.selected = !item.selected;
        this.setConfiguration(function (opt) { return opt.model = _this.getSelection(); }, false);
        if (this.Configuration.closeOnSelection) {
            this.setConfiguration(function (opt) { return opt.isOpen = false; }, false);
        }
    };
    SelectService.prototype.setAllUnselected = function (items) {
        for (var _i = 0, items_2 = items; _i < items_2.length; _i++) {
            var itm = items_2[_i];
            if (itm.hasChild) {
                itm.selected = false;
                this.setAllUnselected(itm.children);
            }
            else {
                itm.selected = false;
            }
        }
    };
    SelectService.prototype.setConfiguration = function (delegate, processItems) {
        var modelBck = this._options.model;
        delegate(this._options);
        this.configurationChanged$.next(this._options);
        if (this._options.isValid()) {
            this.reconfigure(processItems);
        }
        // if model changed, raise event
        if (modelBck !== undefined && this._options.model !== modelBck) {
            this.modelChanged$.next(this._options.model);
        }
    };
    Object.defineProperty(SelectService.prototype, "Configuration", {
        get: function () {
            return this._options;
        },
        enumerable: true,
        configurable: true
    });
    SelectService.prototype.toSelectableItems = function (sources) {
        var _this = this;
        if (sources && Array.isArray(sources)) {
            var i_1 = 1;
            return sources.map(function (srcItem) {
                var item;
                if (srcItem[_this._options.idProperty] && srcItem[_this._options.idProperty] !== '' && srcItem[_this._options.textProperty]) {
                    item = new selectable_item_1.SelectableItem((srcItem[_this._options.idProperty] || '').toString(), srcItem[_this._options.textProperty], srcItem, _this);
                }
                else {
                    item = new selectable_item_1.SelectableItem(i_1.toString(), srcItem, srcItem, _this);
                    i_1++;
                }
                if (_this._options.isHierarchy()) {
                    item.children = _this.toSelectableItems(srcItem[_this._options.childProperty]);
                }
                return item;
            });
        }
        return [];
    };
    SelectService.prototype.getSelectedItems = function (array) {
        var _this = this;
        if (this.Configuration.isValid()) {
            var res_1 = [];
            array.forEach(function (v) {
                if (v.hasChild && v.selected === true) {
                    if (_this._options.allowMultiple) {
                        if (v.children.every(function (child) { return child.selected === false; })) {
                            res_1 = res_1.concat([v]);
                        }
                        else {
                            res_1 = res_1.concat(_this.getSelectedItems(v.children));
                        }
                    }
                }
                else if (v.hasChild) {
                    res_1 = res_1.concat(_this.getSelectedItems(v.children));
                }
                else if (v.selected === true) {
                    res_1 = res_1.concat([v]);
                }
            });
            return res_1;
        }
        else {
            return [];
        }
    };
    SelectService.prototype.reconfigure = function (processItems) {
        var _this = this;
        if (this.Configuration.isValid()) {
            this.checkConfig();
            if (processItems) {
                this._items = this.toSelectableItems(this.Configuration.items);
                this.itemsChanged$.next(this._items);
            }
            var model = this.getModel();
            var select_1 = [];
            model.forEach(function (v) {
                select_1 = select_1.concat(_this.getItemForModel(v, _this._items));
            });
            select_1.forEach(function (v) { return v._selected = true; });
        }
    };
    SelectService.prototype.checkConfig = function () {
        if (this.Configuration.allowMultiple && this.Configuration.closeOnSelection) {
            this.Configuration.closeOnSelection = false;
        }
        else if (!this.Configuration.allowMultiple && !this.Configuration.closeOnSelection) {
            this.Configuration.closeOnSelection = true;
        }
    };
    SelectService.prototype.getModel = function () {
        if (!this.Configuration.model) {
            return [];
        }
        else if (!Array.isArray(this.Configuration.model)) {
            return [this.Configuration.model];
        }
        else {
            return this.Configuration.model;
        }
    };
    SelectService.prototype.getItemForModel = function (value, array) {
        var _this = this;
        var result = [];
        array.forEach(function (v) {
            if (v.id === value[_this.Configuration.idProperty].toString()) {
                result.push(v);
            }
            if (_this.Configuration.isHierarchy() && v.children && v.children.length > 0) {
                result = result.concat(_this.getItemForModel(value, v.children));
            }
        });
        return result;
    };
    return SelectService;
}());
SelectService = __decorate([
    core_1.Injectable()
], SelectService);
exports.SelectService = SelectService;
//# sourceMappingURL=select.service.js.map