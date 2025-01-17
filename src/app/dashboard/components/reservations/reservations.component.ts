import { Component } from '@angular/core';
import { Reservation, ReservationService } from '../../../services/reservation.service';
import { CommonModule, NgClass } from '@angular/common';
import { faI } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-reservations',
  imports: [NgClass, CommonModule, FaIconComponent],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.scss'
})
export class ReservationsComponent {


  reservations: Reservation[] = [];

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.fetchReservations();
  }

  // Fetch all reservations
  fetchReservations(): void {
    this.reservationService.getReservations().subscribe({
      next: (reservations) => {
        this.reservations = reservations;
      },
      error: (error) => {
        console.error('Error fetching reservations:', error);
      },
    });
  }

  approveReservation(reservation: Reservation): void {

    if (reservation.id === undefined) {
      console.error('Reservation ID is undefined');
      return;
    }
    
    reservation.isApproved = true;
    reservation.status = 'CONFIRMED';

    this.reservationService.updateReservation(reservation.id, reservation).subscribe({
      next: (updatedReservation) => {
        console.log('Reservation approved:', updatedReservation);
        this.fetchReservations();
      },
      error: (error) => {
        console.error('Error approving reservation:', error);
        
        reservation.isApproved = false;
        reservation.status = 'PENDING';
      },
    });
  }

  // Delete a reservation
  deleteReservation(id: number): void {
    this.reservationService.deleteReservation(id).subscribe({
      next: () => {
        this.reservations = this.reservations.filter((res) => res.id !== id);
      },
      error: (error) => {
        console.error('Error deleting reservation:', error);
      },
    });
  }
}
