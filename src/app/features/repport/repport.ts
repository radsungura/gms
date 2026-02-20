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
  emfunds: any[] = [0,0,0,0,0,0,0,0,0,0,0,0];
  emexpenses: any[] = [0,0,0,0,0,0,0,0,0,0,0,0];
  savrep: any[] = [0,0,0,0,0,0,0,0,0,0,0,0];
  refrep: any[] = [0,0,0,0,0,0,0,0,0,0,0,0];
  finerep: any[] = [0,0,0,0,0,0,0,0,0,0,0,0];
  emfrep: any[] = [0,0,0,0,0,0,0,0,0,0,0,0];
  crerep: any[] = [0,0,0,0,0,0,0,0,0,0,0,0];
  emexrep: any[] = [0,0,0,0,0,0,0,0,0,0,0,0];
  remontot: any[] = [0,0,0,0,0,0,0,0,0,0,0,0];
  exmontot: any[] = [0,0,0,0,0,0,0,0,0,0,0,0];
  savtot: number = 0;
  extot: number = 0;
  search: any = {};
  form: any;
  data: any;
  constructor(
    private me: Members,private sav: Savings,
    private cr: Credits,private ref: Refunds, 
    private fin: Fines, private emf: EmFunds, 
    private eme: EmExpenses, private gr: Groups,
    private fb: FormBuilder
  ){
    // let date = "12/10/2026";
    // console.log(parseInt(date.split('/')[1]));
    gr.getAll().subscribe(el => this.groups = el);
     this.form = this.fb.group({
    cat: [this.search.cat, Validators.required],
    value: [this.search.value, Validators.required]
  });
  this.search = {cat: "", value: ""};

  }

  ngOnInit(){
      this.savbyMonth(this.search.cat, this.search.value);
      this.refbyMonth(this.search.cat, this.search.value);
      this.finebyMonth(this.search.cat, this.search.value);
      this.emfundbyMonth(this.search.cat, this.search.value);
      this.emexbyMonth(this.search.cat, this.search.value);
      this.creditbyMonth(this.search.cat, this.search.value);
  }
  load(){
    this.savrep = [0,0,0,0,0,0,0,0,0,0,0,0];
    this.refrep = [0,0,0,0,0,0,0,0,0,0,0,0];
    this.finerep = [0,0,0,0,0,0,0,0,0,0,0,0];
    this.emfrep = [0,0,0,0,0,0,0,0,0,0,0,0];
    this.crerep = [0,0,0,0,0,0,0,0,0,0,0,0];
    this.emexrep = [0,0,0,0,0,0,0,0,0,0,0,0];
    this.remontot = [0,0,0,0,0,0,0,0,0,0,0,0];
    this.exmontot = [0,0,0,0,0,0,0,0,0,0,0,0];
    this.savtot = 0;
    this.extot = 0;
    if(this.search.cat && this.search.value){
      this.savbyMonth(this.search.cat, this.search.value);
      this.refbyMonth(this.search.cat, this.search.value);
      this.finebyMonth(this.search.cat, this.search.value);
      this.emfundbyMonth(this.search.cat, this.search.value);
      this.emexbyMonth(this.search.cat, this.search.value);
      this.creditbyMonth(this.search.cat, this.search.value);
    }
  }

  savbyMonth(cat: any, value: any){
      this.sav.getAll().subscribe(sav => {
        let el;
        if (cat == "year") {
          el = sav.filter(s=> value == new Date(s.date).getFullYear())
        }
        else if (cat == "group") {
          el = sav.filter(s=> value == s.group)
        } 
        else {
          el = sav;
        }
        this.savtot += el.reduce((sum, s) => sum + s.amount, 0);
        for (let i = 0; i < this.months.length; i++) {
          const records = el.filter(s=> ((new Date(s.date).getMonth()) == i)).map(d=> d.amount);
          this.savrep[i] = records.reduce((sum, s) => sum + s, 0);
          this.remontot[i] += parseInt(this.savrep[i]);
        }
        this.savrep.push(this.savrep.reduce((sum, s) => sum + s, 0));
      })
  }

  refbyMonth(cat: any, value: any){
     let rep: any[] = [];
      return this.ref.getAll().subscribe(ref => {
         let el;
        if (cat == "year") {
          el = ref.filter(s=> value == new Date(s.date).getFullYear())
        }
        else if (cat == "group") {
          el = ref.filter(s=> value == s.group)
        } 
        else {
          el = ref;
        }
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

  finebyMonth(cat: any, value: any){
     let rep: any[] = [];
      return this.fin.getAll().subscribe(fin => {
         let el;
        if (cat == "year") {
          el = fin.filter(s=> value == new Date(s.date).getFullYear())
        }
        else if (cat == "group") {
          el = fin.filter(s=> value == s.group)
        } 
        else {
          el = fin;
        }
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

  emfundbyMonth(cat: any, value: any){
    let rep: any[] = [];
    return this.emf.getAll().subscribe(em => {
       let el;
        if (cat == "year") {
          el = em.filter(s=> value == new Date(s.date).getFullYear())
        }
        else if (cat == "group") {
          el = em.filter(s=> value == s.group)
        } 
        else {
          el = em;
        }
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

  emexbyMonth(cat: any, value: any){
    let rep: any[] = [];
    return this.eme.getAll().subscribe(emex => {
       let el;
        if (cat == "year") {
          el = emex.filter(s=> value == new Date(s.date).getFullYear())
        }
        else if (cat == "group") {
          el = emex.filter(s=> value == s.group)
        } 
        else {
          el = emex;
        }
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

  creditbyMonth(cat: any, value: any){
    let rep: any[] = [];
    return this.cr.getAll().subscribe(cr => {
      let el;
        if (cat == "year") {
          el = cr.filter(s=> value == new Date(s.date).getFullYear())
        }
        else if (cat == "group") {
          el = cr.filter(s=> value == s.group)
        } 
        else {
          el = cr;
        }
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
}

