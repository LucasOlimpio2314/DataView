import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { PessoaService } from '../../services/pessoa.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { CadastroAntecedenteComponent } from '../cadastro-antecedentes/cadastro-antecedentes.component';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

type Antecedente = {
  id?: number;
  local: string;
  horario: string;
  descricao: string;
  data: string;
};

@Component({
  selector: 'app-cadastro-pessoa',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    CadastroAntecedenteComponent,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  templateUrl: './cadastro-pessoa.component.html',
  styleUrls: ['./cadastro-pessoa.component.scss']
})
export class CadastroPessoaComponent {
  pessoa: any = {
    nome: '',
    nascimento: '',
    genero: '',
    cpf: '',
    rg: '',
    mae: '',
    pai: '',
    conjuge: '',
    endereco: '',
    numero: '',
    bairro: '',
    cidade: '',
    estado: '',
    cep: '',
    antecedentes: [] as Antecedente[]
  };

  antecedentesPagina = 0;
  indiceEdicao: number | null = null;
  indiceAntecedenteEditando: number | null = null;
  mostrarCadastroAntecedente = false;
  antecedenteSelecionado: Antecedente | null = null;
  mostrarVisualizarAntecedente = false;

  constructor(
    private route: ActivatedRoute,
    private pessoaService: PessoaService,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.indiceEdicao = +id;
      this.pessoaService.getPessoaPorId(this.indiceEdicao).subscribe(pessoaExistente => {
        if (pessoaExistente) {
          // Ajuste apenas o campo nascimento para o formato YYYY-MM-DD
          let nascimentoAjustado = pessoaExistente.nascimento;
          if (nascimentoAjustado && nascimentoAjustado.length > 10) {
            nascimentoAjustado = nascimentoAjustado.substring(0, 10);
          }
          this.pessoa = {
            nome: pessoaExistente.nome || '',
            nascimento: nascimentoAjustado || '',
            genero: pessoaExistente.genero || '',
            cpf: pessoaExistente.cpf || '',
            rg: pessoaExistente.rg || '',
            mae: pessoaExistente.mae || '',
            pai: pessoaExistente.pai || '',
            conjuge: pessoaExistente.conjuge || '',
            endereco: pessoaExistente.endereco || '',
            numero: pessoaExistente.numero || '',
            bairro: pessoaExistente.bairro || '',
            cidade: pessoaExistente.cidade || '',
            estado: pessoaExistente.estado || '',
            cep: pessoaExistente.cep || '',
            antecedentes: []
          };
          this.pessoaService.listarAntecedentes(this.indiceEdicao!).subscribe(ants => {
            this.pessoa.antecedentes = ants;
          });
        }
      });
    }
  }

  get antecedentesPaginados() {
    const inicio = this.antecedentesPagina * 2;
    return this.pessoa.antecedentes.slice(inicio, inicio + 2);
  }

  get totalPaginasAntecedentes(): number {
    return Math.ceil(this.pessoa.antecedentes.length / 2);
  }

  proximaPaginaAntecedentes() {
    if ((this.antecedentesPagina + 1) * 2 < this.pessoa.antecedentes.length) {
      this.antecedentesPagina++;
    }
  }

  paginaAnteriorAntecedentes() {
    if (this.antecedentesPagina > 0) {
      this.antecedentesPagina--;
    }
  }

  abrirCadastroAntecedente() {
    this.mostrarCadastroAntecedente = true;
  }

  adicionarAntecedente(ant: Antecedente) {
    if (!this.indiceEdicao) {
      // Pessoa ainda não cadastrada, salva localmente
      this.pessoa.antecedentes.push(ant);
      this.mostrarCadastroAntecedente = false;
      return;
    }
    // Pessoa já cadastrada, salva no banco
    const antecedenteComPessoa = { ...ant, pessoa_id: this.indiceEdicao };
    this.pessoaService.cadastrarAntecedente(antecedenteComPessoa).subscribe({
      next: () => {
        this.pessoaService.listarAntecedentes(this.indiceEdicao!).subscribe(ants => {
          this.pessoa.antecedentes = ants;
          this.mostrarCadastroAntecedente = false;
        });
      },
      error: err => alert('Erro ao salvar antecedente: ' + err.error)
    });
  }

  abrirVisualizarAntecedente(ant: Antecedente) {
    this.indiceAntecedenteEditando = this.pessoa.antecedentes.indexOf(ant);
    ant.data = this.formatarDataParaInput(ant.data);
    this.antecedenteSelecionado = { ...ant };
    this.mostrarVisualizarAntecedente = true;
  }

    salvarEdicaoAntecedente(ant: Antecedente) {
  console.log('Enviando para atualização:', ant);

  if (!ant.local || !ant.horario || !ant.descricao || !ant.data) {
    alert('Todos os campos devem estar preenchidos.');
    return;
  }

  if (this.indiceEdicao == null || ant.id == null) {
    if (this.indiceAntecedenteEditando !== null && this.indiceAntecedenteEditando > -1) {
      this.pessoa.antecedentes[this.indiceAntecedenteEditando] = { ...ant };
    }
    this.mostrarVisualizarAntecedente = false;
    this.indiceAntecedenteEditando = null;
    return;
  }

  this.pessoaService.atualizarAntecedente(ant.id, ant).subscribe({
    next: () => {
      this.pessoaService.listarAntecedentes(this.indiceEdicao!).subscribe(ants => {
        this.pessoa.antecedentes = ants;
        this.mostrarVisualizarAntecedente = false;
        this.indiceAntecedenteEditando = null;
      });
    },
    error: err => {
      console.error('Erro ao atualizar:', err);
      alert('Erro ao atualizar antecedente: ' + (err.error?.message || err.message || 'Erro desconhecido'));
    }
  });
}


  excluirAntecedente(id?: number) {
    if (!id) return;
    this.pessoaService.removerAntecedente(id).subscribe({
      next: () => {
        this.pessoaService.listarAntecedentes(this.indiceEdicao!).subscribe(ants => {
          this.pessoa.antecedentes = ants;
        });
      },
      error: err => alert('Erro ao excluir antecedente: ' + err.error)
    });
  }

  salvar(form: NgForm) {
    if (form.invalid) {
      Object.values(form.controls).forEach(control => control.markAsTouched());
      alert('Preencha todos os campos obrigatórios!');
      return;
    }
    // Checagem extra para nascimento
    if (!this.pessoa) {
      alert('Nome ,Data de nascimento, Genero e CPF Obrigatórios!');
      return;
    }
    const { antecedentes, ...pessoaSemAntecedentes } = this.pessoa;
    pessoaSemAntecedentes.numero = Number(pessoaSemAntecedentes.numero);

    if (this.indiceEdicao) {
      // Atualizar pessoa existente
      this.pessoaService.atualizarPessoa(this.indiceEdicao, pessoaSemAntecedentes).subscribe({
        next: () => this.router.navigate(['/pessoas']),
        error: err => alert('Erro ao atualizar: ' + (err.error?.error?.sqlMessage || err.message))
      });
    } else {
      // Cadastrar nova pessoa
      this.pessoaService.cadastrarPessoa(pessoaSemAntecedentes).subscribe({
        next: () => this.router.navigate(['/pessoas']),
        error: err => alert('Erro ao cadastrar: ' + (err.error?.error?.sqlMessage || err.message))
      });
    }
  }

  voltar() {
    this.location.back();
  }

  formatarDataParaInput(data: string): string {
  const d = new Date(data);
  if (isNaN(d.getTime())) return '';
  return d.toISOString().split('T')[0]; // Converte para "YYYY-MM-DD"
}

}

