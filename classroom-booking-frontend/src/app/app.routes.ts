import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ReservationListComponent } from './pages/reservation-list/reservation-list.component';
import { BookingComponent } from './pages/booking/booking.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'reservations', component: ReservationListComponent, canActivate: [AuthGuard] },
    { path: 'booking', component: BookingComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: 'login' }
];
