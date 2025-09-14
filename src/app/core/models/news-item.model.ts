export interface NewsItem {
  id: string;
  title: string;
  source: string;
  publishedAt: string;
  excerpt?: string;
  url: string;
  latitude: number;
  longitude: number;
}
