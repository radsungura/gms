import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Members } from '../../services/members';
import { Groups } from '../../services/groups';
import { MatSelectModule } from '@angular/material/select';
import { EmExpenses } from '../../services/em-expenses';

@Component({
  selector: 'app-edit-expenses',
  imports: [CommonModule, MatDialogModule, MatSelectModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './edit-expenses.html',
  styleUrl: './edit-expenses.scss'
})
export class EditExpenses {
  form: any;
  doc: any;
  formData: any;
  servererror: boolean = false;
  member: any[] = [];
  motif = ["CommerceC", "CommerceN", "Agriculture", "Voyage", "Probleme Familiale", "Autres" ]
  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<EditExpenses>,
    @Inject(MAT_DIALOG_DATA) public data: any, public serv: EmExpenses, private members: Members, private groups: Groups){
      members.getAll().subscribe(el => this.member = el)
    if (data.action === 'edit' && data.data) {
        this.doc = { ...data.data };
    }else{
      this.doc = {};
    }

    this.form = this.fb.group({
    name: [this.data.name, Validators.required],
    amount: [this.data.amount, Validators.required],
    date: [this.data.date, Validators.required],
    motif: [this.data.motif, Validators.required],
    status: [this.data.status, Validators.required]
    });
    
    this.doc = {};
    this.doc = this.data.data? this.data.data: {};
    // console.log("edit item", this.data);
    
  }

  edit(item: any) {
    
    if (this.form.valid) {
    // console.log(item);

          this.serv.update(item.id, item).subscribe((el: any) => {
            this.dialogRef.close(el); // renvoie les données modifiées
          })
    }else{
      this.servererror = true;
    }
  }

  add(item: any) {    
     let owner: any = {};
    let group: any = {};
    if (this.form.valid) {
      this.members.getAll().subscribe(mdata => {
        owner = mdata.find(m => m.name == item.name);
        this.groups.getAll().subscribe(el => {
          group = el.find(g => g.name == owner.group) || {};
          group.sold -= item.amount;
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
