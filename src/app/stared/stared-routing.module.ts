import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StaredComponent } from './components/stared/stared.component';

const routes: Routes = [{
  path: '',
  component: StaredComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaredRoutingModule { }
