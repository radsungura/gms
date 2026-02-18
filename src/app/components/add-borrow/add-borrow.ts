import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { Credits } from '../../services/credits';
import { Members } from '../../services/members';
import { Groups } from '../../services/groups';
import { MatSelectModule } from '@angular/material/select';
import { Savings } from '../../services/savings';

@Component({
  selector: 'app-add-borrow',
  imports: [CommonModule, MatDialogModule, MatSelectModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './add-borrow.html',
  styleUrl: './add-borrow.scss'
})
export class AddBorrow {
  form: any;
  doc: any;
  formData: any;
  servererror: boolean = false;
  member: any[] = [];
  groups: any[] = [];
  credits: any[] = [];
  motif = ["CommerceC", "CommerceN", "Agriculture", "Voyage", "Probleme Familiale", "Autres" ]
  constructor(private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddBorrow>,
    @Inject(MAT_DIALOG_DATA) public data: any, public serv: Credits, private members: Members, private group: Groups, private sav: Savings){
      members.getAll().subscribe(el => this.member = el)
      group.getAll().subscribe(el => this.groups = el)
      serv.getAll().subscribe(el => this.credits = el)
    if (data.action === 'edit' && data.data) {
        this.doc = { ...data.data };
    }else{
      this.doc = {};
    }

    this.form = this.fb.group({
      requester: [this.data.requester, Validators.required],
      amount: [this.data.amount, Validators.required],
      dateE: [this.data.dateE, Validators.required],
      dateR: [this.data.dateR, Validators.required],
      du: [this.data.du, Validators.required],
      motif: [this.data.motif, Validators.required],
      status: [this.data.status, Validators.required]
    });
    
    this.doc = {};
    this.doc = this.data.data? this.data.data: {};
    // console.log("edit item", this.data);
    
  }

  getmaxcr(name: string){
    let max = 0;
    this.sav.getAll().subscribe(el=> {
      const ownSav = el.filter(s=> s.owner == name).map(d=> d.amount);
      const sum = ownSav.reduce((s, m)=> s+m, 0);
      const group = this.member.find(m=> m.name == name).group;
      const max = sum * 3 < this.groups.find(g=> g.name == group).sold ? sum * 3 : this.groups.find(g=> g.name == group).sold;
      this.doc.max = max;
    })
  }

  edit(item: any) {
    if (this.form.valid) {      
          this.serv.update(item._id, item).subscribe((el: any) => {
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
        const owncr = this.credits.find((c: any)=> c.requester == item.requester && c.status != "payed")
        owner = mdata.find(m => m.name == item.requester);
        this.group.getAll().subscribe(el => {
          group = el.find(g => g.name == owner.group) || {};
          if (group.sold >= item.amount && !owncr) {
            // calucate the du
            const du = this.getDu(item.amount);
            item.du = du;
            group.sold -= item.amount;
            this.group.update(group._id, group).subscribe();
            this.serv.create(item).subscribe((el: any) => {
              this.dialogRef.close(el); // renvoie les données modifiées
            })
          } else if (group.sold >= item.amount && owncr) {
            alert("L'utilisateur a déja un crédit non validé");
            item.amount = 0;
          } else {
            alert("Le montant demandé n'est pas disponible");
            item.amount = 0;
          }
          
        });
      });
    }else{
      this.servererror = true;
    }
  }

  getDu(amount: number){
    
    const interest = (amount * 5) / 100;
    this.doc.du = amount + interest;
    return amount + interest;
  }
}