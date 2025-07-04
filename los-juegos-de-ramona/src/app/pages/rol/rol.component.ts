import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { GameCardComponent } from '../../components/game-card/game-card.component'; 
import { DataService, JuegoDestacado } from '../../services/data.service'; 
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-rol',
  standalone: true,
  imports: [CommonModule, GameCardComponent], 
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent implements OnInit {
  juegosRol$: Observable<JuegoDestacado[]>; 

  constructor(private dataService: DataService) {
    this.juegosRol$ = new Observable<JuegoDestacado[]>(); 
  }

  ngOnInit(): void {
    this.juegosRol$ = this.dataService.getTodosLosJuegos().pipe(
      map(juegos => juegos.filter(juego => juego.categoria === 'Juegos de Rol'))
    );
  }
}