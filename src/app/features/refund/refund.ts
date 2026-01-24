import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog   } from '@angular/material/dialog';
import { Delete } from '../../components/delete/delete';
import { Refunds } from "../../services/refunds";
import { Mov } from "../../../models/interfaces";
import { DetailsBorrow } from '../../components/details-borrow/details-borrow';
import { AddBorrow } from '../../components/add-borrow/add-borrow';
import { Details } from '../../components/details/details';
import { EditRefunds } from '../../components/edit-refunds/edit-refunds';

@Component({
  selector: 'app-refund',
  imports: [MatTableModule, MatToolbarModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './refund.html',
  styleUrl: './refund.scss'
})
export class Refund {
  displayedColumns: string[] = ['id', 'date', 'membre', 'montant', 'statut', 'actions'];
  mov : Mov[] = [];
 constructor(private dialog: MatDialog, private data: Refunds){

  }
  ngOnInit() {
    this.loadMov();
  }
  loadMov() {
    this.data.getAll().subscribe((movs) => (this.mov = movs.reverse()));
  }


  add(){
    const dialogRef = this.dialog.open(EditRefunds, {
      width: '90vw', // ou '80vw' pour responsive
      maxHeight: '1000vh',

      data: { action: 'add' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.loadMov();
        // this.movumentsService.addmovument(result).subscribe(() => this.loadmovuments());
      }
    });
  }

  details(mov: any) {
    // Naviguer vers une page ou ouvrir une modale
    const dialogRef = this.dialog.open(Details, {
        width: '90vw', // ou '80vw' pour responsive
        maxHeight: '1000vh',
        data: { cat: 'refunds', item: mov }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // this.movumentsService.addmovument(result).subscribe(() => this.loadmovuments());
        }
      });
  }

  edit(mov: any) {
    // Naviguer vers un formulaire ou afficher une modale
    const dialogRef = this.dialog.open(EditRefunds, {
        width: '90vw', // ou '80vw' pour responsive
        maxHeight: '1000vh',
        data: { action: 'edit', data: mov }
      });

      dialogRef.afterClosed().subscribe(result => {
          this.loadMov();
      });
  }

  delete(mov: any) {
    console.log('🗑️ Supprimer le movument :', mov);
    // Confirmer et supprimer via API ou service
    const dialogRef = this.dialog.open(Delete, {
        width: '90vw', // ou '80vw' pour responsive
        maxHeight: '1000vh',
        data: { cat: 'refunds', data: mov }
      });

      dialogRef.afterClosed().subscribe(result => {
        this.loadMov();
      });
  }
}