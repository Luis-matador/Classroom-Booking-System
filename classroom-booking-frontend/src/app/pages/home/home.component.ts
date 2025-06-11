import { Component, OnInit, AfterViewInit, Renderer2, ElementRef, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { HeaderComponent } from "../../components/header/header.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { isPlatformBrowser } from '@angular/common';
import { MapComponent } from '../../components/map/map.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [HeaderComponent, FooterComponent, MapComponent]
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild('carouselWrapper') carouselWrapper!: ElementRef;
  @ViewChild('carousel') carousel!: ElementRef;
  @ViewChild('indicators') indicatorsContainer!: ElementRef;

  currentSlide = 0;
  isTransitioning = false;
  autoplayInterval: any;

  constructor(
    private renderer: Renderer2,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupSidebar();
      this.setupCarousel();
    }
  }

  setupSidebar(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const closeBtn = document.getElementById('closeBtn');
    const sidebarLinks = document.querySelectorAll('.sidebar-menu a');

    const toggleSidebar = () => {
      menuToggle?.classList.toggle('active');
      sidebar?.classList.toggle('active');
      overlay?.classList.toggle('active');
      document.body.style.overflow = sidebar?.classList.contains('active') ? 'hidden' : 'auto';
    };

    const closeSidebar = () => {
      menuToggle?.classList.remove('active');
      sidebar?.classList.remove('active');
      overlay?.classList.remove('active');
      document.body.style.overflow = 'auto';
    };

    menuToggle?.addEventListener('click', toggleSidebar);
    closeBtn?.addEventListener('click', closeSidebar);
    overlay?.addEventListener('click', closeSidebar);

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && sidebar?.classList.contains('active')) {
        closeSidebar();
      }
    });

    sidebarLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        closeSidebar();
        console.log('Navegando a:', (e.currentTarget as HTMLAnchorElement).getAttribute('href'));
      });
    });
  }

  setupCarousel(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    
    const slides = this.carouselWrapper.nativeElement.querySelectorAll('.carousel-slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');

    slides.forEach((_: any, index: number) => {
      const indicator = this.renderer.createElement('div');
      this.renderer.addClass(indicator, 'indicator');
      if (index === 0) this.renderer.addClass(indicator, 'active');
      this.renderer.listen(indicator, 'click', () => this.goToSlide(index));
      this.renderer.appendChild(this.indicatorsContainer.nativeElement, indicator);
    });

    nextBtn?.addEventListener('click', () => this.nextSlide(slides));
    prevBtn?.addEventListener('click', () => this.prevSlide(slides));

    this.autoplayInterval = setInterval(() => this.nextSlide(slides), 5000);

    this.carousel.nativeElement.addEventListener('mouseenter', () => clearInterval(this.autoplayInterval));
    this.carousel.nativeElement.addEventListener('mouseleave', () => {
      this.autoplayInterval = setInterval(() => this.nextSlide(slides), 5000);
    });

    slides.forEach((slide: HTMLElement) => {
      slide.addEventListener('click', () => {
        const url = slide.getAttribute('data-url');
        if (url) {
          alert(`Navegando a: ${url}\n\nEn una implementación real, esto abriría la página correspondiente.`);
        }
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prevSlide(slides);
      if (e.key === 'ArrowRight') this.nextSlide(slides);
    });

    let startX = 0;
    let endX = 0;

    this.carousel.nativeElement.addEventListener('touchstart', (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    });

    this.carousel.nativeElement.addEventListener('touchend', (e: TouchEvent) => {
      endX = e.changedTouches[0].clientX;
      const diff = startX - endX;
      const swipeThreshold = 50;
      if (Math.abs(diff) > swipeThreshold) {
        diff > 0 ? this.nextSlide(slides) : this.prevSlide(slides);
      }
    });

    const header = document.querySelector('.header') as HTMLElement | null;
    if (header) header.style.transform = 'translateY(0)';
  }

  updateCarousel(slides: NodeListOf<HTMLElement>): void {
    if (this.isTransitioning || !this.carouselWrapper) return;

    this.isTransitioning = true;
    this.carouselWrapper.nativeElement.style.transform = `translateX(-${this.currentSlide * 100}%)`;

    const indicators = this.indicatorsContainer.nativeElement.querySelectorAll('.indicator');
    indicators.forEach((indicator: Element, index: number) => {
      indicator.classList.toggle('active', index === this.currentSlide);
    });

    setTimeout(() => {
      this.isTransitioning = false;
    }, 500);
  }

  nextSlide(slides: NodeListOf<HTMLElement>): void {
    this.currentSlide = (this.currentSlide + 1) % slides.length;
    this.updateCarousel(slides);
  }

  prevSlide(slides: NodeListOf<HTMLElement>): void {
    this.currentSlide = (this.currentSlide - 1 + slides.length) % slides.length;
    this.updateCarousel(slides);
  }

  goToSlide(index: number): void {
    this.currentSlide = index;
    const slides = this.carouselWrapper.nativeElement.querySelectorAll('.carousel-slide');
    this.updateCarousel(slides);
  }
}
