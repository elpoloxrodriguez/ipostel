import { NgModule } from '@angular/core'
import { RouterModule, Routes } from '@angular/router'
import { CommonModule } from '@angular/common'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'
import { NgSelectModule } from '@ng-select/ng-select'
import { CoreCommonModule } from '@core/common.module'
import { TranslateModule } from '@ngx-translate/core'
import { AuthGuardGuard } from '@core/services/seguridad/auth-guard.guard';
import { AuthGuard } from 'app/auth/helpers';
import { Role } from 'app/auth/models';
import { ReportsAdminComponent } from './reports-admin/reports-admin.component';

const routes: Routes = [
    {
      path: 'admin-reports/admin-reports',
      component: ReportsAdminComponent,
      // canActivate:[AuthGuardGuard],
      canActivate: [AuthGuard,AuthGuardGuard],
      // data: { roles: ['3'] },
    },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    CoreCommonModule,
    NgbModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    TranslateModule,

  ],
  exports: [RouterModule]
})
export class AdminReportsRoutingModule { }
