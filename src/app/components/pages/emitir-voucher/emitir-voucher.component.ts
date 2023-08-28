import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Passagem } from 'src/app/models/passagem.model';

@Component({
  selector: 'app-emitir-voucher',
  templateUrl: './emitir-voucher.component.html',
  styleUrls: ['./emitir-voucher.component.css']
})
export class EmitirVoucherComponent implements OnInit {

  teste = 'teste';
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
    identificBagagem:''
  };

  haveBagagem?:string;
  ticket?: Passagem= {};

  constructor(private router: Router) { }

  ngOnInit(): void {
    const objetoArmazenado = sessionStorage.getItem('voucher');
    this.passagem =
      objetoArmazenado !== null ? JSON.parse(objetoArmazenado) : new Passagem();

      const tickteArmazenado = sessionStorage.getItem('ticket');
    this.ticket =
      tickteArmazenado !== null ? JSON.parse(tickteArmazenado) : null;

      if(this.ticket){
        this.passagem = this.ticket;
      }
  }
  

  emitir(){

  }

}



 