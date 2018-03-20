import { Component, OnInit, Input } from '@angular/core';
import { AdvanceSearchService } from '../../services/advance-search.service';
import { Subscription } from 'rxjs/Subscription';
import { FormGroup, FormArray, FormControl, FormBuilder, Validators } from '@angular/forms';
import { OverlayPanelModule } from 'primeng/primeng';

@Component({
  selector: 'wfw-advanced-search',
  templateUrl: './advanced-search.component.html',
  styleUrls: ['./advanced-search.component.scss']
})
export class AdvancedSearchComponent implements OnInit {
  dataSources: Array<any> = [];
  dataTypes: Array<any> = [];
  selectedDataSources: string[];
  selectedDataTypes: string[];
  queryConditions: Array<any>;
  advanceSearchFormData: any;
  conditionForm: FormGroup;
  itemsFormArray: any;

  @Input('searchOverlay') searchOverlay: string;
  advanceSearchOverlay: any;

  constructor(
    public advanceSearchFormService: AdvanceSearchService,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {

    this.conditionForm = this.fb.group({
      items : this.buildFormItems()
    });

    this.itemsFormArray = FormArray;
    this.itemsFormArray = this.conditionForm.get('items');
    this.advanceSearchOverlay = this.searchOverlay;

    this.advanceSearchFormService.getAdvanceFormData().subscribe(resultData => {
      this.dataSources = resultData.data.dataSources;
      this.dataTypes = resultData.data.dataTypes;
      this.queryConditions = resultData.data.queryConditions;
    });
  }

  /**
   * @method advanceSearchClick
   * @description Initiate the advance search button click and console the form values selected
  */
  advanceSearchClick(): void {
    console.log(this.conditionForm.value);
  }

  /**
   * @method addCondition
   * @description this method adds the new condition
  */
  addCondition(): void {
    this.itemsFormArray.push(this.buildItem());
  }

  /**
   * @method buildFormItems
   * @description build the form items in array
  */
  buildFormItems(): FormArray {
    return new FormArray([
      this.buildItem()
    ]);
  }

  /**
   * @method deleteCondition
   * @description delete the condition based on the index
  */
  deleteCondition(index): void {
    this.itemsFormArray.controls.splice(index, 1);
  }

  /**
   * @method buildItem
   * @description build the form element and return the formgroup
  */
  buildItem(): FormGroup {
    return new FormGroup({
      andOrConditionSelectName: new FormControl('', Validators.required),
      companyNamesSelectName: new FormControl('', Validators.required),
      selectConditionsName: this.fb.control('', Validators.required),
      valueName: new FormControl('', Validators.required)
    });
  }

}
