import { Component, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Document } from '../../services/document';
import { Doc } from '../../../models/interfaces';

@Component({
  selector: 'app-delete',
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './delete.html',
  styleUrl: './delete.scss'
})
export class Delete {
form: any;
doc: any;

constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<Delete>,
    @Inject(MAT_DIALOG_DATA) public data: any, public serv: Document){
console.log(data);
      this.doc = data.data;

}
delete(item: any) {
  console.log("item", item);
  
  this.serv.delete(item.id).subscribe((el: any) => {
      this.dialogRef.close(el); // renvoie les données modifiées
  })
}
}

