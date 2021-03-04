import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SetSortParams } from 'src/app/state/movies.actions';
import { MoviesStore } from 'src/app/state/movies.state';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Select(MoviesStore.movies)
  public movies$: Observable<[]>;

  @Select(MoviesStore.sortDirection)
  public direction$: Observable<string>;

  @Select(MoviesStore.searchString)
  public searchString$: Observable<string>;

  direction: string = '';
  search: string;
  cols: string[] = [];

  constructor(private store: Store) { }

  ngOnInit() {

    this.movies$.subscribe(data => {
      this.getTHeaders(data)
    })

    this.direction$.subscribe((data: string) => {
      this.direction = data;
    });

    this.searchString$.subscribe((searcString: string) => {
      this.search = searcString;
    });
  }

  getTHeaders(movies) {
    movies.forEach(movie => {
      for (let key in movie) {
        if (!this.cols.includes(key)) {
          this.cols.push(key);
        }
      }
    });
    return this.cols;
  };

  sort(data: string) {
    if (this.direction === 'dsc') {
      this.store.dispatch(new SetSortParams(data, 'asc'));
    } else {
      this.store.dispatch(new SetSortParams(data, 'dsc'));
    }
  }
}
