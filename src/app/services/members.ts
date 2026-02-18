import { Injectable } from '@angular/core';
import { Mov } from '../../models/interfaces'
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Members {
  private api = environment.apiUrl + 'members';
  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.api);
  }

  create(doc: any): Observable<any> {
    return this.http.post<any>(this.api, doc);
  }

  delete(id: any): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }

  update(id: any, item: any): Observable<any> {
    delete item._id;
    return this.http.put<any>(`${this.api}/${id}`, item);
  }
}