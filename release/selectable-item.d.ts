export declare class SelectableItem {
    id: string;
    text: string;
    data: any;
    private _selected;
    children?: SelectableItem[];
    constructor(id: string, text: string, data: any);
    selected: boolean;
}
