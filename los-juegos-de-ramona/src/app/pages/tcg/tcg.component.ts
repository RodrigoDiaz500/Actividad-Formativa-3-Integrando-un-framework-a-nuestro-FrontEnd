import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tcg',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tcg.component.html',
  styleUrls: ['./tcg.component.css']
})
// ¡Aquí está la corrección! "Componentes" debe ser "class"
export class TCGComponent implements OnInit { 
  constructor() { }

  ngOnInit(): void {
    // Si tuvieras datos dinámicos, los definirías aquí.
  }
}