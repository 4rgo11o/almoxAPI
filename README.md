Tecnologias Utilizadas

Node.js
Express.js
Sequelize (ORM)
PostgreSQL (ou outro banco de dados relacional suportado pelo Sequelize)


1. Recuperar Entradas de um Usuário
Endpoint: GET /entradas/usuario/{id}

Exemplo de Requisição:
GET /entradas/usuario/1

Exemplo de Resposta
{
  "usuario": {
    "id": 1,
    "nome": "João Silva",
    "almoxarifado": "Almoxarifado Central"
  },
  "entradas": [
    {
      "id_entrada": 101,
      "data_entrada": "2024-10-06T10:00:00.000Z",
      "fornecedor": {
        "id": 5,
        "nome": "Fornecedor XYZ",
        "cnpj": "12.345.678/0001-99",
        "contato": "contato@fornecedorxyz.com"
      },
      "itens": [
        {
          "id_item": 201,
          "nome_item": "Item A",
          "quantidade": 20
        },
        {
          "id_item": 202,
          "nome_item": "Item B",
          "quantidade": 30
        }
      ]
    }
    // ... outras entradas
  ]
}
2. Criar uma Nova Entrada

Endpoint: Post /entradas

Body(dados passados pelo usuário)
{
  "userId": 1,
  "fornecedorId": 5,
  "itens": [
    {
      "id": 201,
      "quantidade": 20
    },
    {
      "id": 202,
      "quantidade": 30
    }
  ]
}
Exemplo de Resposta
{
  "message": "Entrada criada com sucesso.",
  "entrada": {
    "id_entrada": 102,
    "data_entrada": "2024-10-07T15:30:00.000Z",
    "fornecedor": {
      "id": 5,
      "nome": "Fornecedor XYZ",
      "cnpj": "12.345.678/0001-99",
      "contato": "contato@fornecedorxyz.com"
    },
    "usuario": {
      "id": 1,
      "nome": "João Silva"
    },
    "itens": [
      {
        "id_item": 201,
        "nome_item": "Item A",
        "quantidade": 20
      },
      {
        "id_item": 202,
        "nome_item": "Item B",
        "quantidade": 30
      }
    ]
  }
}

