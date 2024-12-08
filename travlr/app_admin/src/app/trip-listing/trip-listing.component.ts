import { Component, OnInit } from '@angular/core';
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip'
import { Router } from '@angular/router';

@Component({
  selector: 'app-trip-listing',
  templateUrl: './trip-listing.component.html',
  styleUrls: ['./trip-listing.component.css'],
  providers: [TripDataService]
})
export class TripListingComponent implements OnInit {
  trips: Trip[] = [];
  message: string = '';

  constructor(private tripDataService: TripDataService, private router: Router) { }

  ngOnInit(): void {
    this.getTrips();
  }

  private getTrips(): void {
    console.log('TripListingComponent#getTrips calling TripDataService#getTrips');
    this.message = 'Searching for trips';
    this.tripDataService
      .getTrips()
      .then(foundTrips => {
        this.message = foundTrips.length > 0 ? '' : 'No trips found';
        this.trips = foundTrips;
        console.log('Trips fetched:', this.trips); // Add debugging line here
      });
  }

  public addTrip(): void {
    console.log('TripListingComponent#addTrip routing to TripAddComponent');
    this.router.navigate(['/add-trip']);
  }
}
