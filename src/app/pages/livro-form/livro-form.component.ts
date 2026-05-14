import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

import { LivroService } from '../../services/livro.service';
import { Livro } from '../../types/livro';
@Component({
  selector: 'app-livro-form',
  standalone: true,
  imports: [
  ReactiveFormsModule,
  MatInputModule,
  MatButtonModule
],
  templateUrl: './livro-form.component.html',
  styleUrl: './livro-form.component.css'
})
export class LivroFormComponent implements OnInit {

  titulo = 'Cadastrar Livro';
  id?: number;

  formulario = new FormGroup({
  titulo: new FormControl('', [Validators.required, Validators.minLength(3)]),
  autor: new FormControl('', [Validators.required, Validators.minLength(3)]),
  categoria: new FormControl('', [Validators.required]),
  descricao: new FormControl(''),
  preco: new FormControl(0, [
    Validators.required,
    Validators.min(1)
  ]),
  estoque: new FormControl(0, [
    Validators.required,
    Validators.min(0),
    Validators.pattern('^[0-9]+$')
  ]),
  imagem: new FormControl('')
});

  constructor(
    private livroService: LivroService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const idParametro = this.route.snapshot.paramMap.get('id');

    if (idParametro) {
      this.id = Number(idParametro);
      this.titulo = 'Editar Livro';
      this.carregarLivro(this.id);
    }
  }

  carregarLivro(id: number): void {
    this.livroService.buscarPorId(id).subscribe({
      next: (livro) => {
        this.formulario.patchValue({
          titulo: livro.titulo,
          autor: livro.autor,
          categoria: livro.categoria,
          descricao: livro.descricao || '',
          preco: livro.preco,
          estoque: livro.estoque,
          imagem: livro.imagem || '',
        });
      },
      error: (erro) => {
        console.error('Erro ao buscar livro:', erro);
        alert('Erro ao buscar livro.');
      }
    });
  }

  salvar(): void {
    if (this.formulario.invalid) {
      alert('Preencha todos os campos corretamente.');
      return;
    }

    const livro: Livro = {
      titulo: this.formulario.value.titulo!,
      autor: this.formulario.value.autor!,
      categoria: this.formulario.value.categoria!,
      descricao: this.formulario.value.descricao || '',
      preco: Number(this.formulario.value.preco),
      estoque: Number(this.formulario.value.estoque),
      imagem: this.formulario.value.imagem || ''
    };

    if (this.id) {
    livro.id = this.id;

    this.livroService.atualizar(this.id, livro).subscribe({
      next: () => {
        alert('Livro atualizado com sucesso!');
        this.router.navigate(['/livros']);
      },
      error: (erro) => {
        console.error('Erro ao atualizar livro:', erro);
        alert('Erro ao atualizar livro.');
      }
    });
  } else {
    this.livroService.cadastrar(livro).subscribe({
      next: () => {
        alert('Livro cadastrado com sucesso!');
        this.router.navigate(['/livros']);
      },
      error: (erro) => {
        console.error('Erro ao cadastrar livro:', erro);
        alert('Erro ao cadastrar livro.');
      }
    });
  }
}
  cancelar(): void {
    this.router.navigate(['/livros']);
  }

}
      
     