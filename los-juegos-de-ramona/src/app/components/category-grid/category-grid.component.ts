// src/app/shared/category-grid/category-grid.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Para directivas como *ngFor si se usaran
import { RouterLink } from '@angular/router'; // Importar RouterLink para que funcione en el template

@Component({
  selector: 'app-category-grid', // ESTE ES EL NOMBRE DE LA ETIQUETA HTML QUE USARÁS EN OTROS COMPONENTES
  standalone: true,
  imports: [CommonModule, RouterLink], // RouterLink debe ser importado si se usa en el template
  templateUrl: './category-grid.component.html',
  styleUrls: ['./category-grid.component.css']
})
export class CategoryGridComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // Aquí iría la lógica si las categorías fueran dinámicas (por ejemplo, cargar desde un servicio)
  }
}