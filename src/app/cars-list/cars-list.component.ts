import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CarsListService } from '../services/cars-list.service';
import { Router } from '@angular/router';
import { Car } from '../models/car';

@Component({
  selector: 'app-cars-list',
  imports: [NgClass],
  templateUrl: './cars-list.component.html',
  styleUrl: './cars-list.component.scss'
})
export class CarsListComponent implements OnInit {

  cars: Car[] = [];
  isLoading = true;
  error: string | null = null;
  reservationData: any;

  constructor(private carsListService: CarsListService, private router: Router) {}

  ngOnInit(): void {
    this.fetchCars();
    this.reservationData = history.state.reservationData;
    console.log('Received Reservation Data:', this.reservationData);
  }

  selectCar(carId: number) {
    this.reservationData = {...this.reservationData, carId};
    console.log('Selected Car ID:', this.reservationData);
    this.router.navigate(['/car', carId], { state: { reservationData: this.reservationData } });
  }

  // Fetch all cars
  fetchCars(): void {
    this.isLoading = true;
    this.carsListService.getAllCars().subscribe({
      next: (data) => {
        this.cars = data;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Failed to load cars. Please try again later.';
        this.isLoading = false;
        console.error(err);
      },
    });
  }

  calculateTotalPrice(prixJournalier: number): number {
    if (this.reservationData && this.reservationData.numberOfDays) {
      return prixJournalier * this.reservationData.numberOfDays;
    }
    return prixJournalier;
  }

  // Delete a car
  deleteCar(id: number): void {
    if (confirm('Are you sure you want to delete this car?')) {
      this.carsListService.deleteCar(id).subscribe({
        next: () => {
          this.cars = this.cars.filter((car) => car.id !== id);
          alert('Car deleted successfully!');
        },
        error: (err) => {
          this.error = 'Failed to delete the car. Please try again later.';
          console.error(err);
        },
      });
    }
  }
}
