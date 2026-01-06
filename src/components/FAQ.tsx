import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useMetaPixel } from "@/hooks/useMetaPixel";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";
import { buildHotmartCheckoutUrl } from "@/lib/utils";

const faqItems = [{
  question: "Isso funciona pra quem já treina há anos e está travado?",
  answer: "Sim. O Método 8X foi feito exatamente pra quem treina sério mas não vê evolução. O problema geralmente não é falta de esforço — é falta de progressão estruturada. O método organiza sua execução semana a semana pra você sair da estagnação."
}, {
  question: "E se eu for iniciante, consigo acompanhar?",
  answer: "Consegue. O sistema é simples de seguir. Você não precisa entender tudo — só executar. O app guia cada treino. Iniciantes têm a vantagem de começar certo, sem vícios de execução."
}, {
  question: "Quanto tempo por dia preciso dedicar?",
  answer: "Os treinos são objetivos e duram entre 45-60 minutos. O Método 8X não é sobre treinar mais — é sobre treinar certo. Você ganha tempo eliminando o improviso."
}, {
  question: "Qual a diferença disso pra um treino de YouTube ou app grátis?",
  answer: "Treinos soltos não têm progressão. Você faz, repete, mas não evolui. O Método 8X é um sistema de 8 semanas com lógica de progressão. Cada semana prepara a próxima. Isso é o que gera resultado."
}, {
  question: "E se eu não gostar ou não funcionar pra mim?",
  answer: "Você tem 7 dias pra testar. Se não fizer sentido, pede o reembolso. Sem questionário, sem burocracia. O risco é zero — você só paga se decidir ficar."
}, {
  question: "Por que custa tão pouco?",
  answer: "Porque é simples e direto. Sem enrolação, sem módulos infinitos. O valor é baixo pra não ser desculpa. Você investe menos que uma refeição pra testar um sistema que pode mudar sua forma de treinar."
}, {
  question: "Como recebo o acesso?",
  answer: "Imediato. Assim que o pagamento é confirmado, você recebe tudo no e-mail: o e-book completo e o acesso ao App 8X. Pode começar no mesmo dia."
}, {
  question: "Preciso de equipamento especial ou academia específica?",
  answer: "Não. O método funciona em qualquer academia convencional. Você usa os equipamentos que já tem disponíveis — o diferencial está na execução, não no equipamento."
}];

const FAQ = () => {
  const { trackInitiateCheckout } = useMetaPixel();
  const { visitorData } = useVisitorTracking();
  
  const handleCTAClick = () => {
    const baseUrl = 'https://pay.hotmart.com/O103097031O?checkoutMode=10&bid=1764670825465';
    const checkoutUrl = buildHotmartCheckoutUrl(baseUrl);
    console.log('✅ ===== CHECKOUT INICIADO (FAQ) =====');
    console.log('🔗 URL final:', checkoutUrl);
    console.log('📊 Dados do visitante:', visitorData);
    console.log('========================================');
    trackInitiateCheckout(19.90, 'BRL');
    window.location.href = checkoutUrl;
  };
  return <section className="py-12 md:py-16 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-center text-foreground mb-3">
          Perguntas Frequentes
        </h2>
        
        <p className="text-muted-foreground text-center text-sm md:text-base mb-8 max-w-xl mx-auto">
          Tudo que você precisa saber antes de começar.
        </p>
        
        <div className="mb-8">
          <Accordion type="single" collapsible className="w-full space-y-2">
            {faqItems.map((item, index) => <AccordionItem key={index} value={`item-${index}`} className="border border-border/50 rounded-lg px-4 bg-card/30 hover:bg-card/50 transition-colors">
                <AccordionTrigger className="text-left text-foreground hover:no-underline py-4 text-base md:text-lg font-medium [&[data-state=open]]:text-accent">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm md:text-base pb-4 leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>)}
          </Accordion>
        </div>

        {/* CTA após FAQ */}
        <div className="text-center pt-5 border-t border-border/30">
          <p className="text-muted-foreground text-sm mb-1.5">
            Ainda com dúvida?
          </p>
          <p className="text-foreground font-medium text-base mb-3">
            Teste por 7 dias. Se não gostar, <span className="text-accent font-semibold">devolvo seu dinheiro.</span>
          </p>
          <Button variant="cta" size="cta" onClick={handleCTAClick}>
            COMEÇAR POR APENAS R$19,90
          </Button>
        </div>
      </div>
    </section>;
};
export default FAQ;