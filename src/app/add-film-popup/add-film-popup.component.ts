import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BaseHttpComponent } from '../base-http/base-http.component';

declare var $: any;

@Component({
  selector: 'app-add-film-popup',
  templateUrl: './add-film-popup.component.html',
  styleUrls: ['./add-film-popup.component.scss']
})
export class AddFilmPopupComponent extends BaseHttpComponent implements OnInit {
  @Output() messageEvent = new EventEmitter<string>();
  public genres = ['Action',
    'Comedy',
    'Documentary',
    'Sci-Fi',
    'Drama',
    'Horror',
    'Music Video',
    'Musical',
    'Other'];
  public ratings = ['G', 'PG', 'PG-13', 'R', 'NC-17', 'X', 'N/A']

  public nameObj = { name: 'Film Name', type: 'text', value: '', max: 50, requiredFlg: true, disabledFlg: false };
  public directorObj = { name: 'Director', type: 'text', value: '', max: 50, requiredFlg: true, disabledFlg: false };
  public producerObj = { name: 'Producer', type: 'text', value: '', max: 50, disabledFlg: false };
  public lengthObj = { name: 'Film Length (In minutes)', type: 'number', value: '0', requiredFlg: true, disabledFlg: false, hint: 'How many minutes long is your film, including credits?' };
  public urlObj = { name: 'Film URL', type: 'text', value: '', placeholder: 'http', requiredFlg: true, disabledFlg: false, max: 200, hint: 'Link to your project in youTube or other publically viewable site.' };
  public trailorObj = { name: 'Trailor URL', type: 'text', value: '', placeholder: 'http', max: 200, disabledFlg: false, hint: 'Link to your official trailor in youTube or other publically viewable site.' };
  public posterObj = { name: 'Poster /  Screen Shot', type: 'picture', value: '', requiredFlg: true, disabledFlg: false, hint: 'An image that you would like to represent this film.' };
  public genreObj = { name: 'Genre', type: 'dropdown', value: '', options: this.genres, requiredFlg: true, disabledFlg: false };
  public ratingObj = { name: 'Rating', type: 'dropdown', value: '', options: this.ratings, requiredFlg: true, disabledFlg: false };
  public taglineObj = { name: 'Tagline', type: 'text', value: '', max: 120, requiredFlg: true, disabledFlg: false };
  public descObj = { name: 'Synopsis', type: 'textarea', value: '', max: 1000, disabledFlg: false };
  public castObj = { name: 'Top Cast Members (limit to 7 or fewer)', type: 'text', value: '', max: 250, hint: 'A short list of top cast members. A full list can be added later.', disabledFlg: false };
  public crewObj = { name: 'Top Crew Members (limit to 7 or fewer)', type: 'text', value: '', max: 250, hint: 'A short list of top crew members. A full list can be added later', disabledFlg: false };
  public releaseObj = { name: 'Release Date', type: 'date', value: '', requiredFlg: true, disabledFlg: false };
  public filmType: number = 0;
  public formFields = [
    this.nameObj, 
    this.directorObj,
    this.producerObj,
    this.lengthObj,
    this.urlObj,
    this.trailorObj,
    this.posterObj,
    this.genreObj,
    this.ratingObj,
    this.taglineObj,
    this.descObj,
    this.castObj,
    this.crewObj,
    this.releaseObj
  ]

  constructor() { super(); }

  ngOnInit(): void {
  }
  show() {
    this.filmType = 0;
    this.user = this.getUserObject();
    this.formFields.forEach(field => {
      field.disabledFlg=false;
    });
    if(this.user.id)
      $('#addFilmPopup').modal();
  }
  submitButtonClicked(str:string) {
    this.loadingFlg = true;
      var params = {
      userId: this.user.id,
      code: this.user.code,
      action: 'addFilm',
      filmName: this.nameObj.value,
      director: this.directorObj.value,
      producer: this.producerObj.value,
      lengthMinutes: this.lengthObj.value,
      url: this.urlObj.value,
      trailor: this.trailorObj.value,
      poster: this.posterObj.value,
      genre: this.genreObj.value,
      rating: this.ratingObj.value,
      tagline: this.taglineObj.value,
      desc: this.descObj.value,
      cast: this.castObj.value,
      crew: this.crewObj.value,
      releaseDate: this.releaseObj.value,
    };
    console.log(params);

    this.executeApi('festApi.php', params, true);
  }

  postSuccessApi(file: string, data: string) {
    this.loadingFlg = false;
    this.filmType = 3;
  }

  okButtonPressed() {
    this.closeModal('#addFilmPopup');
    this.messageEvent.emit('done');
  }

}
