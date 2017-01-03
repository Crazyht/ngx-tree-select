/**
 * ngx-charts v"0.1.0" (https://github.com/swimlane/ngx-charts)
 * Copyright 2016
 * Licensed under MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@angular/common"), require("@angular/core"), require("@angular/forms"));
	else if(typeof define === 'function' && define.amd)
		define("ngx-charts", ["@angular/common", "@angular/core", "@angular/forms"], factory);
	else if(typeof exports === 'object')
		exports["ngx-charts"] = factory(require("@angular/common"), require("@angular/core"), require("@angular/forms"));
	else
		root["ngx-charts"] = factory(root["@angular/common"], root["@angular/core"], root["@angular/forms"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_2__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/crazy-select.module.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var core_1 = __webpack_require__(0);
var common_1 = __webpack_require__(1);
var select_component_1 = __webpack_require__("./src/select.component.ts");
var select_item_component_1 = __webpack_require__("./src/select-item.component.ts");
var off_click_directive_1 = __webpack_require__("./src/off-click.directive.ts");
var CrazySelectModule = (function () {
    function CrazySelectModule() {
    }
    /* optional: in case you need users to override your providers */
    CrazySelectModule.forRoot = function (configuredProviders) {
        return {
            ngModule: CrazySelectModule,
            providers: configuredProviders
        };
    };
    CrazySelectModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule
            ],
            declarations: [
                select_component_1.TreeSelectComponent,
                select_item_component_1.TreeSelectItemComponent,
                off_click_directive_1.OffClickDirective
            ],
            exports: [
                select_component_1.TreeSelectComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], CrazySelectModule);
    return CrazySelectModule;
}());
exports.CrazySelectModule = CrazySelectModule;


/***/ },

/***/ "./src/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/crazy-select.module.ts"));
__export(__webpack_require__("./src/select.component.ts"));


/***/ },

/***/ "./src/off-click.directive.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var core_1 = __webpack_require__(0);
var OffClickDirective = (function () {
    function OffClickDirective() {
    }
    /* tslint:enable */
    OffClickDirective.prototype.onClick = function ($event) {
        $event.stopPropagation();
    };
    OffClickDirective.prototype.ngOnInit = function () {
        var _this = this;
        setTimeout(function () { document.addEventListener('click', _this.offClickkHandler); }, 0);
    };
    OffClickDirective.prototype.ngOnDestroy = function () {
        document.removeEventListener('click', this.offClickkHandler);
    };
    __decorate([
        core_1.Input('cra-OffClick'), 
        __metadata('design:type', Object)
    ], OffClickDirective.prototype, "offClickkHandler", void 0);
    __decorate([
        core_1.HostListener('click', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [MouseEvent]), 
        __metadata('design:returntype', void 0)
    ], OffClickDirective.prototype, "onClick", null);
    OffClickDirective = __decorate([
        core_1.Directive({
            selector: '[cra-OffClick]'
        }), 
        __metadata('design:paramtypes', [])
    ], OffClickDirective);
    return OffClickDirective;
}());
exports.OffClickDirective = OffClickDirective;


/***/ },

/***/ "./src/select-item.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var core_1 = __webpack_require__(0);
var selectable_item_1 = __webpack_require__("./src/selectable-item.ts");
var TreeSelectItemComponent = (function () {
    function TreeSelectItemComponent() {
    }
    Object.defineProperty(TreeSelectItemComponent.prototype, "haveChildren", {
        get: function () {
            return this.item && this.item.children && this.item.children.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    __decorate([
        core_1.Input(), 
        __metadata('design:type', selectable_item_1.SelectableItem)
    ], TreeSelectItemComponent.prototype, "item", void 0);
    TreeSelectItemComponent = __decorate([
        core_1.Component({
            selector: 'cra-select-item',
            template: "\n<div class=\"ui-select-choices-row\"\n     [class.active]=\"item.selected\"\n     (click)=\"select($event)\">\n    <a href=\"javascript:void(0)\" class=\"dropdown-item\">\n        <div>{{item.text}}</div>\n    </a>\n</div>\n    "
        }), 
        __metadata('design:paramtypes', [])
    ], TreeSelectItemComponent);
    return TreeSelectItemComponent;
}());
exports.TreeSelectItemComponent = TreeSelectItemComponent;


/***/ },

/***/ "./src/select.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var core_1 = __webpack_require__(0);
var forms_1 = __webpack_require__(2);
var selectable_item_1 = __webpack_require__("./src/selectable-item.ts");
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
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], TreeSelectComponent.prototype, "multiple", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array), 
        __metadata('design:paramtypes', [Array])
    ], TreeSelectComponent.prototype, "items", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], TreeSelectComponent.prototype, "idField", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], TreeSelectComponent.prototype, "textField", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String), 
        __metadata('design:paramtypes', [String])
    ], TreeSelectComponent.prototype, "childrenField", null);
    __decorate([
        core_1.HostListener('blur'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], TreeSelectComponent.prototype, "onTouched", null);
    TreeSelectComponent = __decorate([
        core_1.Component({
            selector: 'cra-select',
            template: "\n<div tabindex=\"0\" (keyup)=\"keyUp($event)\" [cra-OffClick]=\"clickedOutside\" class=\"ui-select-container dropdown open\">\n    <div [ngClass]=\"{'ui-disabled': disabled}\"></div>\n    <!-- Control display -->\n    <div class=\"ui-select-match\">\n        <span tabindex=\"-1\"\n              class=\"btn btn-default btn-secondary form-control ui-select-toggle\"\n              (click)=\"open($event)\"\n              style=\"outline: 0;\">\n            <span *ngIf=\"selection.length <= 0\" class=\"ui-select-placeholder text-muted\">{{placeholder}}</span>\n            <span *ngIf=\"!multiple && selection.length > 0\" class=\"ui-select-match-text pull-left\">{{selection[0].text}}</span>\n            <i class=\"dropdown-toggle pull-right\"></i>\n            <i class=\"caret pull-right\"></i>\n        </span>\n    </div>\n    <!-- options template -->\n    <ul *ngIf=\"isOpen && internalItems && internalItems.length > 0\"\n        class=\"ui-select-choices dropdown-menu\"\n        role=\"menu\">\n        <li *ngFor=\"let o of internalItems\" role=\"menuitem\">\n            <cra-select-item [item]=\"o\"></cra-select-item>\n\n        </li>\n    </ul>\n</div>\n",
            providers: [exports.CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR]
        }), 
        __metadata('design:paramtypes', [])
    ], TreeSelectComponent);
    return TreeSelectComponent;
}());
exports.TreeSelectComponent = TreeSelectComponent;


/***/ },

/***/ "./src/selectable-item.ts":
/***/ function(module, exports) {

"use strict";
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


/***/ },

/***/ 0:
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ },

/***/ 1:
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },

/***/ 2:
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ }

/******/ });
});
//# sourceMappingURL=index.map