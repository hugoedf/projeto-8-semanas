# Guia de Integração Meta Pixel + API de Conversões

## 📋 Visão Geral

Este projeto possui integração completa com o **Meta Pixel** (client-side) e a **Meta Conversions API** (server-side) para rastreamento avançado de eventos e otimização de campanhas.

---

## 🎯 Eventos Configurados

### 1. **PageView**
- **Onde**: Disparado automaticamente em todas as páginas
- **Quando**: A cada mudança de rota
- **Implementação**: `MetaPixelProvider.tsx`

### 2. **ViewContent**
- **Onde**: Páginas específicas de conteúdo
- **Quando**: Ao acessar páginas importantes (Home, Termos, Política)
- **Implementação**: `MetaPixelProvider.tsx`

### 3. **InitiateCheckout**
- **Onde**: Botões de CTA que levam ao checkout
- **Quando**: Ao clicar em qualquer botão "Quero Transformar Meu Corpo"
- **Implementação**: 
  - `Hero.tsx` (botão principal)
  - `CTA.tsx` (botão de oferta especial)

---

## 📁 Arquivos da Integração

### Frontend (Client-Side)

1. **`src/hooks/useMetaPixel.ts`**
   - Hook principal para gerenciar o Meta Pixel
   - Funções: `trackPageView()`, `trackViewContent()`, `trackInitiateCheckout()`
   - Carrega o script do Meta Pixel de forma assíncrona
   - Gera event_id único para deduplicação
   - Envia eventos simultaneamente para Pixel e CAPI

2. **`src/components/MetaPixelProvider.tsx`**
   - Provider que inicializa o Pixel
   - Dispara PageView automaticamente em mudanças de rota
   - Dispara ViewContent em páginas específicas
   - Envolve toda a aplicação no `App.tsx`

3. **`src/components/Hero.tsx`** (modificado)
   - Botão principal com evento InitiateCheckout
   - Dispara evento antes de redirecionar para o Hotmart

4. **`src/components/CTA.tsx`** (modificado)
   - Botão de oferta especial com evento InitiateCheckout
   - Dispara evento antes de redirecionar para o Hotmart

### Backend (Server-Side)

5. **`supabase/functions/meta-conversions/index.ts`**
   - Edge Function que recebe eventos do frontend
   - Envia para Meta Conversions API
   - Processa deduplicação via event_id
   - Coleta informações adicionais (IP, User-Agent)
   - Logs detalhados para debugging

6. **`supabase/config.toml`** (modificado)
   - Configuração da Edge Function
   - `verify_jwt = false` para permitir chamadas públicas

---

## 🚀 Como Usar Agora

### ✅ Passo 1: Testar Imediatamente

1. **Acesse seu site** e clique em qualquer botão "Quero Transformar Meu Corpo"
2. **Abra o Console** do navegador (F12) e veja os logs de eventos sendo disparados
3. **Acesse o Events Manager**: https://business.facebook.com/events_manager2/
4. **Vá para Test Events** - você verá os eventos chegando em tempo real
5. **Verifique os logs da Edge Function**: https://supabase.com/dashboard/project/kfddlytvdzqwopongnew/functions/meta-conversions/logs

### 🎯 Modo de Teste Ativo

**IMPORTANTE**: O Test Event Code (TEST16230) está configurado e ATIVO. Todos os eventos estão sendo enviados como testes e aparecerão na aba "Test Events" do Meta Events Manager.

**Para desativar o modo de teste e enviar eventos reais:**
1. Acesse: https://supabase.com/dashboard/project/kfddlytvdzqwopongnew/settings/functions
2. Clique em "Secrets"
3. Remova ou deixe vazio o secret `META_TEST_EVENT_CODE`
4. Aguarde alguns minutos para a mudança ter efeito

---

### Secrets do Supabase (Backend)
- `META_ACCESS_TOKEN`: Token de acesso da API do Meta ✅ **Configurado**
- `META_PIXEL_ID`: ID do Pixel do Meta ✅ **Configurado**
- `META_TEST_EVENT_CODE`: Código de teste (opcional, para modo de teste) ✅ **Configurado: TEST16230**

### Variáveis de Ambiente (.env)
- `VITE_META_PIXEL_ID`: ID do Pixel (usado no frontend)

### Como Trocar os Tokens

1. **Acessar Supabase Dashboard**
   - URL: https://supabase.com/dashboard/project/kfddlytvdzqwopongnew/settings/functions

2. **Editar Secrets**
   - Clique em "Edge Functions"
   - Clique em "Secrets"
   - Edite `META_ACCESS_TOKEN` e/ou `META_PIXEL_ID`

3. **Atualizar .env Local (se necessário)**
   - Edite o arquivo `.env` na raiz do projeto
   - Altere `VITE_META_PIXEL_ID` com o novo valor

---

## 🧪 Como Testar

### 1. Testar o Meta Pixel (Frontend)

**Meta Pixel Helper (Extensão do Chrome)**
1. Instale: https://chrome.google.com/webstore/detail/meta-pixel-helper/
2. Acesse seu site
3. Clique no ícone da extensão
4. Verifique se os eventos aparecem:
   - ✅ PageView (ao carregar a página)
   - ✅ ViewContent (em páginas específicas)
   - ✅ InitiateCheckout (ao clicar nos botões)

**Console do Navegador**
1. Abra DevTools (F12)
2. Vá para a aba Console
3. Procure por logs: `Meta Pixel - [EventName] enviado`

### 2. Testar a API de Conversões (Backend)

**Events Manager do Meta**
1. Acesse: https://business.facebook.com/events_manager2/
2. Selecione seu Pixel
3. Clique em "Test Events"
4. O código de teste **TEST16230** já está configurado automaticamente
5. Realize ações no site (PageView, clicar em botões)
6. Verifique no Events Manager se os eventos chegaram
7. **Os eventos de teste aparecerão na seção "Test Events" em tempo real**

**IMPORTANTE**: O modo de teste está ATIVADO com o código TEST16230. Os eventos enviados aparecerão na aba "Test Events" do Meta Events Manager, não nos eventos de produção.

**Logs da Edge Function**
1. Acesse: https://supabase.com/dashboard/project/kfddlytvdzqwopongnew/functions/meta-conversions/logs
2. Veja logs em tempo real de eventos enviados
3. Verifique sucessos e erros
4. Procure por: "Modo de teste ativado" nos logs

### 3. Verificação de Deduplicação

Para garantir que eventos não são contados em duplicata:
1. Os eventos devem ter o mesmo `event_id` no Pixel e na CAPI
2. Verifique no Events Manager se há "Matched Events" (eventos combinados)
3. O Meta automaticamente deduplica eventos com mesmo `event_id`

---

## 🔍 Troubleshooting

### Problema: Pixel não carrega
- **Solução**: Verifique se `VITE_META_PIXEL_ID` está no `.env`
- **Solução**: Limpe o cache do navegador

### Problema: Eventos não aparecem no Events Manager
- **Solução**: Aguarde até 20 minutos (delay normal do Meta)
- **Solução**: Verifique se `META_ACCESS_TOKEN` está correto
- **Solução**: Verifique logs da Edge Function

### Problema: InitiateCheckout não dispara
- **Solução**: Verifique console do navegador
- **Solução**: Teste clicando nos botões "Quero Transformar Meu Corpo"
- **Solução**: Verifique se `useMetaPixel` está importado nos componentes

### Problema: CAPI retorna erro 400/500
- **Solução**: Verifique se todos os parâmetros obrigatórios estão sendo enviados
- **Solução**: Verifique formato do `eventTime` (deve ser Unix timestamp)
- **Solução**: Verifique se `META_PIXEL_ID` e `META_ACCESS_TOKEN` estão corretos

---

## 📊 Botões Rastreados com InitiateCheckout

### Página Principal (/)

1. **Botão Hero Principal**
   - Localização: `src/components/Hero.tsx`
   - Texto: "Quero Transformar Meu Corpo Agora"
   - Valor: R$ 97,00

2. **Botão CTA**
   - Localização: `src/components/CTA.tsx`
   - Texto: "Quero Garantir Minha Vaga Agora"
   - Valor: R$ 97,00

---

## 🚀 Executar Novos Testes

### Adicionar Novo Evento

1. **No Frontend** (`useMetaPixel.ts`):
```typescript
const trackNovoEvento = (params: any) => {
  if (window.fbq) {
    const eventId = generateEventId();
    window.fbq('track', 'NovoEvento', params, { eventID: eventId });
    sendToConversionsAPI('NovoEvento', params, eventId);
  }
};
```

2. **No Component**:
```typescript
import { useMetaPixel } from '@/hooks/useMetaPixel';

const { trackNovoEvento } = useMetaPixel();

// Usar em um botão ou evento
trackNovoEvento({ parametro: 'valor' });
```

### Adicionar Novo Botão com InitiateCheckout

```typescript
import { useMetaPixel } from '@/hooks/useMetaPixel';

const MeuComponente = () => {
  const { trackInitiateCheckout } = useMetaPixel();
  
  const handleClick = () => {
    trackInitiateCheckout(97, 'BRL'); // Valor e moeda
    // ... sua lógica de redirecionamento
  };
  
  return <button onClick={handleClick}>Comprar</button>;
};
```

---

## 📚 Links Úteis

- **Meta Pixel Helper**: https://chrome.google.com/webstore/detail/meta-pixel-helper/
- **Events Manager**: https://business.facebook.com/events_manager2/
- **Conversions API Docs**: https://developers.facebook.com/docs/marketing-api/conversions-api
- **Edge Function Logs**: https://supabase.com/dashboard/project/kfddlytvdzqwopongnew/functions/meta-conversions/logs
- **Supabase Secrets**: https://supabase.com/dashboard/project/kfddlytvdzqwopongnew/settings/functions

---

## ✅ Checklist de Verificação

- [ ] Meta Pixel Helper mostra eventos corretamente
- [ ] Console do navegador mostra logs de eventos
- [ ] Events Manager recebe eventos (aguardar até 20min)
- [ ] Logs da Edge Function mostram envios bem-sucedidos
- [ ] Deduplicação está funcionando (eventos aparecem como "matched")
- [ ] Botões de CTA disparam InitiateCheckout
- [ ] PageView dispara em todas as páginas
- [ ] ViewContent dispara em páginas específicas

---

**Data de Criação**: 2025
**Última Atualização**: 2025
**Versão**: 1.0
