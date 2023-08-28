import { Component, OnInit } from '@angular/core';
import { Voo } from 'src/app/models/voo.model';
import { VooService } from 'src/app/services/voo-service/voo.service';
import { Router } from '@angular/router';
import { Aeroporto } from 'src/app/models/aeroporto.model';
import { AeroportoService } from 'src/app/services/aeroporto/aeroporto.service';
import { Preco } from 'src/app/models/preco.model';
import { PrecoService } from 'src/app/services/preco/preco.service';

@Component({
  selector: 'app-adicionar-voo',
  templateUrl: './adicionar-voo.component.html',
  styleUrls: ['./adicionar-voo.component.css'],
})
export class AdicionarVooComponent implements OnInit {
  voo: Voo = {
    codigoAviao: '',
    partida: '',
    chegada: '',
    totalAssentos: 0,
    status: '',
    destino: '',
    origem: '',
    economica: '',
    executiva: '',
    primeira: '',
    qtdAssentoPrimeira: 0,
    qtdAssentoExecutiva: 0,
    qtdAssentoEconomica: 0,
    precoAssentoPrimeira: 0,
    precoAssentoExecutiva: 0,
    precoAssentoEconomica: 0,
  };

  precos?: Preco[];

  opcoesSelecionadas: any[] = [];
  listCodigovoos = [
    { cod: 'GOL-99' },
    { cod: 'GFT-90' },
    { cod: 'TAM-00' },
    { cod: 'TAAG10' },
    { cod: 'GOL9' },
    { cod: 'VR1000' },
  ];
  classes = [
    { tipo: 'Economica', selecionada: false },
    { tipo: 'Primeira', selecionada: false },
    { tipo: 'Executiva', selecionada: false },
  ];

  dataHoraPartida?: string;
  dataHoraChegada?: string;
  submetido = false;
  aeroportos?: Aeroporto[];
  habilitaEco = true;
  habilitaPri = true;
habilitaEx = true;
  voos?: Voo[];
  selectedDate: Date | null = null;

  
  constructor(
    private vooService: VooService,
    private router: Router,
    private aeroportoService: AeroportoService,
    private precoService: PrecoService
  ) {}


  precoVoo: any = {};
  contadorAssentos?:any;
  ngOnInit(): void {
    this.recuperarVoos();
    this.recuperarAeroportos();
    this.recuperarPrecos();
  }

  onSelectBlur() {
    if (this.voo.origem === this.voo.destino)
      alert('Origem e destino não podem ser iguais');
  }

  doSomething(event:any, classe?:any){
    switch (classe) {
      case 'Economica':
        this.voo.economica = event.target.checked==true ? classe : null;
        this.habilitaEco = this.voo.economica ? false:true;
        break;
      case 'Primeira':
         this.voo.primeira = event.target.checked==true ? classe : null;
         this.habilitaPri = this.voo.primeira ? false:true;
        break;
      case 'Executiva':
         this.voo.executiva = event.target.checked==true ? classe : null;
         this.habilitaEx = this.voo.executiva ? false:true;
        break;
      default:
        break;
    }
  }
  onSelectBlurTotalAssento() {
    this.contadorAssentos = this.voo.totalAssentos;
  }
  onSelectBlurAssentos(assento?:any) {
    this.contadorAssentos -= assento;
    if (this.contadorAssentos < 0)
      alert('Total de Assentos excedido');
  }
  
  cadastrarVoo(): void {
   /* if (this.precos) {
      for (let preco of this.precos) {
        if (preco.classeNome === this.voo.classeEscolhida)
          this.voo.valorAssento = preco.valorAssento;
      }
    }*/
    const vooNovo = {
      codigoAviao: this.voo.codigoAviao,
      partida: this.voo.partida,
      chegada: this.voo.chegada,
      horaPartida: this.voo.horaPartida,
      horaChegada: this.voo.horaChegada,
      totalAssentos: this.voo.totalAssentos,
      status: 'Confirmado',
      destino: this.voo.destino,
      origem: this.voo.origem,
      economica: this.voo.economica,
      executiva: this.voo.executiva,
      primeira: this.voo.primeira,
      qtdAssentoPrimeira: this.voo.qtdAssentoPrimeira,
      qtdAssentoExecutiva: this.voo.qtdAssentoExecutiva,
      qtdAssentoEconomica: this.voo.qtdAssentoEconomica,
      precoAssentoPrimeira: this.voo.precoAssentoPrimeira,
      precoAssentoExecutiva: this.voo.precoAssentoExecutiva,
      precoAssentoEconomica: this.voo.precoAssentoEconomica
    };

    this.limparformulario();
    this.vooService.cadastrarVoo(vooNovo).subscribe({
      next: (res) => {
        console.log(res);
        this.submetido = true;
        this.recuperarVoos();
      },
      error: (e) => console.error(e),
    });
  }

  recuperarPrecos(): void {
    this.precoService.recuperarPrecos().subscribe({
      next: (resultado) => {
        this.precos = resultado;
        this.combinarObjetos();
      },
      error: (e) => console.log(e),
    });
  }

  recuperarVoos(): void {
    this.vooService.recuperarVoos().subscribe({
      next: (data) => {
        this.voos = data;
      },
      error: (e) => console.log(e),
    });
  }
  alterarVoo(id?:number, voo?: Voo) {
    window.sessionStorage.setItem('voo', JSON.stringify(voo)); 
    this.router.navigate(['alterar-voo', id]);
  }
  cancelarVoo(id?: number, voo?: Voo) {
    this.vooService.cancelarVoo(id, voo).subscribe((data) => {
      console.log(data);
      this.recuperarVoos();
    });
  }

  combinarObjetos() {
    if (this.voos && this.precos) {
    }
  }
  limparformulario(): void {
    this.submetido = false;
    this.voo = {
      codigoAviao: '',
      partida: '',
      chegada: '',
      totalAssentos: 0,
      status: '',
      destino: '',
      origem: '',
      economica: '',
      executiva: '',
      primeira: '',
      qtdAssentoPrimeira: 0,
      qtdAssentoExecutiva: 0,
      qtdAssentoEconomica: 0,
      precoAssentoPrimeira: 0,
      precoAssentoExecutiva: 0,
      precoAssentoEconomica: 0,
    };
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
