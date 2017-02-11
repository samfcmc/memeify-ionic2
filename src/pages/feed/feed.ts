import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';

import {MemeClient} from '../../api/client';
import {MemePage} from '../meme/meme';

@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [MemeClient]
})
export class FeedPage {

  private memes: Array<any>;
  private client: MemeClient;
  private currentPage = 0;
  private modalController: ModalController;

  constructor(public navCtrl: NavController, client: MemeClient, modalController: ModalController) {
    this.client = client;
    this.memes = [];
    this.modalController = modalController;
  }

  ngAfterViewInit() {
    this.loadMemes(0);
  }

  /**
   * Refresh the memes collection.
   * Used by pull to refresh
   */
  refresh(refresher) {
    this.loadMemes(0, () => refresher.complete());
  }

  loadMemes(page? : number, callback?: () => void) {
    this.client.getNew(page).then((response) => {
      if(response.success) {
        var memes = response.result;
        for(var i = 0; i < memes.length; i++) {
          var meme = memes[i];
          this.memes.push(meme);
        }
        this.currentPage = page;
      }
      if(callback) {
        callback();
      }
    });
  }

  /**
   * Loads the next page of memes
   * Used by infinite scroll
   */
  loadMore(infiniteScroll) {
    var nextPage = this.currentPage + 1;
    this.loadMemes(nextPage, () => infiniteScroll.complete());
  }

  memeClicked(meme) {
    let modal = this.modalController.create(MemePage, meme);
    modal.present();
  }

}
