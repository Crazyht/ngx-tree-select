import { Component } from '@angular/core';
import { FlatCountries } from '../../../datas';

@Component({
  selector: 'simple-value-sample',
  templateUrl: './simple-value.component.html'
})
export class SimpleValueComponent {
  public items = [
    'Jacques',
    'Jad',
    'Jana',
    'Jasmine',
    'Jeremie',
    'Jeremy',
    'Joachim',
    'Johan',
    'Johanna',
    'Jonathan',
    'Jordan',
    'Joseph',
    'Jules',
    'Justin'
  ];

  public ShowFilter = true;
  public Disabled = false;
  public FilterPlaceholder = 'Type here to filter elements...';
  public MaxDisplayed = 5;

  public simpleSelected = 'Jeremy';
  public multipleSelected = ['Jeremy', 'Jordan'];
}
