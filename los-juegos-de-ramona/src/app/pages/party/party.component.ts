import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { GameCardComponent } from '../../components/game-card/game-card.component'; 
import { DataService, JuegoDestacado } from '../../services/data.service'; 
import { Observable, map } from 'rxjs'; 
@Component({
  selector: 'app-party',
  standalone: true,
  imports: [CommonModule, GameCardComponent],
  templateUrl: './party.component.html',
  styleUrls: ['./party.component.css']
})
export class PartyComponent implements OnInit {
  juegosParty$: Observable<JuegoDestacado[]>; 
  constructor(private dataService: DataService) {
    this.juegosParty$ = new Observable<JuegoDestacado[]>();
  }

  ngOnInit(): void {
    this.juegosParty$ = this.dataService.getTodosLosJuegos().pipe(
      map(juegos => juegos.filter(juego => juego.categoria === 'Juegos Party'))
    );
  }
}