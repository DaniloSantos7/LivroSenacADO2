import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livro } from '../types/livro';

@Injectable({
  providedIn: 'root'
})
export class LivroService{
  private readonly API = 'http://localhost:3000/livros';

  constructor(private http: HttpClient) { }

  listar(): Observable<Livro[]>{ // O Observable traz as respostas da nossa requisição HTTP
    return this.http.get<Livro[]>(this.API); //GET
  }

  buscarPorId(id: number): Observable<Livro>{
  return this.http.get<Livro>(`${this.API}/${id}`); //GET/id
  }

  cadastrar(livro: Livro): Observable<Livro> {
    return this.http.post<Livro>(this.API, livro); //POST
  }

  atualizar(id: number, livro: Livro): Observable<Livro> {
      return this.http.put<Livro>(`${this.API}/${id}`, livro); //PUT
  }

  excluir(id: number): Observable<void>{
    return this.http.delete<void>(`${this.API}/${id}`); //DELETE
  }
}