import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { MessageBoxComponent } from '../dialogs/message-box/message-box.component';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { DeviceService } from 'src/app/services/deviceService/device.service';
import { Device } from 'src/app/models/device';
import { AddDeviceDialogComponent } from '../dialogs/add-device-dialog/add-device-dialog/add-device-dialog.component';
import { ConfirmBoxComponent } from '../dialogs/confirm-box/confirm-box.component';
import { UpdateDeviceDialogComponent } from '../dialogs/update-device-dialog/update-device-dialog/update-device-dialog.component';

@Component({
  selector: 'app-device-table',
  templateUrl: './device-table.component.html',
  styleUrls: ['./device-table.component.scss'],
})
export class DeviceTableComponent implements OnInit {
  public displayedColumns: string[] = [
    'name',
    'type',
    'manufacturer',
    'place',
    'isOn',
  ];

  devices: Device[] = [];
  dataSource = new MatTableDataSource(this.devices);

  constructor(
    public authService: AuthenticationService,
    private deviceService: DeviceService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getDevices();

    if (this.authService.isLoggedIn) {
      this.displayedColumns.push('actions');
    }
  }

  public getDevices(): void {
    this.deviceService
      .getDevices()
      .then((devices) => {
        this.dataSource = new MatTableDataSource(devices);
      })
      .catch((err) => {
        this.dialog.open(MessageBoxComponent, {
          data: { message: err },
        });
      });
  }

  private isValidDevice(device: Device): Boolean {
    return !(device.isOn == null || device.name == '' || device.manufacturer == '' || device.place == '' || device.type == '')
  }

  onAddDevice(): void {
    const dialogRef = this.dialog.open(AddDeviceDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (!this.isValidDevice(result)) {
        return;
      }

      this.deviceService.addDevice(result)
      .then((device) => {
        this.getDevices();
      })
      .catch((err) => {
        this.dialog.open(MessageBoxComponent, {
          data: { message: err },
        });
      });
    });
  }

  onDeleteDevice(deviceName: string): void {
    const dialogRef = this.dialog.open(ConfirmBoxComponent, {
      data: {
        message: `Are you sure you want to delete '${deviceName}'?`,
      },
    });

    dialogRef.afterClosed().subscribe((response) => {
      if (!response) {
        return;
      }

      this.deviceService.deleteDevice(deviceName)
      .then((device) => {
        this.getDevices();
      }).catch((err) => {
        this.dialog.open(MessageBoxComponent, {
          data: { message: err },
        });
      });
    });
  }

  onUpdateDevice(device: Device): void {
    const dialogRef = this.dialog.open(UpdateDeviceDialogComponent, {
      data: { device: device },
    });

    dialogRef.afterClosed().subscribe(async (result) => {
      if (!this.isValidDevice(result)) {
        return;
      }

      this.deviceService.updateDevice(result)
      .then(() => {
        this.getDevices();
      })
      .catch((err) => {
        this.dialog.open(MessageBoxComponent, {
          data: { message: err },
        });
      });
    });
  }

  onToggleDevice(device: Device): void {
    this.deviceService.toggleDevice(device)
    .then(() => {
      device.isOn = !device.isOn;
    })
    .catch((err) => {
      this.dialog.open(MessageBoxComponent, {
        data: { message: err },
      });
    });
  }
}
