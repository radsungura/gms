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
  imports: [MatToolbarModule, CommonModule, MatSelectModule, MatDialogModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatButtonModule],
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
  group: any = {
      "id": "1",
      "name": "Inkerebutsi",
      "sold": 50050388745,
      "late": 300,
      "absence": 1000,
      "location": "Muha,Kanyosha",
      "meet": "Mois",
      "status": "Active",
      "members": 7,
      "females": 4
    };
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
  savtot: number = 0;
  extot: number = 0;
  constructor(
    private me: Members,private sav: Savings,
    private cr: Credits,private ref: Refunds, 
    private fin: Fines, private emf: EmFunds, 
    private eme: EmExpenses, private gr: Groups,
    private fb: FormBuilder
  ){
    let date = "12/10/2026";
    // console.log(parseInt(date.split('/')[1]));
    this.group = {};
  }

  ngOnInit(){
    this.gr.getAll().subscribe(el => this.groups = el);
    this.sav.getAll().subscribe(el => this.savings = el);
    this.me.getAll().subscribe(el => this.members = el);
    this.cr.getAll().subscribe(el => this.credits = el);
    this.ref.getAll().subscribe(el => this.refunds = el);
    this.fin.getAll().subscribe(el => this.fines = el);
    this.emf.getAll().subscribe(el => this.emfunds = el);
    this.eme.getAll().subscribe(el => this.emexpenses = el);

    // this.getRepport("Inkerebutsi");
    // this.getSavings("Inkerebutsi");
    // console.log(this.getMonthSav("Inkerebutsi"));
    this.savbyMonth();
    this.refbyMonth();
    this.finebyMonth();
    this.emfundbyMonth();
    this.emexbyMonth();
    this.creditbyMonth();
    // this.getMonthSav("Inkerebutsi");
  }

  getSavings(item: any){
      const group = item;
    return this.sav.getAll().subscribe(el => {
      let m: any[] = [];
      this.savings = el;
      for (let i = 0; i < this.savings.length; i++) {

        const sav = this.savings[i];
        
         m[i+1] =  (parseInt(sav.date.split('/')[1])  == i) ? parseInt(sav.date.split('/')[1]) : 0;
      console.log("items", sav.date.split('/')[1]);

      }

      console.log("test", m);
      
  });}

  getMonthSav(group: any){
    return this.sav.getAll().subscribe(el => {
      console.log("result", el);
      this.savtot += el.reduce((sum, s) => sum + s.amount, 0);
      const res: {[key: string]: number}={};
      el.forEach(item => {
        const date = new Date(item.date);
      console.log("result", this.months);

        const monthName = this.months[date.getMonth()];
        if (!res[monthName]) {
          res[monthName] = 0;
        } 
          res[monthName] += item.amount;
      });
      console.log("result", res);
      
      return res;
    });
  }
  savbyMonth(){
    let rep: any[] = [];
      return this.sav.getAll().subscribe(el => {
        this.savtot += el.reduce((sum, s) => sum + s.amount, 0);
        for (let i = 0; i < this.months.length; i++) {
          const element = this.months[i];
          const records = el.filter(s=> ((new Date(s.date).getMonth()) == i)).map(d=> d.amount);
          this.savrep[i] = records.reduce((sum, s) => sum + s, 0);
        }
        this.savrep.push(this.savrep.reduce((sum, s) => sum + s, 0));
        // console.log(this.savrep);
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
        }
        this.refrep.push(this.refrep.reduce((sum, s) => sum + s, 0));
        // console.log(this.refrep);
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
        }
        this.finerep.push(this.finerep.reduce((sum, s) => sum + s, 0));
        // console.log(this.finerep);
    })
  }

  emfundbyMonth(){
    let rep: any[] = [];
    return this.emf.getAll().subscribe(el => {
      this.savtot += el.reduce((sum, s) => sum + s.amount, 0);
      for (let i = 0; i < this.months.length; i++) {
        const records = el.filter(s=> ((new Date(s.date).getMonth()) == i)).map(d=> d.amount);
        this.emfrep[i] = records.reduce((sum, s) => sum + s, 0);
      console.log(records);

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
      }
      this.emexrep.push(this.emexrep.reduce((sum, s) => sum + s, 0));
      // console.log(this.emexrep);
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
      }
      this.crerep.push(this.crerep.reduce((sum, s) => sum + s, 0));
      // console.log(this.crerep);
    })
  }
  
}

  // getRepport(item: any){
  //     const group = item;
  //   this.sav.getAll().subscribe(el => this.savings = el);
  //   this.me.getAll().subscribe(el => this.members = el);
  //   this.cr.getAll().subscribe(el => this.credits = el);
  //   this.ref.getAll().subscribe(el => this.refunds = el);
  //   this.fin.getAll().subscribe(el => this.fines = el);
  //   this.emf.getAll().subscribe(el => this.emfunds = el);
  //   this.eme.getAll().subscribe(el => this.emexpenses = el);
  // }
// }
