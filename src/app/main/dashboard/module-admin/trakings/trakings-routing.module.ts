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
import { ListPaymentsComponent } from './list-payments/list-payments.component'

const routes: Routes = [
  {
    path: 'takings/list-payments',
    component: ListPaymentsComponent,
    canActivate: [AuthGuard,AuthGuardGuard],
    data: { roles: ['3','6'] },
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
export class TrakingsRoutingModule { }
