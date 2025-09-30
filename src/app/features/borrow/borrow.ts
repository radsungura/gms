import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog   } from '@angular/material/dialog';
import { DetailsDoc } from '../../components/details-doc/details-doc';
import { AddDoc } from '../../components/add-doc/add-doc';
import { Delete } from '../../components/delete/delete';
import { EditDoc } from '../../components/edit-doc/edit-doc';

export interface mov {
  id: number;
  date: string;
  action: string;
  actor: string;
  statut: string;
}

const DATA: mov[] = [
  {id: 1, date: '05/08/25', action: 'Emprunté', actor: 'Jean Dupont', statut: 'Normale'},
  {id: 2, date: '05/08/25', action: 'Restitué', actor: 'Jean Dupont', statut: 'Normale'},
  {id: 3, date: '05/08/25', action: 'Emprunté', actor: 'Marie Claire ', statut: 'Annormale'}
];

@Component({
  selector: 'app-borrow',
  imports: [MatTableModule, MatToolbarModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './borrow.html',
  styleUrl: './borrow.scss'
})
export class Borrow {
  displayedColumns: string[] = ['id', 'date', 'action', 'actor', 'statut', 'actions'];
  mouvements = DATA;
  constructor(private dialog: MatDialog){

  }


   addDoc(){
    const dialogRef = this.dialog.open(AddDoc, {
      width: '90vw', // ou '80vw' pour responsive
      maxHeight: '1000vh',

      data: { mode: 'add' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // this.documentsService.addDocument(result).subscribe(() => this.loadDocuments());
      }
    });
  }

  viewDetails(doc: any) {
  console.log('📄 Détails du document :', doc);
  // Naviguer vers une page ou ouvrir une modale
   const dialogRef = this.dialog.open(DetailsDoc, {
      width: '90vw', // ou '80vw' pour responsive
      maxHeight: '1000vh',
      data: { mode: 'details', item: doc }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // this.documentsService.addDocument(result).subscribe(() => this.loadDocuments());
      }
    });
}

editDocument(doc: any) {
  console.log('✏️ Modifier le document :', doc);
  // Naviguer vers un formulaire ou afficher une modale
  const dialogRef = this.dialog.open(EditDoc, {
      width: '90vw', // ou '80vw' pour responsive
      maxHeight: '1000vh',
      data: { mode: 'edit' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // this.documentsService.addDocument(result).subscribe(() => this.loadDocuments());
      }
    });
}

deleteDocument(doc: any) {
  console.log('🗑️ Supprimer le document :', doc);
  // Confirmer et supprimer via API ou service
  const dialogRef = this.dialog.open(Delete, {
      width: '90vw', // ou '80vw' pour responsive
      maxHeight: '1000vh',
      data: { mode: 'document' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // this.documentsService.addDocument(result).subscribe(() => this.loadDocuments());
      }
    });
}
}
