import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './ui/containers/layout/layout.component';

const routes: Routes = [{
  path: '',
  component: LayoutComponent,
  children: [{
    path: '',
    pathMatch: 'full',
    redirectTo: '/photos'
  }, {
    path: 'photos',
    loadChildren: './photo/photo.module#PhotoModule'
  }, {
    path: 'stared',
    loadChildren: './stared/stared.module#StaredModule'
  }, {
    path: 'upload',
    loadChildren: './upload/upload.module#UploadModule'
  }, {
    path: 'setting',
    loadChildren: './setting/setting.module#SettingModule'
  }]
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
