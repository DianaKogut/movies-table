export class SetSortBy {
  static type = '[Movies] Set sort by';
  constructor(public sortBy: string) { }
}

export class SetSearchParam {
  static type = '[Movies] Set search param';
  constructor(public searchString: string) { }
}
