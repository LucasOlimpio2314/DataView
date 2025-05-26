import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private router: Router) {}

  irParaArquivos() {
    this.router.navigate(['/arquivos']);
  }

  irParaPessoas() {
    this.router.navigate(['/pessoas']);
  }
}
