import { Component } from '@angular/core';
import { MapComponent } from '../../components/map/map.component';
import { HeaderComponent } from '../../components/header/header.component'; 
import { FooterComponent } from '../../components/footer/footer.component';

@Component({
  selector: 'app-booking',
  imports: [MapComponent, HeaderComponent, FooterComponent],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent {

}
