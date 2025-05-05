# API de Gestão de Usuários - N2 - Segurança da Informação (V.2.0)

Esta API foi desenvolvida como parte do projeto N2 de Segurança da Informação e tem como objetivo gerenciar operações CRUD (Criar, Ler, Atualizar, Excluir) para usuários, utilizando **Node.js**, **Express** e **MySQL**.

## Sumário

- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Pré-Requisitos](#pré-requisitos)
- [Instalação e Configuração](#instalação-e-configuração)
  - [Clonando o Repositório](#clonando-o-repositório)
  - [Instalando as Dependências](#instalando-as-dependências)
  - [Configurando o Banco de Dados](#configurando-o-banco-de-dados)
- [Rodando o Servidor](#rodando-o-servidor)
- [Endpoints](#endpoints)
- [Contribuindo](#contribuindo)
- [Licença](#licença)

## Funcionalidades

- Criar usuário
- Listar todos os usuários
- Buscar usuário por ID
- Atualizar usuário
- Deletar usuário

## Tecnologias Utilizadas

- **Node.js** – Ambiente de execução JavaScript
- **Express.js** – Framework web
- **MySQL** – Banco de dados relacional
- **nodemon** – Reinicia automaticamente o servidor durante o desenvolvimento
- **body-parser** – Faz o parsing do JSON enviado em requisições HTTP

## Pré-Requisitos

- [Node.js](https://nodejs.org/) instalado.
- [MySQL](https://www.mysql.com/) instalado e configurado.
- Ferramenta de testes de API, como [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/).

## Instalação e Configuração

### Clonando o Repositório

Clone o repositório e acesse a pasta do projeto:

```bash
git clone https://github.com/jaooduartte/n2-information-security.git
cd n2-information-security
```

### Instalando as Dependências

Instale as dependências com o npm:

```bash
npm install
```

### Colocando a JWT key

Crie o arquivo .env na raiz do projeto

```bash
JWT_SECRET=sua_chave_secreta
```
obs: gere a chave no git bash com o comando

node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

### Configurando o Banco de Dados

1. **Criar o Banco de Dados:**

   Abra o MySQL Workbench ou o terminal MySQL e execute:

   ```sql
   CREATE DATABASE users_db;
   ```

2. **Criar a Tabela de Usuários:**

   Com o banco de dados selecionado, crie a tabela:

   ```sql
   USE users_db;

   CREATE TABLE users (
     id INT AUTO_INCREMENT PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     email VARCHAR(255) NOT NULL UNIQUE,
     password VARCHAR(255) NOT NULL
   );
   ```

3. **Atualizar a Configuração da Conexão:**

   No arquivo [backend/config/db.js](backend/config/db.js), substitua o valor de `password` pela sua senha do MySQL:

   ```javascript
   // filepath: backend/config/db.js
   const mysql = require('mysql2');

   const connection = mysql.createConnection({
     host: 'localhost',
     user: 'root',
     password: 'sua_senha_mysql', // Alterar para sua senha do MySQL
     database: 'users_db'
   });

   connection.connect((err) => {
     if (err) {
       console.error('Erro ao conectar no banco de dados: ' + err.stack);
       return;
     }
     console.log('Conectado ao banco de dados como id ' + connection.threadId);
   });

   module.exports = connection;
   ```

## Rodando o Servidor

Após configurar o banco de dados, inicie o servidor com:

```bash
npm start
```

A API estará disponível em [http://localhost:3000](http://localhost:3000).

## Endpoints

### Criar um Novo Usuário

- **Método:** POST
- **URL:** `/users`
- **Body (JSON):**

  ```json
  {
    "name": "João Duarte",
    "email": "joao@example.com"
  }
  ```

### Obter Todos os Usuários

- **Método:** GET
- **URL:** `/users`

### Buscar um Usuário por ID

- **Método:** GET
- **URL:** `/users/:id`

### Atualizar um Usuário

- **Método:** PUT
- **URL:** `/users/:id`
- **Body (JSON):**

  ```json
  {
    "name": "João Atualizado",
    "email": "joaoatualizado@example.com"
  }
  ```

### Deletar um Usuário

- **Método:** DELETE
- **URL:** `/users/:id`

## Contribuindo

Siga estes passos para contribuir com o projeto:

1. Faça um **fork** do repositório.
2. Crie uma nova **branch** para sua feature:
   ```bash
   git checkout -b minha-feature
   ```
3. Realize suas alterações e commit:
   ```bash
   git commit -am "Adiciona nova feature"
   ```
4. Envie a branch para o repositório:
   ```bash
   git push origin minha-feature
   ```
5. Abra um **pull request** para revisão.

## Licença

Este projeto está licenciado sob a licença ISC. Veja o arquivo [package.json](package.json) para mais informações.
