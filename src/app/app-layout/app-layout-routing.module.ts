import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppLayoutComponent } from './app-layout/app-layout.component';


const routes: Routes = [
  {
    path: '', component: AppLayoutComponent, children: [
      { path: 'Welcome', loadChildren: () => import('../modules/user/user.module').then(m => m.UserModule) },
      { path: 'Login', loadChildren: () => import('../modules/customer/customer.module').then(m => m.CustomerModule) },
      { path: 'Selection', loadChildren: () => import('../modules/client/client.module').then(m => m.ClientModule)},
      { path: '', redirectTo: 'Welcome', pathMatch: 'full' }
    ]
  }   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppLayoutRoutingModule { }
