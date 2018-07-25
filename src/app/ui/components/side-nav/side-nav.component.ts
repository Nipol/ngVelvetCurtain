import { Component, OnInit } from '@angular/core';
import { faArchive, faImage, faImages, faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'vc-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  faArchive = faArchive;
  faImage = faImage;
  faImages = faImages;
  faStar = faStar;

  constructor() { }

  ngOnInit() {
  }

}
