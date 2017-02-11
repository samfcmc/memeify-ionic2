import {Component} from '@angular/core';
import {ViewController, NavParams} from 'ionic-angular';
import {SocialSharing} from 'ionic-native';

/**
 * Page to show a given Meme
 */

@Component({
	selector: 'page-meme',
	templateUrl: 'meme.html'
})
export class MemePage {
	private viewController: ViewController;
	private meme;

	constructor(viewController: ViewController, navParams: NavParams) {
		this.viewController = viewController;
		this.meme = navParams.data;
	}

	title() {
		return this.meme.text0 ? this.meme.text0 : this.meme.text1;
	}

	dismiss() {
		this.viewController.dismiss();
	}

	share() {
		var message = this.meme.text0;
		var subject = this.meme.text1;
		var url = this.meme.instanceUrl;
		SocialSharing.share(message, subject, null, url);
	}
}