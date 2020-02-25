import { Component } from '@angular/core';
import { AlertController,NavController,LoadingController } from 'ionic-angular'; 
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { VerificationPage } from '../../pages/verification/verification';
import { LoginPage } from '../../pages/login/login';

@Component({
  selector: 'page-forgot',
  templateUrl: 'forgot.html'
})
export class ForgotPage {

	verification:any = VerificationPage; 
	login:any = LoginPage; 

	data:any = {};
	api:any = localStorage.getItem('host');
	verify:any = false;
	code:any = null;
    constructor(public navCtrl: NavController,public loadingCtrl: LoadingController,public http: Http,public alertCtrl: AlertController) {
    	
    } 

    register()
    {  
 		
 		if (this.data.email == undefined) {

 			this.error('Error','Please fillup all fields !');

 		} else { 
			this.deploy(); 
 		} 
    }

    deploy()
    { 
        let params = this.data;

    	let loader = this.loadingCtrl.create({
            content: "Please wait..." 
        });
        loader.present(); 

		this.http.post(this.api+'/reset',params).map(res => res.json()).subscribe(data => {  
			loader.dismiss();  
			console.log(data);
			if (data['status']) { 
				this.error('Success',data['message']);
			} else {
				this.error('Error',data['message']);
			}

		}, error => {  
			loader.dismiss();
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
						console.log('Cancel clicked');
					}
				} 
			]
		});
		alert.present();
    } 
}
