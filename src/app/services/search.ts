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
    this.load().subscribe((el) => this.data = el);
    console.log("searchservicedata", this.data);
    
  }
  load(): Observable<Doc[]>{
    let data = this.http.get<Doc[]>(this.api);
    
    console.log("after load :",  data);
    return  data;
    
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
