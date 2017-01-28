import { Component } from '@angular/core';

import { NavController } from 'ionic-angular';
import { MapPage } from '../map/map';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  constructor(public navCtrl: NavController) {

  }
  public open(event) {
    this.navCtrl.push(MapPage);
  }
}
