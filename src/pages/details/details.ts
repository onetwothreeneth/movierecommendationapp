import { Component } from '@angular/core';  
import { AlertController,NavController,NavParams,LoadingController } from 'ionic-angular'; 
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Geolocation } from '@ionic-native/geolocation';
 
import { Places } from '../../pages/places/places';
import { Reviewers } from '../../pages/reviewers/reviewers';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})
export class DetailsPage {

	placePage:any = Places;
	reviewersPage:any = Reviewers;
	data:any;
	params:any;
 
	datas:any;
	api:any = localStorage.getItem('host');
	asset:any = localStorage.getItem('asset');  
	id:any = localStorage.getItem('_id');  
	map:any = localStorage.getItem('map');
	type:any;
	rating:any;
	rating_o:any;
	paramsx:any = [];
	places:any;
	showReview:any = true;
    constructor(private geolocation: Geolocation,public navCtrl: NavController,public loadingCtrl: LoadingController,public http: Http,public alertCtrl: AlertController,navParams: NavParams) {
	    this.params = navParams; 
	    this.data = this.params.data; 
 	
 		let date = new Date();
	    if(Date.parse(this.data['release_date']) <= Date.parse(date.toString()))
		{ 
			this.showReview = true;
		} else { 
			this.showReview = false;
		}

	    this.setHistory();
	    this.getRatings();
	    this.getLocation();
    } 

    getLocation()
    {
		let loader = this.loadingCtrl.create({
            content: "Finding your location..." 
        });
        loader.present(); 
		this.geolocation.getCurrentPosition().then((resp) => {
			// resp.coords.latitude
			// resp.coords.longitude

			loader.dismiss(); 
			this.getPlacesApi(resp.coords.latitude,resp.coords.longitude);
		}).catch((error) => {
			console.log('Error getting location', error);
		});
    }

    getPlacesApi(lat,long)
    {
		let loader = this.loadingCtrl.create({
            content: "Looking for nearby cinemas..." 
        });
        loader.present(); 
    	
        let url = this.map+'/maps/api/place/nearbysearch/json?location='+lat+','+long+'&radius=5000&type=movie_theater&keyword=sm%20cinema&key=AIzaSyD3T4ynbp3upvW2iwu5yqqM2CFpLU0IY2g';
		 
		this.http.get(this.api+'/movies/nearby?lat='+lat+'&lang='+long).map(res => res.json()).subscribe(data => {  
			loader.dismiss(); 
			this.places = data.results; 
		}, error => {  
			loader.dismiss();
		});
    }

    setHistory()
    { 
    	let params = {
    		user_id : this.id,
    		id : this.data['id']
    	};

		this.http.post(this.api+'/movies/clickedsearch',params).map(res => res.json()).subscribe(data => {  
			// console.log('clicked');
			// console.log(data);
		}, error => {  
			//
		});
    }

    getRatings(){
		let loader = this.loadingCtrl.create({
            content: "Please wait..." 
        });
        loader.present(); 
   
		this.http.get(this.api+'/movies/ratings?movie_id='+this.data['id']+'&user_id='+this.id).map(res => res.json()).subscribe(data => {  
			loader.dismiss(); 
			this.rating = data['data'];

			if(this.rating != null) {
				this.rating_o = 5 - this.rating;
			} 
		}, error => {  
			loader.dismiss();
		});
    }

    rate()
    {
    	if(this.paramsx.stars == undefined || this.paramsx.review == undefined){
			const alert = this.alertCtrl.create({
				title: 'Invalid',
				message: 'Please fillup all fields',
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
    		let loader = this.loadingCtrl.create({
	            content: "Please wait..." 
	        });
	        loader.present(); 

	        let params = {
	        	user_id : this.id,
	        	movie_id : this.data['id'],
	        	rating : this.paramsx.stars,
	        	review : this.paramsx.review
	        }

			this.http.post(this.api+'/movies/addreview',params).map(res => res.json()).subscribe(data => {  
				loader.dismiss();   
				this.paramsx.review = null;

				if(data['data']){  
					const alert = this.alertCtrl.create({
						title: 'Success',
						message: 'Review has been added !',
						buttons: [
							{
								text: 'Okay',
								role: 'cancel',
								handler: () => {
									this.getRatings();
								}
							}
						]
					});
					alert.present();
				} else {
					const alert = this.alertCtrl.create({
						title: 'Error',
						message: 'You already reviewed this movie !',
						buttons: [
							{
								text: 'Okay',
								role: 'cancel',
								handler: () => {
									this.getRatings();
								}
							}
						]
					});
					alert.present();
				}
			}, error => {  
				loader.dismiss();
			});
    	}
    }

    addToWatchList(i)
    {
		const alert = this.alertCtrl.create({
			title: 'Add Watchlist',
			message: 'This will be added to your watchlist',
			buttons: [
				{
					text: 'Okay',
					role: 'cancel',
					handler: () => { 

						let loader = this.loadingCtrl.create({
				            content: "Please wait..." 
				        });
				        loader.present(); 
						this.http.get(this.api+'/movies/addwatchlist?movie_id='+i+'&user_id='+this.id).map(res => res.json()).subscribe(data => {  
							loader.dismiss();  

							if(data['data']){ 
								const alert = this.alertCtrl.create({
									title: 'Success',
									message: 'This has been added to your watchlist !',
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
								const alert = this.alertCtrl.create({
									title: 'Error',
									message: 'This movie is already in your watchlist !',
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
							}
						}, error => {  
							loader.dismiss();
						});
					}
				} ,
				{
					text: 'cancel',
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
