import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PessoaService } from '../../services/pessoa.service';
import { FormsModule } from '@angular/forms';
import { NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'app-list-pessoas',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, NgxMaskPipe],
  templateUrl: './list-pessoas.component.html',
  styleUrls: ['./list-pessoas.component.scss']
})
export class ListPessoasComponent {
  pessoas: any[] = [];
  paginaAtual = 0;
  pessoasPorPagina = 5;
  filtroNome = '';

  constructor(private pessoaService: PessoaService) {}

  ngOnInit() {
    this.carregarPessoas();
  }

  carregarPessoas() {
    this.pessoaService.listarPessoas().subscribe(pessoas => {
      this.pessoas = pessoas;
    });
  }

  get pessoasFiltradas() {
    if (!this.filtroNome.trim()) {
      return this.pessoas;
    }
    return this.pessoas.filter(p =>
      p.nome.toLowerCase().includes(this.filtroNome.trim().toLowerCase())
    );
  }

  get pessoasPaginadas() {
    const inicio = this.paginaAtual * this.pessoasPorPagina;
    return this.pessoasFiltradas.slice(inicio, inicio + this.pessoasPorPagina);
  }

  get totalPaginas() {
    return Math.ceil(this.pessoasFiltradas.length / this.pessoasPorPagina);
  }

  proximaPagina() {
    if (this.paginaAtual < this.totalPaginas - 1) {
      this.paginaAtual++;
    }
  }

  paginaAnterior() {
    if (this.paginaAtual > 0) {
      this.paginaAtual--;
    }
  }

  onFiltroNomeChange() {
    this.paginaAtual = 0;
  }

  excluirPessoa(id: number) {
    this.pessoaService.removerPessoa(id).subscribe({
      next: () => this.carregarPessoas(),
      error: err => alert('Erro ao excluir pessoa: ' + err.error)
    });
  }
}
