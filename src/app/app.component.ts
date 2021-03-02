import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Movie } from './models/movie.model';
import { MoviesService } from './services/movies.service';
import { SetSortBy } from './state/movies.actions';
import { MoviesStore } from './state/movies.state';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  @Select(MoviesStore.sortBy)
  public sortBy$: Observable<string>;

  movies: Array<Movie> = [];
  sortBy: string = '';

  constructor(private store: Store, private moviesService: MoviesService) { }

  ngOnInit() {

    this.sortBy$.subscribe((data: string) => {
      this.sortBy = data;
    });

    this.moviesService.getMovies()
      .subscribe((data: Array<Movie>) => {
        this.movies = data;
      })
  }

  sortMovies(data: string) {
    if (this.sortBy === data) {
      this.movies = this.movies.reverse();
    } else {
      this.store.dispatch(new SetSortBy(data));
      this.movies = this.movies.slice()
        .sort((a, b) => a[this.sortBy] > b[this.sortBy] ? 1 : -1);
    }
  }
}
