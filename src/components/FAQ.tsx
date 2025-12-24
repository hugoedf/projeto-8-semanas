import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useScrollAnimation, useStaggeredAnimation } from "@/hooks/useScrollAnimation";

const faqItems = [
  {
    question: "Como recebo o acesso ao Método 8X?",
    answer: "Após a compra, o acesso é enviado automaticamente para o seu e-mail cadastrado na Hotmart."
  },
  {
    question: "O acesso é imediato após a compra?",
    answer: "Sim. Assim que o pagamento é aprovado, o acesso é liberado automaticamente."
  },
  {
    question: "O Método 8X é um treino pronto?",
    answer: "O Método 8X oferece uma estrutura organizada de 8 semanas de treinamento, com progressão e lógica clara de estímulos. Além disso, ele explica o porquê de cada etapa, para que você entenda como aplicar o método corretamente."
  },
  {
    question: "Funciona para iniciantes ou para quem já treina há mais tempo?",
    answer: "Sim. O método se adapta tanto a iniciantes quanto a quem já treina e sente que está estagnado."
  },
  {
    question: "E se eu não gostar do conteúdo?",
    answer: "Você tem 7 dias de garantia para solicitar o reembolso direto pela Hotmart."
  }
];

const FAQ = () => {
  const { ref: titleRef, isVisible: titleVisible } = useScrollAnimation();
  const { ref: accordionRef, isVisible: accordionVisible, getItemStyle } = useStaggeredAnimation(faqItems.length, 80, 'fadeUp');

  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-3xl mx-auto">
        <h2 
          ref={titleRef}
          className="text-2xl md:text-3xl font-bold text-center text-foreground mb-10"
          style={{
            opacity: titleVisible ? 1 : 0,
            transform: titleVisible ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.4s ease-out, transform 0.4s ease-out'
          }}
        >
          Perguntas Frequentes
        </h2>
        
        <div ref={accordionRef}>
          <Accordion type="single" collapsible className="w-full space-y-3">
            {faqItems.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-border/50 rounded-lg px-4 bg-card/30"
                style={getItemStyle(index)}
              >
                <AccordionTrigger className="text-left text-foreground hover:no-underline py-5 text-base md:text-lg font-medium">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground text-sm md:text-base pb-5">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;