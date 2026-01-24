import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog   } from '@angular/material/dialog';
import { Delete } from '../../components/delete/delete';
import { Savings } from "../../services/savings";
import { Mov } from "../../../models/interfaces";
import { Details } from '../../components/details/details';
import { EditSavings } from '../../components/edit-savings/edit-savings';
import { Groups } from '../../services/groups';
import { Members } from '../../services/members';

@Component({
  selector: 'app-saving',
  imports: [MatTableModule, MatToolbarModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './saving.html',
  styleUrl: './saving.scss'
})
export class Saving {
  displayedColumns: string[] = ['id', 'date', 'membre', 'montant', 'statut', 'actions'];
  mov : Mov[] = [];
 constructor(private dialog: MatDialog, private data: Savings, private groups: Groups, private members: Members){
  
  }
  ngOnInit() {
    this.loadMov();
  }
  loadMov() {
    this.data.getAll().subscribe((movs) => (this.mov = movs.reverse()));
  }

  add(){
    const dialogRef = this.dialog.open(EditSavings, {
      width: '90vw', // ou '80vw' pour responsive
      maxHeight: '1000vh',

      data: { action: 'add' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadMov();
      }
    });
  }

  edit(mov: any) {
    // Naviguer vers un formulaire ou afficher une modale
    const dialogRef = this.dialog.open(EditSavings, {
        width: '90vw', // ou '80vw' pour responsive
        maxHeight: '1000vh',
        data: { action: 'edit', data: mov }
      });

      dialogRef.afterClosed().subscribe(result => {
          this.loadMov();
      });
  }

  details(mov: any) {
    // get the type of term
    this.members.getAll().subscribe(m => 
    {
      const member = m.find(e => e.name == mov.owner);
      this.groups.getAll().subscribe(el => {
        const group = el.find(group => group.name == member.group);
        mov.period = group? group.meet : 'Mois'
      // Naviguer vers une page ou ouvrir une modale
        const dialogRef = this.dialog.open(Details, {
          width: '90vw', // ou '80vw' pour responsive
          maxHeight: '1000vh',
          data: { cat: 'savings', item: mov }
        })

        dialogRef.afterClosed().subscribe(result => {
          this.loadMov();
        });
      });
    });
  }

  delete(mov: any) {
    // Confirmer et supprimer via API ou service
    const dialogRef = this.dialog.open(Delete, {
        width: '90vw', // ou '80vw' pour responsive
        maxHeight: '1000vh',
        data: { cat: 'savings', data: mov }
      });

      dialogRef.afterClosed().subscribe(result => {
        this.loadMov();
      });
  }
}