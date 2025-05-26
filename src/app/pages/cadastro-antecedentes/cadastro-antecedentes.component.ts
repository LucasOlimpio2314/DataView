import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';

type Antecedente = {
  id?: number;
  local: string;
  horario: string;
  descricao: string;
  data: string;
  pessoa_id?: number; // se for necessário no futuro
};

@Component({
  selector: 'app-cadastro-antecedente',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxMaskDirective],
  templateUrl: './cadastro-antecedentes.component.html',
  styleUrl: './cadastro-antecedentes.component.scss'
})
export class CadastroAntecedenteComponent {
  @Input() antecedente!: Antecedente;

  novoAntecedente: Antecedente = {
    local: '',
    horario: '',
    descricao: '',
    data: ''
  };

  @Output() salvar = new EventEmitter<Antecedente>();
  @Output() cancelar = new EventEmitter<void>();

  antecedenteSelecionado: Antecedente | null = null;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['antecedente'] && changes['antecedente'].currentValue) {
      this.novoAntecedente = { ...changes['antecedente'].currentValue };
    } else {
      this.novoAntecedente = { local: '', horario: '', descricao: '', data: '' };
    }
  }

  onSalvar() {
    const ant = { ...this.novoAntecedente };
    // Só adiciona id se estiver editando
    if (this.antecedente && this.antecedente.id) {
      ant.id = this.antecedente.id;
    } else {
      delete ant.id;
    }
    this.salvar.emit(ant);
    this.novoAntecedente = { local: '', horario: '', descricao: '', data: '' };
  }

  onCancelar() {
    this.cancelar.emit();
  }
}
