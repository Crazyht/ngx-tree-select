import { Component } from '@angular/core';
import { HierarchicalCountries } from '../../datas/hierarchical-data';

@Component({
  selector: 'demo-app',
  templateUrl: './app.component.html'
})
export class AppComponent {

  public selectedItems1: any = null;

  public selectedItems2: any[] = [
    { id: 2, text: 'item 2' },
    { id: 3, text: 'item 3' },

  ];

  public selectedItems3: any = {
    id: 'LU',
    name: 'Luxembourg',
    capital: 'Luxembourg',
    phone: '352',
    currency: 'EUR'
  };

  public selectedItems4: any[] = [
    {
    id: 'LU',
    name: 'Luxembourg',
    capital: 'Luxembourg',
    phone: '352',
    currency: 'EUR'
  },
  {
    id: 'FR',
    name: 'France',
    capital: 'Paris',
    phone: '33',
    currency: 'EUR'
  }
  ];

  public disabledSelectedItems1: any = { id: 1, text: 'item 1' };

  public disabledSelectedItems2: any[] = [
    { id: 1, text: 'item 1' },
    { id: 2, text: 'item 2' }
  ];

  public disabledSelectedItems3: any = { id: 11, text: 'item 1.1' };

  public disabledSelectedItems4: any[] = [
    { id: 21, text: 'item 2.1' },
    { id: 22, text: 'item 2.2' },
    { id: 23, text: 'item 2.3' }
  ];

  items = [
    { id: 1, text: 'item 1' },
    { id: 2, text: 'item 2' },
    { id: 3, text: 'item 3' },
    { id: 4, text: 'item 4' },
    { id: 5, text: 'item 5' },
  ];

  itemsTree = HierarchicalCountries;
}
