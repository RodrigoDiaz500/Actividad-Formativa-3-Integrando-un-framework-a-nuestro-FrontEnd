import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { GameCardComponent } from '../../components/game-card/game-card.component'; 
import { DataService, JuegoDestacado } from '../../services/data.service'; 
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-wargames',
  standalone: true,
  imports: [CommonModule, GameCardComponent],
  templateUrl: './wargames.component.html',
  styleUrls: ['./wargames.component.css']
})
export class WargamesComponent implements OnInit {
  juegosWargames$: Observable<JuegoDestacado[]>;

  constructor(private dataService: DataService) {
    this.juegosWargames$ = new Observable<JuegoDestacado[]>(); 
  }

  ngOnInit(): void {
    this.juegosWargames$ = this.dataService.getTodosLosJuegos().pipe(
      map(juegos => juegos.filter(juego => juego.categoria === 'Wargames'))
    );
  }
}