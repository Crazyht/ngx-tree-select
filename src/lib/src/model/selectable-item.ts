export class SelectableItem {
    private _selected = false;
    public children?: SelectableItem[];
    public isOpen = false;
    public matchFilter = true;

    constructor(public id: string, public text: string, public data: any) {
    }

    get hasChild(): boolean {
        return this.children && this.children.length > 0;
    }
    get selected(): boolean {
        if (this.hasChild) {
            if (this.children.every(child => child.selected)) {
                return true;
            } else if (this.children.every(child => child.selected === false)) {
                return false;
            }
            return null;
        }
        return this._selected;
    }
    set selected(value: boolean) {
        if (this.hasChild) {
            if (value !== null) {
                this.children.forEach(child => child.selected = value);
            }
        } else {
            this._selected = value;
        }
    }
}
