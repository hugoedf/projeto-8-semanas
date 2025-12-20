import { useState, useEffect } from "react";
import { Flame, Users } from "lucide-react";

const UrgencyBanner = () => {
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const [viewersCount, setViewersCount] = useState(0);

  useEffect(() => {
    // Inicializar ou recuperar o timestamp do localStorage
    const storedEndTime = localStorage.getItem('urgency_end_time');
    let endTime: number;

    if (storedEndTime) {
      endTime = parseInt(storedEndTime);
      // Se já passou, criar novo timer de 3 horas
      if (endTime < Date.now()) {
        endTime = Date.now() + 3 * 60 * 60 * 1000; // 3 horas
        localStorage.setItem('urgency_end_time', endTime.toString());
      }
    } else {
      // Primeira visita: criar timer de 3 horas
      endTime = Date.now() + 3 * 60 * 60 * 1000;
      localStorage.setItem('urgency_end_time', endTime.toString());
    }

    const updateTimer = () => {
      const now = Date.now();
      const difference = endTime - now;

      if (difference <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    };

    updateTimer();
    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Simular contagem de visualizadores (entre 89 e 156)
    const baseCount = 89 + Math.floor(Math.random() * 67);
    setViewersCount(baseCount);

    // Variar ligeiramente a cada 5-15 segundos
    const interval = setInterval(() => {
      setViewersCount(prev => {
        const change = Math.floor(Math.random() * 7) - 3; // -3 a +3
        const newCount = prev + change;
        return Math.max(85, Math.min(160, newCount));
      });
    }, 5000 + Math.random() * 10000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-destructive via-destructive/90 to-orange-600 text-white py-2.5 px-4 shadow-lg">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6 text-center">
        {/* Contador */}
        <div className="flex items-center gap-2 animate-pulse">
          <Flame className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-300" />
          <span className="text-xs sm:text-sm font-medium">
            Preço sobe em:
          </span>
          <div className="flex items-center gap-1 font-mono font-bold text-sm sm:text-base">
            <span className="bg-black/30 px-1.5 py-0.5 rounded">
              {formatNumber(timeLeft.hours)}
            </span>
            <span className="text-yellow-300">:</span>
            <span className="bg-black/30 px-1.5 py-0.5 rounded">
              {formatNumber(timeLeft.minutes)}
            </span>
            <span className="text-yellow-300">:</span>
            <span className="bg-black/30 px-1.5 py-0.5 rounded">
              {formatNumber(timeLeft.seconds)}
            </span>
          </div>
        </div>

        {/* Separador */}
        <div className="hidden sm:block w-px h-4 bg-white/30" />

        {/* Visualizadores */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400"></span>
            </span>
            <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          </div>
          <span className="text-xs sm:text-sm font-medium">
            <span className="font-bold">{viewersCount}</span> pessoas online agora
          </span>
        </div>
      </div>
    </div>
  );
};

export default UrgencyBanner;
