import { Component, OnInit, Input } from '@angular/core';
import { SearchResultsService } from 'wfw-shared/services/search-results.service';
import { WfwEventsService } from 'wfw-shared/services/wfw-events.service';

@Component({
  selector: 'wfw-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss']
})
export class ListItemComponent implements OnInit {

  @Input('result') result: any = null;
  public docClass = true;
  public showCarousel = false;

  constructor(
    private _wfwEvents: WfwEventsService,
    public _searchSvc: SearchResultsService
  ) {
    this._wfwEvents.event$.subscribe(event => {
      if (this[event.name]) {
        this[event.name](event.data);
      }
    });
  }

  ngOnInit() { }

  public hideCarousel($event): void {
    this.showCarousel = $event;
  }

  /**
   * @method addTocart
   * @description this method add record to shopping cart
  */
  addRecordToCart(): void {
    console.log('add to cart  clicked');
  }

  /**
   * @method launchLogViewer
   * @description this method launch logviewer
  */
  launchLogViewer(): void {
    console.log('logviewer clicked');
  }

  getTitle() {
    if (!this.result) {
      return 'Unknown Title';
    }

    return `${this.result.sys_project} - ${this.result.sys_entitytype}`;

  }

  getDescription() {
    if (!this.result) {
      return 'Unknown Description';
    }

    let desc = '';
    const itemKeys = Object.keys(this.result);
    for (let i = 0; i < itemKeys.length; i++) {
      const fieldValue: any = itemKeys[i];
      const userFriendlyName = this.result[itemKeys[i]];

      if (typeof fieldValue !== 'undefined') {
        desc += userFriendlyName + ': ' + fieldValue + ' ';
      }
    }
    return desc;
  }

  showPreview() {
    console.log('SearchResults: Show Preview - ', this.result);
    this._wfwEvents.emit('detailspreview_showPreview', this.result);
  }

  private checkActionCondition(view: string, condition: string) {
    // Verify in json that all conditions must be explicitely mentioned

    // verify view condition
    const allView = 'all';
    const currentView = 'listview';

    if (view === allView || view === currentView || view.includes(currentView)) {

      // verify sys_entity, sys_source & other key conditions
      const keys = Object.keys(this.result);
      for (let i = 0; i < keys.length; i++) {
        const key = keys[i];
        const keyExp = '%' + key + '%';
        if (condition.includes(keyExp)) {
          const regex = new RegExp(keyExp, 'g');
          condition = condition.replace(regex, this.result[key]);
        }
      }

      /* tslint:disable */
      return eval(condition);
      /* tslint:enable */

    } else {
      return false; // not to be displayed on this view
    }
  }

  private actionLinkClicked(action) {
    switch (action.type) {
      case 'document': {
        this.showCarousel = true;
        break;
      }
      case 'image': {
        console.log('show images');
        break;
      }
      case 'relateditem': {
        this._wfwEvents.emit('detailspreview_showRelatedItems', [
            { text: 'Field (1)', url: '#' },
            { text: 'PreferredTDCurve (10)', url: '#' },
            { text: 'TimeDepthTable (3)', url: '#' },
            { text: 'WellListMember (17)', url: '#' },
            { text: 'Well (1)', url: '#' },
            { text: 'CartoReferenceSystem (1)', url: '#' },
            { text: 'Company (1)', url: '#' },
            { text: 'WellboreElevationInfo (1)', url: '#' },
        ]);
        break;
      }
      case 'addtocart': {
        this.addRecordToCart();
        break;
      }
      case 'launchviewer': {
        this.launchLogViewer();
        break;
      }
      default: {
        console.warn('no action configured for type: ', action.type);
      }
    }
  }

}
