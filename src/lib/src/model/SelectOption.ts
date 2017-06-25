export class SelectOption {
    public idProperty: string = 'id';
    public textProperty: string = 'text';
    public childProperty: string = null;
    public allowMultiple: boolean = false;
    public closeOnSelection: boolean = true;
    public items: any[] = [];
    public model: any[] | any;
    public isOpen: boolean = false;
    public filter: string = '';

    public isHierarchy(): boolean {
        return this.childProperty && this.childProperty.trim().length > 0;
    }

    public displayCheckbox(): boolean {
        return this.allowMultiple && this.isHierarchy();
    }

    public isValid(): boolean {
        return this.idProperty &&
               this.idProperty.trim().length > 0 &&
               this.textProperty &&
               this.textProperty.trim().length > 0 &&
               this.items &&
               Array.isArray(this.items);
    }
}
