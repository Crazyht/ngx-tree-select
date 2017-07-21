import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FlatSampleComponent } from './flat-sample.component';

describe('FlatSampleComponent', () => {
  let component: FlatSampleComponent;
  let fixture: ComponentFixture<FlatSampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FlatSampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FlatSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
