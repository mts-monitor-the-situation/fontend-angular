import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobeComponent } from './containers/globe/globe';


@NgModule({
  declarations: [GlobeComponent],
  imports: [CommonModule],
  exports: [GlobeComponent],
})
export class GlobeModule {}
