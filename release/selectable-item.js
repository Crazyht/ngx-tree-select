"use strict";
var SelectableItem = (function () {
    function SelectableItem(id, text, data) {
        this.id = id;
        this.text = text;
        this.data = data;
        this._selected = false;
    }
    Object.defineProperty(SelectableItem.prototype, "selected", {
        get: function () {
            if (this.children && this.children.length > 0) {
                if (this.children.every(function (child) { return child.selected; })) {
                    return true;
                }
                else if (this.children.every(function (child) { return child.selected === false; })) {
                    return false;
                }
                return null;
            }
            return this._selected;
        },
        set: function (value) {
            if (this.children && this.children.length > 0) {
                if (value !== null) {
                    this.children.forEach(function (child) { return child.selected = value; });
                }
            }
            else {
                this._selected = !!value;
            }
        },
        enumerable: true,
        configurable: true
    });
    return SelectableItem;
}());
exports.SelectableItem = SelectableItem;
//# sourceMappingURL=selectable-item.js.map