# Completar tarefa

Marcar tarefa como feita.

Somente o usuário que criou a tarefa pode marcá-la como feita, o administrador não pode.

## Exemplo de requisição

```
URL = /todo/1/complete

METHOD = POST

HEADERS = {
  "Authorization": "Bearer sometoken"
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
