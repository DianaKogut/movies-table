import { Component, OnDestroy, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { Select, Store } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';

import { Movie } from 'src/app/models/movie.model';
import { SetSortParams } from 'src/app/state/movies.actions';
import { MoviesStore } from 'src/app/state/movies.state';
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, OnDestroy {

  @Select(MoviesStore.movies)
  public movies$: Observable<[]>;

  @Select(MoviesStore.sortDirection)
  public direction$: Observable<string>;

  direction: string = '';
  cols: string[] = [];
  emptySearchResult: boolean = false;
  private _unsubscribe = new Subject<void>();

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.movies$.pipe(
      takeUntil(this._unsubscribe)
    ).subscribe(data => {
      this.emptySearchResult = data.length === 0;
      this.getTHeaders(data);
    });

    this.direction$.pipe(
      takeUntil(this._unsubscribe)
    ).subscribe((data: string) => {
      this.direction = data;
    });
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  getTHeaders(movies: Movie[]): string[] {
    movies.forEach(movie => {
      for (let key in movie) {
        if (!this.cols.includes(key)) {
          this.cols.push(key);
        }
      }
    });
    return this.cols;
  };

  drop(event: CdkDragDrop<string[]>): void {
    moveItemInArray(this.cols, event.previousIndex, event.currentIndex);
  }

  sort(data: string): void {
    if (this.direction === 'dsc') {
      this.store.dispatch(new SetSortParams(data, 'asc'));
    } else {
      this.store.dispatch(new SetSortParams(data, 'dsc'));
    }
  }
}
