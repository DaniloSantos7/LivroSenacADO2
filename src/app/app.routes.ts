import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LivroListagemComponent } from './pages/livro-listagem/livro-listagem.component';
import { LivroFormComponent } from './pages/livro-form/livro-form.component';
import { SobreComponent } from './pages/sobre/sobre.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent,
    title: 'Home'
  },
  {
    path: 'livros',
    component: LivroListagemComponent,
    title: 'Listagem de Livros'
  },
  {
    path: 'livros/incluir',
    component: LivroFormComponent,
    title: 'Cadastrar Livro'
  },
  {
    path: 'livros/editar/:id',
    component: LivroFormComponent,
    title: 'Editar Livro'
  },
  {
    path: 'sobre',
    component: SobreComponent,
    title: 'Sobre'
  }
];