import { Component } from '@angular/core';
import { HierarchicalCountries } from '../../../datas';

@Component({
  selector: 'demo-hierarchical-sample',
  templateUrl: './hierarchical-sample.component.html',
  styleUrls: ['./hierarchical-sample.component.scss']
})
export class HierarchicalSampleComponent {
  public items = HierarchicalCountries;

  public AllowParentSelection = true;
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
