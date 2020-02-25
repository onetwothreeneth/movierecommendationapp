import { Component } from '@angular/core';
import { AlertController,NavController,LoadingController } from 'ionic-angular'; 
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { TabsPage } from '../../pages/tabs/tabs';
import { RegisterPage } from '../../pages/register/register'; 
import { FavoritePage } from '../../pages/favorite/favorite';
import { ForgotPage } from '../../pages/forgot/forgot';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
	forgotPage:any = ForgotPage;
	register:any = RegisterPage;
	tabs:any = TabsPage;
	
	data:any = {};
	api:any = localStorage.getItem('host');

    constructor(public navCtrl: NavController,public loadingCtrl: LoadingController,public http: Http,public alertCtrl: AlertController) {
    	
    } 

    login()
    {  
 		
 		if (this.data.username == undefined ||
		    this.data.password == undefined) {

 			this.error('Error','Please fillup all fields !');

 		} else { 

			this.deploy(); 

 		} 
    }

    deploy()
    { 
		let loader = this.loadingCtrl.create({
            content: "Please wait..." 
        });
        loader.present(); 

        let params = this.data;

		this.http.post(this.api+'/login',params).map(res => res.json()).subscribe(data => {  
			loader.dismiss();  

			if (data['status']) {

				localStorage.setItem('_details',JSON.stringify(data['data'])); 
				localStorage.setItem('_id',data['data']['id']); 

				this.data = {};
				this.navCtrl.setRoot(TabsPage);

			} else {

				this.error('Error','Invalid login credentials !');
			}

		}, error => {  
			loader.dismiss();
				this.error('Error',error);
		});
    }

    error(title,message)
    {
		const alert = this.alertCtrl.create({
			title: title,
			message: message,
			buttons: [
				{
					text: 'Okay',
					role: 'cancel',
					handler: () => {
						//console.log('Cancel clicked');
					}
				} 
			]
		});
		alert.present();
    }

}
