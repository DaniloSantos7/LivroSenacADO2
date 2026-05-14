export interface Livro{
    id?: number; //Não orbigatório na hora do cadastro
    titulo: string;
    autor: string;
    categoria: string;
    preco: number;
    estoque: number;
    descricao?: string; //Não obrigatório na hora dop cadastro
    imagem?: string; // Não obrigatório na hora do cadastro
}