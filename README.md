# Controle Financeiro

## Descrição

Este é um projeto de controle financeiro pessoal que permite aos usuários gerenciar suas transações, visualizar relatórios e obter insights sobre seus gastos. A aplicação foi desenvolvida com Next.js, Prisma e oferece integração com a API da OpenAI para geração de relatórios inteligentes e com o Stripe para gerenciamento de assinaturas.

## Funcionalidades

- **Autenticação de Usuários:** Sistema de login e registro seguro utilizando Clerk.
- **Gerenciamento de Transações:** Adicione, edite e remova transações de entrada e saída.
- **Dashboard Interativo:** Visualize um resumo das suas finanças, incluindo saldo atual, receitas e despesas.
- **Relatórios com IA:** Gere relatórios mensais detalhados com análises e sugestões feitas por inteligência artificial.
- **Planos de Assinatura:** Funcionalidades premium, como relatórios com IA, disponíveis através de um plano de assinatura gerenciado pelo Stripe.
- **Interface Responsiva:** Design adaptável para uma experiência de usuário consistente em desktops e dispositivos móveis.

## Tecnologias Utilizadas

- **Frontend:**
  - [Next.js](https://nextjs.org/) - Framework React para renderização no lado do servidor e geração de sites estáticos.
  - [React](https://reactjs.org/) - Biblioteca para construção de interfaces de usuário.
  - [Tailwind CSS](https://tailwindcss.com/) - Framework de CSS utilitário para estilização.
  - [Shadcn/ui](https://ui.shadcn.com/) - Componentes de UI para React.
  - [Recharts](https://recharts.org/) - Biblioteca de gráficos para React.

- **Backend:**
  - [Next.js (API Routes)](https://nextjs.org/docs/api-routes/introduction) - Para criação de endpoints da API.
  - [Prisma](https://www.prisma.io/) - ORM para Node.js e TypeScript.
  - [PostgreSQL](https://www.postgresql.org/) - Banco de dados relacional.

- **Serviços e Ferramentas:**
  - [Clerk](https://clerk.com/) - Para autenticação e gerenciamento de usuários.
  - [Stripe](https://stripe.com/) - Para processamento de pagamentos e gerenciamento de assinaturas.
  - [OpenAI API](https://beta.openai.com/docs/) - Para geração de relatórios com IA.
  - [Vercel](https://vercel.com/) - Para deploy da aplicação.

## Estrutura do Projeto

O projeto segue uma estrutura organizada para facilitar a manutenção e o desenvolvimento:

- **`/src/app`**: Contém as principais páginas e rotas da aplicação.
  - **`/(home)`**: Página inicial da aplicação.
  - **`/api`**: Endpoints da API, incluindo webhooks do Stripe.
  - **`/auth`**: Páginas de autenticação.
  - **`/subscription`**: Página de gerenciamento de assinatura.
  - **`/transactions`**: Página de gerenciamento de transações.
  - **`/_actions`**: Server Actions para interações com o backend.
  - **`/_data`**: Funções para buscar dados do banco de dados.
- **`/src/components`**: Componentes React reutilizáveis.
- **`/src/constants`**: Constantes utilizadas na aplicação.
- **`/src/lib`**: Funções utilitárias e configuração do Prisma.
- **`/prisma`**: Schema e migrações do banco de dados.

## Como Rodar o Projeto Localmente

### Pré-requisitos

- [Node.js](https://nodejs.org/en/) (versão 20 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [Docker](https://www.docker.com/) (opcional, para rodar o banco de dados)

### Passos

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/finace-control.git
   cd finace-control
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente:**
   - Crie um arquivo `.env.local` na raiz do projeto.
   - Adicione as seguintes variáveis de ambiente, substituindo os valores pelos seus:
     ```
     # Clerk
     NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=
     CLERK_SECRET_KEY=

     # Stripe
     NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
     STRIPE_SECRET_KEY=
     STRIPE_WEBHOOK_SECRET=

     # OpenAI
     OPENAI_API_KEY=

     # Banco de Dados
     DATABASE_URL="postgresql://user:password@localhost:5432/database"
     ```

4. **Configure o banco de dados:**
   - Se estiver usando Docker, inicie um container PostgreSQL:
     ```bash
     docker run --name postgres-db -e POSTGRES_PASSWORD=password -p 5432:5432 -d postgres
     ```
   - Aplique as migrações do Prisma:
     ```bash
     npx prisma migrate dev
     ```

5. **Inicie o servidor de desenvolvimento:**
   ```bash
   npm run dev
   ```

6. **Acesse a aplicação:**
   - Abra seu navegador e acesse `http://localhost:3000`.

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor de desenvolvimento.
- `npm run build`: Compila a aplicação para produção.
- `npm run start`: Inicia o servidor de produção.
- `npm run lint`: Executa o linter para verificar a qualidade do código.
- `npm run prepare`: Configura o Husky para hooks de pré-commit.

## Contribuição

Contribuições são bem-vindas! Se você encontrar algum problema ou tiver alguma sugestão, sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Licença

Este projeto está licenciado sob a [Licença MIT](LICENSE).
