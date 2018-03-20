import { Component, OnInit, Input} from '@angular/core';
import { Carousel, MenuItem } from 'primeng/primeng';

export class CarouselBaseClass {

    /*
    @method calcItemWidths
    @description this method is used to over write the calculation of item widths
    */
    public calcItemWidths(): void {
        Carousel.prototype.calculateItemWidths = function() {
            const firstItem = (this.items && this.items.length) ? this.items[0] : null;
            if (firstItem) {
                for (let i = 0; i < this.items.length; i++) {
                    this.items[i].style.marginRight = '10px';
                    this.items[i].style.paddingLeft = '10px';
                    this.items[i].style.paddingRight = '10px';
                }
            }
        };
    }
}

@Component({
  selector: 'wfw-tab-view',
  templateUrl: './tab-view.component.html',
  styleUrls: ['./tab-view.component.scss']
})
export class TabViewComponent extends CarouselBaseClass implements OnInit {

  // @Input('tabs') tabs: MenuItem[] = [];

  _tabs: MenuItem[];
  get tabs(): MenuItem[] {
      return this._tabs;
  }

  @Input('tabs')
  set tabs(value: MenuItem[]) {
      this._tabs = value;
      if (value) {
        this.selectedTab = value[0].label;
      }
    }

  selectedTab: string = '';

  constructor() {
    super();
    this.calcItemWidths();
   }

  ngOnInit() {
  }

  selectTab(tab) {
    console.log(tab);
    this.selectedTab = tab.label;
  }

}
