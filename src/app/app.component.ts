import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'pgw-linhas-frontend';
  
  isLogado = false;

  constructor(private router: Router) { }

  sair(){
    this.router.navigate(['']);
  }
}
