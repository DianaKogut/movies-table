import {
  Component, 
  Directive,
  ComponentFactoryResolver,
  ElementRef,
  Input,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { MoviesStore } from '../state/movies.state';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  searchString: string = '';
  content: string = '';

  constructor(private elementRef: ElementRef,
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver) { }


  @Select(MoviesStore.searchString)
  public searchString$: Observable<string>;

  ngOnInit() {
    this.searchString$
      .subscribe(data => {
        this.searchString = data;
        this.viewContainerRef.clear();
        this.highlightTheText()

      });
  }

  ngAfterViewChecked() {
    if (this.elementRef.nativeElement.previousSibling) {
      this.content = this.elementRef.nativeElement.parentNode.innerText;
    }
  }

  highlightTheText() {
    const regExp = new RegExp(this.searchString, 'gi');
    const match = this.content.match(regExp);
    if (!match || !match[0] || !this.searchString) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
    } else {
      const replacedValue = this.content.split(match[0]);
      const componentFactory = this.componentFactoryResolver.resolveComponentFactory(HighlightComponent);
      const componentRef = this.viewContainerRef.createComponent(componentFactory);

      componentRef.instance.content = replacedValue;
      componentRef.instance.match = match;
    }
  }

}

@Component({
  selector: 'highlight',
  template: `
  <ng-container 
    *ngFor = "let el of content; let i = index">{{el}}<mark *ngIf="match[i]">{{match[i]}}</mark>
  </ng-container>`
})
export class HighlightComponent {
  @Input() content: string[] = [];
  @Input() match: string[] = [];
}
