import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog   } from '@angular/material/dialog';
import { Delete } from '../../components/delete/delete';
import { Details } from '../../components/details/details';
import { EmFunds } from '../../services/em-funds';
import { EditEmfunds } from '../../components/edit-emfunds/edit-emfunds';


@Component({
  selector: 'app-emfunds',
  imports: [MatTableModule, MatToolbarModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './emfunds.html',
  styleUrl: './emfunds.scss'
})
export class Emfunds {
  displayedColumns: string[] = ['id', 'date', 'membre', 'montant', 'statut', 'actions'];
  mov : any[] = [];
 constructor(private dialog: MatDialog, private data: EmFunds){

  }
  ngOnInit() {
    this.loadMov();
  }
  loadMov() {
    this.data.getAll().subscribe((el: any) => this.mov = el.reverse());
  }

  add(){
    const dialogRef = this.dialog.open(EditEmfunds, {
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
    const dialogRef = this.dialog.open(EditEmfunds, {
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
        data: { cat: 'emfunds', item: mov }
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
        data: { cat: 'emfunds', data: mov }
      });

      dialogRef.afterClosed().subscribe(result => {
        this.loadMov();
      });
  }
}
