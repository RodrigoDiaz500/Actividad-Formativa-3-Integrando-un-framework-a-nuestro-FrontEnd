import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// ¡CORRECCIÓN AQUÍ! Elimina RouterLinkActiveOptions de la importación.
import { RouterLink, RouterLinkActive } from '@angular/router'; // <--- Así debe quedar la línea de importación

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  // Sigue usando la interfaz para tipar la propiedad, ¡esto es correcto!
  homeLinkActiveOptions: { exact: boolean } = { exact: true }; // Puedes tiparlo así, o simplemente dejarlo como un objeto literal si no necesitas el tipado estricto explícito.

  constructor() { }

  ngOnInit(): void {
    // Lógica aquí
  }
}