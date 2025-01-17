import { Component } from '@angular/core';
import { ClientReservationsDto, ClientReservationService } from '../services/client-reservation.service';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-reservation-list',
  imports: [NgClass, CommonModule],
  templateUrl: './reservation-list.component.html',
  styleUrl: './reservation-list.component.scss'
})
export class ReservationListComponent {

  clientReservations: ClientReservationsDto[] = [];
  showCancelModal: boolean = false;
  reservationToCancel: number | null = null;
  clientId: number = 0;

  constructor(private clientReservationService: ClientReservationService) {}

  ngOnInit(): void {

    const currentUserString = localStorage.getItem('user');
    const currentUser = currentUserString ? JSON.parse(currentUserString) : null;

    if (currentUser && currentUser.id) {
    this.clientId = currentUser.id;
    this.fetchReservations();
    } else {
    console.error('User not found');
    }
  }

  fetchReservations(): void {
    this.clientReservationService.getClientReservations(this.clientId).subscribe((data) => {
      this.clientReservations = data;
    });
  }

  confirmCancel(reservationId: number): void {
    this.reservationToCancel = reservationId;
    this.showCancelModal = true;
  }

  closeModal(): void {
    this.showCancelModal = false;
    this.reservationToCancel = null;
  }

  cancelReservation(): void {
    if (this.reservationToCancel) {
      this.clientReservationService
        .cancelReservation(this.reservationToCancel)
        .subscribe(() => {
          // Update the reservation list after cancellation
          this.fetchReservations();
          this.closeModal();
        });
    }
  }
}
