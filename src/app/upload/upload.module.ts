import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UploadRoutingModule } from './upload-routing.module';
import { UploadComponent } from './components/upload/upload.component';
import { IPFSService } from '../services/ipfs.service';

@NgModule({
  imports: [
    CommonModule,
    UploadRoutingModule
  ],
  providers: [
    IPFSService
  ],
  declarations: [UploadComponent]
})
export class UploadModule { }
