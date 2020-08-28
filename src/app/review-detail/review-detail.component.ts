import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Review } from '../classes/review';
import { BaseHttpComponent } from '../base-http/base-http.component';

@Component({
  selector: 'app-review-detail',
  templateUrl: './review-detail.component.html',
  styleUrls: ['./review-detail.component.scss']
})
export class ReviewDetailComponent extends BaseHttpComponent implements OnInit {
  @Output() messageEvent = new EventEmitter<string>();
  @Input('review') review: Review;
  @Input('user') user: any;
  public showDeleteFlg: boolean = false;
  public reviewDeletedFlg: boolean = false;
  public votingFlg=false;

  constructor() { super(); }

  ngOnInit(): void {
    console.log(this.review)
  }
  upvoteReview() {
    if(!this.review.isUpVoted && !this.votingFlg) {
      this.review.isUpVoted = true;
      this.review.likes++;
      if(this.review.isDownVoted) {
        this.review.isDownVoted = false;
        this.review.dislikes--;
      }
    }
  }
  downvoteReview() {
    if(!this.review.isDownVoted && !this.votingFlg) {
      this.review.isDownVoted = true;
      this.review.dislikes++;
      if(this.review.isUpVoted) {
        this.review.isUpVoted = false;
        this.review.likes--;
      }
    }
  }
  editReviewClicked() {
    this.messageEvent.emit('edit');
  }
  voteBestClicked() {
    this.votingFlg = true;
    this.review.likes += 10;
    var params = {
      row_id: this.review.id,
      filmId: this.review.film_id,
      userId: this.user.id,
      code: this.user.code,
      action: 'voteForBest'
    };
    console.log(params);
    this.review.bestFlg = true;
    this.executeApi('reviewVotes.php', params, true);

  }
  ngStyleDisabled(flag: boolean) {
    if (flag || this.votingFlg)
      return { 'color': 'gray', 'cursor': 'hand' }
    else
      return { 'color': 'black', 'cursor': 'pointer' }
  }
  deleteThisReview() {
    this.loadingFlg = true;
    this.showDeleteFlg = false;
    var params = {
      row_id: this.review.id,
      userId: this.user.id,
      code: this.user.code,
      action: 'deleteReview'
    };
    console.log(params);
    this.executeApi('festReviews.php', params, true);
  }
  postSuccessApi(file: string, data: string) {
    this.loadingFlg = false;
    this.votingFlg = false;
    if(file == 'festReviews.php') {
      this.reviewDeletedFlg = true;
    }
    if(file == 'reviewVotes.php') {
      console.log(file, data);
    }
  }
}
