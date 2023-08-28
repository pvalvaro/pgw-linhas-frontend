import { Component, OnInit } from '@angular/core';
import { Passagem } from 'src/app/models/passagem.model';
import { PassagemService } from 'src/app/services/passagem/passagem.service';
import { Voo } from 'src/app/models/voo.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-comprar-passagem',
  templateUrl: './comprar-passagem.component.html',
  styleUrls: ['./comprar-passagem.component.css'],
})
export class ComprarPassagemComponent implements OnInit {
  passagem: Passagem = {
    nomeComprador: '',
    cpfComprador: '',
    emailComprador: '',
    localizador: '',
    dataNascimentoPassageiro: new Date(),
    classeEscolhida: '',
    qtdBagagemExtra: 0,
    passageiroNome: '',
    cpfPassageiro: '',
    totalViagem: 0,
    origem: '',
    destino: '',
    dataCompra: new Date(),
    statusPassagem: '',
    qtdPassagens: 0,
    dataPartida: new Date(),
    dataChegada: new Date(),
    codigoVoo: '',
    idVoo: 0,
    valorAssento: 0,
    valorBagagemExtra: 0,
    identificBagagem:''
  };

  vooEscolhido?: Voo;
  habilitarFormCompra = false;
  termoPesquisaCpf?: String;
  termoPesquisaCodigo?: String;
  isBagagem = false;
  listaPassageirosZerada = true;
  listaPassagensZerada = true;

  listaPassageiros?: any[];
  listaPassagens?: any[];

  isADMIN = false;
  isZerado = true;
  contadorPassageiros?: number;

  valor?: string;

  constructor(
    private passagemService: PassagemService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const objetoArmazenado = sessionStorage.getItem('voo');
    this.vooEscolhido =
      objetoArmazenado !== null ? JSON.parse(objetoArmazenado) : new Voo();

    if (objetoArmazenado) this.habilitarFormCompra = true;

    const role = sessionStorage.getItem('Role_ADMIN');
    this.isADMIN = role !== null ? JSON.parse(role) : false;
  }

  comprarPassagem() {
    this.passagem = {
      nomeComprador: this.passagem.nomeComprador,
      cpfComprador: this.passagem.cpfComprador,
      emailComprador: this.passagem.emailComprador,
      dataNascimentoPassageiro: this.passagem.dataNascimentoPassageiro,
      classeEscolhida: this.passagem.classeEscolhida,
      qtdBagagemExtra: this.passagem.qtdBagagemExtra,
      passageiroNome: this.passagem.passageiroNome,
      cpfPassageiro: this.passagem.cpfPassageiro,
      origem: this.vooEscolhido?.origem,
      destino: this.vooEscolhido?.destino,
      dataChegada: this.vooEscolhido?.chegada,
      dataPartida: this.vooEscolhido?.partida,
      codigoVoo: this.vooEscolhido?.codigoAviao,
      qtdPassagens: this.passagem.qtdPassagens,
      idVoo: this.vooEscolhido?.vooId,
    };
    this.calcularValorTotal();
    window.sessionStorage.setItem('passagem', JSON.stringify(this.passagem));
    this.habilitarFormCompra = false;
    this.router.navigate(['passagem-resumo']);
  }

  calcularValorTotal() {
    if (this.vooEscolhido?.economica === this.passagem.classeEscolhida) {
      this.calcularValor(
        this.vooEscolhido?.precoAssentoEconomica,
        this.passagem.qtdPassagens,
        this.passagem.qtdBagagemExtra
      );
    }
    if (this.vooEscolhido?.primeira === this.passagem.classeEscolhida) {
      this.calcularValor(
        this.vooEscolhido?.precoAssentoPrimeira,
        this.passagem.qtdPassagens,
        this.passagem.qtdBagagemExtra
      );
    }
    if (this.vooEscolhido?.executiva === this.passagem.classeEscolhida) {
      this.calcularValor(
        this.vooEscolhido?.precoAssentoExecutiva,
        this.passagem.qtdPassagens,
        this.passagem.qtdBagagemExtra
      );
    }
  }
  calcularValor(valorClass: any, qtsPass: any, qtdBagaEx: any) {
    let porc = valorClass * 0.1;
    let passagens = valorClass * qtsPass;
    let totalBagagens = qtdBagaEx * porc;
    let totalPassgem = passagens + totalBagagens;

    this.passagem.valorBagagemExtra = totalBagagens;
    this.passagem.valorAssento = valorClass;
    this.passagem.totalViagem = totalPassgem;
  }

  formRepetitions: { campo: string }[] = [];
  submitForm(index: number) {
    console.log(
      `Formulário ${index + 1} enviado. Valor do campo: ${
        this.formRepetitions[index].campo
      }`
    );
  }

  onSelectBlur() {
    if (!(this.passagem.qtdPassagens === 0)) {
      this.isZerado = false;
      this.contadorPassageiros = this.passagem.qtdPassagens;
    }
  }

  onSelectBlrClasse() {
    if (this.passagem.classeEscolhida)
      alert('Origem e destino não podem ser iguais');
  }

  getCountArray(): number[] {
    return Array(this.contadorPassageiros)
      .fill(0)
      .map((_, index) => index);
  }

  pesquisarPassageiro() {
    if (this.termoPesquisaCpf) {
      this.listaPassagens = [];
      this.listaPassageirosZerada = true;
      this.listaPassagensZerada = false;
      this.passagemService
        .recuperarPassagemCpf(this.termoPesquisaCpf)
        .subscribe(
          (data) => {
            this.listaPassagens = data;
          },
          (error) => {
            console.error(error);
          }
        );
    }

    if (this.termoPesquisaCodigo) {
      this.listaPassageiros = [];
      this.listaPassageirosZerada = false;
      this.listaPassagensZerada = true;
      this.passagemService
        .recuperarPassagemVoo(this.termoPesquisaCodigo)
        .subscribe(
          (data) => {
            this.listaPassageiros = data;
          },
          (error) => {
            console.error(error);
          }
        );
    }
    this.limparForm();
  }

  cancelarCompra(passagem: Passagem) {
    passagem.statusPassagem = 'Cancelado';
    this.listaPassageiros;
    this.passagemService
      .cancelarCompra(passagem?.passagemId, passagem)
      .subscribe((data) => {
        console.log(data);
        this.pesquisarPassageiro();
      });
  }
  desistir() {
    this.router.navigate(['home']);
  }

  limparForm() {
    this.passagem = {
      nomeComprador: '',
      cpfComprador: '',
      emailComprador: '',
      localizador: '',
      dataNascimentoPassageiro: new Date(),
      classeEscolhida: '',
      qtdBagagemExtra: 0,
      passageiroNome: '',
      cpfPassageiro: '',
      totalViagem: 0,
      origem: '',
      destino: '',
      dataCompra: new Date(),
      statusPassagem: '',
      qtdPassagens: 0,
      dataPartida: new Date(),
      dataChegada: new Date(),
      codigoVoo: '',
      idVoo: 0,
      identificBagagem:''
    };

    this.termoPesquisaCpf = '';
    this.termoPesquisaCodigo = '';
  }
}
