import { Component, OnInit, OnDestroy, Input, Output } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { RefinementService } from './../../services/refinement.service';
import { Refinement } from './../../models/refinement';

@Component({
  selector: 'wfw-selected-refinements',
  templateUrl: './selected-refinements.component.html',
  styleUrls: ['./selected-refinements.component.scss']
})
export class SelectedRefinementsComponent implements OnInit, OnDestroy {
  appliedRefinementArr: Refinement[];
  subscription: Subscription;
  constructor(private refinementService: RefinementService) {
  }

  ngOnInit(): void {
    // subscribe to home component messages
    this.subscription = this.refinementService.getAppliedRefinements().subscribe(refinementArr => {
    this.appliedRefinementArr = refinementArr;
    });
  }

  ngOnDestroy(): void {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

   /**
   * @method removeAppliedRefinement
   * @description To clear the selected filter option
  */
  removeAppliedRefinement(index: number) {
    this.refinementService.removeAppliedRefinements(index);
  }

   /**
   * @method removeAllAppliedRefinement
   * @description To clear all the selected filter options
  */
  removeAllAppliedRefinement() {
    this.refinementService.clearAllAppliedRefinements();
  }
}
