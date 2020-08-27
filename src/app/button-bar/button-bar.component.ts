import { Component, OnInit, Input } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-button-bar',
  templateUrl: './button-bar.component.html',
  styleUrls: ['./button-bar.component.scss']
})
export class ButtonBarComponent extends BaseComponent implements OnInit {
  @Input('buttonIdx') buttonIdx: number = 0;
  
  constructor() { super(); }

  ngOnInit(): void {
  }


}
