import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrationComponent } from './components/registration/registration.component';
import { LicensesComponent } from './components/licenses/licenses.component';
import { DeviceTableComponent } from './components/device-table/device-table.component';
import { HomeComponent } from './components/home/home.component';
import { LogsTableComponent } from './components/logs-table/logs-table.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegistrationComponent },
  { path: 'licenses', component: LicensesComponent },
  { path: '', component: HomeComponent },
  { path: 'devices', component: DeviceTableComponent },
  { path: 'logs', component: LogsTableComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
