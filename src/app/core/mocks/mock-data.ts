import { Coordinate } from '../models/coordinate.model';
import { NewsItem } from '../models/news-item.model';

export const DEMO_COORDS: Coordinate[] = [
  { latitude: 40.7128,  longitude: -74.0060,  weight: 70 },  // New York
  { latitude: 34.0522,  longitude: -118.2437, weight: 45 },  // Los Angeles
  { latitude: 37.7749,  longitude: -122.4194, weight: 30 },  // San Francisco
  { latitude: 51.5074,  longitude: -0.1278,   weight: 65 },  // London
  { latitude: 48.8566,  longitude: 2.3522,    weight: 35 },  // Paris
  { latitude: 52.52,    longitude: 13.405,    weight: 28 },  // Berlin
  { latitude: 35.6762,  longitude: 139.6503,  weight: 80 },  // Tokyo
  { latitude: 31.2304,  longitude: 121.4737,  weight: 55 },  // Shanghai
  { latitude: 28.6139,  longitude: 77.2090,   weight: 75 },  // Delhi
  { latitude: -33.8688, longitude: 151.2093,  weight: 25 },  // Sydney
  { latitude: -23.5505, longitude: -46.6333,  weight: 40 },  // São Paulo
  { latitude: 30.0444,  longitude: 31.2357,   weight: 22 },  // Cairo
  { latitude: -26.2041, longitude: 28.0473,   weight: 18 },  // Johannesburg
  { latitude: 55.7558,  longitude: 37.6173,   weight: 32 },  // Moscow
  { latitude: 19.4326,  longitude: -99.1332,  weight: 36 },  // Mexico City
];

export const DEMO_NEWS: NewsItem[] = [
  {
    id: 'nyc-1',
    title: 'New initiatives announced in NYC',
    source: 'DemoWire',
    publishedAt: new Date().toISOString(),
    url: '#',
    latitude: 40.7128, longitude: -74.0060,
    excerpt: 'City officials unveiled programs aimed at boosting local innovation hubs.'
  },
  {
    id: 'la-1',
    title: 'Film festival draws record crowds in Los Angeles',
    source: 'DemoWire',
    publishedAt: new Date().toISOString(),
    url: '#',
    latitude: 34.0522, longitude: -118.2437,
    excerpt: 'Industry leaders and fans gathered for premieres and panels downtown.'
  },
  {
    id: 'sf-1',
    title: 'Startup ecosystem heats up in San Francisco',
    source: 'DemoWire',
    publishedAt: new Date().toISOString(),
    url: '#',
    latitude: 37.7749, longitude: -122.4194,
    excerpt: 'A wave of funding rounds signals renewed optimism for early-stage tech.'
  },
  {
    id: 'ldn-1',
    title: 'London transit upgrades enter final phase',
    source: 'DemoWire',
    publishedAt: new Date().toISOString(),
    url: '#',
    latitude: 51.5074, longitude: -0.1278,
    excerpt: 'Authorities say improvements will reduce congestion across central corridors.'
  },
  {
    id: 'par-1',
    title: 'Paris hosts international climate forum',
    source: 'DemoWire',
    publishedAt: new Date().toISOString(),
    url: '#',
    latitude: 48.8566, longitude: 2.3522,
    excerpt: 'Delegates outlined targets for green infrastructure and clean energy.'
  },
  {
    id: 'ber-1',
    title: 'Berlin tech conference spotlights AI safety',
    source: 'DemoWire',
    publishedAt: new Date().toISOString(),
    url: '#',
    latitude: 52.52, longitude: 13.405,
    excerpt: 'Researchers shared new frameworks for evaluating model risk.'
  },
  {
    id: 'tky-1',
    title: 'Tokyo unveils smart-city pilot districts',
    source: 'DemoWire',
    publishedAt: new Date().toISOString(),
    url: '#',
    latitude: 35.6762, longitude: 139.6503,
    excerpt: 'IoT sensors and 5G backbones will power traffic and energy optimization.'
  },
  {
    id: 'sha-1',
    title: 'Shanghai logistics hub expands capacity',
    source: 'DemoWire',
    publishedAt: new Date().toISOString(),
    url: '#',
    latitude: 31.2304, longitude: 121.4737,
    excerpt: 'New terminals aim to cut shipping times across the region.'
  },
  {
    id: 'del-1',
    title: 'Delhi launches monsoon preparedness drive',
    source: 'DemoWire',
    publishedAt: new Date().toISOString(),
    url: '#',
    latitude: 28.6139, longitude: 77.2090,
    excerpt: 'Emergency teams to focus on drainage and early-warning systems.'
  },
  {
    id: 'syd-1',
    title: 'Sydney tech meet-up highlights climate tech',
    source: 'DemoWire',
    publishedAt: new Date().toISOString(),
    url: '#',
    latitude: -33.8688, longitude: 151.2093,
    excerpt: 'Founders showcased tools for monitoring emissions and grid efficiency.'
  },
  {
    id: 'sao-1',
    title: 'São Paulo entrepreneurs eye regional expansion',
    source: 'DemoWire',
    publishedAt: new Date().toISOString(),
    url: '#',
    latitude: -23.5505, longitude: -46.6333,
    excerpt: 'Consumer platforms report strong demand in neighboring markets.'
  },
  {
    id: 'cai-1',
    title: 'Cairo announces cultural heritage projects',
    source: 'DemoWire',
    publishedAt: new Date().toISOString(),
    url: '#',
    latitude: 30.0444, longitude: 31.2357,
    excerpt: 'Restoration efforts to include museums and historic districts.'
  },
  {
    id: 'jnb-1',
    title: 'Johannesburg fintech accelerators open applications',
    source: 'DemoWire',
    publishedAt: new Date().toISOString(),
    url: '#',
    latitude: -26.2041, longitude: 28.0473,
    excerpt: 'Programs target payments, lending, and financial inclusion.'
  },
  {
    id: 'msk-1',
    title: 'Moscow hosts robotics showcase',
    source: 'DemoWire',
    publishedAt: new Date().toISOString(),
    url: '#',
    latitude: 55.7558, longitude: 37.6173,
    excerpt: 'Autonomous systems demonstrated new capabilities in warehouses.'
  },
  {
    id: 'mex-1',
    title: 'Mexico City urban mobility pilot expands',
    source: 'DemoWire',
    publishedAt: new Date().toISOString(),
    url: '#',
    latitude: 19.4326, longitude: -99.1332,
    excerpt: 'Micromobility lanes and sensors added to reduce commute times.'
  }
];
