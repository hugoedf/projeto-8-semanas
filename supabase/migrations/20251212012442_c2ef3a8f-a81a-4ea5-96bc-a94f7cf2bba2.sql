-- Política explícita para negar SELECT a todos os usuários
-- Edge Functions com service_role_key continuam funcionando (bypass RLS)
create policy "deny select for all" 
on public.visitor_tracking
for select
to public
using (false);