import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { LanguageService } from '../../core/language.service';
import { RouterModule } from '@angular/router';
import { RouterService } from '../../core/router.service';
import { SharedmodulesModule } from '../../shared/sharedmodules.module';
import { ClientsComponent } from './clients.component';
import { ClientsService } from './clients.service';
import { AddClientModalComponent } from './modals/add-client/add-client.component';
import { EditClientModalComponent } from './modals/edit-client/edit-client.component';
import { ErpComponent } from './modals/erp/erp.component';
import { ErpService } from './modals/erp/erp-service.service';
import { AddErpComponent } from './modals/erp/add-erp/add-erp.component';
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    SharedmodulesModule,
    CommonModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    RouterModule.forChild([
      {
        path: 'kunder',
        component: ClientsComponent,
        canActivate: [RouterService]
      }
    ])
  ],
  declarations: [
    ClientsComponent,
    AddClientModalComponent,
    EditClientModalComponent,
    ErpComponent,
    AddErpComponent
  ],
  providers: [
    LanguageService,
    RouterService,
    ClientsService,
    ErpService
  ]
})
export class ClientsModule { }
