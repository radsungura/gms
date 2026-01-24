import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
@Component({
  selector: 'app-details',
  imports: [CommonModule, MatCardModule, MatButtonModule],
  templateUrl: './details.html',
  styleUrl: './details.scss'
})
export class Details {
  cat: any;
  constructor(public dialogRef: MatDialogRef<Details>, 
  @Inject(MAT_DIALOG_DATA) public data: any){
    this.cat = data.cat;
  }
}
