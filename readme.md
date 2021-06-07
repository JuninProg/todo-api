# Todo-API

API feita em NestJs para administrar tarefas a fazer. Usa Mysql como banco de dados, Typescript e Autenticação via JWT.

## Como instalar?

1. Copie o repositório;
2. Rode `npm install` para instalar as dependências;
3. Copie o `.env.example` para o arquivo `.env` na pasta root do repositório e popule os dados;
4. Rode `docker-compose up` para criar a instância do Mysql junto com as migrations da aplicação;
5. Se for usar em desenvolvimento rode: `npm run dev`;
6. Se for usar em produção rode: `npx tsc` e `npm run prod`.

## Rotas

| URL                        | MÉTODO | CABEÇALHOS                                                                      | DESCRIÇÃO                                                                                      |
| -------------------------- | ------ | ------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| `/login`                   | `POST` | `{ "Content-Type" : "application/json" }`                                       | Se autenticar na aplicação e receber `token` de acesso. [Mais detalhes](./docs/auth/login.md). |
| `/user`                    | `POST` | `{ "Content-Type" : "application/json" }`                                       | Criar usuário da aplicação. [Mais detalhes](./docs/user/create-user.md)                        |
| `/todo`                    | `POST` | `{ "Content-Type" : "application/json", "Authorization" : "Bearer sometoken" }` | Criar tarefa. [Mais detalhes](./docs/todo/create-todo.md)                                      |
| `/todo/${todoId}`          | `POST` | `{ "Content-Type" : "application/json", "Authorization" : "Bearer sometoken" }` | Atualizar tarefa. [Mais detalhes](./docs/todo/update-todo.md)                                  |
| `/todo/${todoId}/complete` | `POST` | `{ "Authorization" : "Bearer sometoken" }`                                      | Marcar tarefa como feita. [Mais detalhes](./docs/todo/complete-todo.md)                        |
| `/todo`                    | `GET`  | `{ "Authorization" : "Bearer sometoken" }`                                      | Listar tarefas. [Mais detalhes](./docs/todo/list-todo.md)                                      |
