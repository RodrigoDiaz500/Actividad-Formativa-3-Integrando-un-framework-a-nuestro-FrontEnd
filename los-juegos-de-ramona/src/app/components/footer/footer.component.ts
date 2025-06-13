// src/app/components/footer/footer.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para directivas comunes

@Component({
  selector: 'app-footer', // Este es el nombre de la etiqueta HTML que usarás en tu app.component.html
  standalone: true,      // Indica que este es un componente standalone
  imports: [CommonModule], // Importa los módulos necesarios
  templateUrl: './footer.component.html', // Ruta al archivo HTML del componente
  styleUrls: ['./footer.component.css']   // Ruta al archivo CSS del componente
})
export class FooterComponent implements OnInit {

  currentYear: number; // Propiedad para el año actual

  constructor() {
    this.currentYear = new Date().getFullYear(); // Inicializa el año actual
  }

  ngOnInit(): void {
    // Aquí podrías añadir cualquier lógica de inicialización específica del footer
  }
}