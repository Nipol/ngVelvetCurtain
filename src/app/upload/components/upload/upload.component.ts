import { Component, OnInit } from '@angular/core';
import { Buffer } from 'buffer';
import { IPFSService } from '../../../services/ipfs.service';

@Component({
  selector: 'vc-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

  private file: Buffer;
  private filename: string;

  constructor(
    private ipfs: IPFSService,
  ) {
  }

  ngOnInit() {
  }

  handleFileUpload (files: FileList) {
    console.log(files);
    if (files && files.length > 0) {
      const file = files[0];
      const reader: FileReader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onloadend = () => {
        this.file = new Buffer(reader.result);
        this.filename = `vc-${file.name}`;
      };
    }
  }

  async submit() {
    await this.ipfs.PhotoAddToAlbum('photos', this.filename, this.file);
    const hash = await this.ipfs.getFileHash('photos', this.filename);
    const filename = this.filename.split('.');
    await this.ipfs.moveFile(`/photos/${this.filename}`, `/photos/${hash}.${filename[1]}`);
  }

}
