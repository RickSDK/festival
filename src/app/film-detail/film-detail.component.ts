import { Component, OnInit, ViewChild } from '@angular/core';
import { BaseHttpComponent } from '../base-http/base-http.component';
import { Film } from '../classes/film';
import { Review } from '../classes/review';
import { ActivatedRoute } from '@angular/router';
import { FilmEditComponent } from '../film-edit/film-edit.component';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-film-detail',
  templateUrl: './film-detail.component.html',
  styleUrls: ['./film-detail.component.scss']
})
export class FilmDetailComponent extends BaseHttpComponent implements OnInit {
  @ViewChild(FilmEditComponent) filmEditComponent: FilmEditComponent;
  public filmId: number = 0;
  public film: Film;
  public tableObj: any
  public castObj = { name: 'Cast', data: [] }
  public crewObj = { name: 'Crew', data: [] }
  public editEmbededLinkFlg = false;
  public filmIsEditableFlg = false;
  public writeReviewFlg = false;
  public starCount = 0;
  public myReview: Review;
  public showRefreshButton = false;
  public showRefreshMessage = false;
  public filmReviews = [];
  public editModeFlg = false;
  public formFields = [{ name: 'Trailer Embeded Link', type: 'text', value: '', placeholder: 'https://www.youtube.com/embed/', max: 128, requiredFlg: true }];
  public reviewFields = [
    { name: 'Your Review', type: 'textarea', value: '', max: 1000, requiredFlg: true },
  ];

  constructor(private route: ActivatedRoute, private sanitizer: DomSanitizer) {
    super();
    this.route.queryParams
      .subscribe(params => {
        this.filmId = params.id;
      });

  }

  ngOnInit(): void {
    window.scrollTo(0,0);
    this.user = this.getUserObject();
    this.userId = this.user.id;
    this.getData();
  }
  getData() {
    this.writeReviewFlg = false;
    this.starCount = 0;
    var params = {
      row_id: this.filmId,
      userId: this.userId,
      action: 'getFilm'
    };
    this.executeApi('festApi.php', params, true);
  }
  postSuccessApi(file: string, data: string) {
    //console.log('xxx', file, data);
    if (file === 'festReviews.php') {
      this.showAlertPopup('Success');
      this.getData();
      return;
    }
    var lines = data.split('<b>');
    if (lines.length > 2) {
      this.film = new Film(lines[1]);
      var filmReviewHash = {};
      this.film.likeList.forEach(record => {
        filmReviewHash[record.review_id] = record.likeFlg;
      });
      console.log('film', this.film);
      var filmReviews = lines[2].split('<r>');
      this.filmReviews = [];
      filmReviews.forEach(line => {
        var filmReview = new Review(line, this.user.id);
        if (filmReview.id) {
          filmReview.bestFlg = (this.film.bestReview == filmReview.id);
          filmReview.isUpVoted = filmReviewHash[filmReview.id] === 'Y';
          filmReview.isDownVoted = filmReviewHash[filmReview.id] === 'N';
          this.filmReviews.push(filmReview);
          if (filmReview.isMineFlg)
            this.myReview = filmReview;
        }
      });
    }
    this.castObj.data = this.film.castList;
    this.crewObj.data = this.film.crewList;
    console.log('this.myReview', this.myReview);
    this.filmIsEditableFlg = this.film.user_id == this.userId;

    var tableObj = { name: this.film.name, data: [] };
    tableObj.data.push({ title: 'Director', value: this.film.director });
    if (this.film.producer)
      tableObj.data.push({ title: 'Producer', value: this.film.producer })
    tableObj.data.push({ title: 'Genre', value: this.film.genre })
    tableObj.data.push({ title: 'Rating', value: this.film.rating })
    tableObj.data.push({ title: 'Length', value: this.film.lengthMinutes + ' minutes' })
    tableObj.data.push({ title: 'Release Date', value: this.film.localDate })
    this.tableObj = tableObj;

    this.editEmbededLinkFlg = false;

    //this.film.trailerEmbed = 'https://www.youtube.com/embed/tjb8E5uyRmg';
    console.log('postSuccessApi', this.film);
  }
  refreshImage() {
    var id = this.film.id;
    this.film.id = 1;
    setTimeout(() => {
      this.film.id = id;
    }, 1000);
  }
  refreshImagePressed() {
    this.showRefreshMessage = true;
    this.refreshImage();
  }
  reviewButtonClicked() {
    console.log('hey! reviewButtonClicked');
    if (!this.user.id) {
      this.showAlertPopup('Log in, it\'s free!');
      return;
    }
    this.writeReviewFlg = !this.writeReviewFlg;
    this.starCount = 0;
    if (this.writeReviewFlg && this.myReview) {
      this.starCount = this.myReview.stars / 2;
      this.reviewFields[0].value = this.myReview.reviewLike;
      this.reviewFields[1].value = this.myReview.reviewDislike;
    }
  }
  flmEdited(msg: string) {
    console.log('flmEdited');
    this.showRefreshButton = true;
    this.refreshImage();
    this.getData();
  }
  editFilm(film: Film, imageFlg: boolean) {
    if (this.user.id == film.user_id)
      this.filmEditComponent.show(film, imageFlg);
  }
  changeStarCount(num: number) {
    this.starCount = num;
  }
  editEmbedClicked() {
    this.editEmbededLinkFlg = !this.editEmbededLinkFlg;
  }
  submitEmbedButtonClicked() {
    var params = {
      row_id: this.filmId,
      trailerEmbed: this.formFields[0].value,
      action: 'updateTrailerEmbed'
    };
    console.log(params);
    this.executeApi('festApi.php', params, true);
  }
  embededURL() {
    return this.sanitizer.bypassSecurityTrustUrl(this.film.trailerEmbed);
  }
  submitReviewButtonClicked() {
    var params = {
      filmId: this.filmId,
      userId: this.user.id,
      code: this.user.code,
      stars: this.starCount,
      reviewLike: this.packageForLargeText(this.reviewFields[0].value),
      action: 'submitFilmReview'
    };
    console.log(params);
    this.executeApi('festReviews.php', params, true);
  }


}
