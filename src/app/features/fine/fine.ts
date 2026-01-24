import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog   } from '@angular/material/dialog';
import { Delete } from '../../components/delete/delete';
import { Mov } from "../../../models/interfaces";
import { Details } from '../../components/details/details';
import { Fines } from '../../services/fines';
import { EditFines } from '../../components/edit-fines/edit-fines';

@Component({
  selector: 'app-fine',
  imports: [MatTableModule, MatToolbarModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './fine.html',
  styleUrl: './fine.scss'
})
export class Fine {
  displayedColumns: string[] = ['id', 'date', 'membre', 'montant', 'statut', 'actions'];
  mov : Mov[] = [];
 constructor(private dialog: MatDialog, private data: Fines){

  }
  ngOnInit() {
    this.loadMov();
  }
  loadMov() {
    this.data.getAll().subscribe((movs) => (this.mov = movs.reverse()));
  }

  add(){
    const dialogRef = this.dialog.open(EditFines, {
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
    const dialogRef = this.dialog.open(EditFines, {
        width: '90vw', // ou '80vw' pour responsive
        maxHeight: '1000vh',
        data: { action: 'edit', data: mov }
      });

      dialogRef.afterClosed().subscribe(result => {
          this.loadMov();
      });
  }

  details(mov: any) {
    // console.log('📄 Détails du movument :', mov);
    // Naviguer vers une page ou ouvrir une modale
    const dialogRef = this.dialog.open(Details, {
        width: '90vw', // ou '80vw' pour responsive
        maxHeight: '1000vh',
        data: { cat: 'fines', item: mov }
      });

      dialogRef.afterClosed().subscribe(result => {
        this.loadMov();
      });
  }

  delete(mov: any) {
    // Confirmer et supprimer via API ou service
    const dialogRef = this.dialog.open(Delete, {
        width: '90vw', // ou '80vw' pour responsive
        maxHeight: '1000vh',
        data: { cat: 'fines', data: mov }
      });

      dialogRef.afterClosed().subscribe(result => {
        this.loadMov();
      });
  }
}
