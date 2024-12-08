import { Routes } from '@angular/router';
import { TripAddComponent } from './add-trip/add-trip.component';
import { TripListingComponent } from './trip-listing/trip-listing.component';
import { TripEditComponent } from './edit-trip/edit-trip.component';

export const routes: Routes = [
    { path: 'add-trip', component: TripAddComponent },
    { path: 'edit-trip', component: TripEditComponent },
    { path: '', component: TripListingComponent, pathMatch: 'full' }
];
