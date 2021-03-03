import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const JSON_URL = '../../assets/movies.json';

@Injectable({
  providedIn: 'root'
})

export class MoviesService {
  constructor(private http: HttpClient) {
  }

  getMovies() {
    return this.http.get(JSON_URL);
  }
}
