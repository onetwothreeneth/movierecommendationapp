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
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {

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
	api:any = localStorage.getItem('host');
	asset:any = localStorage.getItem('asset');  
    constructor(public navCtrl: NavController,public loadingCtrl: LoadingController,public http: Http,public alertCtrl: AlertController) {
    	 
    } 

    filterItems(){
    	this.getTrending()
    }
 
    AR()
    {
    	this.navCtrl.push(Ar);
    } 
    
    ionViewDidEnter()
    { 
    	this.getTrending();
    }
 	  
    getTrending()
    { 	
    	this.data = [];
		let loader = this.loadingCtrl.create({
            content: "Please wait..." 
        });
        loader.present(); 
 		
 		let params = this.filter

 		console.log(params);
		this.http.post(this.api+'/movies/trending',params).map(res => res.json()).subscribe(data => {  
			loader.dismiss();  
			this.data = data['data']  
		}, error => {  
			loader.dismiss();
		});
    }

}
