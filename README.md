# VoteSpace

O **VoteSpace** é uma aplicação full stack desenvolvida como entregável para o processo trainee da Atria Jr.

O sistema funciona como um hub de salas de votação, permitindo que usuários criem salas, entrem nelas e participem de votações.

O projeto tem como objetivo consolidar conhecimentos em desenvolvimento web moderno, abrangendo frontend, backend, integração entre APIs, persistência de dados e boas práticas de arquitetura.

Link do Deploy: https://votespace.vercel.app

---

## Tecnologias utilizadas

### Frontend

* Next.js (App Router)
* React
* TypeScript
* Axios
* Tailwind CSS

### Backend

* Node.js
* TypeScript
* Express.js
* Prisma ORM
* JWT (JSON Web Token)
* bcrypt
* CORS

### Banco de dados

* SQL (configurável via Prisma)

---

## Arquitetura do projeto

O projeto está estruturado em duas camadas principais:

```
votespace/
├── backend/   (API REST)
├── frontend/  (Interface web)
```

O frontend consome a API do backend por meio de requisições HTTP.

---

## Autenticação

A autenticação é baseada em JWT:

* Usuário realiza login e recebe um token
* O token é enviado nas requisições protegidas
* Um middleware no backend valida o token e controla o acesso às rotas

---

## Rotas da API (Backend)

### Autenticação

| Método | Rota           | Descrição                       |
| ------ | -------------- | ------------------------------- |
| POST   | /auth/register | Cadastro de usuário             |
| POST   | /auth/login    | Autenticação e geração de token |

### Usuários

| Método | Rota       | Descrição               |
| ------ | ---------- | ----------------------- |
| GET    | /users     | Lista todos os usuários |
| GET    | /users/:id | Busca usuário por ID    |

### Salas (Rooms)

| Método | Rota         | Descrição                  |
| ------ | ------------ | -------------------------- |
| POST   | /rooms       | Criação de sala de votação |
| GET    | /rooms       | Listagem de salas          |
| GET    | /rooms/:slug | Detalhes de uma sala       |
| DELETE | /rooms/:id   | Remoção de sala            |

### Votos

| Método | Rota           | Descrição                  |
| ------ | -------------- | -------------------------- |
| POST   | /votes         | Registro de voto           |
| GET    | /votes/:roomId | Listagem de votos por sala |

---

## Funcionalidades

* Cadastro e autenticação de usuários
* Criação de salas de votação
* Entrada em salas via slug
* Registro de votos
* Contagem de votos por sala
* Proteção de rotas com JWT
* Persistência de dados com Prisma ORM

---

## Como executar o projeto

### Backend

```bash
cd backend
npm install
npx prisma migrate dev
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

---



## Melhorias futuras

* Implementação de WebSockets para atualização em tempo real das votações
* Sistema de permissões (admin de sala)
* Expiração automática de salas

### Melhorias pendentes no frontend

* Edição de salas
* Edição de usuário
* Exclusão de usuário
* Exclusão de sala
* Feedback visual para login com erro
* Feedback visual para cadastro com erro
* Restrição de apenas um voto por usuário (atualmente desabilitada para facilitar a popularização dos dados)

---

## Autor

Desenvolvido por Luiz Bellini
Projeto desenvolvido para processo trainee da Atria Jr.
