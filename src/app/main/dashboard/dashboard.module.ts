import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DatePipe} from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CoreCommonModule } from '@core/common.module';
import { ContentHeaderModule } from 'app/layout/components/content-header/content-header.module';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { MiscellaneousModule } from '../pages/miscellaneous/miscellaneous.module';

import { BlockUIModule } from 'ng-block-ui';

import { DashboardComponent } from './principal/dashboard.component';
import { OppComponent } from './business/opp/opp.component';
import { SubcontractorComponent } from './business/subcontractor/subcontractor.component';

import { PaymentsListComponent } from './payments/payments-list/payments-list.component';
import { PaymentsRoutingModule } from './payments/payments-routing.module';
import { PostagePerMonthComponent } from './postage/postage-per-month/postage-per-month.component';
import { PrivatePostalOperatorComponent } from './management/private-postal-operator/private-postal-operator.component';
import { ManagementRoutingModule } from './management/management-routing.module';
import { ReportsAdminComponent } from './admin-reports/reports-admin/reports-admin.component';



@NgModule({
    declarations: [
      DashboardComponent,
      OppComponent,
      SubcontractorComponent,
      PaymentsListComponent,
      PostagePerMonthComponent,
      PrivatePostalOperatorComponent,
      ReportsAdminComponent
    ],
  imports: [
    CommonModule,
    NgxDatatableModule,
    BlockUIModule,
    DashboardRoutingModule,
    PaymentsRoutingModule,
    ManagementRoutingModule,
    CommonModule,
    ContentHeaderModule,
    CoreCommonModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    MiscellaneousModule,
  ],
  exports: [],
  providers: [DatePipe]

})
export class DashboardModule {
 




 


}



