# 🌟 Estética Pro - Plataforma de Gestão Clínica

A **maior plataforma de gestão clínica do Brasil**, desenvolvida para otimizar a gestão de clínicas de estética com foco em vendas, conversão e lucratividade.

## 🚀 Recursos Principais

- **CRM Completo** com gerenciamento de leads, histórico de clientes e integração com WhatsApp
- **Agenda Inteligente** com visualização de calendário e sincronização com Google Calendar
- **Financeiro Integrado** com controle de receitas, despesas e fluxo de caixa
- **Relatórios Avançados** com exportação para PDF e Excel
- **Gestão de Colaboradores** com ranking de desempenho
- **Integração WhatsApp** para automação de comunicação
- **Sistema de Autenticação Seguro** com Supabase Auth

## 🛠️ Tecnologias Utilizadas

- **React** com TypeScript
- **Vite** como bundler
- **Supabase** como backend e banco de dados
- **Tailwind CSS** para estilização
- **Zustand** para gerenciamento de estado
- **React Router DOM** para navegação
- **jsPDF** para geração de PDFs
- **date-fns** para manipulação de datas

## 📦 Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/seu-usuario/estetica-pro.git
   cd estetica-pro
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Crie um arquivo .env baseado no .env.example:
   ```bash
   cp .env.example .env
   ```

4. Execute as migrações do banco de dados (verifique o arquivo migrations.sql)

5. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

## 📂 Estrutura do Projeto

```
src/
├── config/       # Configurações do Supabase e API
├── context/      # Contextos de autenticação e estado
├── hooks/        # Hooks personalizados
├── lib/          # Bibliotecas de utilidade
├── models/       # Modelos de dados
├── pages/        # Páginas da aplicação
├── components/   # Componentes reutilizáveis
├── store/        # Gerenciamento de estado global
├── utils/        # Funções utilitárias
```

## 📊 Banco de Dados

O sistema utiliza o Supabase com as seguintes tabelas principais:

- `leads` - Gerenciamento de leads e clientes
- `agenda` - Agenda de atendimentos
- `transacoes` - Controle financeiro
- `colaboradores` - Gestão de equipe
- `servicos` - Catálogo de serviços
- `categorias_financeiras` - Categorias para controle financeiro

## 🌐 Deploy

O projeto está configurado para deploy na Vercel:

```bash
npm install -g vercel
vercel
```

## 📞 Suporte

Para suporte técnico ou dúvidas sobre implementação, entre em contato:

📧 contato@esticapro.com.br
📞 (11) 99999-9999