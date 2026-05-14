import { Component, OnInit } from '@angular/core';
import { Livro } from '../../types/livro';
import { LivroService } from '../../services/livro.service';
import { CardLivroComponent } from '../../shared/card-livro/card-livro.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardLivroComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  livros: Livro[] = [];

  constructor(private livroService: LivroService) {}

  ngOnInit(): void {
    this.carregarLivros();
  }

  carregarLivros(): void {
    this.livroService.listar().subscribe({
      next: (dados) => {
        this.livros = dados;
      },
      error: (erro) => {
        console.error('Erro ao carregar livros na Home:', erro);
      }
    });
  }
}