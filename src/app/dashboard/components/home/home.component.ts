import { Component } from '@angular/core';
import { AdminDashboardService, DashboardMetricsDto } from '../../../services/admin-dashboard.service';
import { CommonModule, NgClass } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [NgClass, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {


  dashboardMetrics: DashboardMetricsDto | null = null;

  constructor(private adminDashboardService: AdminDashboardService) {}

  ngOnInit(): void {
    this.fetchDashboardMetrics();
  }

  fetchDashboardMetrics(): void {
    this.adminDashboardService.getDashboardMetrics().subscribe({
      next: (data) => {
        this.dashboardMetrics = data;
        console.log(this.dashboardMetrics);
      },
      error: (error) => {
        console.error('Error fetching dashboard metrics', error);
      },
      complete: () => {
        console.log('Dashboard metrics fetch completed.');
      }
    });
  }

}
