import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BaseHttpComponent } from '../base-http/base-http.component';
import { Film } from '../classes/film';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-film-edit',
  templateUrl: './film-edit.component.html',
  styleUrls: ['./film-edit.component.scss']
})
export class FilmEditComponent extends BaseHttpComponent implements OnInit {
  @Output() messageEvent = new EventEmitter<string>();

  public genres = [
    'Comedy',
    'Documentary',
    'Sci-Fi',
    'Drama',
    'Horror',
    'Music Video',
    'Other'];
  public ratings = ['G', 'PG', 'PG-13', 'R', 'NC-17', 'X', 'N/A']

  public nameObj = { name: 'Film Name', type: 'text', value: '', max: 50, requiredFlg: true };
  public directorObj = { name: 'Director', type: 'text', value: '', max: 50, requiredFlg: true };
  public producerObj = { name: 'Producer', type: 'text', value: '', max: 50 };
  public lengthObj = { name: 'Film Length (In minutes)', type: 'number', value: '0', requiredFlg: true, disabledFlg: false, hint: 'How many minutes long is your film, including credits?' };
  public urlObj = { name: 'Film URL', type: 'text', value: '', placeholder: 'http', requiredFlg: true, max: 200, hint: 'Link to your project in youTube or other publically viewable site.' };
  public trailorObj = { name: 'Trailor URL', type: 'text', value: '', placeholder: 'http', max: 200, hint: 'Link to your official trailor in youTube or other publically viewable site.' };
  public behindScenesObj = { name: 'Benhind Scenes URL', type: 'text', value: '', placeholder: 'http', max: 200, disabledFlg: false, hint: 'Link to an behind-the-scenes video in youTube or other publically viewable site.' };
  public posterObj = { name: 'Poster /  Screen Shot', type: 'picture', value: '', requiredFlg: true, hint: 'An image that you would like to represent this film.' };
  public genreObj = { name: 'Genre', type: 'dropdown', value: '', options: this.genres, requiredFlg: true };
  public ratingObj = { name: 'Rating', type: 'dropdown', value: '', options: this.ratings, requiredFlg: true };
  public taglineObj = { name: 'Tagline', type: 'text', value: '', max: 120, requiredFlg: true, disabledFlg: false };
  public descObj = { name: 'Synopsis', type: 'textarea', value: '', max: 500 };
  public castObj = { name: 'Cast', type: 'text', value: '', max: 250, hint: 'A short list of top cast members' };
  public crewObj = { name: 'Crew', type: 'text', value: '', max: 250, hint: 'A short list of top crew members' };
  public releaseObj = { name: 'Release Date', type: 'date', value: '', requiredFlg: true };
  public releaseTextObj = { name: 'Release Date Text', type: 'text', value: '', requiredFlg: true };
  public filmType: number = 0;
  public deleteFlg = false;
  public errorMessage: string = '';
  public formFields1 = [
    this.posterObj
  ]
  public formFields2 = [
    this.nameObj,
    this.directorObj,
    this.producerObj,
    this.lengthObj,
    this.urlObj,
    this.trailorObj,
    this.behindScenesObj,
    this.genreObj,
    this.ratingObj,
    this.taglineObj,
    this.descObj,
    this.castObj,
    this.crewObj,
    this.releaseObj,
    this.releaseTextObj
  ]
  public imageFlg: boolean = false;
  public film: Film;

  constructor(private router: Router) { super(); }

  ngOnInit(): void {
  }
  show(film: Film, imageFlg: boolean) {
    console.log(film);
    this.deleteFlg = false;
    this.loadingFlg = false;
    this.errorMessage = '';
    this.film = film;
    this.imageFlg = imageFlg;
    this.user = this.getUserObject();
    console.log(film);
    this.nameObj.value = film.name;
    this.directorObj.value = film.director;
    this.producerObj.value = film.producer;
    this.lengthObj.value = film.lengthMinutes.toString();
    this.urlObj.value = film.url;
    this.trailorObj.value = film.trailorUrl;
    this.behindScenesObj.value = film.behindScenes;
    this.genreObj.value = film.genre;
    this.ratingObj.value = film.rating;
    this.taglineObj.value = film.tagline;
    this.descObj.value = film.synopsis;
    this.castObj.value = film.cast;
    this.crewObj.value = film.crew;
    this.releaseObj.value = film.releaseDate; //'2020-06-15'; //
    this.releaseTextObj.value = film.releaseDateText;
    $('#filmEditPopup').modal();
  }
  updateImageButtonClicked(msg: string) {
    var params = {
      row_id: this.film.id,
      userId: this.user.id,
      code: this.user.code,
      poster: this.posterObj.value,
      action: 'editFilmImage'
    };
    this.executeApi('festApi.php', params, true);
  }
  updateDetailsButtonClicked(msg: string) {
    var params = {
      row_id: this.film.id,
      userId: this.user.id,
      code: this.user.code,
      action: 'editFilm',
      filmName: this.nameObj.value,
      director: this.directorObj.value,
      producer: this.producerObj.value,
      lengthMinutes: this.lengthObj.value,
      url: this.urlObj.value,
      trailor: this.trailorObj.value,
      genre: this.genreObj.value,
      rating: this.ratingObj.value,
      tagline: this.taglineObj.value,
      desc: this.packageForLargeText(this.descObj.value),
      cast: this.castObj.value,
      crew: this.crewObj.value,
      releaseDate: this.releaseObj.value,
      releaseDateText: this.releaseTextObj.value,
      behindScenes: this.behindScenesObj.value,
    };
    console.log(params);
    this.executeApi('festApi.php', params, true);
  }
  postSuccessApi(file: string, data: string) {
    this.loadingFlg = false;
    this.closeModal('#filmEditPopup');
    if (this.deleteFlg) {
      this.router.navigate(['']);
    } else {
      this.messageEvent.emit('done');
    }
  }
  //  postErrorApi(file: string, error: string) {
  //   this.loadingFlg = false;
  //   console.log('postErrorApi', error);
  // }
  deleteFilm() {
    this.loadingFlg = true;
    var params = {
      row_id: this.film.id,
      userId: this.user.id,
      code: this.user.code,
      action: 'deleteFilm',
    };
    this.executeApi('festApi.php', params, true);

  }

}
