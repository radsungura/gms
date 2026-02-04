import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Credits {
  private api = environment.apiUrl + 'credits';
  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
  }

  create(item: any): Observable<any> {    
    return this.http.post<any>(this.api, item);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }

  update(id: any, item: any): Observable<any> {
    console.log(id, item);
    
    return this.http.put<any>(`${this.api}/${id}`, item);
  }
}