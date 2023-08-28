import { Component, OnInit } from '@angular/core';
import { Passagem } from 'src/app/models/passagem.model';
import { PassagemService } from 'src/app/services/passagem/passagem.service';
import { Voo } from 'src/app/models/voo.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-consultar-passagem',
  templateUrl: './consultar-passagem.component.html',
  styleUrls: ['./consultar-passagem.component.css']
})
export class ConsultarPassagemComponent implements OnInit {

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
    idVoo: 0
  };

  vooEscolhido?:Voo;
  habilitarFormCompra = false;
  termoPesquisaCpf?:String;
  termoPesquisaCodigo?:String;
  isBagagem = false;
  listaPassageirosZerada = true;
  listaPassagensZerada = true;

  listaPassageiros?: any[];
  listaPassagens?: any[];

  isADMIN = false;
  isZerado = true;
  contadorPassageiros?:number;

  constructor(private passagemService: PassagemService,
     private router: Router, 
     private activeRoute: ActivatedRoute) { }

  ngOnInit(): void {
    const objetoArmazenado = sessionStorage.getItem('voo');
    this.vooEscolhido = objetoArmazenado !== null ? JSON.parse(objetoArmazenado) : new Voo();

    if(objetoArmazenado)
      this.habilitarFormCompra = true;
    
    const role = sessionStorage.getItem('Role_ADMIN');
    this.isADMIN = role !== null ? JSON.parse(role) : false;
  }

  comprarPassagem(){
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
      qtdPassagens:this.passagem.qtdPassagens,
      idVoo: this.vooEscolhido?.vooId
    };
    window.sessionStorage.setItem('passagem', JSON.stringify(this.passagem));
    sessionStorage.removeItem('voo');
    this.habilitarFormCompra = false;
    this.router.navigate(['passagem-resumo']);  
  }

  onSelectBlur() {
    if(!(this.passagem.qtdPassagens === 0)){
      this.isZerado = false;
      this.contadorPassageiros = this.passagem.qtdPassagens;
    }
  }
  
  onSelectBlrClasse(){
    if(this.passagem.classeEscolhida )
    alert('Origem e destino não podem ser iguais');
  }

  counterArray(count?: number): number[] {
    return new Array(count);
  }

  pesquisarPassageiro() {
    if(this.termoPesquisaCpf){
      this.listaPassagens =[];
      this.listaPassageirosZerada = true;
      this.listaPassagensZerada = false;
      this.passagemService.recuperarPassagemCpf(this.termoPesquisaCpf).subscribe(
        (data) => {
          this.listaPassagens = data;
        },
        (error) => {
          console.error(error);
        }
      );
    }
    
    if(this.termoPesquisaCodigo){
        this.listaPassageiros =[];
        this.listaPassageirosZerada = false;
        this.listaPassagensZerada = true;
        this.passagemService.recuperarPassagemVoo(this.termoPesquisaCodigo).subscribe(
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


  emitirVoucher(passagem:Passagem){
    window.sessionStorage.setItem('voucher', JSON.stringify(passagem));
    sessionStorage.removeItem('ticket');
    this.router.navigate(['voucher']);
  }
  emitirEtiqueta(passagem:Passagem){
    sessionStorage.removeItem('voucher');
    window.sessionStorage.setItem('ticket', JSON.stringify(passagem));
    this.router.navigate(['voucher']);
  }

  cancelarCompra(passagem:Passagem){
    passagem.statusPassagem = "Cancelado";
    this.listaPassageiros;
    this.passagemService.cancelarCompra(passagem?.passagemId, passagem).subscribe( data => {
      console.log(data);
      this.pesquisarPassageiro();
    })
  }
  desistir(){
    this.router.navigate(['home']);
  }

  limparForm(){
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
      idVoo: 0
    };

    this.termoPesquisaCpf = '';
    this.termoPesquisaCodigo = '';
  }

}
