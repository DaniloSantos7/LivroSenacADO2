import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Livro } from '../../types/livro';
import { LivroService } from '../../services/livro.service';

@Component({
  selector: 'app-livro-listagem',
  standalone: true,
  imports: [],
  templateUrl: './livro-listagem.component.html',
  styleUrl: './livro-listagem.component.css'
})
export class LivroListagemComponent implements OnInit {

  livros: Livro[] = []; //Guara a lista de livros vinda da API

  constructor(
    private livroService: LivroService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.carregarLivros();
  }

  carregarLivros(): void {
    this.livroService.listar().subscribe({
      next: (dados) => {
        this.livros = dados;
      },
      error: (erro) => {
        console.error('Erro ao carregar livros:', erro);
        alert('Erro ao carregar livros.');
      }
    });
  }

  incluirLivro(): void {
    this.router.navigate(['/livros/incluir']);
  }

  editarLivro(id: number): void {
    this.router.navigate(['/livros/editar', id]);
  }

  excluirLivro(id: number): void {
    const confirmar = confirm('Deseja realmente excluir este livro?');

    if (confirmar) {
      this.livroService.excluir(id).subscribe({
        next: () => {
          alert('Livro excluído com sucesso!');
          this.carregarLivros();
        },
        error: (erro) => {
          console.error('Erro ao excluir livro:', erro);
          alert('Erro ao excluir livro.');
        }
      });
    }
  }
}