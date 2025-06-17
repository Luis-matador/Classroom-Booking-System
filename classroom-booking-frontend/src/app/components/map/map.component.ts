import { Component, AfterViewInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements AfterViewInit {
  private map!: any;
  selectedRoom: any = null;
  showReservationPanel = false;

  reservation = {
    name: '',
    date: '',
    time: ''
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

    const rooms: { name: string; coords: [number, number][] }[] = [
      {
        name: 'Computer Room',
        coords: [[250, 180], [520, 220]]
      },
      {
        name: 'Room 1',
        coords: [[600, 150], [750, 250]]
      },
      {
        name: 'Room 2',
        coords: [[800, 300], [950, 400]]
      },
      {
        name: 'Laboratory',
        coords: [[300, 600], [450, 700]]
      }
    ];

    rooms.forEach(room => {
      const highlightColor = "#00b2ff";
      const highlightColorDark = "#0080b2";
      const rect = L.rectangle(room.coords, {
        color: "transparent",
        weight: 2,
        fillOpacity: 0,
        fillColor: highlightColor
      }).addTo(this.map);

      let animating = false;
      let animationFrame: number;

      const animateFill = (from: number, to: number, duration = 350) => {
        if (animating) cancelAnimationFrame(animationFrame);
        animating = true;
        const start = performance.now();
        function step(now: number) {
          const progress = Math.min((now - start) / duration, 1);
          const value = from + (to - from) * progress;
          rect.setStyle({ fillOpacity: value });
          if (progress < 1) {
            animationFrame = requestAnimationFrame(step);
          } else {
            animating = false;
          }
        }
        requestAnimationFrame(step);
      };

      rect.on('mouseover', () => {
        rect.setStyle({
          color: highlightColorDark,
          fillColor: highlightColorDark
        });
        animateFill(rect.options.fillOpacity ?? 0, 0.6, 350);
      });

      rect.on('mouseout', () => {
        rect.setStyle({
          color: "transparent",
          fillColor: highlightColor
        });
        animateFill(rect.options.fillOpacity ?? 0, 0, 350);
      });

      rect.on('click', () => {
        this.selectedRoom = room;
        this.showReservationPanel = true;
      });
    });
  }
}