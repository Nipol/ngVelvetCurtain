import { Component, OnInit } from '@angular/core';
import { faThumbtack, faFileUpload, faSlidersH } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'vc-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  faThumbtack = faThumbtack;
  faFileUpload = faFileUpload;
  faSlidersH = faSlidersH;

  constructor() { }

  ngOnInit() {
  }

}
