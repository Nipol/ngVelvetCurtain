import { Component, OnInit, Input } from '@angular/core';
import { faStar, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { IPFSService } from '../../../services/ipfs.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'vc-photo-panel',
  templateUrl: './photo-panel.component.html',
  styleUrls: ['./photo-panel.component.scss']
})
export class PhotoPanelComponent implements OnInit {

  @Input()
  ImageBlob: SafeUrl;
  faStar = faStar;
  faSpinner = faSpinner;

  constructor() {
  }

  ngOnInit() {
  }
}
