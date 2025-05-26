import { Routes } from '@angular/router';
import { ListPessoasComponent } from './pages/list-pessoas/list-pessoas.component';
import { CadastroPessoaComponent } from './pages/cadastro-pessoa/cadastro-pessoa.component';
import { ArquivosComponent } from './pages/arquivos/arquivos.component';

export const routes: Routes = [
  { path: 'pessoas', component: ListPessoasComponent },
  { path: '', redirectTo: '/pessoas', pathMatch: 'full' },
  { path: 'cadastro', component: CadastroPessoaComponent },
  { path: 'cadastro/:id', component: CadastroPessoaComponent },
  { path: 'arquivos', component: ArquivosComponent }
];