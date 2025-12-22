# Clientes - API BancoTudo

## Base

- URL base: `http://localhost:3000`
- Recurso: ` /cliente`

## Endpoints

- Listar clientes
  - `GET /cliente`
  - Exemplo:
    ```bash
    curl http://localhost:3000/cliente
    ```

- Criar cliente
  - `POST /cliente`
  - Body JSON:
    ```json
    { "nome": "Joao da Silva", "cpf": "12345678901", "email": "joao@example.com" }
    ```
  - Exemplo:
    ```bash
    curl -X POST http://localhost:3000/cliente \
      -H "Content-Type: application/json" \
      -d '{"nome":"Joao da Silva","cpf":"12345678901","email":"joao@example.com"}'
    ```

- Buscar por id
  - `GET /cliente/:id`
  - Exemplo:
    ```bash
    curl http://localhost:3000/cliente/ID_DO_CLIENTE
    ```

- Atualizar
  - `PATCH /cliente/:id`
  - Body JSON (campos parciais):
    ```json
    { "nome": "Novo Nome", "email": "novo@example.com" }
    ```
  - Exemplo:
    ```bash
    curl -X PATCH http://localhost:3000/cliente/ID_DO_CLIENTE \
      -H "Content-Type: application/json" \
      -d '{"nome":"Novo Nome"}'
    ```

- Excluir
  - `DELETE /cliente/:id`
  - Exemplo:
    ```bash
    curl -X DELETE http://localhost:3000/cliente/ID_DO_CLIENTE
    ```

## Observações

- Campos obrigatórios na criação: `nome`, `cpf` (único); `email` é opcional e único.
- Respostas incluem `contas` do cliente quando existentes.

