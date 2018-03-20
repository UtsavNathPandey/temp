import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'wfw-column-settings-button',
  templateUrl: './column-settings-button.component.html',
  styleUrls: ['./column-settings-button.component.scss']
})
export class ColumnSettingsButtonComponent implements OnInit {

  @Input('icon') icon: string = '';
  @Input('label') label: string = 'no label';

  constructor() { }

  ngOnInit() {
  }

}
