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
      //Planta 1 Izquierda
      {
        name: 'Polivalente 1.1.1', 
        coords: [[403, 136], [340, 167]]
      },
      {
        name: 'Taller de Enfermeria 1.1.2',
        coords: [[403, 168], [340, 257.5]]
      },
      {
        name: 'Polivalente 1.1.3',
        coords: [[403, 258], [349, 325]]
      },
      {
        name: 'Polivalente 1.1.3',
        coords: [[403, 258], [386, 351]]
      },
       {
        name: 'Taller y Laboratorio Diétetica 1.1.4', 
        coords: [[233, 137], [306, 174]]
      },
      {
        name: 'Polivalente 1.1.5', 
        coords: [[270, 175], [306, 225]]
      },
      {
        name: 'Polivalente 1.1.5', 
        coords: [[233, 197], [306, 225]]
      },
      {
        name: 'Laboratorio 1.1.6', 
        coords: [[233, 226], [306, 257]]
      },
      {
        name: 'Laboratorio 1.1.6', 
        coords: [[281, 226], [306, 275]]
      },
      {
        name: 'Laboratorio 1.1.7', 
        coords: [[233, 258], [280, 351]]
      },
      {
        name: 'Laboratorio 1.1.7', 
        coords: [[280, 276], [306, 351]]
      },
      
      //Planta 1 Derecha
      {
        name: 'Polivalente 3.1.1', 
        coords: [[352.5, 626], [400, 730.5]]
      },
      {
        name: 'Laboratorio & Fabr. Protesis 3.1.2', 
        coords: [[361, 732], [400, 840]]
      },
      {
        name: 'Peluqueria 3.1.3', 
        coords: [[230.5, 613], [274.5, 706]]
      },
      {
        name: 'Polivalente 3.1.4', 
        coords: [[230.5, 707], [284, 785]]
      },
      {
        name: 'Polivalente 3.1.5', 
        coords: [[230.5, 786], [286, 840]]
      },

      //Planta 2 Izquierda
      {
        name: 'Polivalente 1.2.1', 
        coords: [[712, 109], [775, 139]]
      },
      {
        name: 'Audicion 1.2.2', 
        coords: [[722.5, 140], [775, 207.5]]
      },
      {
        name: 'Audicion 1.2.3', 
        coords: [[712, 208.75], [775, 280.25]]
      },
      {
        name: 'Audicion 1.2.4', 
        coords: [[712, 281.5], [775, 340.25]]
      },
      {
        name: 'Lab. Electroacustico & Taller Audioprot. 1.2.5', 
        coords: [[603.25, 109], [680, 154.5]]
      },
      {
        name: 'Lab. Protesis 1.2.6', 
        coords: [[603.25, 156], [689.5, 210.25]]
      },
      {
        name: 'Lab. Bucodental 1.2.7', 
        coords: [[603.25, 212], [674.5, 272.45]]
      },
      {
        name: 'Polivalente 1.2.8', 
        coords: [[603.25, 274], [674, 340]]
      },

      //Planta 2 Centro
      {
        name: 'Polivalente 2.2.1', 
        coords: [[718.5, 402], [775, 460]]
      },
      {
        name: 'Polivalente 2.2.2', 
        coords: [[718.5, 461.5], [775, 513]]
      },
      {
        name: 'Biblioteca', 
        coords: [[738.5, 571.25], [775, 633]]
      },
      {
        name: 'Taller Administracion y Gestion 2.2.3', 
        coords: [[604, 402], [666, 490.25]]
      },
      {
        name: 'Aula Tecnica Comer y Marketing 2.2.4', 
        coords: [[604, 491.5], [666, 575]]
      },

      //Planta 2 Izquierda
      {
        name: 'Aula Tecnica Multimedia y Animacion 3.2.1', 
        coords: [[728.5, 689.5], [774.25, 743]]
      },
      {
        name: 'Polivalente 3.2.2', 
        coords: [[728.5, 744.5], [774.25, 788.75]]
      },
      {
        name: 'Polivalente 3.2.3', 
        coords: [[744.25, 846], [774.25, 921.25]]
      },
      {
        name: 'Polivalente 3.2.4', 
        coords: [[603, 690], [665.5, 748.5]]
      },
      {
        name: 'Estudio Audiovisual, Animacion Clasica y Montaje y Postproduccion 3.2.5', 
        coords: [[603, 750.25], [688.5, 829.5]]
      },
      {
        name: 'Taller de Intervencion Social y Servicios Socioculturales 3.2.6', 
        coords: [[603, 831], [657.5, 921]]
      },
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