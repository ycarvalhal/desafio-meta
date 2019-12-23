import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Contato } from '../shared/contato';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

  private url:string =  'http://localhost:3000/contatos/';

  constructor(private _httpClient: HttpClient) { }

  getContatos(): Observable<Contato[]> {
    return this._httpClient.get<Contato[]>(this.url);
  }

  getContato(id: string): Observable<Contato> {
    return this._httpClient.get<Contato>(this.url + id);
  }

  insert(contato: Contato): Observable<Contato> {
    return this._httpClient.post<Contato>(this.url, contato);
  }

  update(id: string, contato: Contato): Observable<Contato> {
    return this._httpClient.patch<Contato>(this.url + id, contato);
  }

  delete(id: string): Observable<Contato> {
    return this._httpClient.delete<Contato>(this.url + id);
  }


}
