import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditorComponent } from './editor/editor.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: EditorComponent },
  { path: 'site-as-url', redirectTo: '' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
