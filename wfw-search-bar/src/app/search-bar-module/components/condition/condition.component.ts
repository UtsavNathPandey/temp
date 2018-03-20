import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'wfw-condition',
  templateUrl: './condition.component.html',
  styleUrls: ['./condition.component.scss']
})
export class ConditionComponent implements OnInit {
  selectedAndOrModel: string[];
  selectedCompanyNamesModel: string[];
  selectConditionModel: string[];
  valueFieldModel: string[];
  componentDataToDisplay: any;
  idFromParent: number;
  @Input('idParent') idParent: number;
  @Input('conditionOptions') conditionOptions: {};

  @Input('item') item: FormGroup;
  public itemFormName: FormGroup;
  constructor() { }

  ngOnInit(): void {
    this.idFromParent = this.idParent;
    this.itemFormName = this.item;
    this.componentDataToDisplay = this.conditionOptions;
  }

}
