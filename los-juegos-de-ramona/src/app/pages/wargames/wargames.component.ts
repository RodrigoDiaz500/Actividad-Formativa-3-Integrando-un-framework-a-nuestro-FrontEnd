import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; // Necesario para directivas estructurales como *ngIf o *ngFor

@Component({
  selector: 'app-wargames',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './wargames.component.html',
  styleUrls: ['./wargames.component.css'] // Agrega este archivo si tienes estilos específicos para Wargames
})
export class WargamesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    // Si tuvieras que inicializar datos o llamar a servicios para cargar los juegos, lo harías aquí.
  }
}