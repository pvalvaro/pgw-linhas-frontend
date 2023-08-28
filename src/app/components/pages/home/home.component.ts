import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Home } from 'src/app/models/home.model';
import { VooService } from 'src/app/services/voo-service/voo.service';
import { Voo } from 'src/app/models/voo.model';
import { AeroportoService } from 'src/app/services/aeroporto/aeroporto.service';
import { Aeroporto } from 'src/app/models/aeroporto.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  home:Home = {
    origem: '',
    destino: '',
    datapartida: ''
  }
  
  voos?: Voo[];
  vooBusca?: Voo;
  listaAeroportos?:[];
  aeroportos?: Aeroporto[];

  isADMIN = false;
  logar = false;

  constructor(private vooService: VooService, 
    private aeroportoService: AeroportoService,
     private router: Router) { }

    
   ngOnInit(): void {
     const objetoArmazenado = sessionStorage.getItem('Role_ADMIN');
     this.isADMIN = objetoArmazenado !== null ? JSON.parse(objetoArmazenado) : false;
     this.recuperarAeroportos();
  }

  onSelectBlur() {
    if(this.home.origem === this.home.destino)
      alert('Origem e destino não podem ser iguais');
  }

  validacoes() {
    this.home.origem === '' ? alert('Local de Origem não informado') : false;
    this.home.destino === '' ? alert('Local de Destino não informado') : false;
    this.home.datapartida === '' ? alert('Data não informada') : false;
    
    return true;
  }

  pesquisarVoos(){
    const filtro = {
      origem:this.home.origem,
      destino:this.home.destino,
      datapartida:this.home.datapartida
    };  
    
    
//if(this.validacoes()){
    this.vooService.recuperarVoos().subscribe({
      next:(resultado) => {
        let resultFiltro = [];
        for(let vo of resultado){
         /* const horaMinutoPartida = vo.partida.slice(11, 16);
          const horaMinutoChegada = vo.chegada.slice(11, 16);
          
          const dataSemHoras = vo.partida.slice(0, 10);

          vo.horaPartida = horaMinutoPartida;
          vo.horaChegada = horaMinutoChegada;*/
          if(filtro.datapartida === vo.partida)
            resultFiltro.push(vo);
        }
        if(resultFiltro.length > 0){  
          this.voos = resultFiltro;
        }else{
          alert("Nenhum voo programado para essa data");
        }
      },
      error:(e) => console.log(e)
    });
  //}
  }
  comprar(voo: Voo){
    voo.destino = this.home.destino;
    voo.origem = this.home.origem;
    window.sessionStorage.setItem('voo', JSON.stringify(voo));
    this.router.navigate(['comprar']);
  }

  recuperarAeroportos() {
    this.aeroportoService.recuperarAeroportos().subscribe({
      next: (data) => {
        this.aeroportos = data;
      },
      error: (e) => console.log(e),
    });
  }

  infoPassagens(){
    this.router.navigate(['info-passagens']);
  }
  infoVoos(){
    this.router.navigate(['adicionar']);
  }
  infoPrecos(){
    this.router.navigate(['preco']);
  }
  infoAeroporto(){
    this.router.navigate(['aeroporto']);
  }
}
