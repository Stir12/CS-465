import { Routes } from '@angular/router';
import { TripAddComponent } from './add-trip/add-trip.component';
import { TripListingComponent } from './trip-listing/trip-listing.component';
import { TripEditComponent } from './edit-trip/edit-trip.component';
import { LoginComponent } from './login/login.component';
import { Component } from '@angular/core';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: 'add-trip', component: TripAddComponent },
    { path: 'edit-trip', component: TripEditComponent },
    { path: 'login', component: LoginComponent};
    { path: 'list-trips', Component: TripListingComponent};
    { path: '', component: HomeComponent, pathMatch: 'full' }
];
