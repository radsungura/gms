import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Doc } from '../../models/interfaces';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SearchService {
  private api = 'http://localhost:4000/documents';
  documents: Doc[] = [];
  data: any;
  private source = new BehaviorSubject<any[]>([]);
  doc$ = this.source.asObservable();

  constructor(private http: HttpClient){

    this.load();
    console.log("searchservicedata", this.doc$.source._value);
    
  }
  load(){
    let data: any = [];
    this.http.get<Doc[]>(this.api).subscribe( el=> { this.source.next(el) });
    data = this.source;
  }


  search(query: string): Observable<any[]> {
    // Simuler un filtrage basé sur le nom du médicament
    const results = this.documents.filter(doc => doc.title.toLowerCase().includes(query.toLowerCase()));
    console.log('servicedata', this.source.value);
    
    return of(results); // Retourner un Observable
  }
  get_doc(){
    return this.documents;
  }

}
