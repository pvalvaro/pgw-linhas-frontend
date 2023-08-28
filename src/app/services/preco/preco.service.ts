import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';


import { Preco } from 'src/app/models/preco.model';

const baseUrl = 'http://localhost:8080/pwg-linhas-aereas/precos';

@Injectable({
  providedIn: 'root'
})
export class PrecoService {

  constructor(private http: HttpClient) { }

  cadastrarPrecos(data: any): Observable<any>{
    return this.http.post(baseUrl, data);
  }

  recuperarPrecos(): Observable<Preco[]>{
    return this.http.get<Preco[]>(baseUrl);
  }

  alterarPreco(id?: number, preco?: Preco): Observable<Object>{
    return this.http.put(`${baseUrl}/alterar/${id}`, preco);
  }
}
