import { Component, Input, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/models/movie.model';
import { MoviesStore } from 'src/app/state/movies.state';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnChanges, OnInit {
  @Select(MoviesStore.searchString)
  public searchString$: Observable<string>;
  
  @Input() movies: Array<Movie>;
  @Output() sortMovies = new EventEmitter<string>();

  search: string;
  cols: string[] = [];

  constructor(private store: Store) { }

  ngOnInit() {
    this.searchString$.subscribe(searcString => {
      this.search = searcString;
    })
  }

  ngOnChanges() {
    this.getTHeaders();
  }

  getTHeaders() {
    this.movies.forEach(movie => {
      for (let key in movie) {
        if (!this.cols.includes(key)) {
          this.cols.push(key)
        }
      }
    });

    return this.cols;
  };

  sort(sortBy: string) {
    this.sortMovies.emit(sortBy);
  }

}
