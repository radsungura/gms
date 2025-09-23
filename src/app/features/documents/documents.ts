import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

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
  selector: 'app-documents',
  imports: [MatTableModule, MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './documents.html',
  styleUrl: './documents.scss'
})

export class Documents {
displayedColumns: string[] = ['id', 'titre', 'categorie', 'localisation', 'statut', 'actions'];
  documents = DOCUMENTS_DATA;

  viewDetails(doc: any) {
  console.log('📄 Détails du document :', doc);
  // Naviguer vers une page ou ouvrir une modale
}

editDocument(doc: any) {
  console.log('✏️ Modifier le document :', doc);
  // Naviguer vers un formulaire ou afficher une modale
}

deleteDocument(doc: any) {
  console.log('🗑️ Supprimer le document :', doc);
  // Confirmer et supprimer via API ou service
}

}
