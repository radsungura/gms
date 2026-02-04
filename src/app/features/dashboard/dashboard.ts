import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { BaseChartDirective  } from 'ng2-charts';
import { Chart, ChartConfiguration, ChartType, registerables } from 'chart.js';
import { Groups } from '../../services/groups';
import { Members } from '../../services/members';
import { Savings } from '../../services/savings';
import { Fines } from '../../services/fines';
import { EmFunds } from '../../services/em-funds';

// 👉 très important : enregistrer tous les contrôleurs/elements/plugins
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatIconModule, MatListModule, BaseChartDirective],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.scss']
})


export class Dashboard {
  groups: number = 0;
  members: number = 0;
  female: number = 0;
  impact: number = 0;
  handcap: number = 0;
  savings: any = 0;
  fines: number = 0;
  emfunds: number = 0;
  stats: any;
  save$: any;
  pieChartData!: ChartConfiguration<'pie'>['data'];
  pieChartType: ChartType = 'pie';

  lineChartData!: ChartConfiguration<'line'>['data']; 
  lineChartOptions: ChartConfiguration<'line'>['options'] = { responsive: true };
  // saves: Savings = [];
  constructor( private groupData: Groups, private memberData: Members, 
    private save: Savings, private fine: Fines, private emfund: EmFunds){
    this.loads();
    
    // console.log(this.save$);
    
    }
    
  ngOnInit(){
    this.groupData.getAll().subscribe(el =>  
      this.groups = el.length,
    );
    this.memberData.getAll().subscribe(el =>  
    {
      let data = el;
      this.members = el.length;
      this.female = data.filter((me: any) => {return me.gender == "F"}).length;
      this.handcap = data.filter((me: any) => {return me.handcap == true}).length;
      data.forEach(element => {
        this.impact += element.famSize;
      });
    }
    );
    this.loads()
    this.savings = this.save.getAll().subscribe(el =>
    {
      this.initPieChart()
      this.initLineChart()
    }
    );
  }

  loads(){
    this.save.getAll().subscribe(el => this.savings = el.length || 0 );
    this.fine.getAll().subscribe(el =>  this.fines = el.length || 0 );
    this.emfund.getAll().subscribe(el => this.emfunds = el.length || 0 );
    this.save$ = this.save.getAll().subscribe();
    // console.log(this.savings, this.fines, this.emfunds);
  }

  initPieChart() {
  this.pieChartData = {
    labels: ['Epargnes', 'Amandes', 'Fonds d\'Urgence'],
    datasets: [
      {
        

        data: [
          this.savings,
          this.fines,
          this.emfunds
        ]
        // data: [
        //   5000000,
        //   200000,
        //   500000
        // ]
      }
    ]
  };
}

    // lineChartData: ChartConfiguration<'line'>['data'] = {
  //   labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juillet', 'Aout', 'Sept', 'Oct', 'Nov', 'Dec'],
  //   datasets: [
  //     { data: [5, 8, 12, 20, 15, 25], label: 'Documents Ajoutés' }, 
  //     { data: [12, 3, 5, 1, 0, 8], label: 'Documents Archivé' }
  //   ]
  // };

  initLineChart(){
    this.lineChartData = {
      labels: ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juillet', 'Aout', 'Sept', 'Oct', 'Nov', 'Dec'],
      datasets: [
        // { 
          // data: [this.savings, this.fines, this.emfunds], label: 'Benefices' 
          { data: [50000, 60000, 1200000, 200000, 1500000, 2500000], label: 'Epargnes' }, 
      { data: [100000, 150000, 300000, 50000, 400000, 800000], label: 'Benefices' }
        // }, 
      ]
    };
  };
  


  // pieChartData: ChartConfiguration<'pie'>['data'] = {
  //   labels: ['Epargnes', 'Ammandes', 'Fonds d\'Urgence'],
  //   datasets: [{ 
  //     data: [this.savings, this.fines, this.emfunds] 
  //   }]
  // };
  // pieChartType: ChartType = "pie";

 
}
