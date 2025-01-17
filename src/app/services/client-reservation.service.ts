import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface ClientReservationsDto {
  reservationId: number;
  reservationNumber: number;
  carModel: string;
  reservationDate: string;
  returnDate: string;
  totalPrice: number;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClientReservationService {

  private apiUrl = 'http://localhost:8080/public/api/client-reservations';

  constructor(private http: HttpClient) {}

  getClientReservations(clientId: number): Observable<ClientReservationsDto[]> {
    return this.http.get<ClientReservationsDto[]>(`${this.apiUrl}/${clientId}`);
  }

  cancelReservation(reservationId: number): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/cancel/${reservationId}`, {
      status: 'CANCELLED',
    });
  }
  
}
