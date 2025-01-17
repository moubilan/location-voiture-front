import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { Car } from '../models/car';

export interface newCar {
  id?: number;
  marque: string;
  modele: string;
  type: string;
  transmission: string;
  nombreSiege: number;
  nombrePortes: number;
  prixJournalier: number;
  isRented: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class CarsListService {

  private apiUrl = 'http://localhost:8080/public/api/voitures';

  constructor(private http: HttpClient) {}

  // Fetch all cars
  getAllCars(): Observable<Car[]> {
    return this.http.get<Car[]>(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }

  // Fetch car by ID
  getCarById(id: number): Observable<Car> {
    return this.http.get<Car>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Create a new car
  createCar(car: Car): Observable<Car> {
    return this.http.post<Car>(this.apiUrl, car).pipe(
      catchError(this.handleError)
    );
  }

  // Update a car
  updateCar(id: number, car: Car): Observable<Car> {
    return this.http.put<Car>(`${this.apiUrl}/${id}`, car).pipe(
      catchError(this.handleError)
    );
  }

  // Delete a car
  deleteCar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Handle error response
  private handleError(error: any): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Backend error
      errorMessage = `Server returned code: ${error.status}, message: ${error.message}`;
    }
    // Log the error for debugging
    console.error(errorMessage);
    // Return the error to be handled by the component
    return throwError(errorMessage);
  }
}
