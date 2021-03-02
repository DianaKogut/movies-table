import { Component, Input, OnChanges, OnInit, Output, EventEmitter } from '@angular/core';
import { Movie } from 'src/app/models/movie.model';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnChanges, OnInit {

  @Input() movies: Array<Movie>;
  @Output() sortMovies = new EventEmitter<string>();

  search: string;
  cols: string[] = [];

  constructor() { }

  ngOnInit() { }

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
