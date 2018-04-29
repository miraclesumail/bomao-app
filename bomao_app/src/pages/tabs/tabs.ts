import { Component } from '@angular/core';

import { HomePage } from '../home/home';
import { LottoryCenterPage } from '../lottory-center/lottory-center';
import { ActivityPage } from '../activity/activity';
import { UserCenterPage } from '../user-center/user-center';

@Component({
  selector: 'page-tab',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = LottoryCenterPage;
  tab3Root = ActivityPage;
  tab4Root = UserCenterPage;

  constructor() {

  }
}
