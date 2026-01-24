import { Component, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Savings } from '../../services/savings';
import { Groups } from '../../services/groups';
import { Members } from '../../services/members';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-edit-savings',
  imports: [CommonModule, MatSelectModule, MatDialogModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './edit-savings.html',
  styleUrl: './edit-savings.scss'
})
export class EditSavings {
 form: any;
  doc: any;
  formData: any;
  servererror: boolean = false;
  member: any[] = [];
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditSavings>,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    public serv: Savings, private groups: Groups, private members: Members){
      // console.log(data);
      members.getAll().subscribe(m => this.member = m );
    if (data.action === 'edit' && data.data) {
        this.doc = { ...data.data };
    }else{
      this.doc = {};
    }

    this.form = this.fb.group({
      owner: [this.data.owner, Validators.required],
      amount: [this.data.amount, Validators.required],
      date: [this.data.date, Validators.required],
      term: [this.data.term, Validators.required],
      status: [this.data.status, Validators.required]
    });
    
    this.doc = {};
    this.doc = this.data.data? this.data.data: {};
    // console.log("edit item", this.data.data);
    
  }

  edit(item: any) { 
    if (this.form.valid) {
          this.serv.update(item.id, item).subscribe((el: any) => {
            this.dialogRef.close(el); // renvoie les données modifiées
          });
    }else{
      this.servererror = true;
    }
  }

  add(item: any) { 
    let owner: any = {};  
    let group: any = {};  
    if (this.form.valid) {
      this.members.getAll().subscribe(mdata => {
        owner = mdata.find(m => m.name == item.owner);
        this.groups.getAll().subscribe(el => {
          group = el.find(g => g.name == owner.group) || 0;
          group.sold += item.amount;
          this.groups.update(group.id, group).subscribe();
          this.serv.create(item).subscribe((el: any) => {
            this.dialogRef.close(el); // renvoie les données modifiées
          })
        });
      });
    }else{
      this.servererror = true;
    }
  }

}
