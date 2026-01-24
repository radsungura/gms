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
  month: string[] = [
    "Jan", "Fev", "Mars", "Avr", "Mai", "Juin", 
    "Juil", "Aout", "Sept", "Nov", "Dec"
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
      this.getSavings("Inkerebutsi");
    
  }
  add(){

  }

  getSavings(item: any){
      const group = item;
    return this.me.getAll().subscribe(memb => {
    return this.sav.getAll().subscribe(el => {
      console.log(el);
      let m: any;
      this.savings = el;
      for (let i = 0; i < this.savings.length; i++) {
        const sav = this.savings[i];
         m[i+1] =  (parseInt(sav.date.split('/')[1])  == i) ? parseInt(sav.date.split('/')[1]) : 0
      }
      console.log("test", m);
      
    });
  });}

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
