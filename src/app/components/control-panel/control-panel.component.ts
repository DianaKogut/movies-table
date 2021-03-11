import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngxs/store';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

import { SetFilterByRatingsParams, SetSearchParam } from 'src/app/state/movies.actions';

const DEFAULT_FILTER_BY_VALUE = 'Viewers';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent implements OnInit {

  operators = ['>=', '<=', '>', '<'];

  searchControl = new FormControl('');
  filterByRating = new FormGroup({
    filterBy: new FormControl(DEFAULT_FILTER_BY_VALUE),
    operator: new FormControl(this.operators[0]),
    number: new FormControl(null, [Validators.min(0), Validators.max(10)])
  });

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.searchControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    ).subscribe(searchString =>
      this.store.dispatch(new SetSearchParam(searchString))
    );

    this.filterByRating.valueChanges.subscribe(data => {
      if (this.filterByRating.valid) {
        this.store.dispatch(new SetFilterByRatingsParams(data));
      }
    });
  }
}
