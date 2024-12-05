import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-log',
  templateUrl: './confirm-log.component.html',
  styleUrls: ['./confirm-log.component.scss']
})
export class ConfirmLogComponent {
  constructor(public dialogRef: MatDialogRef<ConfirmLogComponent>) {}

  onNoClick(): void {
    this.dialogRef.close(false); // Cierra el modal y devuelve "false"
  }

  onYesClick(): void {
    this.dialogRef.close(true); // Cierra el modal y devuelve "true"
  }

}
