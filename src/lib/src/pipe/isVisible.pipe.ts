import { Pipe, PipeTransform } from '@angular/core'
import { SelectableItem } from '../model/selectable-item';

@Pipe({ name: 'IsVisiblePipe' })
export class IsVisiblePipe implements PipeTransform {
  transform(value: SelectableItem[]) {
    // ES6 array destructuring
    return value.filter(item => { return item.isVisible; });
  }
}
