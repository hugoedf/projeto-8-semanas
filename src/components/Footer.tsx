import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border/30">
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Brand Section */}
          <div className="mb-8">
            <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-3">
              Método 8x
            </h3>
            <p className="text-muted-foreground text-sm sm:text-base">
              Transforme seu corpo com treino inteligente de hipertrofia
            </p>
          </div>

          {/* Divider */}
          <div className="w-full h-px bg-border/40 mb-8" />

          {/* Copyright & Links */}
          <div className="space-y-4">
            <p className="text-muted-foreground/70 text-xs sm:text-sm">
              © 2024 Método 8x. Todos os direitos reservados.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 text-xs sm:text-sm">
              <Link 
                to="/termos-de-uso" 
                className="text-muted-foreground hover:text-accent transition-colors duration-200"
              >
                Termos de Uso
              </Link>
              <Link 
                to="/politica-de-privacidade" 
                className="text-muted-foreground hover:text-accent transition-colors duration-200"
              >
                Política de Privacidade
              </Link>
            </div>
          </div>

          {/* Legal Disclaimers */}
          <div className="mt-10 pt-6 border-t border-border/20">
            <div className="space-y-2 text-xs text-muted-foreground/60">
              <p>
                Este produto não substitui orientação médica ou nutricional profissional.
              </p>
              <p>
                Consulte um profissional antes de iniciar qualquer programa de exercícios.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
