import { Component, OnInit, Input } from '@angular/core';
import { MenuItem } from 'primeng/primeng';
import { CarouselBaseClass } from './carousel.base.class';


@Component({
  selector: 'wfw-search-summary',
  templateUrl: './search-summary.component.html',
  styleUrls: ['./search-summary.component.scss']
})
export class SearchSummaryComponent extends CarouselBaseClass implements OnInit {

  @Input() summaryTabs: MenuItem[];

  constructor() {
    super();
    this.calcItemWidths();
  }

  ngOnInit() {
  }

}
