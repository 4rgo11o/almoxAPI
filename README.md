# Almoxarifado API

## Descrição

Almoxarifado API é uma API RESTful desenvolvida com **Node.js** e **Express.js**, utilizando **Sequelize** como ORM para gerenciar interações com o banco de dados. A API permite a criação e recuperação de entradas de materiais no almoxarifado, associando-as a usuários, fornecedores e itens específicos. 
## Tecnologias Utilizadas

- **Node.js**
- **Express.js**
- **Sequelize** (ORM)
- **PostgreSQL**
- **dotenv** (para gerenciamento de variáveis de ambiente)

## Pré-requisitos

- **Node.js** (v14 ou superior)
- **NPM**
- **Banco de Dados Relacional** (ex: PostgreSQL)
- **Git**

## Funcionalidades

```bash

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

Endpoint: Post /entradas/cadastro

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
3. Listar itens de um almoxarifado específico

Exemplo de Requisição:
GET /almoxarifado/1/items

Exemplo de Resposta:

{
    "almoxarifado": {
        "id": 1,
        "nome": "Almoxarifado Central"
    },
    "itens": [
        {
            "id_item": 201,
            "nome_item": "Item A",
            "quantidade": 320
        },
        {
            "id_item": 202,
            "nome_item": "Item B",
            "quantidade": 540
        }
    ]
}



