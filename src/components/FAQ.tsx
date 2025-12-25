import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useMetaPixel } from "@/hooks/useMetaPixel";
import { useVisitorTracking } from "@/hooks/useVisitorTracking";

const faqItems = [
  { question: "Como recebo o acesso ao Método 8X?", answer: "Assim que a compra é confirmada, você recebe o acesso imediato ao sistema completo no seu e-mail. Você já pode começar no mesmo dia, sem esperar liberação manual." },
  { question: "O acesso é realmente imediato?", answer: "Sim. Pagamento aprovado → acesso liberado. Você já entra no e-book e no App 8X com o plano organizado para seguir desde o primeiro treino." },
  { question: "O Método 8X é um treino pronto ou preciso adaptar?", answer: "O Método 8X é um sistema estruturado, não um treino genérico. Você recebe: plano de 8 semanas organizado, progressão definida e execução guiada pelo app. Ou seja: você não improvisa — apenas segue e ajusta quando o próprio método indica." },
  { question: "Funciona para iniciantes ou só para quem já treina?", answer: "Funciona para os dois. Iniciantes aprendem a treinar certo desde o começo, sem criar vícios. Intermediários e avançados rompem a estagnação com progressão clara e método. O sistema se adapta ao seu ponto de partida." },
  { question: "Preciso treinar muitas horas por dia?", answer: "Não. O foco do Método 8X não é fazer mais — é fazer melhor. Os treinos são eficientes, objetivos e pensados para quem quer resultado sem perder tempo na academia." },
  { question: "Isso substitui acompanhamento médico ou nutricional?", answer: "Não. O Método 8X é um sistema de treino e organização de execução. Sempre recomendamos acompanhamento profissional em casos específicos de saúde." },
  { question: "E se eu não gostar do conteúdo?", answer: "Você tem 7 dias de garantia incondicional. Teste o método, aplique na prática. Se não fizer sentido pra você, é só pedir o reembolso. Sem questionário. Sem burocracia. Você compra, testa e decide com calma." },
  { question: "Por que o valor é tão baixo?", answer: "Porque o objetivo do Método 8X é acesso, não exclusividade. Você está investindo menos que uma refeição para aprender um sistema que pode mudar completamente a forma como você treina — agora e no futuro." }
];

const FAQ = () => {
  const { trackInitiateCheckout } = useMetaPixel();
  const { getVisitorData } = useVisitorTracking();

  const handleCTAClick = () => {
    const visitorData = getVisitorData();
    const baseUrl = 'https://pay.hotmart.com/B98037937L';
    const params = new URLSearchParams();
    if (visitorData.visitorId) params.set('off', visitorData.visitorId);
    const checkoutUrl = params.toString() ? `${baseUrl}?${params.toString()}` : baseUrl;
    trackInitiateCheckout(19.90, 'BRL');
    window.location.href = checkoutUrl;
  };

  return (
    <section className="py-16 md:py-20 px-4 bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-center text-accent mb-4">Perguntas Frequentes</h2>
        <p className="text-[#1a1a1a]/60 text-center text-sm md:text-base mb-10 max-w-xl mx-auto">Tudo que você precisa saber antes de começar.</p>
        
        <div className="mb-10">
          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqItems.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-2 border-accent/20 rounded-lg px-5 bg-white hover:border-accent/40 transition-colors">
                <AccordionTrigger className="text-left text-[#1a1a1a] hover:no-underline py-5 text-base md:text-lg font-medium [&[data-state=open]]:text-accent">{item.question}</AccordionTrigger>
                <AccordionContent className="text-[#1a1a1a]/70 text-sm md:text-base pb-5 leading-relaxed">{item.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center pt-6 border-t-2 border-accent/20">
          <p className="text-[#1a1a1a]/60 text-sm mb-4">Ainda com dúvida? Por R$19,90 você testa com garantia de 7 dias.</p>
          <Button size="lg" onClick={handleCTAClick} className="bg-gradient-to-r from-accent to-[#e55a2b] hover:from-[#e55a2b] hover:to-accent text-white font-bold text-base px-8 py-6 rounded-full shadow-lg shadow-accent/30">
            QUERO TREINAR COM MÉTODO
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;