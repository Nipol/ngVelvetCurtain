import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StaredRoutingModule } from './stared-routing.module';
import { StaredComponent } from './components/stared/stared.component';

@NgModule({
  imports: [
    CommonModule,
    StaredRoutingModule
  ],
  declarations: [StaredComponent]
})
export class StaredModule { }
