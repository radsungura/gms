import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Members } from '../../services/members';
import { Savings } from '../../services/savings';
import { Refunds } from '../../services/refunds';
import { Fines } from '../../services/fines';
import { EmExpenses } from '../../services/em-expenses';
import { EmFunds } from '../../services/em-funds';
import { Credits } from '../../services/credits';
import { Groups } from '../../services/groups';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-repport',
  imports: [MatToolbarModule, CommonModule, MatSelectModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
  templateUrl: './repport.html',
  styleUrl: './repport.scss'
})
export class Repport {
  fSolde: any;
  save: any;
  refund: any;
  interest: any;
  emfund: any;
  fine: any;
  tRevenu: any;
  expense: any;
  credit: any;
  texpense:any;
  lSolde: any;
  items: any[] = [
    "Solde", "Epargnes", "Remboursement", "Interets", 
    "Frais d'urgence", "Ammande", "Recette Totale", 
    "Depenses", "Credit", "Depense Totale", "Solde"
  ];
  months: string[] = [
    "Jan", "Feb", "Mars", "Apr", "May", "Jun", 
    "Jul", "Aoug", "Sept", "Oct", "Nov", "Dec"
  ];
  groups: any[] = [];

  members: any[] = [];
  credits: any[] = [];
  refunds: any[] = [];
  savings: any[] = [];
  fines: any[] = [];
  emfunds: any[] = [];
  emexpenses: any[] = [];
  form: any;
  data: any;
  savrep: any[] = [];
  refrep: any[] = [];
  finerep: any[] = [];
  emfrep: any[] = [];
  crerep: any[] = [];
  emexrep: any[] = [];
  remontot: any[] = [0,0,0,0,0,0,0,0,0,0,0,0];
  exmontot: any[] = [0,0,0,0,0,0,0,0,0,0,0,0];
  savtot: number = 0;
  extot: number = 0;
  search: any = {};
  constructor(
    private me: Members,private sav: Savings,
    private cr: Credits,private ref: Refunds, 
    private fin: Fines, private emf: EmFunds, 
    private eme: EmExpenses, private gr: Groups,
    private fb: FormBuilder
  ){
    // let date = "12/10/2026";
    // console.log(parseInt(date.split('/')[1]));

     this.form = this.fb.group({
    cat: [this.search.cat, Validators.required],
    value: [this.search.value, Validators.required]
  })
  }

  ngOnInit(){
    this.savbyMonth();
    this.refbyMonth();
    this.finebyMonth();
    this.emfundbyMonth();
    this.emexbyMonth();
    this.creditbyMonth();
  }

  savbyMonth(){
      return this.sav.getAll().subscribe(el => {
        this.savtot += el.reduce((sum, s) => sum + s.amount, 0);
        for (let i = 0; i < this.months.length; i++) {
          const records = el.filter(s=> ((new Date(s.date).getMonth()) == i)).map(d=> d.amount);
          this.savrep[i] = records.reduce((sum, s) => sum + s, 0);
          this.remontot[i] += parseInt(this.savrep[i]);
        }
        this.savrep.push(this.savrep.reduce((sum, s) => sum + s, 0));
    })
  }

  refbyMonth(){
     let rep: any[] = [];
      return this.ref.getAll().subscribe(el => {
        this.savtot += el.reduce((sum, s) => sum + s.amount, 0);
        for (let i = 0; i < this.months.length; i++) {
          const element = this.months[i];
          const records = el.filter(s=> ((new Date(s.date).getMonth()) == i)).map(d=> d.amount);
          this.refrep[i] = records.reduce((sum, s) => sum + s, 0);
          this.remontot[i] += parseInt(this.refrep[i]);
        }
        this.refrep.push(this.refrep.reduce((sum, s) => sum + s, 0));
    })
  }

  finebyMonth(){
     let rep: any[] = [];
      return this.fin.getAll().subscribe(el => {
        this.savtot += el.reduce((sum, s) => sum + s.amount, 0);
        for (let i = 0; i < this.months.length; i++) {
          const element = this.months[i];
          const records = el.filter(s=> ((new Date(s.date).getMonth()) == i)).map(d=> d.amount);
          this.finerep[i] = records.reduce((sum, s) => sum + s, 0);
          this.remontot[i] += parseInt(this.finerep[i]);
        }
        this.finerep.push(this.finerep.reduce((sum, s) => sum + s, 0));
    })
  }

  emfundbyMonth(){
    let rep: any[] = [];
    return this.emf.getAll().subscribe(el => {
      this.savtot += el.reduce((sum, s) => sum + s.amount, 0);
      for (let i = 0; i < this.months.length; i++) {
        const records = el.filter(s=> ((new Date(s.date).getMonth()) == i)).map(d=> d.amount);
        this.emfrep[i] = records.reduce((sum, s) => sum + s, 0);
        this.remontot[i] += parseInt(this.emfrep[i]);
      }
      this.emfrep.push(this.emfrep.reduce((sum, s) => sum + s, 0));
      // console.log(this.emfrep);
    })
  }

  emexbyMonth(){
    let rep: any[] = [];
    return this.eme.getAll().subscribe(el => {
      this.extot += el.reduce((sum, s) => sum + s.amount, 0);
      for (let i = 0; i < this.months.length; i++) {
        const element = this.months[i];
        const records = el.filter(s=> ((new Date(s.date).getMonth()) == i)).map(d=> d.amount);
        this.emexrep[i] = records.reduce((sum, s) => sum + s, 0);
        this.exmontot[i] += parseInt(this.emexrep[i]);
      }
      this.emexrep.push(this.emexrep.reduce((sum, s) => sum + s, 0));
    })
  }

  creditbyMonth(){
    let rep: any[] = [];
    return this.cr.getAll().subscribe(el => {
      this.extot += el.reduce((sum, s) => sum + s.amount, 0);
      for (let i = 0; i < this.months.length; i++) {
        const element = this.months[i];
        const records = el.filter(s=> ((new Date(s.dateE).getMonth()) == i)).map(d=> d.amount);
        this.crerep[i] = records.reduce((sum, s) => sum + s, 0);
        this.exmontot[i] += parseInt(this.crerep[i]);
      }
      this.crerep.push(this.crerep.reduce((sum, s) => sum + s, 0));
    })
  }
  
  category(item: string){
    
  }
}

