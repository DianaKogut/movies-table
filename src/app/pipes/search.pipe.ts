import { Pipe, PipeTransform } from '@angular/core';
import { Movie } from '../models/movie.model';

@Pipe({
  name: 'search',
  pure: false
})
export class SearchPipe implements PipeTransform {

  constructor() { }

  transform(value: any, search: string): any {
    if (!search.trim()) {
      return value;
    }
    return value.filter((movie: Movie) => movie.Title
      .toLowerCase().includes(search.toLowerCase()));
  }
}
