# Como Iniciar o Projeto Banco Tudo (NestJS)

Este guia explica como configurar e rodar o projeto do zero.

## 1. Pré-requisitos
Certifique-se de ter instalado:
- **Node.js** (versão 18 ou superior)
- **Docker** e **Docker Compose** (para o banco de dados)
- **Git**

## 2. Configurar o Ambiente (Primeira vez)

1.  **Instalar dependências**:
    No terminal, na pasta do projeto (`banco-tudo`), execute:
    ```bash
    npm install
    ```

2.  **Subir o Banco de Dados**:
    O projeto usa PostgreSQL e pgAdmin via Docker. Execute:
    ```bash
    docker-compose up -d
    ```
    Isso iniciará o PostgreSQL na porta `5435` e o pgAdmin na porta `5050`.

3.  **Configurar o Banco de Dados (Prisma)**:
    Crie as tabelas no banco de dados rodando a migração:
    ```bash
    npx prisma migrate dev --name init
    ```

## 3. Rodar o Projeto

Para iniciar o servidor em modo de desenvolvimento (com recarregamento automático):

```bash
npm run start:dev
```

O servidor estará rodando em: `http://localhost:3000`

## 4. Acessar o Banco de Dados (pgAdmin)

-   Acesse: `http://localhost:5050`
-   **Login**: `admin@admin.com`
-   **Senha**: `admin`
-   O servidor "Banco Tudo" já deve aparecer configurado na barra lateral esquerda.

## 5. Comandos Úteis

-   **Parar o servidor**: `Ctrl + C` no terminal.
-   **Parar o banco de dados**: `docker-compose down`
-   **Verificar logs do banco**: `docker-compose logs -f`
-   **Abrir o Prisma Studio** (visualizador de banco web):
    ```bash
    npx prisma studio
    ```

## 6. Solução de Problemas Comuns

-   **Erro `EADDRINUSE :::3000`**: Significa que a porta 3000 já está em uso.
    -   Solução: Feche outros terminais que estejam rodando o projeto ou mate o processo.
    -   Comando para ver quem usa a porta (Windows): `netstat -ano | findstr :3000`
    -   Comando para matar (substitua PID): `taskkill /F /PID <PID>`
