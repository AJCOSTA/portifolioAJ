# Integração Supabase - Tracking de Visitas do Portfólio

Seu painel administrativo agora suporta nativamente salvar e buscar as visitas diretamente de um banco de dados relacional em nuvem usando o **Supabase**! O código reage instantaneamente assim que as chaves de ambiente são configuradas.

## Passo a Passo

1. Crie uma conta no [Supabase](https://supabase.com/) e crie um novo projeto "Portfólio".
2. Acesse o **SQL Editor** no painel do Supabase.
3. Cole e execute o script abaixo para criar a sua tabela de visitas:

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

4. Agora, vá em **Project Settings > API** no painel do Supabase e copie os valores `URL` e `anon public key`.
5. Abra (ou crie) o arquivo `.env` na raiz do seu projeto local e insira as suas chaves confidenciais:

```env
VITE_SUPABASE_URL=COLE_SUA_URL_AQUI
VITE_SUPABASE_ANON_KEY=COLE_SUA_KEY_AQUI
```

## Benefícios da Atualização de Hoje
- **Menus**: 100% estabilizados. Eles navegam entre as seções suavemente.
- **Gráficos e Listagem**: A aba "Tráfego" e "Audiência" operam sozinhas. A Audiência loga linha a linha os IPs simulados.
- **Cache Local de Reserva**: O sistema continuará funcionando perfeitamente de forma "gratuita sem nuvem" através do LocalStorage local caso você demore a inserir as chaves de ambiente do Supabase ou remova no futuro.
