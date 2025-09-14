import { Component, OnDestroy, OnInit } from '@angular/core';
import { NewsItem } from '../../../../core/models/news-item.model';
import { Subscription } from 'rxjs';
import { NewsService } from '../../services/news/news';

@Component({
  selector: 'app-news-feed',
  standalone: false,
  templateUrl: './news-feed.html',
  styleUrl: './news-feed.scss'
})
export class NewsFeed implements OnInit, OnDestroy {
  items: NewsItem[] = [];
  private sub?: Subscription;

  constructor(private news: NewsService) {}

  ngOnInit(): void {
    this.sub = this.news.streamSelectedNews().subscribe(items => this.items = items);
  }
  ngOnDestroy(): void { this.sub?.unsubscribe(); }
}
