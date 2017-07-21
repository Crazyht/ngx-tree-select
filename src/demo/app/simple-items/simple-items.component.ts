import { Component } from '@angular/core';
import { FirstnameList } from '../../../datas';

@Component({
  selector: 'demo-simple-items',
  templateUrl: './simple-items.component.html',
  styleUrls: ['./simple-items.component.scss']
})
export class SimpleItemsComponent {
  public items = FirstnameList;

  public ShowFilter = true;
  public Disabled = false;
  public FilterPlaceholder = 'Type here to filter elements...';
  public MaxDisplayed = 5;


  public simpleSelected = 'Jeremy';
  public multipleSelected = ['Jeremy', 'Jordan'];
}
