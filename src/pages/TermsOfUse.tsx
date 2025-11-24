import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const TermsOfUse = () => {
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
          Termos de Uso
        </h1>
        
        <div className="prose prose-lg max-w-none text-foreground/80 space-y-6">
          <section>
            <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
              1. Aceitação dos Termos
            </h2>
            <p>
              Ao acessar e utilizar o Projeto 8 Semanas, você concorda em cumprir e estar 
              vinculado aos seguintes termos e condições de uso. Se você não concordar com 
              qualquer parte destes termos, não deverá utilizar nosso produto.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
              2. Descrição do Serviço
            </h2>
            <p>
              O Projeto 8 Semanas é um programa digital de treinamento de hipertrofia que 
              fornece orientações, exercícios e metodologias para desenvolvimento muscular. 
              O conteúdo é disponibilizado em formato digital e destina-se exclusivamente 
              para uso pessoal e não comercial.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
              3. Uso do Produto
            </h2>
            <p>
              Ao adquirir o Projeto 8 Semanas, você recebe uma licença pessoal, não transferível 
              e não exclusiva para acessar e utilizar o conteúdo. É expressamente proibido:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Compartilhar, distribuir ou revender o conteúdo</li>
              <li>Reproduzir, copiar ou modificar qualquer parte do material</li>
              <li>Utilizar o conteúdo para fins comerciais</li>
              <li>Fazer engenharia reversa ou descompilar qualquer parte do produto</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
              4. Propriedade Intelectual
            </h2>
            <p>
              Todo o conteúdo do Projeto 8 Semanas, incluindo textos, imagens, gráficos, 
              logotipos e programas de treinamento, é protegido por direitos autorais e 
              outras leis de propriedade intelectual. Todos os direitos são reservados.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
              5. Garantia e Reembolso
            </h2>
            <p>
              Oferecemos uma garantia de satisfação de 7 dias. Se você não estiver satisfeito 
              com o produto, poderá solicitar o reembolso integral dentro deste período, 
              mediante solicitação por e-mail.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
              6. Isenção de Responsabilidade
            </h2>
            <p>
              O Projeto 8 Semanas é fornecido apenas para fins educacionais e informativos. 
              Não somos responsáveis por quaisquer lesões, danos ou problemas de saúde que 
              possam ocorrer durante ou após a utilização do programa.
            </p>
            <p className="mt-4">
              Este produto não substitui orientação médica, nutricional ou de educação física 
              profissional. Consulte sempre um profissional de saúde antes de iniciar qualquer 
              programa de exercícios.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
              7. Limitação de Responsabilidade
            </h2>
            <p>
              Em nenhuma circunstância seremos responsáveis por quaisquer danos diretos, 
              indiretos, incidentais, especiais ou consequenciais resultantes do uso ou 
              incapacidade de usar o Projeto 8 Semanas.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
              8. Modificações dos Termos
            </h2>
            <p>
              Reservamo-nos o direito de modificar estes termos a qualquer momento. 
              As alterações entrarão em vigor imediatamente após a publicação. 
              O uso continuado do produto após as modificações constitui aceitação 
              dos novos termos.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
              9. Lei Aplicável
            </h2>
            <p>
              Estes termos são regidos pelas leis brasileiras. Qualquer disputa relacionada 
              a estes termos será submetida à jurisdição exclusiva dos tribunais brasileiros.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold text-foreground mb-4">
              10. Contato
            </h2>
            <p>
              Para questões sobre estes Termos de Uso, entre em contato conosco através 
              dos canais disponibilizados no momento da compra.
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

export default TermsOfUse;
