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
      await this.ipfs.PhotoAddToAlbum('photos', this.filesname[0], this.files[0]);
      const hash = await this.ipfs.getFileHash('photos', this.filesname[0]);
      const filename = this.filesname[0].split('.');
      await this.ipfs.moveFile(`/photos/${this.filesname[0]}`, `/photos/${hash}.${filename[filename.length - 1]}`);
    } else if (this.files.length > 1) {
      for (let index = 0; index < this.files.length; index++) {
        const file = this.files[index];
        await this.ipfs.PhotoAddToAlbum('photos', this.filesname[index], file);
        const hash = await this.ipfs.getFileHash('photos', this.filesname[index]);
        const filename = this.filesname[index].split('.');
        await this.ipfs.moveFile(`/photos/${this.filesname[index]}`, `/photos/${hash}.${filename[filename.length - 1]}`);
      }
    }
    this.uploadVariable.nativeElement.value = '';
  }

}
