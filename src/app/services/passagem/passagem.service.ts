import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Passagem } from 'src/app/models/passagem.model';

const baseUrl = 'http://localhost:8080/pwg-linhas-aereas/passagem';

@Injectable({
  providedIn: 'root'
})
export class PassagemService {

  constructor(private http: HttpClient) { }

  comprarPassagem(data: any): Observable<any>{
    return this.http.post(baseUrl, data);
  }

  recuperarPassageiros(): Observable<Passagem[]>{
    return this.http.get<Passagem[]>(baseUrl);
  }

  recuperarPassagemCpf(cpf?: String){
    return this.http.get<any[]>(`${baseUrl}/comprador/${cpf}`);
  }

  recuperarPassagemVoo(codigo?: String){
    return this.http.get<any[]>(`${baseUrl}/codivoo/${codigo}`);
  }

  cancelarCompra(id?: number, passagem?:Passagem):Observable<any>{
    return this.http.patch(`${baseUrl}/cancelar/${id}`, passagem);
  }
}
