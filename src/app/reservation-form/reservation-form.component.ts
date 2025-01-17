import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation-form',
  imports: [FormsModule],
  templateUrl: './reservation-form.component.html',
  styleUrl: './reservation-form.component.scss'
})
export class ReservationFormComponent {

  lieuRetrait: string = '';
  dateDepart: string = '';
  dateRetour: string = '';
  errorMessage: string = '';
  numberOfDays: number | null = null;

  constructor(private router: Router) {}

  voirVehicules(): void {
    // Convert the date strings to Date objects
    const departDate = new Date(this.dateDepart);
    const retourDate = new Date(this.dateRetour);

    if (!this.lieuRetrait || !this.dateDepart || !this.dateRetour) {
      this.showError('Veuillez remplir tous les champs obligatoires.');
      return;
    }

    if (departDate > retourDate) {
      this.showError('La date de départ doit être avant la date de retour.');
      return;
    }

    this.numberOfDays = this.calculateNumberOfDays(departDate, retourDate);

    const reservationData = {
      lieuRetrait: this.lieuRetrait,
      dateDepart: this.dateDepart,
      dateRetour: this.dateRetour,
      numberOfDays: this.numberOfDays
    };

    // Passing data via navigation (or use a shared service for complex cases)
    this.router.navigate(['/cars-list'], { state: { reservationData } });
  }

  showError(mess: string) {
    this.errorMessage = mess;
    setTimeout(() => {
      this.errorMessage = ''
    }, 3000)
  }

  calculateNumberOfDays(startDate: Date, endDate: Date): number {
    const timeDifference = endDate.getTime() - startDate.getTime();

    const daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

    return daysDifference;
  }


  // voirVehicules(): void {
  //   // Store the data and redirect to the next component
  //   const reservationData = {
  //     lieuRetrait: this.lieuRetrait,
  //     dateDepart: this.dateDepart,
  //     dateRetour: this.dateRetour,
  //   };

  //   // Passing data via navigation (or use a shared service for complex cases)
  //   this.router.navigate(['/cars-list'], { state: { reservationData } });
  // }

}
