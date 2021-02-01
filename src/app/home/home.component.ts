import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent, ConfirmDialogModel } from '../shared/confirm-dialog/confirm-dialog.component';
import { NotificationService } from '../shared/messages/notification.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public dialog: MatDialog,
              private notificationService: NotificationService) { }

  ngOnInit(): void {
    // this.testDialogRef();
  }

  testDialogRef() {
    const title = "Titulo do dialogo";
    const message = "Mensagem do dialogo";
    
    const dialogData = new ConfirmDialogModel(title, message);
    
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: '400px',
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult !== undefined){
        if(dialogResult) {
          this.notificationService.notify("Operacação confirmada");
        } else {
          this.notificationService.notify("Operacação cancelada");
        }
      }
    });
  }

}
