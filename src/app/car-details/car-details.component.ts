import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CarsListService } from '../services/cars-list.service';

@Component({
  selector: 'app-car-details',
  imports: [RouterLink],
  templateUrl: './car-details.component.html',
  styleUrl: './car-details.component.scss'
})
export class CarDetailsComponent {

  carId!: number;
  carDetails: any;
  reservationData: any;
  assuranceCost: number = 0;
  kilometrageCost: number = 0;
  errorMessage: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private carsListService: CarsListService) {}

  ngOnInit(): void {
    this.carId = +this.route.snapshot.paramMap.get('id')!;
    this.reservationData = history.state.reservationData;

    this.fetchCarDetails();
  }

  fetchCarDetails(): void {
    this.carsListService.getCarById(this.carId).subscribe({
      next: (data) => (this.carDetails = data),
      error: (err) => console.error(err),
    });
  }

  calculateTotalPrice(): number {
    if (this.reservationData && this.reservationData.numberOfDays) {
      let totalPrice = this.carDetails.prixJournalier * this.reservationData.numberOfDays;
      
      
      if (this.reservationData.assurance === 'Protection vol-collision avec franchise réduite') {
        totalPrice += this.carDetails.prixJournalier * 0.24 * this.reservationData.numberOfDays;
      } else if (this.reservationData.assurance === 'Protection vol-collision avec franchise minimum') {
        totalPrice += this.carDetails.prixJournalier * 0.44 * this.reservationData.numberOfDays;
      }

      
      if (this.reservationData.kilometrage === 'Kilomètres illimités') {
        totalPrice += 80 * this.reservationData.numberOfDays;
      }

      this.reservationData = { ...this.reservationData, totalPrice };
      return totalPrice;
    }
    return this.carDetails.prixJournalier;
  }


  // calculateTotalPrice(prixJournalier: number): number {
  //   if (this.reservationData && this.reservationData.numberOfDays) {
  //     let totalPrice = prixJournalier * this.reservationData.numberOfDays;
  //     this.reservationData = {...this.reservationData, totalPrice};
  //     console.log(totalPrice)
  //     return totalPrice;
  //   }
  //   return prixJournalier;
  // }

  // updateAssuranceCost(assuranceCost: number): void{
  //   this.assuranceCost += assuranceCost;
  // }

  // updateKilometrageCost(kilometrageCost: number): void {
  //   this.kilometrageCost += kilometrageCost;
  // }

  

  updateAssurance(assurance: string): void {
    this.reservationData.assurance = assurance;
    this.calculateTotalPrice();
  }

  updateKilometrage(kilometrage: string): void {
    this.reservationData.kilometrage = kilometrage;
    this.calculateTotalPrice();
  }

  navigateToConfirmation(): void {
    if (!this.reservationData.assurance || !this.reservationData.kilometrage) {
      this.showError('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    this.router.navigate(['/confirmation'], { state: { reservationData: this.reservationData } });
  }

  showError(mess: string) {
    this.errorMessage = mess;
    setTimeout(() => {
      this.errorMessage = ''
    }, 3000)
  }

}
