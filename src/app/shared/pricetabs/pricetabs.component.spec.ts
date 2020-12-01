import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PricetabsComponent } from './pricetabs.component';

describe('PricetabsComponent', () => {
  let component: PricetabsComponent;
  let fixture: ComponentFixture<PricetabsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PricetabsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PricetabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
