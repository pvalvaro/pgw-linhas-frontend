import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Aeroporto } from 'src/app/models/aeroporto.model';

const baseUrl = 'http://localhost:8080/pwg-linhas-aereas/aeroportos';

@Injectable({
  providedIn: 'root'
})
export class AeroportoService {

  constructor(private http: HttpClient) { }

  cadastrarAeroportos(data: any): Observable<any>{
    return this.http.post(baseUrl, data);
  }

  recuperarAeroportos(): Observable<Aeroporto[]>{
    return this.http.get<Aeroporto[]>(baseUrl);
  }
}
