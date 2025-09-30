import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialog   } from '@angular/material/dialog';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { DetailsDoc } from '../../components/details-doc/details-doc';
import { AddDoc } from '../../components/add-doc/add-doc';
import { Delete } from '../../components/delete/delete';
import { EditDoc } from '../../components/edit-doc/edit-doc';

export interface Document {
  id: number;
  name: string;
  email: string;
  role: string;
  statut: string;
}

const DOCUMENTS_DATA: Document[] = [
  {id: 1, name: 'Danniel Kwizera', email: 'admin@doc.com ', role: 'Admin  ', statut: 'Actif'},
  {id: 2, name: 'Didace Nkunzimana', email: 'empA@doc.com', role: 'Archiviste', statut: 'Actif'},
  {id: 3, name: 'Jonas Ntirampeba', email: 'lecB@doc.com ', role: 'Archiviste', statut: 'Desactivé'}
];
@Component({
  selector: 'app-users',
  imports: [MatTableModule, MatToolbarModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './users.html',
  styleUrl: './users.scss'
})
export class Users {
displayedColumns: string[] = ['id', 'name', 'email', 'role', 'statut', 'actions'];
  documents = DOCUMENTS_DATA;
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
