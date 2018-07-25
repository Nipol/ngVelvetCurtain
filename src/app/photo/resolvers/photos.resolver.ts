import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { IPFSService } from '../../services/ipfs.service';
import { flatMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PhotosResolver implements Resolve < any[] > {
  constructor(private IPFS: IPFSService) {}

  async resolve(): Promise<any> {
    if (await this.IPFS.Ready()) {
      return await this.IPFS.getPhotos();
    }
  }
}
