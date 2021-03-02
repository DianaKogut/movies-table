import { Pipe, PipeTransform } from '@angular/core';
import { Movie } from '../models/movie.model';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  constructor() { }

  transform(movies: Movie[], search: string): any {

    if (!search.trim()) {
      return movies;
    }

    return movies.filter((movie: Movie) => movie.Title
      .toLowerCase().includes(search.toLowerCase()))
  }
}
