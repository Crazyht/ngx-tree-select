import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HierarchicalSampleComponent } from './hierarchical-sample.component';

describe('HierarchicalSampleComponent', () => {
  let component: HierarchicalSampleComponent;
  let fixture: ComponentFixture<HierarchicalSampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HierarchicalSampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HierarchicalSampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
