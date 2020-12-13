import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


 export const routes: Routes = [
  { path: '', loadChildren: () => import('../app/app-layout/app-layout.module').then(m => m.AppLayoutModule) },
  { path: '', redirectTo: '', pathMatch:'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
