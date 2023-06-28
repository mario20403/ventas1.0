import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiInfoLocalService {

  private urlApi = 'https://wave-thankful-yamamomo.glitch.me/club';

  constructor(private http: HttpClient) { }

  public getData(): Observable<any> {

    return this.http.get<any>(this.urlApi);
  }
}
