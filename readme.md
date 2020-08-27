<img alt="GoStack" src="https://storage.googleapis.com/golden-wind/bootcamp-gostack/header-desafios.png" />

<h1 align="center">
<br>
Desafio Nave
</h1>

<p align="center">
Este projeto foi desenvolvido para resolver um desafio proposto por uma empresa de tecnologia, com o objetivo de avaliar as habilidades de React dos candidatos.</p>

<p align="center">
  <a href="https://opensource.org/licenses/MIT">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License MIT">
  </a>
</p>

<div>
  <img src="repo/imgs/image1.png" alt="demo" height="425">
  <img src="repo/imgs/image2.png" alt="demo" height="425">
  <img src="repo/imgs/image3.png" alt="demo" height="425">
  <img src="repo/imgs/image4.png" alt="demo" height="425">
</div>

<hr />

## API

Para o desenvolvimento das funcionalidades dessa aplicação, foi utilizada uma API, que possui algumas funções como login e CRUD.

## Layout

Essa aplicação segue um layout que pode ser acessado em [here](https://www.figma.com/file/II8UDFm2uJFZaD0FOPcinP/Teste-Front-End?node-id=0%3A1).

## Funcionalidades do desafio

### Login

A web app deverá possuir um fluxo de autenticação, onde o usuário só pode acessar as telas internas do sistema (listagem, formulários) passando pela tela de login com as credenciais criadas previamente via Postman.

Para realizar o login, você deve usar a request de `users/login` disponível no postman. Essa request retornará um token do tipo `Bearer` que deverá ser utilizado no header das próximas requisições.

### Listagem

A página inicial da aplicação tera uma lista dos `navers`.

Para listar os `navers`, você deve usar a request de `navers/index` disponível no postman.

### Visualização

Ao clicar em algum `naver` da listagem, o usuário terá uma visualização completa das informações do mesmo.

Para apresentar um único `naver`, você deve usar a request de `navers/show` disponível no postman.
Para excluir um `naver`, você deve usar a request de `navers/delete` disponível no postman.

### Criação/edição

O usuário precisa ter a possibilidade de criar um novo `naver` ou editar um já existente.

Para criar um `naver`, você deve usar a request de `navers/create` disponível no postman.
Para editar um `naver`, você deve usar a request de `navers/update` disponível no postman.

## Testes

- Para rodar os testes use `yarn test`
- Para rodar o relatório de cobertura dos testes rode `yarn test:coverage`

## Getting started

- Clone o projeto > entre na pasta do projeto
- rode `yarn`
- rode `yarn start`

## License

[LICENSE](https://opensource.org/licenses/MIT)

---

Created with passion by me 👨🏻‍💻
