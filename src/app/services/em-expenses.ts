import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmExpenses {
  private api = 'http://localhost:3000/emExpenses';
  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
  }

  create(any: any): Observable<any> {    
    return this.http.post<any>(this.api, any);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }

  update(id: any, any: any): Observable<any> {
    return this.http.put<any>(`${this.api}/${id}`, any);
  }
}