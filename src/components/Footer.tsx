const Footer = () => {
  return (
    <footer className="py-8 sm:py-12 gradient-hero">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-6 sm:mb-8">
            <h3 className="font-display text-xl sm:text-2xl text-primary-foreground mb-2">
              Projeto 8 Semanas
            </h3>
            <p className="text-primary-foreground/70 text-sm sm:text-base px-4">
              Transforme seu corpo com treino inteligente de hipertrofia
            </p>
          </div>
          
          <div className="border-t border-primary-foreground/20 pt-6 sm:pt-8">
            <p className="text-primary-foreground/60 text-xs sm:text-sm mb-3 sm:mb-4 px-4">
              © 2024 Projeto 8 Semanas. Todos os direitos reservados.
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-primary-foreground/60 px-4">
              <a href="#" className="hover:text-accent transition-colors">
                Termos de Uso
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                Política de Privacidade
              </a>
              <a href="#" className="hover:text-accent transition-colors">
                Contato
              </a>
            </div>
          </div>
          
          <div className="mt-6 sm:mt-8 text-xs text-primary-foreground/50 px-4">
            <p className="mb-2">
              Este produto não substitui orientação médica ou nutricional profissional.
            </p>
            <p>
              Consulte um profissional antes de iniciar qualquer programa de exercícios.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
