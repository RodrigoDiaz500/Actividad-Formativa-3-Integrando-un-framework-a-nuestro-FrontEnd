import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { TCGComponent } from './pages/tcg/tcg.component';
import { PartyComponent } from './pages/party/party.component';
import { RolComponent } from './pages/rol/rol.component';
import { WargamesComponent } from './pages/wargames/wargames.component'; 

export const routes: Routes = [
  { path: '', component: HomeComponent, data: { title: 'Los Juegos de Ramona', slogan: 'Tu aventura en el mundo de los juegos de mesa comienza aquí.' } },
  { path: 'registro', component: RegistroComponent, data: { title: 'Registro de Usuario', slogan: 'Crea tu cuenta y empieza tu aventura de juegos.' } },
  { path: 'cartas', component: TCGComponent, data: { title: 'TCG (Trading Card Games)', slogan: 'Construye tu mazo, domina las cartas y conquista el duelo.' } },
  { path: 'party', component: PartyComponent, data: { title: 'Juegos Party', slogan: 'Ríe, actúa y compite con tus amigos en cada ronda.' } },
  { path: 'rol', component: RolComponent, data: { title: 'Juegos de Rol', slogan: 'Interpreta personajes, crea historias y vive aventuras épicas.' } },
  { path: 'wargames', component: WargamesComponent, data: { title: 'Wargames', slogan: 'Dirige ejércitos, despliega tácticas y gana la batalla.' } }, // Añade esta línea
  { path: '**', redirectTo: '' }
];