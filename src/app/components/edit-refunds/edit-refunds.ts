import { Component, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Members } from '../../services/members';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Savings } from '../../services/savings';
import { EditSavings } from '../edit-savings/edit-savings';
import { Refunds } from '../../services/refunds';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-edit-refunds',
  imports: [CommonModule, MatDialogModule, MatSelectModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './edit-refunds.html',
  styleUrl: './edit-refunds.scss'
})
export class EditRefunds {
 form: any;
  doc: any;
  formData: any;
  servererror: boolean = false;
  member: any[] = [];
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditSavings>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    public serv: Refunds, private members: Members){
      console.log(data);
      members.getAll().subscribe(el => this.member = el);
    if (data.action === 'edit' && data.data) {
        this.doc = { ...data.data };
    }else{
      this.doc = {};
    }

    this.form = this.fb.group({
      name: [this.data.name, Validators.required],
      amount: [this.data.amount, Validators.required],
      date: [this.data.date, Validators.required],
      status: [this.data.status, Validators.required]
    });
    
    this.doc = {};
    this.doc = this.data.data? this.data.data: {};
    console.log("edit item", this.data.data);
    
  }

  edit(item: any) {
    
    if (this.form.valid) {
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
