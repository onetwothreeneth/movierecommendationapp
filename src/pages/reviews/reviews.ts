import { Component } from '@angular/core';
import { AlertController,NavController,LoadingController,NavParams } from 'ionic-angular'; 
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { DetailsPage } from '../../pages/details/details';
import { MenuPage } from '../../pages/menu/menu';
import { SearchPage } from '../../pages/search/search';
import { FavoritePage } from '../../pages/favorite/favorite';
import { Reviewers } from '../../pages/reviewers/reviewers';

@Component({
  selector: 'page-reviews',
  templateUrl: 'reviews.html'
})
export class Reviews {
	reviewersPage:any = Reviewers;
	params:any;
	paramsD:any;
	search:any = SearchPage;
	menu:any = MenuPage;
	details:any = DetailsPage;
	favorite:any = FavoritePage;

	data:any;
	api:any = localStorage.getItem('host');
	asset:any = localStorage.getItem('asset');  
    user_id:any = localStorage.getItem('_id');  
    constructor(public navCtrl: NavController,public loadingCtrl: LoadingController,public http: Http,public alertCtrl: AlertController,navParams: NavParams) {
	    this.params = navParams; 
	    this.paramsD = this.params.data;
	    console.log(this.params);
	     
    	this.loadData(); 
    } 
 	  
    loadData()
    { 	
		let loader = this.loadingCtrl.create({
            content: "Please wait..." 
        });
        loader.present(); 
 		 

		this.http.get(this.api+'/movies/user/ratings?user_id='+this.user_id).map(res => res.json()).subscribe(data => {  
			loader.dismiss();   
			this.data = data['data'];
			console.log(data['data']);
		}, error => {  
			loader.dismiss();
		});
    }
}
