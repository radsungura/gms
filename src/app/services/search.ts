import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Doc } from '../../models/interfaces';

@Injectable({
  providedIn: 'root'
})

export class SearchService {
  private api = 'http://localhost:4000/documents';
  documents: Doc[] = [];
  data: any;
  constructor(private http: HttpClient){
    this.data = this.load();
    console.log("searchdata", this.data);
    
  }
  load(): Observable<Doc[]>{
    return  this.http.get<Doc[]>(this.api);
  }
  search(query: string): Observable<any[]> {
    // Simuler un filtrage basé sur le nom du médicament
    const results = this.documents.filter(doc => doc.title.toLowerCase().includes(query.toLowerCase()));
    console.log('servicedata', this.http.get<Doc[]>(this.api));
    
    return of(results); // Retourner un Observable
  }
  get_doc(){
    return this.documents;
  }

}
