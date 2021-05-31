# Login

Se autenticar na aplicação e receber o `token` de acesso para poder usar as rotinas.

No `payload` do `token` da autenticação haverá a `role` do usuário, então, se for `user` são usuários que foram criados enquanto a aplicação esteve no ar, se for `admin` é o usuário administrador registrado por `default` quando a aplicação se inicia.

## Corpo da Requisição

| PROPRIEDADE | TIPO     | OBRIGATÓRIO | DESCRIÇÃO          |
| ----------- | -------- | :---------: | ------------------ |
| `email`     | `string` |      ✓      | E-mail do usuário. |
| `password`  | `string` |      ✓      | Senha do usuário.  |

## Exemplo de requisição

```
URL = /login

METHOD = POST

HEADERS = { "Content-Type": "application/json" }

BODY = {
  "email": "test@mail.net",
  "password": "somepass"
}

SUCCESS_RESPONSE = {
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJ0ZXN0QGFnaWwubmV0Iiwicm9sZSI6InVzZXIiLCJpYXQiOjE2MjI0OTU3MjAsImV4cCI6MTcwODg5NTcyMH0.7wsOeSVIQHG--6_N7wq1NmSQLBPEgxD9vFL_YyrUWVw"
}

ERROR_RESPONSE = {
  "statusCode": 401,
  "message": "Invalid email or password."
}

```
