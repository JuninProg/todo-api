# Criar Usuário

Criar usuário da aplicação. Seu e-mail é único, então caso haja a tentativa de criar mais de um usuário com o mesmo e-mail a aplicação retornará erro.

## Corpo da Requisição

| PROPRIEDADE | TIPO     | OBRIGATÓRIO | DESCRIÇÃO          |
| ----------- | -------- | :---------: | ------------------ |
| `email`     | `string` |      ✓      | E-mail do usuário. |
| `password`  | `string` |      ✓      | Senha do usuário.   |

## Exemplo de requisição

```
URL = /user

METHOD = POST

HEADERS = { "Content-Type": "application/json" }

BODY = {
  "email": "test@mail.net",
  "password": "somepass"
}

SUCCESS_RESPONSE = {
  "id": 2
}

ERROR_RESPONSE = {
  "statusCode": 400,
  "message": "Email in use by another user: test@mail.net"
}

```
