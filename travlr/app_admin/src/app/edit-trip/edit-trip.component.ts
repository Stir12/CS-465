import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TripDataService } from '../services/trip-data.service';

@Component({
  selector: 'app-trip-edit',
  templateUrl: './trip-edit.component.html',
  styleUrls: ['./trip-edit.component.css']
})
export class TripEditComponent {
  editTripFormGroup!: FormGroup;
  submitted = false;
  private tripCode: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripService: TripDataService
  ) {}

  ngOnInit() {
    this.tripCode = localStorage.getItem('tripCode');
    if (!this.tripCode) {
      console.error("Something has gone wrong, couldn't find where I stashed tripCode!");
      this.router.navigate(['']);
      return;
    }
    console.log('TripEditComponent#onInit found tripCode ' + this.tripCode);

    this.editTripFormGroup = this.formBuilder.group({
      _id: [],
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
    });

    console.log(`TripEditComponent#onInit calling TripDataService#getTrip('${this.tripCode}')`);
    this.tripService.getTrip(this.tripCode).then((data) => {
      console.log('TripEditComponent#onInit data', data);
      this.editTripFormGroup.patchValue(data[0]);
    });
  }

  onSubmit() {
    console.log(`TripEditComponent#onSubmit calling TripDataService#updateTrip('${this.tripCode}')`);
    this.submitted = true;
    if (this.editTripFormGroup.valid) {
      this.tripService.updateTrip(this.editTripFormGroup.value).then((data) => {
        console.log('TripEditComponent#onSubmit data', data);
        this.router.navigate(['']);
      });
    }
  }

  deleteTrip() {
    console.log(`TripEditComponent#deleteTrip calling TripDataService#deleteTrip('${this.tripCode}')`);
    if (this.tripCode != null) {
      this.tripService.deleteTrip(this.tripCode).then((data) => {
        console.log('TripEditComponent#deleteTrip data', data);
        this.router.navigate(['']);
      });
    } else {
      console.error('TripEditComponent#deleteTrip failed, tripCode is null');
      this.router.navigate(['']);
    }
  }

  get f() {
    return this.editTripFormGroup.controls;
  }
}
