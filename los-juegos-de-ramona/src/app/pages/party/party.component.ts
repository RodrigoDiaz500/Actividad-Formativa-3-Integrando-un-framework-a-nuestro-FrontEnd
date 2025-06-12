import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para directivas estructurales de Angular como *ngIf o *ngFor

@Component({
  selector: 'app-party',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.css'] // Si tienes estilos específicos para este componente
})
export class PartyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // Aquí podrías inicializar datos o llamar servicios si la lista de juegos fuera dinámica
  }
}