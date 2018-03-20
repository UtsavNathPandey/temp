import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  Form, FormGroup, FormBuilder,
  FormArray, Validators, FormControl
} from '@angular/forms';

@Component({
  selector: 'wfw-save-refinements-form-component',
  templateUrl: './save-refinements-form.component.html',
  styleUrls: ['./save-refinements-form.component.scss']
})
export class SaveRefinementsFormComponent implements OnInit {

  saveRefinementsForm: FormGroup;
  saveNameModel: String = '';
  saveRefinementsName: Object = {};
  @Input('appliedRefinements') appliedRefinements: any;
  @Input('saveRefinementsFormPanelOverlay') saveRefinementsFormPanelOverlay: any;

  constructor() { }

  ngOnInit(): void {
    this.saveRefinementsForm = new FormGroup({
      saveName: new FormControl('', Validators.required),
    });
  }

  /**
   * @method onSaveBtnClick
   * @description To save the name of refinemnts
  */
  onSaveBtnClick(): void {
    this.saveNameModel = '';
    this.saveRefinementsName = {
      'name': this.saveNameModel,
      'refinemelts': this.appliedRefinements
    };
    this.saveRefinementsFormPanelOverlay.visible = false;
    console.log('save search' + this.saveRefinementsName);
  }

}
