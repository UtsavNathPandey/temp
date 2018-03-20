import { Component, OnInit } from '@angular/core';
import { Password } from 'primeng/primeng';
import { DomHandler } from 'primeng/components/dom/domhandler';

@Component({
  selector: 'showcase-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

    cities: any[];
    cities1: any[];
    results: string[];
    items: any[];
    constructor() { }
    
    ngOnInit() {
        this.items = [
            {
                label: 'Update', icon: 'fa-refresh', command: () => { }
            }
        ];

        // dropdown
        this.cities = [];
        this.cities.push({ label: 'Select City', value: null });
        this.cities.push({ label: 'New York', value: { id: 1, name: 'New York', code: 'NY' } });
        this.cities.push({ label: 'Rome', value: { id: 2, name: 'Rome', code: 'RM' } });
        this.cities.push({ label: 'London', value: { id: 3, name: 'London', code: 'LDN' } });
        this.cities.push({ label: 'Istanbul', value: { id: 4, name: 'Istanbul', code: 'IST' } });
        this.cities.push({ label: 'Paris', value: { id: 5, name: 'Paris', code: 'PRS' } });

        // select boxes
        this.cities1 = [];
        this.cities1.push({ label: 'New York', value: 'New York' });
        this.cities1.push({ label: 'Rome', value: 'Rome' });
        this.cities1.push({ label: 'London', value: 'London' });

        // To align password hint popup on right as per style guide by overriding the below method from primeng library. This overriding code should be included in the ts file where primeng Password component is used.
        Password.prototype.onFocus = function (e) {
            this.panel.style.zIndex = String(++DomHandler.zindex);
            this.domHandler.removeClass(this.panel, 'ui-helper-hidden');
            this.domHandler.absolutePosition(this.panel, this.el.nativeElement);   

            this.panel.style.left = parseInt(this.panel.style.left) + parseInt(this.el.nativeElement.offsetWidth) - parseInt(this.panel.offsetWidth) + 'px';
            this.domHandler.fadeIn(this.panel, 250);
        };
    }

    // for autocomplete
    search(event) {
        this.results = ['search result 1', 'search result 2'];
    }
}




