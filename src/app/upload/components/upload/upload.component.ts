import { Component, OnInit, ElementRef } from '@angular/core';
import { Buffer } from 'buffer';
import { IPFSService } from '../../../services/ipfs.service';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'vc-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  private files: Buffer[];
  private filesname: string[];

  @ViewChild('upload')
  uploadVariable: ElementRef;

  constructor(
    private ipfs: IPFSService,
  ) {
    this.files = new Array<Buffer>();
    this.filesname = new Array<string>();
  }

  ngOnInit() {
  }

  handleFileUpload (files: FileList) {
    if (files && files.length === 1) {
      const file = files[0];
      const reader: FileReader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onloadend = () => {
        this.files.push(new Buffer(reader.result));
        this.filesname.push(`${file.name}`);
      };
    } else {
      Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.readAsArrayBuffer(file);
        reader.onloadend = () => {
          this.files.push(new Buffer(reader.result));
          this.filesname.push(`${file.name}`);
        };
      });
    }
  }

  async submit() {
    if (this.files.length === 1) {
      this.uploadImage('photos', this.filesname[0], this.files[0]);
    } else if (this.files.length > 1) {
      for (let index = 0; index < this.files.length; index++) {
        this.uploadImage('photos', this.filesname[index], this.files[index]);
      }
    }

    this.uploadVariable.nativeElement.value = '';
  }

  private async uploadImage(targetAlbum: string, filename: string, file: any) {
    await this.ipfs.PhotoAddToAlbum(targetAlbum, filename, file);
    const hash = await this.ipfs.getFileHash(targetAlbum, filename);
    const nameAndExtension = filename.split('.');
    await this.ipfs.moveFile(`/${targetAlbum}/${filename}`, `/${targetAlbum}/${hash}.${nameAndExtension[nameAndExtension.length - 1]}`);
  }

}
