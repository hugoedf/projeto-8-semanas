import { useState, useEffect } from "react";
import { ShoppingCart, MapPin } from "lucide-react";

const names = [
  "Lucas", "Rafael", "Thiago", "Bruno", "Pedro", "Gabriel", "Matheus", "Felipe",
  "Gustavo", "Leonardo", "André", "Rodrigo", "Daniel", "Marcelo", "João",
  "Carlos", "Fernando", "Ricardo", "Eduardo", "Henrique"
];

const cities = [
  "São Paulo, SP", "Rio de Janeiro, RJ", "Belo Horizonte, MG", "Curitiba, PR",
  "Porto Alegre, RS", "Brasília, DF", "Salvador, BA", "Fortaleza, CE",
  "Recife, PE", "Goiânia, GO", "Manaus, AM", "Campinas, SP"
];

const getRandomItem = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)];
const getRandomMinutes = () => Math.floor(Math.random() * 15) + 1;

const SocialProofNotifications = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [notification, setNotification] = useState({
    name: "",
    city: "",
    minutes: 0
  });

  useEffect(() => {
    // Primeira notificação após 8 segundos
    const initialTimeout = setTimeout(() => {
      showNotification();
    }, 8000);

    return () => clearTimeout(initialTimeout);
  }, []);

  const showNotification = () => {
    setNotification({
      name: getRandomItem(names),
      city: getRandomItem(cities),
      minutes: getRandomMinutes()
    });
    setIsVisible(true);

    // Esconder após 5 segundos
    setTimeout(() => {
      setIsVisible(false);
      
      // Próxima notificação em 20-40 segundos
      const nextDelay = Math.floor(Math.random() * 20000) + 20000;
      setTimeout(showNotification, nextDelay);
    }, 5000);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-20 sm:bottom-6 left-4 z-40 animate-slide-in-left">
      <div className="bg-white rounded-xl shadow-2xl shadow-black/20 border border-gray-100 p-3 sm:p-4 max-w-[280px] sm:max-w-xs">
        <div className="flex items-start gap-3">
          {/* Icon */}
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-green-500/10 border border-green-500/20 flex items-center justify-center">
            <ShoppingCart className="w-5 h-5 text-green-600" />
          </div>
          
          {/* Content */}
          <div className="flex-1 min-w-0">
            <p className="text-foreground text-sm font-medium truncate">
              {notification.name} comprou agora
            </p>
            <div className="flex items-center gap-1 text-muted-foreground text-xs mt-0.5">
              <MapPin className="w-3 h-3" />
              <span className="truncate">{notification.city}</span>
            </div>
            <p className="text-muted-foreground/70 text-xs mt-1">
              há {notification.minutes} {notification.minutes === 1 ? 'minuto' : 'minutos'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialProofNotifications;