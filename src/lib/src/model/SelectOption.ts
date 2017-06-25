export class SelectOption {
    public idProperty = 'id';
    public textProperty = 'text';
    public childProperty: string = null;
    public allowMultiple = false;
    public closeOnSelection = true;
    public items: any[] = [];
    public model: any[] | any;
    public isOpen = false;
    public filter = '';

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
