import { Injectable } from '@angular/core';

@Injectable()
export class TreeSelectDefaultOptions {
  public allowFilter?: boolean;
  public filterPlaceholder?: string;
  public maxVisibleItemCount?: number;
  public allowParentSelection?: boolean;
  public idField?: string;
  public textField?: string;
  public childrenField?: string;
}
