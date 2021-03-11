import {
  Component,
  ComponentFactoryResolver,
  Input,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewContainerRef
} from '@angular/core';
import { Directive } from '@angular/core';

import { Select } from '@ngxs/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { MoviesStore } from '../state/movies.state';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective implements OnInit, OnDestroy {
  @Select(MoviesStore.searchString)
  public searchString$: Observable<string>;

  @Input() set appHighlight(value: string) {
    this.content = value;
  };

  content: string = '';
  private _unsubscribe = new Subject<void>();

  constructor(private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef,
    private componentFactoryResolver: ComponentFactoryResolver) { }


  ngOnInit(): void {
    this.searchString$.pipe(
      takeUntil(this._unsubscribe)
    ).subscribe((data: string) => {
        this.viewContainerRef.clear();
        this.highlightTheText(data)
      });
  }

  ngOnDestroy(): void {
    this._unsubscribe.next();
    this._unsubscribe.complete();
  }

  highlightTheText(searchString: string): void {
    try {
      const regExp = new RegExp(searchString, 'gi');
      const match = this.content.match(regExp);
      if (!match || !searchString) {
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
  <ng-container 
    *ngFor="let el of content; 
    let i=index">{{el}}<mark>{{match[i]}}</mark>
  </ng-container>`
})
export class HighlightComponent {
  @Input() content: string[] = [];
  @Input() match: string[] = [];
}
