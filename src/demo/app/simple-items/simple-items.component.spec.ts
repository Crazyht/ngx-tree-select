import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SimpleItemsComponent } from './simple-items.component';

describe('SimpleItemsComponent', () => {
  let component: SimpleItemsComponent;
  let fixture: ComponentFixture<SimpleItemsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SimpleItemsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SimpleItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
