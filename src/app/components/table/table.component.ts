import { Component, OnInit } from '@angular/core';

import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';

import { Movie } from 'src/app/models/movie.model';
import { SetSortParams } from 'src/app/state/movies.actions';
import { MoviesStore } from 'src/app/state/movies.state';

import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.cols, event.previousIndex, event.currentIndex);
  }

  @Select(MoviesStore.movies)
  public movies$: Observable<[]>;

  @Select(MoviesStore.sortDirection)
  public direction$: Observable<string>;

  direction: string = '';
  cols: string[] = [];
  emptySearchResult: boolean = false;

  constructor(private store: Store) { }

  ngOnInit() {

    this.movies$.subscribe(data => {
      this.emptySearchResult = data.length === 0;
      this.getTHeaders(data);
    })

    this.direction$.subscribe((data: string) => {
      this.direction = data;
    });
  }

  getTHeaders(movies: Movie[]) {
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
