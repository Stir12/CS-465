import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripAddComponent } from './add-trip.component';

describe('AddTripComponent', () => {
  let component: TripAddComponent;
  let fixture: ComponentFixture<TripAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
