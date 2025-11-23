const Footer = () => {
  return (
    <footer className="py-12 gradient-hero">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h3 className="font-display text-2xl text-primary-foreground mb-2">
              Projeto 8 Semanas
            </h3>
            <p className="text-primary-foreground/70">
              Transforme seu corpo com treino inteligente de hipertrofia
            </p>
          </div>
          
          <div className="border-t border-primary-foreground/20 pt-8">
            <p className="text-primary-foreground/60 text-sm mb-4">
              © 2024 Projeto 8 Semanas. Todos os direitos reservados.
            </p>
            <div className="flex flex-wrap justify-center gap-6 text-sm text-primary-foreground/60">
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
          
          <div className="mt-8 text-xs text-primary-foreground/50">
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
