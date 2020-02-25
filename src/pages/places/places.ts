import { Component } from '@angular/core';  
import { AlertController,NavController,NavParams,LoadingController } from 'ionic-angular'; 
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-places',
  templateUrl: 'places.html'
})
export class Places {

	data:any;
	params:any; 

	datas:any;
	api:any = localStorage.getItem('host');
	asset:any = localStorage.getItem('asset');  
	id:any = localStorage.getItem('_id');  
	map:any = localStorage.getItem('map'); 
	paramsx:any = [];

    constructor(private geolocation: Geolocation,public navCtrl: NavController,public loadingCtrl: LoadingController,public http: Http,public alertCtrl: AlertController,navParams: NavParams) {
	    this.params = navParams; 
	    this.data = this.params.data; 
	    console.log(this.data);
    }  
}
