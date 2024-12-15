import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-trip-list',
  templateUrl: './trip-list.component.html',
  styleUrls: ['./trip-list.component.css'],
})
export class TripListComponent implements OnInit {
  trips: Trip[] = [];

  constructor(
    private tripService: TripDataService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit() {
    this.getTrips();
  }

  getTrips() {
    this.tripService.getTrips().then((data) => {
      this.trips = data;
    });
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }
}
