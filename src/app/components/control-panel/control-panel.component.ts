import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Store } from '@ngxs/store';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { SetSearchParam } from 'src/app/state/movies.actions';

@Component({
  selector: 'app-control-panel',
  templateUrl: './control-panel.component.html',
  styleUrls: ['./control-panel.component.scss']
})
export class ControlPanelComponent implements OnInit {
  searchControl = new FormControl('');

  constructor(private store: Store) { }

  ngOnInit(): void {
    const searchString = this.searchControl.valueChanges.pipe(
      debounceTime(500),
      distinctUntilChanged()
    );

    searchString.subscribe(searchString =>
      this.store.dispatch(new SetSearchParam(searchString))
    );
  }

}
