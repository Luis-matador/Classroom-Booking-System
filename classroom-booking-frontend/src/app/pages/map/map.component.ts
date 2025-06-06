import { Component } from '@angular/core';

@Component({
  selector: 'app-map',
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent {
  goToNextFloor() {
    const carousel = document.getElementById('carouselExampleIndicators');
    // @ts-ignore
    if (carousel && window.bootstrap) {
      // @ts-ignore
      window.bootstrap.Carousel.getOrCreateInstance(carousel).next();
    }
  }
}
