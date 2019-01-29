import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StyleOverviewComponent } from './style-overview/style-overview.component';
import { LoginModule } from './login/login.module';
import { AlertComponent } from './alert/alert.component';
import { TopbarComponent } from './topbar/topbar.component';
import { FormExampleComponent } from './form-example/form-example.component';
import { ModalComponent} from './modal-window/modal.component';
import { AlertService } from './alert/alert.service';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxTypeaheadModule } from 'ngx-typeahead';
import { Notfound404Component } from './notfound404/notfound404.component';
import { ConfirmActionComponent } from './confirm-action-alert/confirm-action.component';
import { RegisterComponent } from './register/register.component';
import { RegisterModule } from './register/register.module';
import { ClientPasswordComponent } from './client-password/client-password.component';
import { ClientPasswordModule } from './client-password/client-password.module';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    CommonModule,
    LoginModule,
    RegisterModule,
    FormsModule,
    ClientPasswordModule,
    ReactiveFormsModule,
    NgxTypeaheadModule,
    RouterModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
    })
  ],
  exports: [
    StyleOverviewComponent,
    AlertComponent,
    TopbarComponent,
    FormExampleComponent,
    ModalComponent,
    LoginModule,
    ClientPasswordModule,
    RegisterModule,
    ConfirmActionComponent,
  ],
  declarations: [
    ModalComponent,
    StyleOverviewComponent,
    AlertComponent,
    TopbarComponent,
    FormExampleComponent,
    Notfound404Component,
    ConfirmActionComponent
  ],
  providers: [
    AlertService
  ],
})
export class SharedmodulesModule { }
