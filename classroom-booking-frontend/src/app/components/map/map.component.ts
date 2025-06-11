import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map!: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.initMap();
    }
  }

  private async initMap(): Promise<void> {
    const L = await import('leaflet'); 

    this.map = L.map('map', {
      crs: L.CRS.Simple,
      minZoom: -2,
      maxZoom: 2
    });

    const bounds: L.LatLngBoundsExpression = [[0, 0], [800, 1000]];
    L.imageOverlay('assets/planta1-1.png', bounds).addTo(this.map);
    this.map.fitBounds(bounds);

    L.marker([400, 500]).addTo(this.map).bindPopup('<b>Entrada principal</b>');
    L.marker([600, 200]).addTo(this.map).bindPopup('Aula de Informática');
  }
}
