import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './shared/login/login.component';
import { RouterService } from './core/router.service';
import { Notfound404Component } from './shared/notfound404/notfound404.component';
import { RegisterComponent } from './shared/register/register.component';
import { ClientsComponent } from './modules/clients/clients.component';
import { TerminalsComponent } from './modules/terminals/terminals.component';
import { ClientPasswordComponent } from './shared/client-password/client-password.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent

    // canActivate: [
    //   RouterService
    // ]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '404',
    component: Notfound404Component

  },
  {
    path: 'kunder',
    component: ClientsComponent,
    loadChildren: 'app/modules/clients/clients.module#ClientsModule'
  },
  {
    path: 'terminal',
    component: TerminalsComponent,
    loadChildren: 'app/modules/terminals/terminals.module#TerminalsModule'
  },
  {
    path: 'login',
    component: LoginComponent

  },
  {
    path: 'client-password-link/:token',
    component: ClientPasswordComponent
  },
  {
    path: '**',
    redirectTo: '/404'

    // canActivate: [
    //   RouterService
    // ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // error with forChild
  exports: [RouterModule],
  providers: [
    RouterService
  ]
})
export class AppRoutingModule { }
