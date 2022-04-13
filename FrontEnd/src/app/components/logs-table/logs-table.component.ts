import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Log } from 'src/app/models/log';
import { LogService } from 'src/app/services/logService/log.service';
import { MessageBoxComponent } from '../dialogs/message-box/message-box.component';

@Component({
  selector: 'app-logs-table',
  templateUrl: './logs-table.component.html',
  styleUrls: ['./logs-table.component.scss'],
})
export class LogsTableComponent implements OnInit {
  public displayedColumns: string[] = ['time', 'text', 'ip'];

  logs: Log[] = [];
  dataSource = new MatTableDataSource(this.logs);
  constructor(private logService: LogService, public dialog: MatDialog, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.getLogs();
  }

  public getLogs(): void {
    this.logService
      .getLogs()
      .then((logs) => {
        let sortedLogs = logs.sort((a: Log, b: Log) => {
          return +new Date(b.time).getTime() - +new Date(a.time).getTime();
        });
        
        this.dataSource = new MatTableDataSource(sortedLogs);
      })
      .catch((err) => {
        this.dialog.open(MessageBoxComponent, {
          data: { message: err },
        });
      });
  }

  public getFormattedDate(date: string): string {
    if (!date) {
      return '';
    }

    return this.datePipe.transform(date, 'medium')!;
  }
}
