import { Component } from '@angular/core';
import { AlertController,NavController,LoadingController } from 'ionic-angular'; 
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { VerificationPage } from '../../pages/verification/verification';
import { LoginPage } from '../../pages/login/login';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {

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
 		
 		if (this.data.name == undefined || this.data.age == undefined ||
		   this.data.email == undefined || this.data.username == undefined ||
		   this.data.password == undefined || this.data.repass == undefined) {

 			this.error('Error','Please fillup all fields !');

 		} else if(!this.validMail(this.data.email)){
 			this.error('Error','Invalid Email address !');
 		} else {
 			if(this.data.password != this.data.repass){

 				this.error('Error','Password didnt match !');
 			
 			} else {

 				this.deploy();
 			}
 		} 
    }

    validMail(mail)
	{
	    return /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/.test(mail);
	}

    deploy()
    { 
        let params = this.data;

    	if (this.verify) {
    		if (this.data.verification != this.code) {
				this.error('Error','Wrong verification code !');
    		} else {  
    			let loader = this.loadingCtrl.create({
		            content: "Please wait..." 
		        });
		        loader.present(); 
		        
		        params.code = this.code; 

				this.http.post(this.api+'/register',params).map(res => res.json()).subscribe(data => {  
					loader.dismiss();  

					if (data['status']) { 
						localStorage.setItem('_email',this.data.email);
						localStorage.setItem('_otp',data['otp']);

						this.data = {};

						this.error('Success','You may now login !');
						this.navCtrl.setRoot(LoginPage); 
					} else {
						this.error('Error',data['message']);
					}

				}, error => {  
					loader.dismiss();
				});
    		}
    	} else {
    		console.log('get otp');
    		let loader = this.loadingCtrl.create({
	            content: "Please wait..." 
	        });
	        loader.present(); 
 
			this.http.post(this.api+'/register',params).map(res => res.json()).subscribe(data => {  
				loader.dismiss();  

				if (data['status']) { 
					console.log(data);
					this.verify = true;
					this.code = data['otp']; 
				} else {
					this.error('Error',data['message']);
				}

			}, error => {  
				loader.dismiss();
			});
    	}
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
