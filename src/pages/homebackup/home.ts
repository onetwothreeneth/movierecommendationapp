import { Component } from '@angular/core';
import { AlertController,NavController,LoadingController } from 'ionic-angular'; 
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

import { DetailsPage } from '../../pages/details/details';
import { MenuPage } from '../../pages/menu/menu';
import { SearchPage } from '../../pages/search/search';
import { FavoritePage } from '../../pages/favorite/favorite';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

	search:any = SearchPage;
	menu:any = MenuPage;
	details:any = DetailsPage;
	favorite:any = FavoritePage;

	data:any;
	id:any = localStorage.getItem('_id');
	api:any = localStorage.getItem('host');
	asset:any = localStorage.getItem('asset'); 
	mode:any;
	type:any;
	genre:any;
    constructor(public navCtrl: NavController,public loadingCtrl: LoadingController,public http: Http,public alertCtrl: AlertController) {
    	localStorage.setItem('mode','TOP 3 RECOMMENDED');
    	localStorage.setItem('type','top');

    	this.mode = localStorage.getItem('mode');
    	this.type = localStorage.getItem('type');
    	this.getGenre();
    } 

    getGenre()
    {
    	let details = JSON.parse(localStorage.getItem('_details'));
    	console.log(details.genre);
    	this.data = [];

		if (details.genre == null) {
			this.genre = 'none';
		} else {
			this.genre = details.genre; 
			this.getTopThree();
		}
    }

    next()
    {
    	if (localStorage.getItem('type') === 'top') {
    		localStorage.setItem('mode','UPCOMING MOVIES');
	    	localStorage.setItem('type','upcoming');
			this.getUpcomming();
    	} else if (localStorage.getItem('type') === 'upcoming') {
    		localStorage.setItem('mode','NEW RELEASE MOVIES');
	    	localStorage.setItem('type','new');
			this.getNew();
    	} else if (localStorage.getItem('type') === 'new') {
    		localStorage.setItem('mode','TOP 3 RECOMMENDED');
	    	localStorage.setItem('type','top');
			this.getTopThree();
    	}  

    	this.mode = localStorage.getItem('mode');
    	this.type = localStorage.getItem('type');
    }

    getUpcomming(){
		let loader = this.loadingCtrl.create({
            content: "Please wait..." 
        });
        loader.present(); 
   
		this.http.get(this.api+'/movies/upcomming').map(res => res.json()).subscribe(data => {  
			loader.dismiss(); 
			this.data = data['data'];
			console.log(this.data);  
		}, error => {  
			loader.dismiss();
		});
    }
    
    getNew(){
		let loader = this.loadingCtrl.create({
            content: "Please wait..." 
        });
        loader.present(); 
  
		this.http.get(this.api+'/movies/new').map(res => res.json()).subscribe(data => {  
			loader.dismiss(); 
			this.data = data['data'];
			console.log(this.data);  
		}, error => {  
			loader.dismiss();
		});
    }
  
    getTopThree()
    { 	
		let loader = this.loadingCtrl.create({
            content: "Please wait..." 
        });
        loader.present(); 
 		
 		this.data = [];
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
				this.pushData(data['data']);  
			}, error => {  
				alert(error); 
				loader.dismiss();
			});

			if(i >= 2){
				loader.dismiss();  
			}
		}
    }

    pushData(data){
    	for (let i = 0; i <= (data.length - 1); i++) {
    		this.data.push(data[i]);
    	}
    	console.log(this.data);
    }

}
