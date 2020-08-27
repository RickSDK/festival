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

  constructor() { super(); }

  ngOnInit(): void {
  }
  upvoteReview() {
    this.review.likes++;
  }
  downvoteReview() {
    this.review.dislikes++;
  }
  editReviewClicked() {
    this.messageEvent.emit('edit');
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
    this.reviewDeletedFlg = true;
  }
}
