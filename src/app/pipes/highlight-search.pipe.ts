import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightSearch'
})
export class HighlightSearchPipe implements PipeTransform {

  constructor() { }

  transform(value: any, search: string, key: string): any {
    if (key !== "Title") {
      return value;
    }
    const regExp = new RegExp(search, 'gi');
    const match = value.match(regExp);

    if (!search.trim() || !match) {
      return value;
    }

    return value.replace(regExp, "<mark>" + match[0] + "</mark>");
  }
}
