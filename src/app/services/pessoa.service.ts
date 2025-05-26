import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PessoaService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient) {}

  // Pessoas
  listarPessoas(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/pessoas`);
  }

  getPessoaPorId(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/pessoas/${id}`);
  }

  cadastrarPessoa(pessoa: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/pessoas`, pessoa);
  }

  atualizarPessoa(id: number, pessoa: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/pessoas/${id}`, pessoa);
  }

  removerPessoa(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/pessoas/${id}`);
  }

  // Antecedentes
  listarAntecedentes(pessoaId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/pessoas/${pessoaId}/antecedentes`);
  }

  cadastrarAntecedente(antecedente: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/antecedentes`, antecedente);
  }

  atualizarAntecedente(id: number, antecedente: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/antecedentes/${id}`, antecedente);
  }

  removerAntecedente(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/antecedentes/${id}`);
  }
}


