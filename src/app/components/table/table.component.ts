import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Movie } from 'src/app/models/movie.model';
import { MoviesService } from 'src/app/services/movies.service';
import { SetSortBy } from 'src/app/state/movies.actions';
import { MoviesStore } from 'src/app/state/movies.state';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  @Select(MoviesStore.sortBy)
  public sortBy$: Observable<string>;

  @Select(MoviesStore.searchString)
  public searchString$: Observable<string>;

  movies: Array<Movie> = [];
  sortBy: string = '';
  search: string;
  cols: string[] = [];

  constructor(private store: Store, public moviesService: MoviesService) { }

  ngOnInit() {
    this.moviesService.getMovies()
      .subscribe((data: Array<Movie>) => {
        this.movies = data;
        this.getTHeaders();
      });

    this.sortBy$.subscribe((data: string) => {
      this.sortBy = data;
    });

    this.searchString$.subscribe((searcString: string) => {
      this.search = searcString;
    });
  }

  getTHeaders() {
    this.movies.forEach(movie => {
      for (let key in movie) {
        if (!this.cols.includes(key)) {
          this.cols.push(key);
        }
      }
    });
    return this.cols;
  };

  sort(data: string) {
    if (this.sortBy === data) {
      this.movies = this.movies.reverse();
    } else {
      this.store.dispatch(new SetSortBy(data));
      this.movies = this.movies.slice()
        .sort((a, b) => a[this.sortBy] > b[this.sortBy] ? 1 : -1);
    }
  }

}
