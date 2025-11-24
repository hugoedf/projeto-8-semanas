import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar para página inicial
        </Link>
        
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-8">
          Política de Privacidade
        </h1>
        
        <div className="prose prose-lg max-w-none text-foreground/80 space-y-6">
          <section>
            <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
              1. Introdução
            </h2>
            <p>
              A sua privacidade é importante para nós. Esta Política de Privacidade explica 
              como coletamos, usamos, divulgamos e protegemos suas informações quando você 
              utiliza o Projeto 8 Semanas.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
              2. Informações que Coletamos
            </h2>
            <p>
              Coletamos diferentes tipos de informações para fornecer e melhorar nosso serviço:
            </p>
            <h3 className="font-semibold text-foreground mt-4 mb-2">
              2.1 Informações Pessoais
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Nome completo</li>
              <li>Endereço de e-mail</li>
              <li>Informações de pagamento (processadas por plataformas seguras de terceiros)</li>
              <li>Dados de acesso e uso do produto</li>
            </ul>
            <h3 className="font-semibold text-foreground mt-4 mb-2">
              2.2 Informações Técnicas
            </h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>Endereço IP</li>
              <li>Tipo de navegador</li>
              <li>Sistema operacional</li>
              <li>Páginas visitadas e tempo de permanência</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
              3. Como Usamos suas Informações
            </h2>
            <p>
              Utilizamos as informações coletadas para:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Processar e gerenciar sua compra</li>
              <li>Fornecer acesso ao conteúdo do Projeto 8 Semanas</li>
              <li>Enviar comunicações relacionadas ao produto</li>
              <li>Melhorar nossos serviços e experiência do usuário</li>
              <li>Prevenir fraudes e garantir a segurança</li>
              <li>Cumprir obrigações legais</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
              4. Compartilhamento de Informações
            </h2>
            <p>
              Não vendemos, alugamos ou comercializamos suas informações pessoais. 
              Podemos compartilhar suas informações apenas nas seguintes situações:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Com processadores de pagamento para concluir transações</li>
              <li>Com provedores de serviços que nos auxiliam na operação do negócio</li>
              <li>Quando exigido por lei ou processo legal</li>
              <li>Para proteger nossos direitos, propriedade ou segurança</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
              5. Cookies e Tecnologias Similares
            </h2>
            <p>
              Utilizamos cookies e tecnologias similares para melhorar sua experiência, 
              analisar o uso do site e personalizar conteúdo. Você pode configurar seu 
              navegador para recusar cookies, mas isso pode afetar a funcionalidade do site.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
              6. Segurança dos Dados
            </h2>
            <p>
              Implementamos medidas de segurança técnicas e organizacionais apropriadas para 
              proteger suas informações pessoais contra acesso não autorizado, alteração, 
              divulgação ou destruição. No entanto, nenhum método de transmissão pela 
              internet é 100% seguro.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
              7. Retenção de Dados
            </h2>
            <p>
              Mantemos suas informações pessoais apenas pelo tempo necessário para cumprir 
              os propósitos descritos nesta política, a menos que um período de retenção 
              mais longo seja exigido ou permitido por lei.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
              8. Seus Direitos
            </h2>
            <p>
              De acordo com a Lei Geral de Proteção de Dados (LGPD), você tem os seguintes direitos:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Confirmar a existência de tratamento de dados</li>
              <li>Acessar seus dados pessoais</li>
              <li>Corrigir dados incompletos, inexatos ou desatualizados</li>
              <li>Solicitar a anonimização, bloqueio ou eliminação de dados</li>
              <li>Solicitar a portabilidade de dados</li>
              <li>Revogar o consentimento</li>
            </ul>
            <p className="mt-4">
              Para exercer seus direitos, entre em contato conosco através dos canais disponibilizados.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
              9. Menores de Idade
            </h2>
            <p>
              Nosso produto não se destina a menores de 18 anos. Não coletamos intencionalmente 
              informações de menores. Se tomarmos conhecimento de que coletamos dados de um menor, 
              tomaremos medidas para excluir essas informações.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
              10. Alterações nesta Política
            </h2>
            <p>
              Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos 
              você sobre quaisquer alterações publicando a nova política nesta página e 
              atualizando a data de "Última atualização".
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
              11. Contato
            </h2>
            <p>
              Se você tiver dúvidas sobre esta Política de Privacidade ou sobre como tratamos 
              seus dados pessoais, entre em contato conosco através dos canais disponibilizados 
              no momento da compra.
            </p>
          </section>

          <p className="text-sm text-foreground/60 mt-8 pt-8 border-t border-border">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
