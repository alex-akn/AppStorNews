import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchAppComponent } from './watch-app.component';

describe('WatchAppComponent', () => {
  let component: WatchAppComponent;
  let fixture: ComponentFixture<WatchAppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WatchAppComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchAppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
