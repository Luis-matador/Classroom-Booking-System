import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ReservationListComponent } from './pages/reservation-list/reservation-list.component';
import { MapComponent } from './components/map/map.component';
import { BookingComponent } from './pages/booking/booking.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'reservations', component: ReservationListComponent },
    { path: '*', redirectTo: 'home' },
    { path: 'map', component: MapComponent },
    {path: 'booking', component: BookingComponent}
];
