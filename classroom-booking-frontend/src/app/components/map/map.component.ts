import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map!: any;
  selectedAula: any = null;
  showReservationPanel = false;

  reserva = {
    nombre: '',
    fecha: '',
    hora: ''
  };

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
      maxBoundsViscosity: 1.0,
      attributionControl: true
    });

    this.map.attributionControl.setPrefix('');
    L.imageOverlay('assets/Mapa_Final.svg', bounds).addTo(this.map);
    this.map.fitBounds(bounds);

    const aulas: { nombre: string; coords: [number, number][] }[] = [
      {
        nombre: 'Aula de Informática',
        coords: [[250, 180], [520, 220]]
      },
      {
        nombre: 'Aula 1',
        coords: [[600, 150], [750, 250]]
      },
      {
        nombre: 'Aula 2',
        coords: [[800, 300], [950, 400]]
      },
      {
        nombre: 'Laboratorio',
        coords: [[300, 600], [450, 700]]
      }
    ];

    aulas.forEach(aula => {
      const rect = L.rectangle(aula.coords, {
        color: "transparent",
        weight: 2,
        fillOpacity: 0,
        fillColor: "transparent"
      }).addTo(this.map);

      rect.on('mouseover', () => {
        rect.setStyle({
          fillOpacity: 0.5,
          color: "#ffcc00",
          fillColor: "#ffcc00"
        });
      });

      rect.on('mouseout', () => {
        rect.setStyle({
          fillOpacity: 0,
          color: "transparent",
          fillColor: "transparent"
        });
      });

      rect.on('click', () => {
        this.selectedAula = aula;
        this.showReservationPanel = true;
      });
    });
  }
}