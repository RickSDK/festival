import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseHttpComponent } from '../base-http/base-http.component';
import { Film } from '../classes/film';
import { AddFilmPopupComponent } from '../add-film-popup/add-film-popup.component';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.scss']
})
export class FilmsComponent extends BaseHttpComponent implements OnInit {
  @ViewChild(AddFilmPopupComponent) addFilmPopupComponent: AddFilmPopupComponent;
  public films: any;
  public displayFilms: any;
  public festivalIdx = 0;
  public selectedYear = new Date().getFullYear();
  public years = [0, 2021, 2022];

  constructor() { super(); }

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.user = this.getUserObject();
    this.userId = this.user.id;
    this.getData();
    if (this.selectedYear >= 2023)
      this.years.push(2023);
    if (this.selectedYear >= 2024)
      this.years.push(2024);
  }
  getData() {
    this.loadingFlg = true;
    var params = {
      userId: this.user.id,
      code: this.user.code,
      action: 'getFilms'
    };
    this.executeApi('festApi.php', params, true);
  }
  postSuccessApi(file: string, data: string) {
    //console.log(data);
    var lines = data.split('<b>');
    var films = [];
    lines.forEach(line => {
      var film = new Film(line);
      if (film.id)
        films.push(film);
    });
    this.films = films;
    this.filterFilms();
    console.log('postSuccessApi', this.films);
  }
  changeOption(year: number, idx: number) {
    this.selectedYear = year;
    this.festivalIdx = idx;
    this.filterFilms();
  }
  filterFilms() {
    var displayFilms = [];
    this.films.forEach(film => {
      if (this.selectedYear == film.festivalYear)
        displayFilms.push(film);
    });
    this.displayFilms = displayFilms;
  }
  flmAdded(str: string) {
    this.getData();
  }
  filmMatchesType(film: any) {
    return true;
  }
  plusButtonClicked(str: string) {
    this.user = this.getUserObject();
    this.userId = this.user.id;
    if (this.userId > 0)
      this.addFilmPopupComponent.show();
    else
      this.showAlertPopup('Press the "Log in" button to add your film.');
  }


}
