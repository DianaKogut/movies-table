import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Movie } from './models/movie.model';
import { MoviesService } from './services/movies.service';
import { SetSortBy } from './state/movies.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  movies: Array<Movie> = [];
  sortBy: string = '';

  constructor(private store: Store, private moviesService: MoviesService) { }

  ngOnInit() {

    this.store.subscribe(state => {
      this.sortBy = state.moviesState.sortBy;
    });

    this.moviesService.getMovies()
      .subscribe((data: Array<Movie>) => {
        this.movies = data;
      })
  }

  sortMovies(data) {
    if (this.sortBy === data) {
      this.movies = this.movies.reverse();
    } else {
      this.store.dispatch(new SetSortBy(data));
      this.movies = this.movies.slice()
        .sort((a, b) => a[this.sortBy] > b[this.sortBy] ? 1 : -1)
    }
  }
}
