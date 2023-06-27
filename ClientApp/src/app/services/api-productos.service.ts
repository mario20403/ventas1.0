import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiProductosService {

  private urlApi = 'https://special-succinct-cast.glitch.me/Productos';

  constructor(private http: HttpClient) { }

  public getData(): Observable<any> {

    return this.http.get<any>(this.urlApi);
  }
}
