import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})
export class DataTableComponent extends BaseComponent implements OnInit {
  @Input('tableObj') tableObj:any;

  constructor() { super(); }

  ngOnInit(): void {
  }

}
