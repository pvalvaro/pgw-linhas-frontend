import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Voo } from 'src/app/models/voo.model';
import { VooService } from 'src/app/services/voo-service/voo.service';

@Component({
  selector: 'app-listar-voo',
  templateUrl: './listar-voo.component.html',
  styleUrls: ['./listar-voo.component.css']
})
export class ListarVooComponent implements OnInit {

  voos?: Voo[];

  constructor(private vooService: VooService,
    private router: Router) { }

  ngOnInit(): void {
    this.recuperarVoos();
  }

  recuperarVoos():void{
    this.vooService.recuperarVoos()
      .subscribe({
        next:(data) => {
          this.voos = data;
        },
        error:(e) => console.log(e)
      });
  }

  alterarVoo(id?: number, voo?:Voo){
    this.router.navigate(['alterar-voo', id]);
  }

  cancelarVoo(id?: number, voo?: Voo){
    this.vooService.cancelarVoo(id, voo).subscribe( data => {
      console.log(data);
      this.recuperarVoos();
    })
  }
}
