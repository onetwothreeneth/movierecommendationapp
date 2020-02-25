import { Component } from '@angular/core';
import { NavController,NavParams } from 'ionic-angular';

import { Video } from '../../pages/video/video';
import { BarcodeScanner,BarcodeScannerOptions,BarcodeScanResult } from '@ionic-native/barcode-scanner';
import { VideoPlayer } from '@ionic-native/video-player';
import { ScreenOrientation } from '@ionic-native/screen-orientation';

@Component({
  selector: 'page-ar',
  templateUrl: 'ar.html'
})
export class Ar {
	data:any;
	params:any;
	result:BarcodeScanResult;
	res:any = null; 

  	constructor(private screenOrientation: ScreenOrientation,private videoPlayer: VideoPlayer,private scanner: BarcodeScanner,public navCtrl: NavController,navParams: NavParams) {
		this.params = navParams; 
	    this.data = this.params.data;
  	}

  	ionViewDidEnter()
    {  
    	this.AR();
    }

    AR()
    {
    	this.openCamera(); 
		// this.moveVideo('http://icine.website/app/storage/app/uploads/jou4sPeesVa5DwVLOHTIp9C4rIg6laWyrQtp6gGH.mp4');
    }

    moveVideo(uri)
    {
	  	this.navCtrl.popToRoot();
    	this.navCtrl.push(
    		Video,
    		{ 
    			url : uri,
    			tabIndex : 1
    		}
    	);
    } 
  
	async openCamera(){ 
		try {
			const options : BarcodeScannerOptions = {
				prompt  : 'Point your camera at a QR code',
				torchOn : true
			}
			await this.scanner.scan().then(barcodeData => {
				this.result = barcodeData;
				if(this.result.text != null || this.result.text != undefined || this.result.text != ''){ 
					this.moveVideo(this.result.text);
				} else {
					this.navCtrl.pop();
				}
			}).catch(err => {
				alert('Error :'+err);
				this.navCtrl.pop();
			}); 
		} catch(error){
			alert(error);
			this.navCtrl.pop();
		} 
	}
}
