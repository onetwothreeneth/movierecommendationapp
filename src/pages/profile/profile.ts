import { Component,ViewChild,ElementRef } from '@angular/core';
import { AlertController,NavController,LoadingController } from 'ionic-angular'; 
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { FavoritePage } from '../../pages/favorite/favorite';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class ProfilePage {

	@ViewChild('InputFile',{read: ElementRef}) el;
	@ViewChild('ImgPreview') el2:ElementRef;

    file:any; 

	favorite:any = FavoritePage;
	user:any = JSON.parse(localStorage.getItem('_details'));
	api:any = localStorage.getItem('host'); 
	asset:any = localStorage.getItem('asset'); 
	id:any = localStorage.getItem('_id'); 

	params:any = {};
    constructor(public navCtrl: NavController,public loadingCtrl: LoadingController,public http: Http,public alertCtrl: AlertController) {
		this.params = {
			name : this.user.name,
			age : this.user.age, 
			username : this.user.username,
			password : null
		};
		console.log(this.params);
	}

    changeListener($event) : void 
    {
		this.file = $event.target.files[0]; 
		console.log(this.file);
    	this.el2.nativeElement.src = window.URL.createObjectURL(this.file);	
	}

	save()
	{
 		if (this.params.name == undefined || this.params.age == undefined ||
		    this.params.username == undefined) {

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

        let params = '';
			params += '?name='+this.params.name;
			params += '&age='+this.params.age;
			params += '&username='+this.params.username;
			params += '&password='+this.params.password;
			params += '&user_id='+this.id; 

		let headers = {};  
		headers["Access-Control-Allow-Origin"] = "*";
		headers["Access-Control-Allow-Methods"] = "POST, GET, PUT, DELETE, OPTIONS";
		headers["Access-Control-Allow-Credentials"] = false;
		headers["Access-Control-Max-Age"] = '86400'; // 24 hours
		headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";

		let body = new FormData();

		body.append('file', this.file);
		
		this.http.post(this.api+'/update'+params,body,headers).map(res => res.json()).subscribe(data => {  
			loader.dismiss();  
			console.log(data);
			this.user = data['data'];
			localStorage.setItem('_details',JSON.stringify(data['data']));
			this.error('Success','Profile has been updated !');
			 

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
