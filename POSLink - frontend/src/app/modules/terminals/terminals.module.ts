import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileDetailsModalComponent } from './modals/file-details/file-details.component';
import { SharedmodulesModule } from '../../shared/sharedmodules.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { RouterModule } from '@angular/router';
import { TerminalsComponent } from './terminals.component';
import { LanguageService } from '../../core/language.service';
import { RouterService } from '../../core/router.service';
import { TerminalsService } from './terminals.service';
import { FileService } from './file-service.service';
import { HttpClient } from '@angular/common/http';
import { AddTerminalModalComponent } from './modals/add-terminal/add-terminal.component';
import { ReactiveFormsModule } from '@angular/forms';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
@NgModule({
  imports: [
    ReactiveFormsModule,
    SharedmodulesModule,
    CommonModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    RouterModule.forChild([
      {
        path: 'terminal',
        component: TerminalsComponent,
        canActivate: [RouterService]
      }
    ])
  ],
  declarations: [
    TerminalsComponent,
    FileDetailsModalComponent,
    AddTerminalModalComponent
  ],
  providers: [
    LanguageService,
    RouterService,
    TerminalsService,
    FileService
  ]
})
export class TerminalsModule { }
