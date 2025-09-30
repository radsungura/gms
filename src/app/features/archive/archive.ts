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
  titre: string;
  categorie: string;
  localisation: string;
  statut: string;
}

const DOCUMENTS_DATA: Document[] = [
  {id: 1, titre: 'Contrat X', categorie: 'Juridique', localisation: 'Armoire A1', statut: 'Disponible'},
  {id: 2, titre: 'Facture 2023', categorie: 'Finance', localisation: 'Armoire B2', statut: 'Emprunté'},
  {id: 3, titre: 'Rapport RH', categorie: 'Ressources', localisation: 'Armoire C1', statut: 'Disponible'}
];
@Component({
  selector: 'app-archive',
  imports: [MatTableModule, MatToolbarModule, MatIconModule, MatButtonModule, MatDialogModule],
  templateUrl: './archive.html',
  styleUrl: './archive.scss'
})
export class Archive {

  displayedColumns: string[] = ['id', 'titre', 'categorie', 'localisation', 'statut', 'actions'];
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
