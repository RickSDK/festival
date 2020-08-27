import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainMenuComponent } from './main-menu/main-menu.component';
import { OptionsComponent } from './options/options.component';
import { FilmsComponent } from './films/films.component';
import { PeopleComponent } from './people/people.component';
import { AwardsComponent } from './awards/awards.component';
import { SubmitFilmComponent } from './submit-film/submit-film.component';
import { TicketsComponent } from './tickets/tickets.component';
import { JoinComponent } from './join/join.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { FilmDetailComponent } from './film-detail/film-detail.component';
import { FestivalProgramComponent } from './festival-program/festival-program.component';

const routes: Routes = [
  { path: '', component: MainMenuComponent },
  { path: 'options', component: OptionsComponent },
  { path: 'films', component: FilmsComponent },
  { path: 'people', component: PeopleComponent },
  { path: 'awards', component: AwardsComponent },
  { path: 'submit', component: SubmitFilmComponent },
  { path: 'tickets', component: TicketsComponent },
  { path: 'join', component: JoinComponent },
  { path: 'user', component: UserDetailComponent },
  { path: 'film', component: FilmDetailComponent },
  { path: 'program', component: FestivalProgramComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
