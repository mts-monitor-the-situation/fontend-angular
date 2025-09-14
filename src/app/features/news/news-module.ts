import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsFeed } from './containers/news-feed/news-feed';



@NgModule({
  declarations: [
    NewsFeed
  ],
  imports: [
    CommonModule
  ],
  exports: [
    NewsFeed
  ]
})
export class NewsModule { }
