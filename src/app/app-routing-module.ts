import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutShell } from './layout/components/layout-shell/layout-shell';

const routes: Routes = [
  { path: '', component: LayoutShell },
  { path: '**', redirectTo: '' }
];
@NgModule({ imports: [RouterModule.forRoot(routes)], exports: [RouterModule] })
export class AppRoutingModule {}
