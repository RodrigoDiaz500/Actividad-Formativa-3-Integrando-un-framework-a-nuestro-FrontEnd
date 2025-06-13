import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, ActivatedRoute, NavigationEnd, Router, Data } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { Subscription } from 'rxjs';

// Asegúrate de que estas rutas sean correctas para tus componentes Header, Navbar y Footer
import { HeaderComponent } from "./components/header/header.component";
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component'; // ¡Importa el FooterComponent aquí!

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    HeaderComponent,   // Importado porque se usa como <app-header> en app.component.html
    NavbarComponent,   // Importado porque se usa como <app-navbar> en app.component.html
    FooterComponent    // ¡Asegúrate de que FooterComponent esté en los imports!
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  pageTitle: string = 'Los Juegos de Ramona';
  pageSlogan: string = 'Tu aventura en el mundo de los juegos de mesa comienza aquí.';
  // mainFooter y originalFooterColor se mantienen aquí por ahora
  // hasta que la lógica de scroll sea movida al FooterComponent si es necesario.
  private mainFooter: HTMLElement | null = null;
  private originalFooterColor: string = '';
  private routerSubscription: Subscription | undefined;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    // La lógica de acceso al footer y su color se mantiene aquí por el HostListener.
    // Idealmente, esto se movería al FooterComponent si el HostListener se mueve allí.
    this.mainFooter = document.getElementById('main-footer');
    if (this.mainFooter) {
      this.originalFooterColor = getComputedStyle(this.mainFooter).backgroundColor || 'var(--color-secundario)';
    }

    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd),
      map(() => this.activatedRoute),
      map(route => {
        while (route.firstChild) route = route.firstChild;
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      map(route => route.data as Data)
    ).subscribe((data: Data) => {
      if (data && data['title']) {
        this.pageTitle = data['title'];
        this.pageSlogan = data['slogan'];
      } else {
        this.pageTitle = 'Los Juegos de Ramona';
        this.pageSlogan = 'Tu aventura en el mundo de los juegos de mesa comienza aquí.';
      }
    });
  }

  // Este HostListener y la lógica del footer se mantienen en AppComponent por ahora.
  // Considera moverlos a FooterComponent para una mejor encapsulación.
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
      this.routerSubscription.unsubscribe();
    }
  }
}