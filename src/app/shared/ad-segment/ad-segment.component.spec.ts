import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdSegmentComponent } from './ad-segment.component';

describe('AdSegmentComponent', () => {
  let component: AdSegmentComponent;
  let fixture: ComponentFixture<AdSegmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdSegmentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdSegmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
