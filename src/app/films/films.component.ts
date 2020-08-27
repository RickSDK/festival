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

  constructor() { super(); }

  ngOnInit(): void {
    this.user = this.getUserObject();
    this.userId = this.user.id;
    this.getData();
  }
  ngClassGenre(genre: string) {
    if (genre == 'Drama')
      return 'fa fa-film';
    if (genre == 'Documentary')
      return 'fa fa-video-camera';
    if (genre == 'Music Video')
      return 'fa fa-music';

    return 'fa fa-film';
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
    console.log('postSuccessApi', this.films);
  }
  flmAdded(str: string) {
    this.getData();
  }
  filmMatchesType(film: any) {
    return true;
  }
  plusButtonClicked(str: string) {
    if (this.userId > 0)
      this.addFilmPopupComponent.show();
    else
      this.showAlertPopup('Press the "Log in" button to add your film.');
  }


}
