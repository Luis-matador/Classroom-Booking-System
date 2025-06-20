import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './pages/home/home.component';
<<<<<<< Updated upstream
=======
import { ReservationListComponent } from './pages/reservation-list/reservation-list.component';
import { MapComponent } from './components/map/map.component';
import { CalendarUtils } from 'angular-calendar';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
>>>>>>> Stashed changes

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
<<<<<<< Updated upstream
    HomeComponent
],
=======
    HeaderComponent,
    FooterComponent,
    MapComponent,
    HomeComponent,
    ReservationListComponent
  ],
  providers: [CalendarUtils], 
>>>>>>> Stashed changes
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
  
})
export class AppComponent {
  title = 'classroom-booking-frontend';
}
