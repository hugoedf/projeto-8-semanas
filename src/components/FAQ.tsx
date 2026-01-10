import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

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
  return (
    <section className="py-10 md:py-12 px-4 bg-white">
      <div className="max-w-2xl mx-auto">
        <h2 className="font-display text-2xl md:text-3xl font-bold text-center text-black mb-6">
          Dúvidas Rápidas
        </h2>
        
        <div className="mb-6">
          <Accordion type="single" collapsible className="w-full space-y-2">
            {faqItems.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`} 
                className="border border-black/10 rounded-lg px-4 bg-white hover:bg-black/[0.02] transition-colors"
              >
                <AccordionTrigger className="text-left text-black hover:no-underline py-3 text-sm sm:text-base font-medium [&[data-state=open]]:text-accent">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-black/60 text-sm pb-3 leading-relaxed">
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
