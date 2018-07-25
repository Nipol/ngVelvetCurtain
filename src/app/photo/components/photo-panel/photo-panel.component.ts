import { Component, OnInit } from '@angular/core';
import { faStar } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'vc-photo-panel',
  templateUrl: './photo-panel.component.html',
  styleUrls: ['./photo-panel.component.scss']
})
export class PhotoPanelComponent implements OnInit {

  faStar = faStar;

  constructor() { }

  ngOnInit() {
  }

}
