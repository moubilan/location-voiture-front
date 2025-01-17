import { Component } from '@angular/core';
import { DashboardcarService } from '../../../services/dashboardcar.service';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { FormsModule } from '@angular/forms';
import { Car } from '../../../models/car';
import { newCar } from '../../../services/cars-list.service';

@Component({
  selector: 'app-cars',
  imports: [FaIconComponent, FormsModule],
  templateUrl: './cars.component.html',
  styleUrl: './cars.component.scss'
})
export class CarsComponent {


  cars: Car[] = [];
  selectedCar: Car | null = null; 
  isEditModalOpen = false;
  isCreateModalOpen = false;
  newCar: newCar = {
    marque: '',
    modele: '',
    type: '',
    transmission: '',
    nombreSiege: 0,
    nombrePortes: 0,
    prixJournalier: 0,
    isRented: false,
  };

  constructor(private carService: DashboardcarService) {}

  ngOnInit(): void {
    this.loadCars();
  }

  loadCars(): void {
    this.carService.getAllCars().subscribe((data) => {
      this.cars = data;
    });
  }

  openCreateModal(): void {
    this.isCreateModalOpen = true;
  }

  
  closeCreateModal(): void {
    this.isCreateModalOpen = false;
    this.newCar = {
      
      marque: '',
      modele: '',
      type: '',
      transmission: '',
      nombreSiege: 0,
      nombrePortes: 0,
      prixJournalier: 0,
      isRented: false,
    };
  }

  createCar(): void {
    this.carService.createCar(this.newCar).subscribe({
      next: () => {
        this.loadCars(); 
        this.closeCreateModal();
      },
      error: (error) => {
        console.error('Error creating car:', error);
      },
    });
  }

  openEditModal(carId: number | undefined): void {
    if (carId === undefined) {
      console.error('Car ID is undefined');
      return;
    }
    this.carService.getCarById(carId).subscribe({
      next: (car) => {
        this.selectedCar = car;
        this.isEditModalOpen = true;
      },
      error: (error) => {
        console.error('Error fetching car details:', error);
      },
    });
  }

  updateCar(): void {
    if (this.selectedCar) {
      const carId = this.selectedCar?.id ?? 0;
      this.carService.updateCar(carId, this.selectedCar).subscribe({
        next: () => {
          this.loadCars(); // Refresh the table
          this.isEditModalOpen = false; // Close the modal
        },
        error: (error) => {
          console.error('Error updating car:', error);
        },
      });
    }
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
    this.selectedCar = null; // Reset the selected car
  }


  deleteCar(id: number): void {
    this.carService.deleteCar(id).subscribe(() => {
      this.loadCars();
    });
  }

}
