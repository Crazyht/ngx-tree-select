import { Injectable } from '@angular/core';

@Injectable()
export class TreeSelectDefaultOptions {
  public allowFilter?: boolean;
  public filterPlaceholder?: string;
  public maxVisibleItemCount?: number;
  public allowParentSelection?: boolean;
}
