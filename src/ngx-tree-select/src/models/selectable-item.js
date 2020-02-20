var SelectableItem = /** @class */ (function () {
    function SelectableItem(id, text, data, svc) {
        this.id = id;
        this.text = text;
        this.data = data;
        this.svc = svc;
        this._selected = false;
        this.isOpen = false;
        this.matchFilter = true;
        this.isVisible = false;
    }
    Object.defineProperty(SelectableItem.prototype, "hasChild", {
        get: function () {
            return this.children && this.children.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectableItem.prototype, "checked", {
        get: function () {
            if (this.hasChild && this.svc.Configuration.allowMultiple) {
                if (this.children.every(function (child) { return child.selected; })) {
                    return true;
                }
                else if (this.children.every(function (child) { return child.selected === false; })) {
                    return this._selected;
                }
                return null;
            }
            return this._selected;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SelectableItem.prototype, "selected", {
        get: function () {
            if (this.hasChild && this.svc.Configuration.allowMultiple) {
                if (this.children.some(function (child) { return child.selected; })) {
                    if (this.svc.Configuration.allowParentSelection) {
                        this._selected = false;
                    }
                    return true;
                }
                else if (this.children.every(function (child) { return child.selected === false; })) {
                    if (this.svc.Configuration.allowParentSelection) {
                        return this._selected;
                    }
                    else {
                        return this._selected = false;
                    }
                }
                return false;
            }
            else if (this.hasChild && this._selected === true) {
                for (var _i = 0, _a = this.children; _i < _a.length; _i++) {
                    var itm = _a[_i];
                    itm.selected = false;
                }
            }
            return this._selected;
        },
        set: function (value) {
            if (this.hasChild && !this.svc.Configuration.allowParentSelection) {
                if (value !== null) {
                    this.children.forEach(function (child) { return child.selected = value; });
                }
            }
            else {
                this._selected = value;
            }
        },
        enumerable: true,
        configurable: true
    });
    return SelectableItem;
}());
export { SelectableItem };
//# sourceMappingURL=selectable-item.js.map