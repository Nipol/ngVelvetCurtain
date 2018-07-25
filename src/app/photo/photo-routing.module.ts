import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhotoListComponent } from './components/photo-list/photo-list.component';
import { PhotoDetailComponent } from './components/photo-detail/photo-detail.component';
import { PhotosResolver } from './resolvers/photos.resolver';

const routes: Routes = [{
  path: '',
  component: PhotoListComponent,
  resolve: { Photos: PhotosResolver },
}, {
  path: ':hash',
  component: PhotoDetailComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PhotoRoutingModule { }
