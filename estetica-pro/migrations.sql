-- Tabela de Serviços
CREATE TABLE IF NOT EXISTS servicos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome TEXT NOT NULL,
    descricao TEXT,
    duracao INTEGER NOT NULL, -- em minutos
    preco DECIMAL(10, 2) NOT NULL,
    categoria TEXT NOT NULL,
    ativo BOOLEAN DEFAULT true,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Colaboradores
CREATE TABLE IF NOT EXISTS colaboradores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    telefone TEXT,
    funcao TEXT NOT NULL,
    ativo BOOLEAN DEFAULT true,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Clientes
CREATE TABLE IF NOT EXISTS clientes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome TEXT NOT NULL,
    telefone TEXT NOT NULL,
    email TEXT,
    cpf TEXT,
    data_nascimento DATE,
    endereco TEXT,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Leads
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome TEXT NOT NULL,
    telefone TEXT NOT NULL,
    email TEXT,
    cpf TEXT,
    origem TEXT, -- facebook, instagram, whatsapp, etc
    servico_interesse UUID REFERENCES servicos(id),
    colaborador_responsavel UUID REFERENCES colaboradores(id),
    status TEXT DEFAULT 'novo', -- novo, contato, agendado, convertido, perdido
    condicao_pagamento TEXT,
    observacoes TEXT,
    historico_interacoes JSONB, -- array de objetos com tipo, descricao, data, status
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Agenda
CREATE TABLE IF NOT EXISTS agenda (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    cliente_id UUID NOT NULL REFERENCES clientes(id),
    colaborador_id UUID NOT NULL REFERENCES colaboradores(id),
    servico_id UUID NOT NULL REFERENCES servicos(id),
    data DATE NOT NULL,
    hora_inicio TIME NOT NULL,
    hora_fim TIME NOT NULL,
    status TEXT DEFAULT 'agendado', -- agendado, confirmado, realizado, cancelado, ausente
    observacoes TEXT,
    valor_pago DECIMAL(10, 2),
    forma_pagamento TEXT,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Categorias Financeiras
CREATE TABLE IF NOT EXISTS categorias_financeiras (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome TEXT NOT NULL,
    tipo TEXT NOT NULL, -- receita ou despesa
    descricao TEXT,
    ativo BOOLEAN DEFAULT true,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabela de Transações Financeiras
CREATE TABLE IF NOT EXISTS transacoes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tipo TEXT NOT NULL, -- receita ou despesa
    descricao TEXT NOT NULL,
    valor DECIMAL(10, 2) NOT NULL,
    categoria_id UUID NOT NULL REFERENCES categorias_financeiras(id),
    cliente_id UUID REFERENCES clientes(id),
    colaborador_id UUID REFERENCES colaboradores(id),
    agenda_id UUID REFERENCES agenda(id),
    data DATE NOT NULL,
    forma_pagamento TEXT,
    status TEXT DEFAULT 'pendente', -- pendente, pago, cancelado
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Índices para melhorar performance
CREATE INDEX IF NOT EXISTS idx_agenda_data ON agenda(data);
CREATE INDEX IF NOT EXISTS idx_agenda_cliente ON agenda(cliente_id);
CREATE INDEX IF NOT EXISTS idx_transacoes_data ON transacoes(data);
CREATE INDEX IF NOT EXISTS idx_transacoes_tipo ON transacoes(tipo);
CREATE INDEX IF NOT EXISTS idx_leads_status ON leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_criado_em ON leads(criado_em);

-- Função para atualizar o campo atualizado_em
CREATE OR REPLACE FUNCTION atualizar_atualizado_em()
RETURNS TRIGGER AS $$
BEGIN
    NEW.atualizado_em = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Gatilhos para atualizar o campo atualizado_em
CREATE TRIGGER atualizar_clientes_atualizado_em 
    BEFORE UPDATE ON clientes 
    FOR EACH ROW 
    EXECUTE FUNCTION atualizar_atualizado_em();

CREATE TRIGGER atualizar_leads_atualizado_em 
    BEFORE UPDATE ON leads 
    FOR EACH ROW 
    EXECUTE FUNCTION atualizar_atualizado_em();

CREATE TRIGGER atualizar_agenda_atualizado_em 
    BEFORE UPDATE ON agenda 
    FOR EACH ROW 
    EXECUTE FUNCTION atualizar_atualizado_em();

CREATE TRIGGER atualizar_transacoes_atualizado_em 
    BEFORE UPDATE ON transacoes 
    FOR EACH ROW 
    EXECUTE FUNCTION atualizar_atualizado_em();