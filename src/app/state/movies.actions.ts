export class SetSortParams {
  static type = '[Movies] Set sort params';
  constructor(public sortBy: string, public direction: string) { }
}

export class SetSearchParam {
  static type = '[Movies] Set search param';
  constructor(public searchString: string) { }
}

export class SetMovies {
  static type = '[Movies] Set movies';
  constructor(public movies: []) { }
}