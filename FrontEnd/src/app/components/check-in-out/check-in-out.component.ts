import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CheckInOutService } from 'src/app/services/checkInOutService/check-in-out.service';
import { MessageBoxComponent } from '../dialogs/message-box/message-box.component';

@Component({
  selector: 'app-check-in-out',
  templateUrl: './check-in-out.component.html',
  styleUrls: ['./check-in-out.component.scss'],
})
export class CheckInOutComponent {
  inForm = this.formBuilder.group({
    uuid: ['', Validators.required],
  });

  outForm = this.formBuilder.group({
    logId: ['', Validators.required],
  });

  constructor(
    private inOutService: CheckInOutService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) {}

  get uuid() {
    const uuid = this.inForm.get('uuid');
    if (!uuid) {
      throw new Error('Cannot find member uuid');
    }
    return uuid;
  }

  get logId() {
    const logId = this.outForm.get('logId');
    if (!logId) {
      throw new Error('Cannot find member logId');
    }
    return logId;
  }

  private inIn = false;
  onIn() {
    if(this.inIn)
    {
      return;
    }
    this.inIn = true;
    const v = this.inForm.value;
    if (!v.uuid) {
      this.inIn = false;
      return;
    }

    this.inOutService
      .CheckIn(v.uuid)
      .then((log) => {
        this.dialog.open(MessageBoxComponent, {
          data: { message: `Your unique chek-in ID is: ${log.id}` },
        });
        this.inIn = false;
      })
      .catch((reason: Error) => {
        this.dialog.open(MessageBoxComponent, {
          data: {
            message: "A error occurred. Please try again later",
          },
        });
        this.inIn = false;
      });
  }

  private inOut = false;
  onOut() {
    if(this.inOut){
      return;
    }
    this.inOut = true;
    const v = this.outForm.value;
    if (!v.logId) {
      this.inOut = false;
      return;
    }

    this.inOutService
      .CheckOut(v.logId)
      .then((log) => {
        this.dialog.open(MessageBoxComponent, {
          data: { message: `Success!` },
        });
        this.inOut = false;
      })
      .catch((reason: Error) => {
        this.dialog.open(MessageBoxComponent, {
          data: {
            message: "A error occurred. Please try again later",
          },
        });
        this.inOut = false;
      });
  }
}
