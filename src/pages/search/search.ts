import { Component } from '@angular/core';
import { AlertController,NavController,LoadingController } from 'ionic-angular'; 
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { DetailsPage } from '../../pages/details/details';

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

	details:any = DetailsPage;
 
	data:any;
	api:any = localStorage.getItem('host');
	asset:any = localStorage.getItem('asset');
	id:any = localStorage.getItem('_id');

    constructor(public navCtrl: NavController,public loadingCtrl: LoadingController,public http: Http,public alertCtrl: AlertController) {

    } 

	getItems(ev: any)
	{
		this.search(ev.target.value);
	}
    
    search(q){
		let loader = this.loadingCtrl.create({
            content: "Please wait..." 
        });
        loader.present(); 
  		
  		let params = {
  			q : q,
  			user_id : this.id
  		};

		this.http.post(this.api+'/movies/search',params).map(res => res.json()).subscribe(data => {  
			loader.dismiss(); 
			this.data = data['data'];  
		}, error => {  
			loader.dismiss();
		});
    }
}
