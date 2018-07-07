import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditorComponent } from './editor/editor.component';

const routes: Routes = [
  { path: '', redirectTo: 'site-as-url', pathMatch: 'full' },
  { path: 'site-as-url', component: EditorComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
