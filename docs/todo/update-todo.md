# Atualizar tarefa

Atualizar tarefa a ser feita. Deve-se atualizar ao menos uma das propriedades possíveis.

O usuário só pode atualizar as suas tarefas. O administrador não pode atualizar nenhuma tarefa.

## Corpo da Requisição

| PROPRIEDADE   | TIPO     | OBRIGATÓRIO | DESCRIÇÃO                                                                             |
| ------------- | -------- | :---------: | ------------------------------------------------------------------------------------- |
| `description` | `string` |             | Descrição da tarefa.                                                                  |
| `deliveryAt`  | `string` |             | Data de entrega da tarefa. Deve seguir o seguinte format: `2021-05-31T20:56:00.000Z`. |

## Exemplo de requisição

```
URL = /todo/1

METHOD = POST

HEADERS = {
  "Content-Type": "application/json",
  "Authorization": "Bearer sometoken"
}

BODY = {
  "description": "Awesome TODO."
}

SUCCESS_RESPONSE = {
  "id": 1,
  "description": "other desc.",
  "deliveryAt": "2021-05-31T22:12:00.000Z",
  "completedAt": null,
  "createdAt": "2021-05-31T20:53:12.000Z",
  "updatedAt": "2021-05-31T21:58:31.828Z"
}

ERROR_RESPONSE = {
  "statusCode": 400,
  "message": "Todo is already completed."
}

```
