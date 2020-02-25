import { Component } from '@angular/core';  
import { AlertController,NavController,NavParams,LoadingController } from 'ionic-angular'; 
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Geolocation } from '@ionic-native/geolocation';
 
import { Places } from '../../pages/places/places';

@Component({
  selector: 'page-reviewers',
  templateUrl: 'reviewers.html'
})
export class Reviewers {

	placePage:any = Places;
	data:any;
	params:any;
 
	datas:any;
	api:any = localStorage.getItem('host');
	asset:any = localStorage.getItem('asset');  
	id:any = localStorage.getItem('_id');  
	map:any = localStorage.getItem('map');
	type:any;
	review:any;
	rating_o:any;
	paramsx:any = [];
	places:any;
    constructor(private geolocation: Geolocation,public navCtrl: NavController,public loadingCtrl: LoadingController,public http: Http,public alertCtrl: AlertController,navParams: NavParams) {
	    this.params = navParams; 
	    this.data = this.params.data; 

	    this.getRatings(); 
    } 
 
    getRatings(){
		let loader = this.loadingCtrl.create({
            content: "Please wait..." 
        });
        loader.present(); 
   
		this.http.get(this.api+'/movies/reviews?movie_id='+this.data['id']).map(res => res.json()).subscribe(data => {  
			loader.dismiss(); 
			this.review = data['data']; 
			console.log(data);
		}, error => {  
			loader.dismiss();
		});
    } 
}
