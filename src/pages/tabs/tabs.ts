import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { ContactPage } from '../contact/contact';
import { HomePage } from '../home/home';
import { NewRelease } from '../newrelease/newrelease';
import { Upcoming } from '../upcoming/upcoming';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = Upcoming;
  tab3Root = NewRelease;
  tab4Root = ContactPage;
  tab5Root = AboutPage;

  constructor() {

  }
}
