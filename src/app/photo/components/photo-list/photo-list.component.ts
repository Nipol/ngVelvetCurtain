import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
import { IPFSService } from '../../../services/ipfs.service';

@Component({
  selector: 'vc-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.scss']
})
export class PhotoListComponent implements OnInit {

  Photos: Array<any>;
  Addresses: string[];

  constructor(private IPFS: IPFSService, private route: ActivatedRoute) {
    this.Photos = new Array<any>();
  }

  async ngOnInit() {
    this.route.data.pipe(
      map(data => data['Photos'])
    ).subscribe((payload) => {
      payload.forEach(element => {
        this.IPFS.getFileHash('photos', element.name).then((hash) => {
          this.Photos.push({
            hash: hash,
            name: element.name
          });
        });
      });
    });
    // this.service.Addresses().subscribe(payload => this.Addresses = payload);
  }

  async FileHash(filename: string): Promise<any> {
    return await this.IPFS.getFileHash('photos', filename);
  }

}
