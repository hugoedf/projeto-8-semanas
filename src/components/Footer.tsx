import { Link } from "react-router-dom";
const Footer = () => {
  return <footer className="py-8 sm:py-12 section-dark-premium relative">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center text-primary-foreground border-primary">
          <div className="mb-6 sm:mb-8">
            <h3 className="font-display text-xl sm:text-2xl mb-2 text-primary-foreground bg-primary">
              Método 8x 
            </h3>
            <p className="text-white/70 text-sm sm:text-base px-4 bg-primary">
              Transforme seu corpo com treino inteligente de hipertrofia
            </p>
          </div>
          
          <div className="border-t border-white/15 pt-6 sm:pt-8">
            <p className="text-white/60 text-xs sm:text-sm mb-3 sm:mb-4 px-4">© 2024 Método 8x. Todos os direitos reservados.</p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-white/60 px-4">
              <Link to="/termos-de-uso" className="hover:text-accent transition-colors">
                Termos de Uso
              </Link>
              <Link to="/politica-de-privacidade" className="hover:text-accent transition-colors">
                Política de Privacidade
              </Link>
            </div>
          </div>
          
          <div className="mt-6 sm:mt-8 text-xs text-white/50 px-4">
            <p className="mb-2">
              Este produto não substitui orientação médica ou nutricional profissional.
            </p>
            <p>
              Consulte um profissional antes de iniciar qualquer programa de exercícios.
            </p>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;