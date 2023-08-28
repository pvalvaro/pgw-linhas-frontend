import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preco } from 'src/app/models/preco.model';
import { PrecoService } from 'src/app/services/preco/preco.service';

@Component({
  selector: 'app-preco',
  templateUrl: './preco.component.html',
  styleUrls: ['./preco.component.css']
})
export class PrecoComponent implements OnInit {

  preco: Preco = {
    classeNome: '',
    valorAssento: 0,
    qtdAssentos: 0,
  };

  submetido = false;
  habilitarAlterar = false;
  habilitarTabela = false;

  idPrecoSelecionado: number = 0;

  precos?: Preco[];
  precoAlterar?:Preco;

  idPrecoAlterar?:number;

  constructor(private precoService: PrecoService,
    private router: Router) { }

  ngOnInit(): void {
    this.recuperarPrecos();
  }

  cadastrarPreco(): void{
    const data = {
      classeNome: this.preco.classeNome,
      valorAssento: this.preco.valorAssento,
      qtdAssentos: this.preco.qtdAssentos,
    };
    this.precoService.cadastrarPrecos(data)
    .subscribe({
      next:(resultado) => {
        console.log(resultado);
        this.limparForm();
        this.recuperarPrecos();
      },
      error: (e) => console.error(e)
    });
  }

  recuperarPrecos():void{
    this.precoService.recuperarPrecos()
      .subscribe({
        next:(data) => {
          this.precos = data;
          if(this.precos)
            this.habilitarTabela = true;
        },
        error:(e) => console.log(e)
      });
  }

  abrirAlterar(precoTabela?: Preco){
    this.habilitarAlterar = true;
    this.idPrecoAlterar = precoTabela?.classeId;
    this.preco = {
      classeNome: precoTabela?.classeNome,
      valorAssento: precoTabela?.valorAssento,
      qtdAssentos: precoTabela?.qtdAssentos
    };
  }

  alterarPreco(){
    this.precoService.alterarPreco(this.idPrecoAlterar, this.preco).subscribe( data =>{
      this.recuperarPrecos();
      this.habilitarAlterar = false;
      this.limparForm();
    }
    , error => console.log(error));
  }

  limparForm(){
    this.habilitarTabela = false;
    this.preco = {
      classeNome: '',
      valorAssento: 0,
      qtdAssentos: 0,
    };
  }
}
