-- Políticas explícitas para negar UPDATE e DELETE a todos os usuários
-- Edge Functions com service_role_key continuam funcionando (bypass RLS)

create policy "deny update for all" 
on public.visitor_tracking
for update
to public
using (false);

create policy "deny delete for all" 
on public.visitor_tracking
for delete
to public
using (false);