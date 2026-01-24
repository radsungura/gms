import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog   } from '@angular/material/dialog';
import { Delete } from '../../components/delete/delete';
import { Credits } from "../../services/credits";
import { Mov } from "../../../models/interfaces";
import { Details } from '../../components/details/details';
import { EditExpenses } from '../../components/edit-expenses/edit-expenses';
import { EmExpenses } from '../../services/em-expenses';


@Component({
  selector: 'app-emexpenses',
  imports: [MatTableModule, MatToolbarModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './emexpenses.html',
  styleUrl: './emexpenses.scss'
})
export class Emexpenses {
  displayedColumns: string[] = ['id', 'demandeur', 'montant', 'date', 'motif', 'statut', 'actions'];
  mov : Mov[] = [];
 constructor(private dialog: MatDialog, private data: EmExpenses){

  }
  ngOnInit() {
    this.loadMov();
  }
  loadMov() {
    this.data.getAll().subscribe((movs) => (this.mov = movs.reverse()));
  }


  add(){
    const dialogRef = this.dialog.open(EditExpenses, {
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
    console.log('📄 Détails du movument :', mov);
    // Naviguer vers une page ou ouvrir une modale
    const dialogRef = this.dialog.open(Details, {
        width: '90vw', // ou '80vw' pour responsive
        maxHeight: '1000vh',
        data: { cat: 'emexpenses', item: mov }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // this.movumentsService.addmovument(result).subscribe(() => this.loadmovuments());
        }
      });
  }

  edit(mov: any) {
    console.log('✏️ Modifier le movument :', mov);
    // Naviguer vers un formulaire ou afficher une modale
    const dialogRef = this.dialog.open(EditExpenses, {
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
        data: { cat: 'credits', data: mov }
      });

      dialogRef.afterClosed().subscribe(result => {
        this.loadMov()
      });
  }
}
