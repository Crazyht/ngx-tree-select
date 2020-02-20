var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Subject } from 'rxjs';
import { SelectableItem } from '../models/selectable-item';
import { SelectOption } from '../models/select-option';
import { Injectable } from '@angular/core';
import { ExpandMode } from '../models/expand-mode';
var SelectService = /** @class */ (function () {
    function SelectService() {
        this.modelChanged$ = new Subject();
        this._options = new SelectOption();
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
    /*
      Call when list of items is set.
    */
    SelectService.prototype.setItems = function (value) {
        this.setConfiguration(function (opt) { return opt.items = value; }, true);
        this.setExpand();
    };
    SelectService.prototype.getInternalItems = function () {
        return this._items;
    };
    /*
      Call when ng-model is set
    */
    SelectService.prototype.setSelection = function (values) {
        this.setConfiguration(function (opt) { return opt.model = values; }, true);
        this.setExpand();
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
                item.isVisible =
                    // Max not reached or not max value
                    (i < max || max === 0) &&
                        // all my children are unselected
                        (!item.hasChild || item.children.every(function (child) { return child.selected === false; }));
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
        if (this._options.isValid()) {
            this.reconfigure(processItems);
        }
        // if model changed, raise event
        if (!processItems &&
            ((modelBck && this._options.model !== modelBck) ||
                (!modelBck && this._options.model))) {
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
    SelectService.prototype.setExpand = function () {
        this.setExpandForList(this._items);
    };
    SelectService.prototype.setExpandForList = function (items) {
        if (!items) {
            return;
        }
        for (var _i = 0, items_3 = items; _i < items_3.length; _i++) {
            var item = items_3[_i];
            this.setExpandForList(item.children);
            item.isOpen = (this._options.filterExpandMode === ExpandMode.All);
            if (this._options.filterExpandMode === ExpandMode.Selection) {
                if (item.children) {
                    item.isOpen = item.children.some(function (itm) { return itm.isOpen || itm.selected; });
                }
            }
        }
    };
    SelectService.prototype.toSelectableItems = function (sources) {
        var _this = this;
        if (sources && Array.isArray(sources)) {
            var i_1 = 1;
            return sources.map(function (srcItem) {
                var item;
                if (srcItem[_this._options.idProperty] &&
                    srcItem[_this._options.idProperty] !== '' &&
                    srcItem[_this._options.textProperty]) {
                    item = new SelectableItem((srcItem[_this._options.idProperty] || '').toString(), srcItem[_this._options.textProperty], srcItem, _this);
                }
                else {
                    item = new SelectableItem(i_1.toString(), srcItem, srcItem, _this);
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
        if (this.Configuration.isValid()) {
            var res = [];
            for (var _i = 0, array_1 = array; _i < array_1.length; _i++) {
                var v = array_1[_i];
                if (v.hasChild && v.selected === true) {
                    if (v.children.every(function (child) { return child.selected === false; })) {
                        res = res.concat([v]);
                    }
                    else {
                        res = res.concat(this.getSelectedItems(v.children));
                    }
                }
                else if (v.hasChild) {
                    res = res.concat(this.getSelectedItems(v.children));
                }
                else if (v.selected === true) {
                    res = res.concat([v]);
                }
            }
            return res;
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
        var result = [];
        for (var _i = 0, array_2 = array; _i < array_2.length; _i++) {
            var v = array_2[_i];
            if (value) {
                if (typeof value !== 'object') {
                    if (v.data === value) {
                        result.push(v);
                    }
                }
                else {
                    if (value[this.Configuration.idProperty]) {
                        if (v.id === (value[this.Configuration.idProperty] || '').toString()) {
                            result.push(v);
                        }
                    }
                    if (this.Configuration.isHierarchy() && v.children && v.children.length > 0) {
                        result = result.concat(this.getItemForModel(value, v.children));
                    }
                }
            }
        }
        return result;
    };
    SelectService = __decorate([
        Injectable()
    ], SelectService);
    return SelectService;
}());
export { SelectService };
//# sourceMappingURL=select.service.js.map