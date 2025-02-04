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
import { SystemPullComponent } from './system-pull/system-pull.component'

const routes: Routes = [
  {
    path: 'update-system/system-pull',
    component: SystemPullComponent,
    canActivate: [AuthGuard,AuthGuardGuard],
    data: { roles: ['3','4'] },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpdateSystemRoutingModule { }
