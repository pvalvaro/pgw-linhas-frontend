import { Injectable } from '@angular/core';
import { HttpClient, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Voo } from 'src/app/models/voo.model';

const baseUrl = 'http://localhost:8080/pwg-linhas-aereas/voo';

@Injectable({
  providedIn: 'root'
})
export class VooService {

  constructor(private http: HttpClient) { }

  cadastrarVoo(data: any): Observable<any>{
    return this.http.post(baseUrl, data);
  }

  recuperarVoos(): Observable<Voo[]>{
    return this.http.get<Voo[]>(baseUrl);
  }

  recuperarVooId(id: number): Observable<Voo>{
    return this.http.get<Voo>(`${baseUrl}/${id}`);
  }

  alterarVoo(id: number, voo: Voo): Observable<Object>{
    return this.http.put(`${baseUrl}/${id}`, voo);
  }

  cancelarVoo(id?: number, voo?: Voo):Observable<any>{
    return this.http.patch(`${baseUrl}/cancelar/${id}`, voo);
  }
}
