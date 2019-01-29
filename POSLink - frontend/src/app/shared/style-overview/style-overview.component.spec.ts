import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StyleOverviewComponent } from './style-overview.component';

describe('StyleOverviewComponent', () => {
  let component: StyleOverviewComponent;
  let fixture: ComponentFixture<StyleOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StyleOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StyleOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
