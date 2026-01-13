import { MessageCircle } from "lucide-react";
import { useEffect, useState } from "react";

const WhatsAppButton = () => {
  const [showButton, setShowButton] = useState(false);
  const phoneNumber = "5581992656088";
  const message = "Oi! Vi a página do Método 8X e quero entender se faz sentido pra mim.";
  
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const pageHeight = document.documentElement.scrollHeight;
      // Mostra quando estiver nos últimos 20% da página
      const showThreshold = pageHeight * 0.8;
      setShowButton(scrollPosition >= showThreshold);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check initial position
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!showButton) return null;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-20 right-4 lg:bottom-6 lg:right-6 z-50 flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 bg-[#25D366] hover:bg-[#20BD5A] rounded-full shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group animate-fade-in"
      aria-label="Falar no WhatsApp"
    >
      <MessageCircle className="w-5 h-5 lg:w-6 lg:h-6 text-white fill-white" />
      
      {/* Tooltip - Desktop only */}
      <span className="hidden lg:block absolute right-14 bg-background text-foreground text-sm px-3 py-2 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-border">
        Tire suas dúvidas
      </span>
    </a>
  );
};

export default WhatsAppButton;
