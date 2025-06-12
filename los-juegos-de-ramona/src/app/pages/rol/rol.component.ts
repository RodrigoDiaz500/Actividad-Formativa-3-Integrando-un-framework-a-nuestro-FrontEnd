import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para directivas de Angular

@Component({
  selector: 'app-rol',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css'] // Si tienes estilos específicos para este componente
})
export class RolComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // Aquí puedes inicializar datos o llamar a servicios si los juegos se cargaran dinámicamente.
  }
}