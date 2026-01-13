import { useState, useEffect } from "react";
import { Eye } from "lucide-react";

const LiveViewers = () => {
  const [viewers, setViewers] = useState(0);

  useEffect(() => {
    // Número base entre 12 e 28
    const baseViewers = Math.floor(Math.random() * 16) + 12;
    setViewers(baseViewers);

    // Variação suave a cada 5-10 segundos
    const interval = setInterval(() => {
      setViewers(prev => {
        const change = Math.floor(Math.random() * 5) - 2; // -2 a +2
        const newValue = prev + change;
        return Math.max(8, Math.min(35, newValue)); // Mantém entre 8 e 35
      });
    }, Math.random() * 5000 + 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="inline-flex items-center gap-2 text-white/70 text-xs sm:text-sm bg-white/5 border border-white/10 rounded-full px-3 py-1.5">
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
      </span>
      <Eye className="w-3.5 h-3.5" />
      <span>
        <span className="font-semibold text-white">{viewers}</span> pessoas vendo agora
      </span>
    </div>
  );
};

export default LiveViewers;