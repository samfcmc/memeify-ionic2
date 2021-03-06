import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { FeedPage } from '../pages/feed/feed';
import {TabsPage} from '../pages/tabs/tabs';
import {MemePage} from '../pages/meme/meme';
import {CreatePage} from '../pages/create/create';

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    FeedPage,
    MemePage,
    CreatePage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    FeedPage,
    MemePage,
    CreatePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
