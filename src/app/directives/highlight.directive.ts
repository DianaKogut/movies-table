import { ElementRef, Input, Renderer2 } from '@angular/core';
import { Directive } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {
  @Input() searchString: string;
  @Input() key: string;


  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
  }

}
