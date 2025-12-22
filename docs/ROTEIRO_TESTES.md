# Roteiro de Testes - Banco Tudo (API)

Este arquivo contém as rotas e exemplos de valores (JSON) para testar a API usando o **Insomnia**, **Postman** ou **cURL**.

A URL base da aplicação é: `http://localhost:3000`

---

## 1. Módulo: CLIENTE

### 1.1 Criar Novo Cliente
**Rota:** `POST /cliente`
**Descrição:** Cria um novo registro de cliente no banco de dados.

**Corpo (JSON):**
```json
{
  "nome": "João da Silva",
  "cpf": "123.456.789-00",
  "email": "joao.silva@email.com",
  "telefone": "11999999999",
  "endereco": "Rua das Flores, 123",
  "numero": "100"
}
```

### 1.2 Listar Todos os Clientes
**Rota:** `GET /cliente`
**Descrição:** Retorna uma lista com todos os clientes cadastrados e suas contas.

### 1.3 Buscar Cliente por ID
**Rota:** `GET /cliente/{ID}`
**Descrição:** Retorna os dados de um cliente específico.
**Nota:** Substitua `{ID}` pelo UUID do cliente.

### 1.4 Atualizar Cliente
**Rota:** `PATCH /cliente/{ID}`
**Descrição:** Atualiza parcialmente os dados de um cliente.

**Corpo (JSON):**
```json
{
  "nome": "João da Silva Atualizado",
  "email": "novo.email@teste.com",
  "telefone": "11888888888"
}
```

### 1.5 Deletar Cliente
**Rota:** `DELETE /cliente/{ID}`
**Descrição:** Remove um cliente do banco de dados.

---

## 2. Módulo: CONTA

### 2.1 Criar Nova Conta
**Rota:** `POST /conta`
**Descrição:** Cria uma conta bancária para um cliente existente.

**Importante**: Você precisa pegar o `id` (UUID) de um cliente existente para preencher o `clienteId`.

**Corpo (JSON):**
```json
{
  "numero": "12345-6",
  "tipo": "CORRENTE",
  "saldo": 100.00,
  "clienteId": "COLE_O_UUID_DO_CLIENTE_AQUI"
}
```
*Nota: `tipo` pode ser "CORRENTE" ou "POUPANCA".*

### 2.2 Listar Todas as Contas
**Rota:** `GET /conta`
**Descrição:** Retorna todas as contas com os dados dos seus respectivos donos.

### 2.3 Buscar Conta por ID
**Rota:** `GET /conta/{ID}`
**Descrição:** Busca uma conta pelo ID da conta (não do cliente).

### 2.4 Atualizar Conta
**Rota:** `PATCH /conta/{ID}`
**Descrição:** Atualiza dados da conta (ex: saldo, tipo).

**Corpo (JSON):**
```json
{
  "saldo": 500.00
}
```

### 2.5 Deletar Conta
**Rota:** `DELETE /conta/{ID}`
**Descrição:** Remove uma conta.
