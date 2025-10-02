import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Document {
  id: number;
  titre: string;
  categorie: string;
  localisation: string;
  statut: string;
}

const DATA: Document[] = [
  {id: 1, titre: 'Contrat de soumission', categorie: 'Juridique', localisation: 'Armoire A1', statut: 'Disponible'},
  {id: 2, titre: 'Facture 2023', categorie: 'Finance', localisation: 'Armoire B2', statut: 'Emprunté'},
  {id: 3, titre: 'Rapport RH', categorie: 'Ressources', localisation: 'Armoire C1', statut: 'Disponible'}
];

@Injectable({
  providedIn: 'root'
})

export class SearchService {
  documents = DATA;
  search(query: string): Observable<any[]> {
    // Simuler un filtrage basé sur le nom du médicament
    const results = this.documents.filter(doc => doc.titre.toLowerCase().includes(query.toLowerCase()));
    console.log('servicedata', results);
    
    return of(results); // Retourner un Observable
  }
  get_doc(){
    return this.documents;
  }

}
