import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Group } from '../../../models/interfaces';
import { Groups } from '../../services/groups';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-edit-group',
  imports: [CommonModule, MatSelectModule, MatDialogModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './edit-group.html',
  styleUrl: './edit-group.scss'
})
export class EditGroup {
  form: any;
  doc: any;
  formData: any;
  servererror: boolean = false;
  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditGroup>,
    @Inject(MAT_DIALOG_DATA) public data: any, public serv: Groups){
    if (data.action === 'edit' && data.data) {
        this.doc = { ...data.data };
    }else{
      this.doc = {};
    }

    this.form = this.fb.group({
      name: [this.data.name, Validators.required],
      sold: [this.data.sold, Validators.required],
      late: [this.data.late, Validators.required],
      absence: [this.data.absence, Validators.required],
      meet: [this.data.meet, Validators.required],
      location: [this.data.location, Validators.required],
      status: [this.data.status, Validators.required]
    });
    
    this.doc = {};
    this.doc = this.data.data? this.data.data: {};
    console.log("edit item", this.data.data);
    
  }

  edit(item: any) {
    
    if (this.form.valid) {
    console.log(item);

      this.serv.update(item.id, item).subscribe((el: any) => {
        this.dialogRef.close(el); // renvoie les données modifiées
      })
    }else{
      this.servererror = true;
    }
  }

  add(item: any) {    
    if (this.form.valid) {
      this.serv.create(item).subscribe((el: any) => {
        this.dialogRef.close(el); // renvoie les données modifiées
      })
    }else{
      this.servererror = true;
    }
  }

}
