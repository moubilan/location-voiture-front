import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface DashboardMetricsDto {
  totalCars: number;
  totalReservations: number;
  totalRevenue: number;
  reservationsToApprove: number;
  latestReservations: ReservationDto[];
}


export interface ReservationDto {
  reservationId: number;
  reservationNumber: number;
  carModel: string;
  reservationDate: string | Date;
  returnDate: string | Date;
  totalPrice: number | null;
  status: string;
  createdAt: string | Date | null;
}

@Injectable({
  providedIn: 'root'
})
export class AdminDashboardService {

  private apiUrl = 'http://localhost:8080/public/api/dashboard';

  constructor(private http: HttpClient) {}

  getDashboardMetrics(): Observable<DashboardMetricsDto> {
    return this.http.get<DashboardMetricsDto>(this.apiUrl);
  }
}
