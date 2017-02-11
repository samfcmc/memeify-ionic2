import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import {MemeClient} from '../../api/client';

@Component({
  selector: 'page-feed',
  templateUrl: 'feed.html',
  providers: [MemeClient]
})
export class FeedPage {

  private memes: Array<any>;
  private client: MemeClient;
  private currentPage = 0;

  constructor(public navCtrl: NavController, client: MemeClient) {
    this.client = client;
    this.memes = [];
  }

  ngAfterViewInit() {
    this.loadMemes(0);
  }

  /**
   * Refresh the memes collection.
   * Used by pull to refresh
   */
  private refresh(refresher) {
    this.loadMemes(0, () => refresher.complete());
  }

  private loadMemes(page? : number, callback?: () => void) {
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
  private loadMore(infiniteScroll) {
    var nextPage = this.currentPage + 1;
    this.loadMemes(nextPage, () => infiniteScroll.complete());
  }

}
