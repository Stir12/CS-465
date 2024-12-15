import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { lastValueFrom } from 'rxjs';
import { Trip } from '../models/trip';
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';
import { BROWSER_STORAGE } from '../storage';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {
  constructor(
    private httpClient: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage
  ) {}

  private apiBaseUrl = 'http://localhost:3000/api';

  // Get all trips
  public async getTrips(): Promise<Trip[]> {
    console.log('Inside TripDataService#getTrips');
    return await lastValueFrom(
      this.httpClient
        .get<Trip[]>(`${this.apiBaseUrl}/trips`)
    ).catch(this.handleError);
  }

  // Get a specific trip by code
  public async getTrip(tripCode: string): Promise<Trip[]> {
    console.log(`Inside TripDataService#getTrip('${tripCode}')`);
    return await lastValueFrom(
      this.httpClient
        .get<Trip[]>(`${this.apiBaseUrl}/trips/${tripCode}`)
    ).catch(this.handleError);
  }

  // Add a new trip
  public async addTrip(formData: Trip): Promise<Trip> {
    console.log('Inside TripDataService#addTrip');
    return await lastValueFrom(
      this.httpClient
        .post<Trip[]>(`${this.apiBaseUrl}/trips`, formData)
    ).catch(this.handleError);
  }

  // Update an existing trip
  public async updateTrip(formData: Trip): Promise<Trip[]> {
    console.log(`Inside TripDataService#updateTrip('${formData.code}')`);
    return await lastValueFrom(
      this.httpClient
        .put<Trip[]>(`${this.apiBaseUrl}/trips/${formData.code}`, formData)
    ).catch(this.handleError);
  }

  // Delete a trip
  public async deleteTrip(tripCode: string): Promise<any> {
    console.log(`Inside TripDataService#deleteTrip('${tripCode}')`);
    return await lastValueFrom(
      this.httpClient
        .delete(`${this.apiBaseUrl}/trips/${tripCode}`)
    ).catch(this.handleError);
  }

  // Handle errors
  private handleError(error: any): Promise<any> {
    console.error('Something has gone wrong', error);
    return Promise.reject(error.message || error);
  }

  // Save token to storage
  public saveToken(token: string): void {
    this.storage.setItem('travlr-token', token);
  }

  // Get token from storage
  public getToken(): string {
    return this.storage.getItem('travlr-token');
  }

  // Check if user is logged in based on token
  public isLoggedIn(): boolean {
    const token = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > Date.now() / 1000;
    }
    return false;
  }

  // Get current user from the token
  public getCurrentUser(): User {
    if (this.isLoggedIn()) {
      const token = this.getToken();
      const { email, name } = JSON.parse(atob(token.split('.')[1]));
      return { email, name } as User;
    }
    return null;
  }

  // Login method
  public login(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('login', user);
  }

  // Register method
  public register(user: User): Promise<AuthResponse> {
    return this.makeAuthApiCall('register', user);
  }

  // Make Auth API Call (for login and register)
  private makeAuthApiCall(urlPath: string, user: User): Promise<AuthResponse> {
    const url: string = `${this.apiBaseUrl}/${urlPath}`;
    return this.httpClient
      .post<AuthResponse>(url, user)
      .toPromise()
      .then(response => response)
      .catch(this.handleError);
  }
}
