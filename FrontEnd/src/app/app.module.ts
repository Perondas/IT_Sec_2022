import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { LoginComponent } from './components/login/login.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { HttpClientModule } from '@angular/common/http';
import { RegistrationComponent } from './components/registration/registration.component';
import { AdminDataViewComponent } from './components/admin-data-view/admin-data-view.component';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { CreateUserDialogComponent } from './components/dialogs/create-user-dialog/create-user-dialog.component';
import { ShowQrCodeDialogComponent } from './components/dialogs/show-qr-code-dialog/show-qr-code-dialog.component';
import { QRCodeModule } from 'angularx-qrcode';
import { UpdateUserDialogComponent } from './components/dialogs/update-user-dialog/update-user-dialog.component';
import { UpdateAdminDialogComponent } from './components/dialogs/update-admin-dialog/update-admin-dialog.component';
import { AdminPassChangeDialogComponent } from './components/dialogs/admin-pass-change-dialog/admin-pass-change-dialog.component';
import { AdminDetailsComponent } from './components/admin-details/admin-details.component';
import { MatSortModule } from '@angular/material/sort';
import { AboutDialogComponent } from './components/dialogs/about-dialog/about-dialog.component';
import { CheckInOutComponent } from './components/check-in-out/check-in-out.component';
import { MessageBoxComponent } from './components/dialogs/message-box/message-box.component';
import { ConfirmBoxComponent } from './components/dialogs/confirm-box/confirm-box.component';
import { LicensesComponent } from './components/licenses/licenses.component';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoginComponent,
    RegistrationComponent,
    AdminDataViewComponent,
    CreateUserDialogComponent,
    ShowQrCodeDialogComponent,
    UpdateUserDialogComponent,
    UpdateAdminDialogComponent,
    AdminPassChangeDialogComponent,
    AdminDetailsComponent,
    AboutDialogComponent,
    CheckInOutComponent,
    MessageBoxComponent,
    ConfirmBoxComponent,
    LicensesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatExpansionModule,
    HttpClientModule,
    MatTableModule,
    MatDialogModule,
    QRCodeModule,
    MatSortModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
