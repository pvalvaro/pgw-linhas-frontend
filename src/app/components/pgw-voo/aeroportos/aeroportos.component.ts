import { Component, OnInit } from '@angular/core';
import { Aeroporto } from 'src/app/models/aeroporto.model';
import { AeroportoService } from 'src/app/services/aeroporto/aeroporto.service';

@Component({
  selector: 'app-aeroportos',
  templateUrl: './aeroportos.component.html',
  styleUrls: ['./aeroportos.component.css'],
})
export class AeroportosComponent implements OnInit {
  aeroporto: Aeroporto = {
    aeroportoNome: '',
    codigoIATA: '',
    cidadeNome: '',
    estadoNome: '',
  };
  aeroportos?: Aeroporto[];

  constructor(private aeroportoService: AeroportoService) {}

  ngOnInit(): void {
      this.recuperarAeroportos();
  }

  salvarAeroportos() {
    const aeroportoLista = [
      {
        aeroportoNome:
          'Aeroporto Internacional de Salvador / Deputado Luis Eduardo Magalhães',
        codigoIATA: 'SSA',
        cidadeNome: 'Salvador',
        estadoNome: 'BA',
      },
      {
        aeroportoNome:
          'Aeroporto Internacional do Rio de Janeiro / Galeão-Antônio Carlos Jobim',
        codigoIATA: 'GIG',
        cidadeNome: 'Rio de Janeiro',
        estadoNome: 'RJ',
      },
      {
        aeroportoNome:
          'Aeroporto Internacional de Porto Alegre / Salgado Filho',
        codigoIATA: 'POA',
        cidadeNome: 'Porto Alegre',
        estadoNome: 'RS',
      },
      {
        aeroportoNome:
          'Aeroporto Internacional de Brasília / Presidente Jucelino Kubitschek',
        codigoIATA: 'BSB',
        cidadeNome: 'Brasília',
        estadoNome: 'DF',
      },
      {
        aeroportoNome: 'Aeroporto Internacional de São Paulo / Congonhas',
        codigoIATA: 'CGH',
        cidadeNome: 'Congonhas',
        estadoNome: 'SP',
      },
      {
        aeroportoNome: 'Aeroporto Internacional de Fortaleza / Pinto Martins',
        codigoIATA: 'FOR',
        cidadeNome: 'Fortaleza',
        estadoNome: 'CE',
      },
    ];
    
      this.aeroportoService.cadastrarAeroportos(aeroportoLista).subscribe({
        next: (resultado) => {
          console.log(resultado);
        },
        error: (e) => console.error(e),
      });
    
  }

  recuperarAeroportos() {
    this.aeroportoService.recuperarAeroportos().subscribe({
      next: (data) => {
        this.aeroportos = data;
      },
      error: (e) => console.log(e),
    });
  }
}
