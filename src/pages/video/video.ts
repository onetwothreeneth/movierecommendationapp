import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';

@Component({
  selector: 'page-video',
  templateUrl: 'video.html'
})
export class Video {
	data:any;
	params:any;

  	constructor(public navCtrl: NavController,navParams: NavParams) {
		this.params = navParams; 
	    this.data = this.params.data;

	    if(!this.data.url.includes('http://')){
		  	this.navCtrl.popToRoot();
	    }
  	}

}
