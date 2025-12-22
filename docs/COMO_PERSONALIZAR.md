# Como Personalizar o Projeto (Adicionar Novos Campos)

Este guia ensina como adicionar novos campos ao banco de dados e à API. 

Vamos usar como exemplo a adição de um campo **"numero"** ao Cliente.

## Passo 1: Modificar o Banco de Dados (Schema)

O arquivo `prisma/schema.prisma` é onde definimos a estrutura do nosso banco.

1.  Abra o arquivo `prisma/schema.prisma`.
2.  Encontre o model `Cliente`.
3.  Adicione o novo campo.

```prisma
model Cliente {
  // ...
  endereco    String?
  numero      String?   // <--- NOVO CAMPO
  // ...
}
```

## Passo 2: Atualizar o Banco de Dados (Migração)

Sempre que mudamos o `schema.prisma`, precisamos avisar o banco de dados.

1.  Abra um terminal (não feche o do servidor).
2.  Rode o comando:

```bash
npx prisma migrate dev --name add_numero
```
3.  **Importante**: Rode também este comando para atualizar o código:
```bash
npx prisma generate
```

## Passo 3: Atualizar a API (DTOs)

O NestJS usa **DTOs** para validar os dados que chegam. 

1.  Abra `src/cliente/dto/create-cliente.dto.ts`.
2.  Adicione a validação:

```typescript
import { IsString, IsOptional } from 'class-validator';

export class CreateClienteDto {
  // ...
  
  @IsOptional()
  @IsString()
  numero?: string;
}
```

## Passo 4: Usar no Insomnia (Manual)

**O Insomnia NÃO atualiza sozinho.** Você precisa escrever o novo campo no JSON.

1.  Abra sua requisição de `POST /cliente`.
2.  Adicione o campo manualmente no corpo:

```json
{
  "nome": "Cliente Teste",
  "cpf": "111.222.333-44",
  "endereco": "Rua Principal",
  "numero": "100"   <--- VOCÊ PRECISA DIGITAR ISSO
}
```

## ⚠️ Checklist de Erros Comuns

1.  **"O campo não salva"**: Esqueceu de colocar no DTO (`create-cliente.dto.ts`)?
2.  **"Erro de Unknown argument"**: Esqueceu de rodar `npx prisma generate`?
3.  **"Não aparece no Insomnia"**: Você digitou o campo no JSON? O Insomnia não adivinha campos novos.
