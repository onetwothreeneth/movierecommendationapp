import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { LoginPage } from '../../pages/login/login';
import { ProfilePage } from '../../pages/profile/profile';
import { Watchlist } from '../../pages/watchlist/watchlist';
import { Reviews } from '../../pages/reviews/reviews';
import { History } from '../../pages/history/history';

@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {

	login:any = LoginPage;
	profile:any = ProfilePage;
	watch:any = Watchlist;
	reviews:any = Reviews;
	history:any = History;
	user:any = JSON.parse(localStorage.getItem('_details'));
	asset:any = localStorage.getItem('asset');
	Dratings:any = { type : 'REVIEWS & RATINGS' };
	Dreviews:any = { type : 'REVIEWS' };

	constructor(public navCtrl: NavController) {
		setInterval(() => {
			this.user = JSON.parse(localStorage.getItem('_details'));
		},1000);	
	}

	logout()
	{
		localStorage.removeItem('_id');
		localStorage.removeItem('_details');
		localStorage.removeItem('_email');
		location.reload();
	}

}
