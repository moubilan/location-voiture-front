import { Component, OnInit } from '@angular/core';
import { ReservationService } from '../services/reservation.service';
import { UsersService } from '../services/users.service';
import { CarsListService } from '../services/cars-list.service';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-reservation',
  imports: [FaIconComponent],
  templateUrl: './confirm-reservation.component.html',
  styleUrl: './confirm-reservation.component.scss'
})
export class ConfirmReservationComponent implements OnInit{
  reservationData: any;
  isReservationConfirmed = false;
  carDetails: any;

  constructor(private reservationService: ReservationService, private carsListService:CarsListService,
              private usersService: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.reservationData = history.state.reservationData;
    this.fetchCarDetails();
    console.log(this.reservationData)
    console.log(this.carDetails);
  }

  fetchCarDetails(): void {
    this.carsListService.getCarById(this.reservationData.carId).subscribe({
      next: (data) => (this.carDetails = data),
      error: (err) => console.error(err),
    });
  }

  confirmReservation(): void {
    const { carId, ...reservation } = this.reservationData;
    const reservationPayload = {
      ...reservation,
      numeroReservation: 124664, 
      status: "Pending",
      isApproved: false,
      voiture : {id : this.reservationData.carId},
      client : {id: this.usersService.getLoggedUserId()}
    };

    this.reservationService.createReservation(reservationPayload).subscribe({
      next: (response) => {
        this.isReservationConfirmed = true;
        console.log('Reservation created successfully:', response);
      },
      error: (err) => {
        console.error('Error creating reservation:', err);
      },
    });
  }

  closeModal(): void {
    this.isReservationConfirmed = false; // Close the modal
    this.router.navigate(['/']); // Redirect to the home page
  }

}
