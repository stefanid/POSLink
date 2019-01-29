import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LanguageService } from './language.service';
import { AuthService } from './auth.service';
import { TokenInterceptor } from './token.interceptor';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxTypeaheadModule } from 'ngx-typeahead';
import { RouterService } from './router.service';
import { UserService } from './user.service';


// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  imports: [
    CommonModule,
    NgxTypeaheadModule
  ],
  providers: [
    LanguageService,
    AuthService,
    UserService,
    RouterService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  declarations: []
})
export class CoremodulesModule { }
