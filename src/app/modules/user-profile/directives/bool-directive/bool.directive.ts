import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';


@Directive({
  selector: '[appBool]'
})
export class BoolDirective implements OnInit{
  @Input() appBool!: boolean;
  
  constructor(private el: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void
  {
    let text = '';
    if(this.appBool){
      text = '\u2713';
    }else{
      text = '\u2718';
    }
    const result = this.renderer.createText(text);
    this.renderer.appendChild(this.el.nativeElement, result);
  }

  
}
