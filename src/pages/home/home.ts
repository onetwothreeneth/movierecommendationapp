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
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	search:any = SearchPage;
	menu:any = MenuPage;
	details:any = DetailsPage;
	favorite:any = FavoritePage;

	data:any = null;
	id:any = localStorage.getItem('_id');
	api:any = localStorage.getItem('host');
	asset:any = localStorage.getItem('asset'); 
	mode:any;
	type:any;
	count:any = null;
	genre:any;
	load:any = false;
  
    constructor(public navCtrl: NavController,public loadingCtrl: LoadingController,public http: Http,public alertCtrl: AlertController) {
    	
    } 

    ionViewDidEnter()
    { 
    	this.load = false;
    	this.getGenre();
    }

    AR()
    {
    	this.navCtrl.push(Ar);
    } 

    getGenre()
    {
    	this.data = null;
    	let details = JSON.parse(localStorage.getItem('_details'));
  		let gen = JSON.stringify(details.genre);

		if (gen == "[]" || gen == "{}" || details.genre == null) {
			this.genre = 'none';
			console.log('none');
		} else {
			console.log('array');
			this.genre = details.genre; 
			this.getTopThree();
		}

		console.log(gen);
		console.log(this.genre);
    }
 
     
  
    getTopThree()
    { 	
		let loader = this.loadingCtrl.create({
            content: "Please wait..." 
        });
        loader.present(); 
 		
 		this.data = [];
 		this.data[0] = [];
 		this.data[1] = [];
 		this.data[2] = []; 

 		let genre = JSON.parse(localStorage.getItem('_details')).genre;
 		let cat = ['Indie','Local','Foreign'];

 		for(let i=0; i <= 2; i++)
 		{ 
	 		let params = {
	 			genre : genre,
	 			user_id : this.id,
	 			category : cat[i]
	 		}; 
			this.http.post(this.api+'/movies',params).map(res => res.json()).subscribe(data => {   
				this.pushData(data['data'],i);  
				// console.log(cat[i]+' : '+JSON.stringify(data['data']));
			}, error => {  
				alert(error); 
				loader.dismiss();
			});

			if(i >= 2){
				loader.dismiss();  
			}
		} 
    }

    pushData(data,key){ 
    	if(this.count == null){
    		this.count = [];
    	}

		this.count[key] = 0;
    	if(data != null){  
	    	for (let i = 0; i <= (data.length - 1); i++) {
	    		this.data[key].push(data[i]);
	    		if(data != []){ 
	 				this.count[key] = data.length; 
	 			} else {
	 				this.count[key] = 0;
	 			}
	    	} 
	    } else {
 			this.count[key] = 0;
	    }  

    }

}
