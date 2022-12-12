import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {DatePipe} from '@angular/common';

import 'hammerjs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { TranslateModule } from '@ngx-translate/core';
import { ToastrModule } from 'ngx-toastr'; // For auth after login toast

import { CoreModule } from '@core/core.module';
import { CoreCommonModule } from '@core/common.module';
import { CoreSidebarModule, CoreThemeCustomizerModule } from '@core/components';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';


import { coreConfig } from 'app/app-config';
import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { DashboardModule } from 'app/main/dashboard/dashboard.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


// Subir Archivos
import { AngularFileUploaderModule } from "angular-file-uploader";
import { HashLocationStrategy, JsonPipe, LocationStrategy } from '@angular/common';
import { AuthGuardGuard } from '@core/services/seguridad/auth-guard.guard';
import { AuthInterceptorService } from '@core/services/seguridad/auth-interceptor.service';
import { AuthLoginV2Component } from './main/pages/authentication/auth-login-v2/auth-login-v2.component';
import { ErrorInterceptor, JwtInterceptor } from './auth/helpers';
import { CardSnippetModule } from '@core/components/card-snippet/card-snippet.module';
import { ContentHeaderModule } from './layout/components/content-header/content-header.module';
import { BlockUIModule } from 'ng-block-ui';
import { ChartsModule } from 'ng2-charts';
import { AuthAdminComponent } from './main/pages/authentication/auth-admin/auth-admin.component';
import { PriceTableComponent } from './main/dashboard/postage/price-table/price-table.component';
import { StatementOfPartiesComponent } from './main/dashboard/postage/statement-of-parties/statement-of-parties.component';
import { SubcontractorComponent } from './main/dashboard/business/subcontractor/subcontractor.component';
//  subir Archivos



const appRoutes: Routes = [
  {
    path: '',
    loadChildren: () => import('./main/pages/pages.module').then(m => m.PagesModule),
  },
  {
    path: '**',
    redirectTo: '/miscellaneous/error' //Error 404 - Page not found
  }
];

@NgModule({
  declarations: [
    AppComponent,
    AuthAdminComponent,
    PriceTableComponent,
    StatementOfPartiesComponent,
                          ],
  imports: [
    BrowserModule,
    NgxDatatableModule,
    ChartsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes, {
      scrollPositionRestoration: 'enabled', // Add options right here
      relativeLinkResolution: 'legacy',
      useHash: true
    }),
    TranslateModule.forRoot(),
    BlockUIModule.forRoot(),
    //NgBootstrap
    NgbModule,
    ToastrModule.forRoot({}),

    // Core modules
    CoreModule.forRoot(coreConfig),
    CoreCommonModule,
    CoreSidebarModule,
    AngularFileUploaderModule,
    CoreThemeCustomizerModule,
    
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,

    // App modules
    LayoutModule,
    DashboardModule,
    // PagesModule
  ],
  providers: [
    {
      provide: [ LocationStrategy, AuthGuardGuard,  JsonPipe],
      useClass: HashLocationStrategy
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
