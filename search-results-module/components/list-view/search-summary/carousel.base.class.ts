import { Carousel } from 'primeng/primeng';

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
                    this.items[i].style.width = '150px';
                    this.items[i].style.marginRight = '40px';
                }
            }
        };
    }
}
