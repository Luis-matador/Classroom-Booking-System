import { Component, OnInit, AfterViewInit, Renderer2 } from '@angular/core';

interface Centro {
  nombre: string;
  imagen: string;
  direccion: string;
  telefono: string;
  correo: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  centros: Centro[] = [
    {
      nombre: 'Madrid',
      imagen: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=300&fit=crop&crop=center',
      direccion: 'Calle Alcalá, 123',
      telefono: '91 123 45 67',
      correo: 'madrid@ilerna.es'
    },
    {
      nombre: 'Sevilla',
      imagen: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=300&fit=crop&crop=center',
      direccion: 'Avenida de la Constitución, 45',
      telefono: '95 456 78 90',
      correo: 'sevilla@ilerna.es'
    },
    {
      nombre: 'Barcelona',
      imagen: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600&h=300&fit=crop&crop=center',
      direccion: 'Passeig de Gràcia, 67',
      telefono: '93 789 01 23',
      correo: 'barcelona@ilerna.es'
    },
    {
      nombre: 'Valencia',
      imagen: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=600&h=300&fit=crop&crop=center',
      direccion: 'Calle Colón, 89',
      telefono: '96 234 56 78',
      correo: 'valencia@ilerna.es'
    },
    {
      nombre: 'Málaga',
      imagen: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=300&fit=crop&crop=center',
      direccion: 'Calle Larios, 12',
      telefono: '95 345 67 89',
      correo: 'malaga@ilerna.es'
    }
  ];

  centroActual: number = 1;
  autoSlide: any;

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {
    this.actualizarCentro();
  }

  ngAfterViewInit(): void {
    // Eventos
    this.renderer.listen(document.querySelector('.hamburger'), 'click', () => {
      const navMenu = document.querySelector('.nav-menu') as HTMLElement;
      navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';
    });

    this.renderer.listen(document.querySelector('.arrow-left'), 'click', () => {
      this.centroActual = (this.centroActual - 1 + this.centros.length) % this.centros.length;
      this.actualizarCentro();
    });

    this.renderer.listen(document.querySelector('.arrow-right'), 'click', () => {
      this.centroActual = (this.centroActual + 1) % this.centros.length;
      this.actualizarCentro();
    });

    this.renderer.listen(document, 'keydown', (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        this.centroActual = (this.centroActual - 1 + this.centros.length) % this.centros.length;
        this.actualizarCentro();
      } else if (e.key === 'ArrowRight') {
        this.centroActual = (this.centroActual + 1) % this.centros.length;
        this.actualizarCentro();
      }
    });

    const slider = document.querySelector('.slider-container');
    if (slider) {
      this.renderer.listen(slider, 'mouseenter', () => clearInterval(this.autoSlide));
      this.renderer.listen(slider, 'mouseleave', () => {
        this.autoSlide = setInterval(() => {
          this.centroActual = (this.centroActual + 1) % this.centros.length;
          this.actualizarCentro();
        }, 5000);
      });
    }

    this.autoSlide = setInterval(() => {
      this.centroActual = (this.centroActual + 1) % this.centros.length;
      this.actualizarCentro();
    }, 5000);
  }

  actualizarCentro(): void {
    const centro = this.centros[this.centroActual];
    const imagen = document.querySelector('.center-image') as HTMLImageElement;
    const nombre = document.querySelector('.center-name') as HTMLElement;
    const footerInfo = document.querySelector('.footer-info') as HTMLElement;
    const card = document.querySelector('.center-card') as HTMLElement;

    if (imagen && nombre && footerInfo && card) {
      card.style.opacity = '0.5';

      setTimeout(() => {
        imagen.src = centro.imagen;
        imagen.alt = `Centro ILERNA ${centro.nombre}`;
        nombre.textContent = centro.nombre;
        footerInfo.innerHTML = `
          <span><strong>Dirección:</strong> ${centro.direccion}</span>
          <span><strong>Teléfono:</strong> ${centro.telefono}</span>
          <span><strong>Correo:</strong> ${centro.correo}</span>
        `;
        card.style.opacity = '1';
      }, 200);
    }
  }
}
