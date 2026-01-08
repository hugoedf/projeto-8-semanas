import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useMetaPixel } from "@/hooks/useMetaPixel";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";
import { buildHotmartCheckoutUrl } from "@/lib/utils";

// Apenas 5 perguntas que matam objeções de compra imediata
const faqItems = [
  {
    question: "E se eu não gostar ou não funcionar pra mim?",
    answer: "Você tem 7 dias pra testar. Se não fizer sentido, pede o reembolso. Sem questionário, sem burocracia. O risco é zero — você só paga se decidir ficar."
  },
  {
    question: "Por que custa tão pouco?",
    answer: "Porque é simples e direto. Sem enrolação, sem módulos infinitos. O valor é baixo pra não ser desculpa. Você investe menos que uma refeição pra testar um sistema que pode mudar sua forma de treinar."
  },
  {
    question: "Isso funciona pra quem já treina há anos e está travado?",
    answer: "Sim. O Método 8X foi feito exatamente pra quem treina sério mas não vê evolução. O problema geralmente não é falta de esforço — é falta de progressão estruturada."
  },
  {
    question: "Quanto tempo por dia preciso dedicar?",
    answer: "Os treinos duram 45-60 minutos. O Método 8X não é sobre treinar mais — é sobre treinar certo. Você ganha tempo eliminando o improviso."
  },
  {
    question: "Como recebo o acesso?",
    answer: "Imediato. Assim que o pagamento é confirmado, você recebe tudo no e-mail: o e-book completo e o acesso ao App 8X. Pode começar no mesmo dia."
  }
];

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

  return (
    <section className="py-10 md:py-14 px-4 bg-white">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-center text-foreground mb-6">
          Dúvidas Rápidas
        </h2>
        
        <div className="mb-6">
          <Accordion type="single" collapsible className="w-full space-y-2">
            {faqItems.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`} 
                className="border border-border/50 rounded-lg px-4 bg-card/30 hover:bg-card/50 transition-colors"
              >
                <AccordionTrigger className="text-left text-foreground hover:no-underline py-3 text-base font-medium [&[data-state=open]]:text-accent">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm pb-3 leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* CTA Final */}
        <div className="text-center pt-4 border-t border-border/30">
          <p className="text-foreground font-medium text-base mb-3">
            Teste por 7 dias — <span className="text-accent">R$19,90</span>
          </p>
          <Button variant="cta" size="cta" onClick={handleCTAClick}>
            GARANTIR MEU ACESSO AGORA
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;