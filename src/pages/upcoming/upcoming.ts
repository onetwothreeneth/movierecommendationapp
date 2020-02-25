import { Component } from '@angular/core';
import { AlertController,NavController,LoadingController } from 'ionic-angular'; 
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { DetailsPage } from '../../pages/details/details';
import { MenuPage } from '../../pages/menu/menu';
import { SearchPage } from '../../pages/search/search';
import { FavoritePage } from '../../pages/favorite/favorite';
import { Ar } from '../../pages/ar/ar';

@Component({
  selector: 'page-upcoming',
  templateUrl: 'upcoming.html'
})
export class Upcoming {

	search:any = SearchPage;
	menu:any = MenuPage;
	details:any = DetailsPage;
	favorite:any = FavoritePage;
	filter:any = {
		sort: null,
		genre: null,
		category : null
	};

	data:any;
	id:any = localStorage.getItem('_id');
	api:any = localStorage.getItem('host');
	asset:any = localStorage.getItem('asset'); 
	mode:any;
	type:any;
	genre:any;
    constructor(public navCtrl: NavController,public loadingCtrl: LoadingController,public http: Http,public alertCtrl: AlertController) {
    	//this.getGenre();
    } 

    ionViewDidEnter()
    { 
    	this.getUpcomming();
    }

    AR()
    {
    	this.navCtrl.push(Ar);
    } 
    
    filterItems(){
    	this.getUpcomming()
    } 
    
    getUpcomming(){
		let loader = this.loadingCtrl.create({
            content: "Please wait..." 
        });
        loader.present(); 
   	
   		let params = this.filter;

		this.http.post(this.api+'/movies/upcomming',params).map(res => res.json()).subscribe(data => {  
			loader.dismiss(); 
			this.data = data['data']; 
		}, error => {  
			loader.dismiss();
		});
    } 
}
