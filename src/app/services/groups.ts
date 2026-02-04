import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class Groups {
  private api = environment.apiUrl + 'groups';
  constructor(private http: HttpClient) {}

  getAll(): Observable<any[]> {
    console.log(this.http.get<any[]>(this.api))
    return this.http.get<any[]>(this.api)
  }

  create(item: any): Observable<any> {   
    console.log(item);
     
    return this.http.post<any>(this.api, item);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }

  update(id: any, any: any): Observable<any> {
    return this.http.put<any>(`${this.api}/${id}`, any);
  }
}
