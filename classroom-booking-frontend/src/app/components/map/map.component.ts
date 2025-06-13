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

    const bounds: L.LatLngBoundsExpression = [[0, 0], [1000, 1000]];

    this.map = L.map('map', {
      crs: L.CRS.Simple,
      minZoom: -2,
      maxZoom: 2,
      maxBounds: bounds,
      maxBoundsViscosity: 1.0 
    });

    L.imageOverlay('assets/Mapa(Ayuda).png', bounds).addTo(this.map);
    this.map.fitBounds(bounds);

    const aulaCoords: L.LatLngBoundsExpression = [[250, 180], [520, 220]];
    const aulaRect = L.rectangle(aulaCoords, {
      color: "transparent",      
      weight: 2,
      fillOpacity: 0,            
      fillColor: "transparent"   
    }).addTo(this.map);

    aulaRect.on('mouseover', function () {
      aulaRect.setStyle({ 
        fillOpacity: 0.5, 
        color: "#ffcc00", 
        fillColor: "#ffcc00" 
      });
    });
    aulaRect.on('mouseout', function () {
      aulaRect.setStyle({ 
        fillOpacity: 0, 
        color: "transparent", 
        fillColor: "transparent" 
      });
    });
    aulaRect.on('click', function () {
      aulaRect.bindPopup('Reservar Aula de Informática').openPopup();
    });
  }
}
