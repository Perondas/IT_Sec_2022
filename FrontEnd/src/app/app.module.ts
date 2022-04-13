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
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { ShowQrCodeDialogComponent } from './components/dialogs/show-qr-code-dialog/show-qr-code-dialog.component';
import { QRCodeModule } from 'angularx-qrcode';
import { MatSortModule } from '@angular/material/sort';
import { AboutDialogComponent } from './components/dialogs/about-dialog/about-dialog.component';
import { MessageBoxComponent } from './components/dialogs/message-box/message-box.component';
import { ConfirmBoxComponent } from './components/dialogs/confirm-box/confirm-box.component';
import { LicensesComponent } from './components/licenses/licenses.component';
import { DeviceTableComponent } from './components/device-table/device-table.component';
import { AddDeviceDialogComponent } from './components/dialogs/add-device-dialog/add-device-dialog/add-device-dialog.component';
import { HomeComponent } from './components/home/home.component';
import { UpdateDeviceDialogComponent } from './components/dialogs/update-device-dialog/update-device-dialog/update-device-dialog.component';
import { LogsTableComponent } from './components/logs-table/logs-table.component';
import { DatePipe } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    LoginComponent,
    RegistrationComponent,
    ShowQrCodeDialogComponent,
    AboutDialogComponent,
    MessageBoxComponent,
    ConfirmBoxComponent,
    LicensesComponent,
    DeviceTableComponent,
    AddDeviceDialogComponent,
    HomeComponent,
    UpdateDeviceDialogComponent,
    LogsTableComponent,
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
    MatSlideToggleModule,
    ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
