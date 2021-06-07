# Criar tarefa

Criar tarefa a ser feita.

Somente usuários podem criar tarefas, o administrador não.

## Corpo da Requisição

| PROPRIEDADE   | TIPO     | OBRIGATÓRIO | DESCRIÇÃO                                                                              |
| ------------- | -------- | :---------: | -------------------------------------------------------------------------------------- |
| `description` | `string` |      ✓      | Descrição da tarefa.                                                                   |
| `deliveryAt`  | `string` |      ✓      | Data de entrega da tarefa. Deve seguir o seguinte formato: `2021-05-31T20:56:00.000Z`. |

## Exemplo de requisição

```
URL = /todo

METHOD = POST

HEADERS = {
  "Content-Type": "application/json",
  "Authorization": "Bearer sometoken"
}

BODY = {
  "description": "Awesome TODO.",
  "deliveryAt": "2021-05-31T20:56:00.000Z"
}

SUCCESS_RESPONSE = {
  "id": 2
}

ERROR_RESPONSE = {
  "statusCode": 400,
  "message": "Some error"
}

```
