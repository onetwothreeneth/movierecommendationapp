import { Component } from '@angular/core';
import { AlertController,NavController,LoadingController } from 'ionic-angular'; 
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { DetailsPage } from '../../pages/details/details'; 

@Component({
  selector: 'page-history',
  templateUrl: 'history.html'
})
export class History {
 
	details:any = DetailsPage; 

	data:any;
	api:any = localStorage.getItem('host');
	asset:any = localStorage.getItem('asset');  
	user_id:any = localStorage.getItem('_id');  
    constructor(public navCtrl: NavController,public loadingCtrl: LoadingController,public http: Http,public alertCtrl: AlertController) {
    	this.loadData(); 
    } 
 	  
    loadData()
    { 	
		let loader = this.loadingCtrl.create({
            content: "Please wait..." 
        });
        loader.present(); 
 		 

		this.http.get(this.api+'/movies/user/history?user_id='+this.user_id).map(res => res.json()).subscribe(data => {  
			loader.dismiss();  
			this.data = data['data']  
		}, error => {  
			loader.dismiss();
		});
    }

}
