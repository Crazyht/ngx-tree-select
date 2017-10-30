"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SelectOption = (function () {
    function SelectOption() {
        this.idProperty = 'id';
        this.textProperty = 'text';
        this.childProperty = null;
        this.allowMultiple = false;
        this.closeOnSelection = true;
        this.items = [];
        this.isOpen = false;
        this.filter = '';
        this.onlySelectParent = false;
        this.loadAllItems = false;
    }
    SelectOption.prototype.isHierarchy = function () {
        return this.childProperty && this.childProperty.trim().length > 0;
    };
    SelectOption.prototype.displayCheckbox = function () {
        return this.allowMultiple && this.isHierarchy();
    };
    SelectOption.prototype.isValid = function () {
        return this.idProperty &&
            this.idProperty.trim().length > 0 &&
            this.textProperty &&
            this.textProperty.trim().length > 0 &&
            this.items &&
            Array.isArray(this.items)
            && this.items.length > 0;
    };
    return SelectOption;
}());
exports.SelectOption = SelectOption;
//# sourceMappingURL=SelectOption.js.map