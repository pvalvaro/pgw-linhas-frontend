import { Component, OnInit } from '@angular/core';
import { Passagem } from 'src/app/models/passagem.model';
import { Voo } from 'src/app/models/voo.model';
import { PassagemService } from 'src/app/services/passagem/passagem.service';
import { Preco } from 'src/app/models/preco.model';
import { PrecoService } from 'src/app/services/preco/preco.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VooService } from 'src/app/services/voo-service/voo.service';

@Component({
  selector: 'app-passagem-resumo',
  templateUrl: './passagem-resumo.component.html',
  styleUrls: ['./passagem-resumo.component.css'],
})
export class PassagemResumoComponent implements OnInit {
  passagem: Passagem = new Passagem();
  precos?: Preco[];
  valorBagagemExtra?: number;
  valorAssento?: number;
  total?: number;

  vooEscolhido?: Voo;
  id: any;

  constructor(
    private passagemService: PassagemService,
    private precoService: PrecoService,
    private vooService: VooService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const objetoArmazenado = sessionStorage.getItem('passagem');
    this.passagem =
      objetoArmazenado !== null ? JSON.parse(objetoArmazenado) : new Passagem();

    const vooArmazenado = sessionStorage.getItem('voo');
    this.vooEscolhido =
      vooArmazenado !== null ? JSON.parse(vooArmazenado) : new Voo();
    this.id = this.vooEscolhido?.vooId;

  }
  recuperarPrecos(): void {
    this.precoService.recuperarPrecos().subscribe({
      next: (resultado) => {
        resultado.forEach((element) => {
          if (element.classeNome === this.passagem.classeEscolhida) {
            this.valorAssento = element.valorAssento;
            this.valorBagagemExtra =
              this.passagem.qtdBagagemExtra !== 0
                ? this.calcularValor(element.valorAssento)
                : 0;

            if (this.valorAssento && this.passagem.qtdPassagens)
              this.total =
                (this.valorAssento + this.valorBagagemExtra) *
                this.passagem.qtdPassagens;
          }
        });
      },
      error: (e) => console.log(e),
    });
  }
  calcularValor(valorClass: any) {
    let valor: number = 0;
    let porc = valorClass * 0.1;
    return valor + porc;
  }

  finalizaCompra() {
    this.vooEscolhido;
    this.passagem.localizador = 'PWG'.concat(
      '' + this.passagem.cpfPassageiro + ''
    );
    this.passagem.identificBagagem = 'PWG-'.concat(
      '' + this.passagem.cpfComprador + ''
    );
    this.passagem.dataCompra = new Date();
    this.passagem.statusPassagem = 'Confirmado';
    this.passagem.totalViagem = this.total;
    this.passagemService.comprarPassagem(this.passagem).subscribe({
      next: (resultado) => {        
        this.router.navigate(['home']);
        alert('Passagem comprada com sucesso');
      },
      error: (e) => console.error(e),
    });
  }

  cancelar(){
    this.router.navigate(['/home']);
  }
}
