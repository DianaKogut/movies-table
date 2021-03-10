import {
  Component,
  ComponentFactoryResolver,
  Input,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { Directive } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { MoviesStore } from '../state/movies.state';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  searchString: string = '';
  content: string = '';

  @Input() set appHighlight(value: string) {
    this.content = value;
  }

  constructor(private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver) { }


  @Select(MoviesStore.searchString)
  public searchString$: Observable<string>;

  ngOnInit() {
    this.searchString$
      .subscribe((data: string) => {
        this.searchString = data;
        this.viewContainerRef.clear();
        this.highlightTheText()
      });
  }

  highlightTheText() {
    try {
      const regExp = new RegExp(this.searchString, 'gi');
      const match = this.content.match(regExp);
      if (!match || !this.searchString) {
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        const replacedValue = this.content.split(regExp);
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(HighlightComponent);
        const componentRef = this.viewContainerRef.createComponent(componentFactory);
        componentRef.instance.content = replacedValue;
        componentRef.instance.match = match;
      }
    } catch (e) {
      console.log('ERROR', e.message)
    }
  }
}


@Component({
  selector: 'highlight',
  template: `
  <ng-container *ngFor="let el of content; let i=index">{{el}}<mark>{{match[i]}}</mark></ng-container>`
})
export class HighlightComponent {
  @Input() content: string[] = [];
  @Input() match: string[] = [];
}
