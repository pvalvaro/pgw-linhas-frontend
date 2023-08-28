import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario?: string;
  senha? : string;


  admin = {
    usuario: 'admin',
    senha:'123',
  }
  cliente = {
    usuario: 'cliente',
    senha:'123',
  }


  constructor(private router: Router) {   }

  ngOnInit() {
  }

  login() {
    if(this.usuario === this.admin.usuario && this.senha === this.admin.senha){
      window.sessionStorage.setItem('Role_ADMIN', JSON.stringify(true));
      this.router.navigate(['/home']);     
    }
    if(this.usuario === this.cliente.usuario && this.senha === this.cliente.senha){
      window.sessionStorage.setItem('Role_ADMIN', JSON.stringify(false));
      this.router.navigate(['/home']);
    }
  }
}
