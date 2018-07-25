import { Component, OnInit, Input } from '@angular/core';
import { Photo } from '../../models/photo';
import { IPFSService } from '../../../services/ipfs.service';
import { DomSanitizer } from '@angular/platform-browser';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'vc-photo-detail',
  templateUrl: './photo-detail.component.html',
  styleUrls: ['./photo-detail.component.scss']
})
export class PhotoDetailComponent implements OnInit {

  @Input()
  ImageHash: string;

  @Input()
  ImageName: string;

  Photo: Photo = {};

  ImageUrl: any;

  faStar = faStar;

  constructor(private IPFS: IPFSService, private sanitizer: DomSanitizer) {
  }

  ngOnInit() {
    this.IPFS.getFileData(this.ImageHash).then((bufferdata) => {
      const blob = new Blob( [ bufferdata ], { type: 'image/*' } );
      this.ImageUrl = this.sanitizer.bypassSecurityTrustUrl(window.URL.createObjectURL(blob));
    });
  }

}
