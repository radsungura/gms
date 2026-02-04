import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Savings {
  private api = environment.apiUrl + 'savings';
  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
  }

  create(doc: any): Observable<any> {
    return this.http.post<any>(this.api, doc);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }

  update(id: number, doc: any): Observable<any> {
    return this.http.put<any>(`${this.api}/${id}`, doc);
  }
}