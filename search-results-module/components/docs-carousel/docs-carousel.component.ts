import { Component, OnInit, Input, ViewChild, Output, EventEmitter, OnChanges } from '@angular/core';
import { CarouselModule, Carousel } from 'primeng/primeng';

import { FetchDocService } from '../../services/fetchDoc.service';
const carouselPagerTimeout = 50;

@Component({
  selector: 'wfw-docs-carousel',
  templateUrl: './docs-carousel.component.html',
  styleUrls: ['./docs-carousel.component.scss']
})
export class DocsCarouselComponent implements OnChanges {
  @Input('docsData') docsData: Array<any> = [];
  @Input('showHideCarousel') showHideCarousel: boolean;

  @Output() showHideCarouselChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild('carousel') public carousel: Carousel;
  public from: number;
  public to: number;
  public pageSize: number = 5;
  constructor(private fetchDocService: FetchDocService) {
    if (!this.docsData.length) {
      this.docsData =  [
        {name: 'dummy-pdf_2.pdf', url: 'http://en.unesco.org/inclusivepolicylab/sites/default/files/dummy-pdf_2.pdf'},
        {name: 'Sample-text-file-10kb.txt', url: 'http://www.sample-videos.com/text/Sample-text-file-10kb.txt'},
        {name: 'Sample-Spreadsheet-10-rows.xls', url: 'http://www.sample-videos.com/xls/Sample-Spreadsheet-10-rows.xls'},
        {name: 'big_buck_bunny_720p_1mb.mp4', url: 'http://www.sample-videos.com/video/mp4/720/big_buck_bunny_720p_1mb.mp4'},
        {name: 'Sample-text-file-10kb.txt', url: 'http://www.sample-videos.com/text/Sample-text-file-10kb.txt'},
        {name: 'Sample-Spreadsheet-10-rows.xls', url: 'http://www.sample-videos.com/xls/Sample-Spreadsheet-10-rows.xls'},
        {name: 'dummy-pdf_2.pdf', url: 'http://en.unesco.org/inclusivepolicylab/sites/default/files/dummy-pdf_2.pdf'},
        {name: 'Sample-text-file-10kb.txt', url: 'http://www.sample-videos.com/text/Sample-text-file-10kb.txt'},
        {name: 'Sample-Spreadsheet-10-rows.xls', url: 'http://www.sample-videos.com/xls/Sample-Spreadsheet-10-rows.xls'},
        {name: 'dummy-pdf_2.pdf', url: 'http://en.unesco.org/inclusivepolicylab/sites/default/files/dummy-pdf_2.pdf'},
        {name: 'Sample-text-file-10kb.txt', url: 'http://www.sample-videos.com/text/Sample-text-file-10kb.txt'},
        {name: 'Sample-Spreadsheet-10-rows.xls', url: 'http://www.sample-videos.com/xls/Sample-Spreadsheet-10-rows.xls'}
      ];
    }
    this.updateCarouselOnResize();
  }
  /**
   * @method showDocPreview
   * @description method used to show the document in preview
  */
  public showDocPreview(filename: string, url: string): void {
    this.fetchDocService.viewOrDownloadDocument(filename, url);
  }
  /**
   * @method hideCarousel
   * @description method used to close the carousel
  */
  public hideCarousel(): void {
    this.showHideCarousel = false;
    this.showHideCarouselChange.emit(this.showHideCarousel);
  }
  /**
   * @method setPager
   * @description set the number of pages for the carousel
  */
  public setPager(): void {
    this.from = this.carousel.page + 1;
    this.to = this.carousel.totalPages;
   }
  /**
   * @method onCarouselChange
   * @description call the setPager method whenever the carousel values changed
  */
  public onCarouselChange(): void {
    this.setPager();
  }
  /**
   * @method updateCarouselOnResize
   * @description method is used to dynamically calculate the number of records to show in carousel
  */
  public updateCarouselOnResize(): void {
    // updateState method from CarouselModule is over-ridden below to dynamically adjust the number of records to show in carousel
    // TODO Need to move the below code to a separate library
    Carousel.prototype.updateState = function(){
      const win = window;
      const colWidth = 250;
      for ( let i = 1; i < this.numVisible; i++) {
        if (win.innerWidth <= (colWidth * i)) {
          this.shrinked = true;
          this.columns = i;
          break;
        }else if (this.shrinked) {
          this.shrinked = false;
          this.columns = this.numVisible;
          this.updateLinks();
          this.updateDropdown();
        }
      }
      this.calculateItemWidths();
      this.setPage(Math.floor(this.firstVisible / this.columns), true);
    };
  }

  ngOnChanges() {
    // timeout to make sure that carousel is loaded
    if (this.showHideCarousel) {
      setTimeout(() => { this.setPager(); }, carouselPagerTimeout);
    }
  }
}
