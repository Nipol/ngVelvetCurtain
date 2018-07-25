import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { PhotoRoutingModule } from './photo-routing.module';
import { PhotoListComponent } from './components/photo-list/photo-list.component';
import { PhotoDetailComponent } from './components/photo-detail/photo-detail.component';
import { PhotoPanelComponent } from './components/photo-panel/photo-panel.component';

@NgModule({
  imports: [
    CommonModule,
    PhotoRoutingModule,
    FontAwesomeModule
  ],
  declarations: [PhotoListComponent, PhotoDetailComponent, PhotoPanelComponent]
})
export class PhotoModule { }
