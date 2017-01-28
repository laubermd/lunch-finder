import { Component } from '@angular/core';

import { SearchPage } from '../search/search';
import { SettingsPage } from '../settings/settings';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  searchRoot: any = SearchPage;
  settingsRoot: any = SettingsPage;

  constructor() {

  }
}
