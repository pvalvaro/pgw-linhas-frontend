import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Voo } from 'src/app/models/voo.model';
import { VooService } from 'src/app/services/voo-service/voo.service';

@Component({
  selector: 'app-alterar-voo',
  templateUrl: './alterar-voo.component.html',
  styleUrls: ['./alterar-voo.component.css']
})
export class AlterarVooComponent implements OnInit {
  habilitaEco = true;
  habilitaPri = true;
habilitaEx = true
  id: number = 0;

  isEcoChecked? = false;

  voo: Voo = new Voo();
  constructor(
    private vooService: VooService, 
    private router: Router, 
    private activeRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = this.activeRoute.snapshot.params['id'];

    const objetoArmazenado = sessionStorage.getItem('voo');
    this.voo = objetoArmazenado !== null ? JSON.parse(objetoArmazenado) : new Voo();
  }

  alterarVoo(){
    this.vooService.alterarVoo(this.id, this.voo).subscribe( data =>{
      this.recuperarListaVoos();
    }
    , error => console.log(error));
  }

  recuperarListaVoos(){
    this.router.navigate(['/adicionar']);
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
  contadorAssentos?:any;
  onSelectBlurTotalAssento() {
    this.contadorAssentos = this.voo.totalAssentos;
  }

  onSelectBlurAssentos(assento?:any) {
    this.contadorAssentos -= assento;
    if (this.contadorAssentos < 0)
      alert('Total de Assentos excedido');
  }
}
