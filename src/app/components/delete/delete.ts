import { Component, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { Groups } from '../../services/groups';
// import { Doc } from '../../../models/interfaces';
import { Savings } from '../../services/savings';
import { Refunds } from '../../services/refunds';
import { Fines } from '../../services/fines';
import { Members } from '../../services/members';
import { EmFunds } from '../../services/em-funds';
import { EmExpenses } from '../../services/em-expenses';
import { Credits } from '../../services/credits';

@Component({
  selector: 'app-delete',
  imports: [CommonModule, MatDialogModule, ReactiveFormsModule, MatFormFieldModule, MatButtonModule],
  templateUrl: './delete.html',
  styleUrl: './delete.scss'
})
export class Delete {
form: any;
doc: any;
cat: any;
servererror: boolean = false;
constructor(
  private fb: FormBuilder, 
  public dialogRef: MatDialogRef<Delete>, 
  @Inject(MAT_DIALOG_DATA) public data: any, 
  public groups: Groups,
  public savings: Savings,
  public credits: Credits,
  public refunds: Refunds,
  public fines: Fines,
  public members: Members,
  public emfunds: EmFunds,
  public emexpenses: EmExpenses
){
  console.log(data);
  this.cat = data.cat;
}

async delete(cat: string, item: any) {
    console.log(item);

  if (cat == 'group') {
    try {
      await this.groups.delete(item).subscribe((el) => {
        this.dialogRef.close(el); // renvoie les données modifiées
      });
    } catch (error){
      console.error("error", error);
      this.servererror = true;
    }
  } else if (cat == 'credit') {
    try {
      await this.credits.delete(item).subscribe((el) => {
        this.dialogRef.close(el); // renvoie les données modifiées
      });
    } catch (error){
      console.error("error", error);
      this.servererror = true;
    }
  }else if (cat == 'saving') {
    try {
      await this.savings.delete(item).subscribe((el) => {
        this.dialogRef.close(el); // renvoie les données modifiées
      });
    } catch (error){
      console.error("error", error);
      this.servererror = true;
    }
  }else if (cat == 'refund') {
    try {
      await this.refunds.delete(item).subscribe((el) => {
        this.dialogRef.close(el); // renvoie les données modifiées
      });
    } catch (error){
      console.error("error", error);
      this.servererror = true;
    }
  }else if (cat == 'fine') {
    try {
      await this.fines.delete(item).subscribe((el) => {
        this.dialogRef.close(el); // renvoie les données modifiées
      });
    } catch (error){
      console.error("error", error);
      this.servererror = true;
    }
  }else if (cat == 'member') {    
    try {
      await this.members.delete(item).subscribe((el) => {
        this.dialogRef.close(el); // renvoie les données modifiées
      });
    } catch (error){
      console.error("error", error);
      this.servererror = true;
    }
  }else if (cat == 'emfund') {
    try {
      await this.emfunds.delete(item).subscribe((el) => {
        this.dialogRef.close(el); // renvoie les données modifiées
      });
    } catch (error){
      console.error("error", error);
      this.servererror = true;
    }
  }else if (cat == 'emexpense') {
    try {
      await this.emexpenses.delete(item).subscribe((el) => {
        this.dialogRef.close(el); // renvoie les données modifiées
      });
    } catch (error){
      console.error("error", error);
      this.servererror = true;
    }
  }else if (cat == 'credit') {
    try {
      await this.credits.delete(item).subscribe((el) => {
        this.dialogRef.close(el); // renvoie les données modifiées
      });
    } catch (error){
      console.error("error", error);
      this.servererror = true;
    }
  }else{
    alert("Une erreur est survenus !");
  }
}
}

