import { Component, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Members } from '../../services/members';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { Groups } from '../../services/groups';

@Component({
  selector: 'app-edit-members',
  imports: [CommonModule, MatDialogModule, MatSelectModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './edit-members.html',
  styleUrl: './edit-members.scss'
})
export class EditMembers {
  form: any;
  doc: any;
  formData: any;
  servererror: boolean = false;
  groups: any[] = [];
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditMembers>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    public serv: Members, private group: Groups){
      console.log(data);
       group.getAll().subscribe(el => this.groups = el);
    if (data.action === 'edit' && data.data) {
        this.doc = { ...data.data };
    }else{
      this.doc = {};
    }

    this.form = this.fb.group({
      name: [this.data.name, Validators.required],
      cni: [this.data.cni, Validators.required],
      email: [this.data.email, Validators.required],
      tel: [this.data.tel, Validators.required],
      gender: [this.data.gender, Validators.required],
      age: [this.data.age, Validators.required],
      famSize: [this.data.famSize, Validators.required],
      handcap: [this.data.handcap, Validators.required],
      group: [this.data.group, Validators.required],
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
