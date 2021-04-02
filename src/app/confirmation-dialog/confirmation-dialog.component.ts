import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent implements OnInit {
  title1: string;
  title2: string;
  confirmButtonText: string;
  cancelButtonText: string;
  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
    private dialogRef: MatDialogRef<ConfirmationDialogComponent>) {

    this.title1 = data.title1;
    this.title2 = data.title2;
    this.confirmButtonText = data.buttonText.ok;
    this.cancelButtonText = data.buttonText.cancel;

  }

  ngOnInit(): void {
  }

}
