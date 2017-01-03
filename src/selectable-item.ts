export class SelectableItem {
    private _selected: boolean = false;
    public children?: SelectableItem[];

    constructor(public id: string, public text: string, public data: any) {
    }

    get selected(): boolean {
        if (this.children && this.children.length > 0) {
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
        if (this.children && this.children.length > 0) {
            if (value !== null) {
                this.children.forEach(child => child.selected = value);
            }
        } else {
            this._selected = !!value;
        }
    }
}
