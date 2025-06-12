import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, ActivatedRoute, NavigationEnd, Router, Data } from '@angular/router'; // Importa Data
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs'; // Importa Subscription para gestionar la suscripción

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  pageTitle: string = 'Los Juegos de Ramona';
  pageSlogan: string = 'Tu aventura en el mundo de los juegos de mesa comienza aquí.';
  private mainFooter: HTMLElement | null = null;
  private originalFooterColor: string = '';
  private routerSubscription: Subscription | undefined; // Para gestionar la suscripción del router

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.mainFooter = document.getElementById('main-footer');
    if (this.mainFooter) {
      this.originalFooterColor = getComputedStyle(this.mainFooter).backgroundColor || 'var(--color-secundario)';
    }

    // Corregido: Suscribirse al observable de 'data' y castear a 'Data'
    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      map(route => route.data as Data) // <-- Casteamos 'data' a tipo 'Data' de Angular Router
    ).subscribe((data: Data) => { // <-- Explicitamos el tipo de 'data' en el subscribe
      if (data && data['title']) { // <-- Agregamos 'data &&' para asegurar que data no es null/undefined
        this.pageTitle = data['title'];
        this.pageSlogan = data['slogan'];
      } else {
        this.pageTitle = 'Los Juegos de Ramona';
        this.pageSlogan = 'Tu aventura en el mundo de los juegos de mesa comienza aquí.';
      }
    });
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (this.mainFooter) {
      if (window.scrollY > 150) {
        this.mainFooter.style.backgroundColor = '#4A90E2';
        this.mainFooter.style.transition = 'background-color 0.5s ease-in-out';
      } else {
        this.mainFooter.style.backgroundColor = this.originalFooterColor;
      }
    }
  }

  ngOnDestroy(): void {
    if (this.routerSubscription) {
      this.routerSubscription.unsubscribe(); // Desuscribirse para evitar fugas de memoria
    }
  }
}