import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';
import { UpdateuserComponent } from './updateuser/updateuser.component';
import { adminGuard, usersGuard } from './users.guard';
import { UserslistComponent } from './userslist/userslist.component';
import { CarsListComponent } from './cars-list/cars-list.component';
import { ReservationFormComponent } from './reservation-form/reservation-form.component';
import { CarDetailsComponent } from './car-details/car-details.component';
import { ConfirmReservationComponent } from './confirm-reservation/confirm-reservation.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HomeComponent } from './dashboard/components/home/home.component';
import { ReservationListComponent } from './reservation-list/reservation-list.component';
import { CarsComponent } from './dashboard/components/cars/cars.component';
import { ReservationsComponent } from './dashboard/components/reservations/reservations.component';
import { HomePageComponent } from './home-page/home.component';

export const routes: Routes = [
    {path: 'home', component: HomePageComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'profile', component: ProfileComponent, canActivate: [usersGuard]},
    {path: 'reservation-form', component: ReservationFormComponent, canActivate: [usersGuard]},
    {path: 'car/:id', component: CarDetailsComponent, canActivate: [usersGuard] },
    {path: 'update/:id', component: UpdateuserComponent, canActivate: [adminGuard]},
    {path: 'users', component: UserslistComponent, canActivate:[adminGuard]},
    {path: 'cars-list', component: CarsListComponent, canActivate:[usersGuard]},
    {path: 'confirmation', component: ConfirmReservationComponent, canActivate:[usersGuard]},
    {path: 'client-reservation', component: ReservationListComponent , canActivate:[usersGuard]},
    {
        path: 'dashboard',
        component: DashboardComponent,
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'cars', component: CarsComponent },
            { path: 'reservations', component: ReservationsComponent },
            { path: '', redirectTo: 'home', pathMatch: 'full' },
            ],
    },
    //{ path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: '**', component: LoginComponent},
];
