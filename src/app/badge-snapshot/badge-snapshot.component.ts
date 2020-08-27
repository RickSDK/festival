import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-badge-snapshot',
  templateUrl: './badge-snapshot.component.html',
  styleUrls: ['./badge-snapshot.component.scss']
})
export class BadgeSnapshotComponent implements OnInit {
  @Input('badgeId') badgeId: number = 0;

  public titles = [
    'empty',
    'Film Submitted',
    'Posted Review',
    'Veteran Status',
    '5 Films Submitted',
    '5 Reviews Posted',
  ];
  public descriptions = [
    'empty',
    'Uploaded a Film',
    'Reviewed a Film',
    'Reached 150 reputation points',
    'Uploaded at least 5 Films',
    'Reviewed at least 5 Films',
  ];
  public title:string = '';
  public description:string = '';

  constructor() { }

  ngOnInit(): void {
    this.title = this.titles[this.badgeId];
    this.description = this.descriptions[this.badgeId];
  }

}
