import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import ipfsAPI from 'ipfs-api';

@Injectable({
  providedIn: 'root'
})
export class IPFSService {

  private node: any;
  public Running: boolean;

  constructor(
  ) {
    this.node = ipfsAPI('localhost', '5001', {protocol: 'http'});

    this.node.files.mkdir('/photos', (err) => {
      if (err) {
        throw err;
      }
      console.log('created photos');
    });

    this.node.files.mkdir('/stared', (err) => {
      if (err) {
        throw err;
      }
      console.log('created stared');
    });
  }

  public Id(): Observable<string> {
    if (this.Running) {
      return Observable.create(observer => {
        this.node.id((err, id) => {
          if (err) {
            throw err;
          }

          observer.next(id.id);
          observer.complete();
        });
      });
    }
  }

  public Addresses(): Observable<string[]> {
    if (this.Running) {
      return Observable.create(observer => {
        this.node.config.get('Addresses.Swarm', (err, swarm) => {
          if (err) {
            throw err;
          }

          observer.next(swarm);
          observer.complete();
        });
      });
    }
  }

  public PhotoAddToAlbum(Album: string, filename: string, file: any): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.node.files.write(`/${Album}/${filename}`, file, { create: true }, (err: any) => {
        if (err) {
          reject(err);
        }

        resolve(true);
      });
    });
  }

  public getPhotos(targetAlbum = 'photos'): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.node.files.ls(`/${targetAlbum}`, (err: any, payload: any[]) => {
        if (err) {
          reject(err);
        }

        resolve(payload);
      });
    });
  }

  public getFileHash(targetAlbum: string, filename: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.node.files.stat(`/${targetAlbum}/${filename}`, (err: any, payload: any) => {
        if (err) {
          reject(err);
        }

        resolve(payload.hash);
      });
    });
  }

  public getFileData(hash: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.node.files.cat(hash, { buffer: true }, (err: any, file: any) => {
        if (err) {
          reject(err);
        }
        resolve(file);
      });
    });
  }

  public moveFile(from: string, to: string): Promise<any> {
    return new Promise<any>((resolve, reject) => {
      this.node.files.mv(from, to, (err) => {
        if (err) {
          reject(err);
        }
        resolve(true);
      });
    });
  }
}
