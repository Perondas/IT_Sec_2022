import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { AuthGuard } from './helpers/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { AdminDataViewComponent } from './components/admin-data-view/admin-data-view.component';
import { AdminDetailsComponent } from './components/admin-details/admin-details.component';
import { CheckInOutComponent } from './components/check-in-out/check-in-out.component';
import { LicensesComponent } from './components/licenses/licenses.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  {
    path: 'details',
    component: AdminDetailsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'check-in-out', component: CheckInOutComponent },
  { path: 'data', component: AdminDataViewComponent, canActivate: [AuthGuard] },
  { path: 'licenses', component: LicensesComponent },
  { path: '', component: CheckInOutComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
