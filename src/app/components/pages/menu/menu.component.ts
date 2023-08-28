import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  isADMIN = false;
  logado = false;

  constructor(private router: Router) {   }
  
  ngOnInit(): void {
    const objetoArmazenado = sessionStorage.getItem('Role_ADMIN');
    this.isADMIN = objetoArmazenado !== null ? JSON.parse(objetoArmazenado) : false;
  }

  logar(){
    this.logado = false;
    this.router.navigate(['/login']);
  }

  sair(){
    this.logado = false;
    this.router.navigate(['/home']);
  }
}
