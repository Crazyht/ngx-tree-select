import { Component } from '@angular/core';
import { FlatCountries } from '../../../datas';

@Component({
  selector: 'flat-sample',
  templateUrl: './flat.component.html'
})
export class FlatComponent {
  public items = FlatCountries;

  public ShowFilter = true;
  public Disabled = false;
  public FilterPlaceholder = 'Type here to filter elements...';
  public MaxDisplayed = 5;

  public simpleSelected = {
    id: 'LU',
    name: 'Luxembourg',
    capital: 'Luxembourg',
    phone: '352',
    currency: 'EUR'
  };

  public multipleSelected = [
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
}
