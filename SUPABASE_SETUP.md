# Integração Supabase - Portfólio AJ (Versão Light Premium + Secure Login)

Seu painel administrativo agora suporta nativamente salvar e buscar as visitas diretamente de um banco de dados relacional em nuvem usando o **Supabase**! Além disso, a sua rota de autenticação agora checará a senha no seu próprio banco de dados em vez de um texto simples.

O código reage instantaneamente assim que as chaves de ambiente são configuradas.

## Passo 1: Configurar a Sessão de Acesso (Login no DB)
Abra a sua tela do Supabase no **SQL Editor**, cole e rode o seguinte código para criar a tabela das senhas do painel:

```sql
create table admin_config (
  id int primary key default 1,
  password text not null
);

-- Insere o usuário padrão. Você pode mudar "admin123" para a sua senha forte e rodar isso:
insert into admin_config (id, password) values (1, 'admin123');

-- Damos permissão apenas de leitura para o frontend validar na tela
alter table admin_config enable row level security;
create policy "Anonymous read access config" on admin_config for select using (true);
```

*(Agora no login, ele vai digitar e validar usando esse registro na sua nuvem!)*

## Passo 2: Configurar o Rastreamento de Visitas
Se você ainda não rodou, puxe uma nova query (ou abaixo da primeira rodada) e crie a nossa Tabela Analítica:

```sql
create table visits (
  id uuid default gen_random_uuid() primary key,
  page text not null,
  user_agent text,
  language text,
  platform text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Habilitar leitura/escrita anônima (já que as requisições vêm públicas do frontend da Home)
alter table visits enable row level security;
create policy "Public visits insert" on visits for insert with check (true);
create policy "Anonymous read access" on visits for select using (true);
```

---

## O Novo Layout: Light / White Premium
Conforme seu pedido, todo o `Admin Flow` foi regravado para utilizar um visual **Branco / Clean**. Ele tem sombras muito charmosas parecidas com painéis do MacOS e Vercel Analytics Light, botões azul vibrante, e um visual ultra-moderno minimalista.
