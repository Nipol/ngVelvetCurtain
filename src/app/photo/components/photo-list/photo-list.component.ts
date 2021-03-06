import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { IPFSService } from '../../../services/ipfs.service';
import { SafeUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'vc-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss']
})
export class PhotoListComponent implements OnInit {

  Photos: Array<SafeUrl>;
  Addresses: string[];

  constructor(private IPFS: IPFSService, private route: ActivatedRoute, private sanitizer: DomSanitizer) {
    this.Photos = new Array<SafeUrl>();
  }

  async ngOnInit() {
    this.route.data.pipe(
      map(data => data['Photos'])
    ).subscribe((payload) => {
      payload.forEach(element => {
        this.Photos.push(this.sanitizer.bypassSecurityTrustUrl(`http://localhost:8080/ipfs/${element.name.split('.')[0]}`));
      });
    });
  }

}
