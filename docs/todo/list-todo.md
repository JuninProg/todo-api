# Listar tarefas

Listar tarefas. Se for o usuário autenticado, as tarefas listadas serão somentes as que ele criou, se for o administrador autenticado, todas as tarefas serão listadas.

Combine `afterId` e `limit` para paginar as tarefas recebidas. Onde `afterId` define que somente serão listadas as tarefas com `id` maior que `afterId` e `limit` define o limite de tarefas listadas por vez.

## Exemplo de requisição

```
URL = /todo?limit=2&afterId=1

METHOD = GET

HEADERS = {
  "Authorization": "Bearer sometoken"
}

SUCCESS_RESPONSE = {
  "todos": [
    {
      "id": 2,
      "description": "Awesome TODO.",
      "deliveryAt": "2021-05-31T22:12:00.000Z",
      "completedAt": null,
      "createdAt": "2021-05-31T20:53:12.000Z",
      "updatedAt": "2021-05-31T21:58:54.000Z",
      "userId": 1,
      "userEmail": "test@mail.net",
      "isLate": false
    },
    {
      "id": 3,
      "description": "Other awesome TODO.",
      "deliveryAt": "2021-05-31T20:54:00.000Z",
      "completedAt": "2021-05-31T20:54:35.000Z",
      "createdAt": "2021-05-31T20:53:50.000Z",
      "updatedAt": null,
      "userId": 1,
      "userEmail": "test@mail.net",
      "isLate": false
    }
  ]
}

ERROR_RESPONSE = {
  "statusCode": 400,
  "message": "Some error."
}

```
