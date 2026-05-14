import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-card-livro',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './card-livro.component.html',
  styleUrl: './card-livro.component.css'
})
export class CardLivroComponent {
  @Input() titulo = '';
  @Input() descricao = '';
  @Input() preco = 0;
  @Input() imagem?: string;
}