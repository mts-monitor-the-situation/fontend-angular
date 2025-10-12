import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from './components/navbar/navbar';
import { Sidebar } from './components/sidebar/sidebar';
import { LayoutShell } from './components/layout-shell/layout-shell';
import { NewsModule } from '../features/news/news-module';
import { GlobeModule } from '../features/globe/globe-module';



@NgModule({
  declarations: [
    Navbar,
    Sidebar,
    LayoutShell
  ],
  imports: [
    CommonModule,
    NewsModule,
    GlobeModule
  ]
})
export class LayoutModule { }
