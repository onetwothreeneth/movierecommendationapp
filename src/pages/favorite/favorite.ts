import { Component } from '@angular/core'; 
import { AlertController,NavController,LoadingController } from 'ionic-angular'; 
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Component({
  selector: 'page-favorite',
  templateUrl: 'favorite.html'
})
export class FavoritePage {

	genre:any = {}; 
	api:any = localStorage.getItem('host');
	asset:any = localStorage.getItem('asset'); 
	details:any = localStorage.getItem('_details'); 
	id:any = localStorage.getItem('_id'); 
	name:any;
    constructor(public navCtrl: NavController,public loadingCtrl: LoadingController,public http: Http,public alertCtrl: AlertController) {
    	this.name = JSON.parse(this.details).name;
	}

	save()
	{
		let loader = this.loadingCtrl.create({
            content: "Please wait..." 
        });
        loader.present(); 
   		
   		let params = {
   			genre : this.genre,
   			user_id : this.id
   		};
 
   		if (JSON.stringify(this.genre) == '{}') {
   			loader.dismiss();
			const alert = this.alertCtrl.create({
				title: 'Invalid',
				message: 'Please select atleast 1 genre !',
				buttons: [
					{
						text: 'Okay',
						role: 'cancel',
						handler: () => {
						}
					}
				]
			});
			alert.present();
   		} else {
   			this.http.post(this.api+'/movies/preference',params).map(res => res.json()).subscribe(data => {  
				loader.dismiss(); 
				localStorage.setItem('_details',JSON.stringify(data['data']));
				this.navCtrl.pop();
			}, error => {  
				loader.dismiss();
			});		
   		} 
	}

}
