import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
import { ReservationListComponent } from './pages/reservation-list/reservation-list.component';
import { MapComponent } from './components/map/map.component';
import { CalendarUtils } from 'angular-calendar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MapComponent,
    HomeComponent,
    ReservationListComponent
  ],
  providers: [CalendarUtils], // Agregado aquí
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'classroom-booking-frontend';
}
