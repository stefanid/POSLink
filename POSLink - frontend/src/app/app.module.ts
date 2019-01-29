import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { SharedmodulesModule } from './shared/sharedmodules.module';
import { CoremodulesModule } from './core/coremodules.module';
import { NavComponent } from './shared/nav/nav.component';
import { ClientsComponent } from './modules/clients/clients.component';
import { ClientsModule } from './modules/clients/clients.module';
import { TerminalsComponent } from './modules/terminals/terminals.component';
import { TerminalsModule } from './modules/terminals/terminals.module';
import { RouterService } from './core/router.service';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent
  ],
  imports: [
    BrowserModule,
    ClientsModule,
    TerminalsModule,
    ClientsModule,
    HttpModule,
    SharedmodulesModule,
    HttpClientModule,
    CoremodulesModule,
    TranslateModule.forRoot({
      loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
      }
  }),
  AppRoutingModule
  ],
  providers: [RouterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
