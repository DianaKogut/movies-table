import { ElementRef, Input, Renderer2 } from '@angular/core';
import { Directive } from '@angular/core';

@Directive({
  selector: '[appHighlight]'
})
export class HighlightDirective {

  @Input() searchString: string;
  @Input() key: string;
  @Input() content: string;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngAfterContentChecked() {
    this.highlightTheText();
  }

  highlightTheText() {
    if (this.key === 'Title') {
      const regExp = new RegExp(this.searchString, 'gi');
      const match = this.elementRef.nativeElement.innerText.match(regExp);
      if (match) {
        this.setContent(this.content.replace(regExp,
          "<mark>" + match[0] + "</mark>"));
      } else {
        this.setContent(this.content)
      }
    }
  }

  setContent(content: string) {
    this.renderer.setProperty(
      this.elementRef.nativeElement,
      'innerHTML',
      content
    );
  }
}
