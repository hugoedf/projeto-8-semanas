# 🚀 Meta Pixel - Guia Rápido de Teste

## ✅ Configuração Completa

Sua integração está **100% configurada** e pronta para testar!

### Tokens Configurados:
- ✅ **META_ACCESS_TOKEN**: Configurado
- ✅ **META_PIXEL_ID**: Configurado  
- ✅ **META_TEST_EVENT_CODE**: TEST16230 (Modo de teste ATIVO)

---

## 🧪 Como Testar AGORA (Passo a Passo)

### 1️⃣ Teste o Meta Pixel (Frontend)

**Opção A: Meta Pixel Helper (Recomendado)**
1. Instale a extensão: [Meta Pixel Helper](https://chrome.google.com/webstore/detail/meta-pixel-helper/)
2. Acesse seu site
3. Clique no ícone da extensão
4. Você deve ver:
   - ✅ **PageView** disparando automaticamente
   - ✅ **ViewContent** na página principal
   - ✅ **InitiateCheckout** ao clicar nos botões de CTA

**Opção B: Console do Navegador**
1. Pressione **F12** para abrir DevTools
2. Vá para a aba **Console**
3. Recarregue a página
4. Você verá logs como:
   ```
   Meta Pixel inicializado: [seu-pixel-id]
   Meta Pixel - PageView enviado
   Meta Pixel - ViewContent enviado
   Meta Pixel - InitiateCheckout enviado
   ```

### 2️⃣ Teste a API de Conversões (Backend)

**Events Manager do Meta**
1. Acesse: https://business.facebook.com/events_manager2/
2. Selecione seu Pixel
3. Clique em **"Test Events"** (aba superior)
4. Deixe essa aba aberta
5. Em outra aba, acesse seu site e clique nos botões de CTA
6. Volte para o Events Manager
7. **Os eventos aparecerão em tempo real** na lista de Test Events
8. Você deve ver:
   - PageView
   - ViewContent  
   - InitiateCheckout

**Logs da Edge Function**
1. Acesse: https://supabase.com/dashboard/project/kfddlytvdzqwopongnew/functions/meta-conversions/logs
2. Clique em **"Refresh"** ou deixe em auto-refresh
3. Você verá logs detalhados:
   ```
   Meta CAPI - Recebendo evento
   Meta CAPI - Modo de teste ativado com código: TEST16230
   Meta CAPI - Evento enviado com sucesso
   ```

### 3️⃣ Testar InitiateCheckout

1. Acesse seu site: `/`
2. Role até encontrar um botão **"Quero Transformar Meu Corpo Agora"** ou **"Quero Começar Agora"**
3. Clique no botão
4. Verifique no console: `Meta Pixel - InitiateCheckout enviado`
5. Verifique no Events Manager: novo evento InitiateCheckout aparece

---

## 🎯 Modo de Teste vs Produção

### MODO DE TESTE (ATUAL) ⚠️

**Status**: ATIVO com código TEST16230

**O que significa**:
- Todos os eventos são enviados para a aba "Test Events"
- Eventos NÃO aparecem nos relatórios de produção
- Ideal para validar que tudo está funcionando
- Não conta como conversões reais

**Onde ver os eventos**:
- Events Manager → Test Events
- https://business.facebook.com/events_manager2/

### MODO DE PRODUÇÃO (Para ativar)

**Como ativar**:
1. Acesse: https://supabase.com/dashboard/project/kfddlytvdzqwopongnew/settings/functions
2. Clique em **"Secrets"**
3. Encontre `META_TEST_EVENT_CODE`
4. Clique em **"Delete"** ou deixe o valor vazio
5. Aguarde 2-5 minutos

**O que acontece**:
- Eventos começam a aparecer nos relatórios normais
- Contam como conversões reais para otimização de campanhas
- Aparecem em "Overview" do Events Manager

---

## ✅ Checklist de Verificação

Marque conforme testa:

- [ ] Meta Pixel Helper mostra eventos verdes (sem erros)
- [ ] Console do navegador mostra logs de eventos
- [ ] Events Manager → Test Events mostra eventos chegando
- [ ] Logs da Edge Function mostram "Evento enviado com sucesso"
- [ ] PageView dispara ao carregar qualquer página
- [ ] ViewContent dispara na página principal
- [ ] InitiateCheckout dispara ao clicar nos botões de CTA
- [ ] Eventos têm event_id único (para deduplicação)

---

## 🆘 Problemas Comuns

### ❌ Eventos não aparecem no Events Manager
**Solução**: Aguarde até 20 minutos (delay normal do Meta)

### ❌ Eventos aparecem em "Produção" mas deveria estar em "Test"
**Solução**: Verifique se META_TEST_EVENT_CODE está configurado com TEST16230

### ❌ Erro "META_ACCESS_TOKEN não configurado"
**Solução**: Verifique os secrets em https://supabase.com/dashboard/project/kfddlytvdzqwopongnew/settings/functions

### ❌ InitiateCheckout não dispara
**Solução**: 
1. Limpe o cache do navegador
2. Verifique console por erros JavaScript
3. Teste com DevTools aberto

---

## 📚 Links Úteis

- **Events Manager**: https://business.facebook.com/events_manager2/
- **Edge Function Logs**: https://supabase.com/dashboard/project/kfddlytvdzqwopongnew/functions/meta-conversions/logs
- **Supabase Secrets**: https://supabase.com/dashboard/project/kfddlytvdzqwopongnew/settings/functions
- **Meta Pixel Helper**: https://chrome.google.com/webstore/detail/meta-pixel-helper/

---

## 🎉 Próximos Passos

Depois de validar que tudo está funcionando:

1. ✅ Teste por 24-48 horas no modo de teste
2. ✅ Valide que todos os eventos estão chegando corretamente
3. ✅ Desative o modo de teste (remova META_TEST_EVENT_CODE)
4. ✅ Configure suas campanhas no Meta Ads para usar os eventos
5. ✅ Monitore os relatórios de conversões

---

**Dúvidas?** Consulte o guia completo em `META_INTEGRATION_GUIDE.md`
