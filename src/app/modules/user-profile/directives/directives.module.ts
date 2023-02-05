import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoolDirective } from './bool-directive/bool.directive';



@NgModule({
  declarations: [BoolDirective],
  imports: [
    CommonModule
  ],
  exports: [BoolDirective]

})
export class DirectivesModule { }
