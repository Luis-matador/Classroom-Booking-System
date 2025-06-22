import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ReservationListComponent } from './pages/reservation-list/reservation-list.component';
import { BookingComponent } from './pages/booking/booking.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'reservations', component: ReservationListComponent },
    { path: 'booking', component: BookingComponent },
    { path: '**', redirectTo: 'login' }
];
