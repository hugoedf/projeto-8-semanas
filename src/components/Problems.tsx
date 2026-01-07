import React from 'react';
import { motion } from 'framer-motion';
import { Dumbbell, TrendingDown, Clock, Target, ChevronRight } from 'lucide-react';

const Problems = () => {
  const problems = [
    {
      title: "Esforço sem Evolução",
      description: "Cansado de treinar pesado e continuar com o mesmo corpo de meses atrás? O erro não é sua dedicação, é a falta de um mapa.",
      icon: <Dumbbell className="w-6 h-6 text-accent" />
    },
    {
      title: "Frustração no Espelho",
      description: "Olhar para o lado e ver outros evoluindo enquanto você está estagnado gera uma pergunta: 'O que eu estou fazendo de errado?'",
      icon: <TrendingDown className="w-6 h-6 text-accent" />
    },
    {
      title: "O Ciclo do Improviso",
      description: "Treinar sem um método é como tentar chegar a um destino sem GPS. Você gasta energia, mas continua no mesmo lugar.",
      icon: <Clock className="w-6 h-6 text-accent" />
    },
    {
      title: "Falta de Direção Real",
      description: "O problema não é falta de disciplina, é falta de clareza. Sem saber exatamente o que fazer, você nunca atingirá seu máximo.",
      icon: <Target className="w-6 h-6 text-accent" />
    }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold text-secondary mb-6">
              Você treina, se esforça... <br />
              <span className="text-accent">e mesmo assim não vê resultado?</span>
            </h2>
            <p className="text-lg text-secondary/70 max-w-2xl mx-auto">
              A verdade que ninguém te conta na academia: o problema não é sua genética ou falta de suplementos caros.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {problems.map((problem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-secondary/5 p-8 rounded-2xl border border-secondary/10 hover:border-accent/30 transition-colors group"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-white rounded-xl shadow-sm group-hover:scale-110 transition-transform">
                    {problem.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-secondary mb-2">{problem.title}</h3>
                    <p className="text-secondary/70 leading-relaxed">{problem.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-secondary text-white p-10 rounded-[2.5rem] text-center relative overflow-hidden shadow-2xl"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-accent/10 rounded-full -mr-32 -mt-32 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/5 rounded-full -ml-32 -mb-32 blur-3xl" />
            
            <div className="relative z-10">
              <span className="inline-block px-4 py-1 bg-accent/20 text-accent rounded-full text-sm font-bold mb-6 tracking-wider uppercase">
                A Causa Real
              </span>
              <h3 className="text-2xl md:text-3xl font-bold mb-6">
                O problema <span className="text-accent">não é a falta de esforço.</span>
              </h3>
              <p className="text-lg text-white/80 mb-8 max-w-2xl mx-auto leading-relaxed">
                O problema é que você está <span className="text-white font-bold">treinando no escuro</span>. Sem um método validado, você está apenas "fazendo força" em vez de construir músculos de verdade.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <div className="flex items-center gap-2 text-accent font-bold">
                  <ChevronRight className="w-5 h-5" />
                  <span>Chega de improvisar</span>
                </div>
                <div className="w-1.5 h-1.5 bg-white/20 rounded-full hidden sm:block" />
                <div className="flex items-center gap-2 text-accent font-bold">
                  <ChevronRight className="w-5 h-5" />
                  <span>Comece a evoluir hoje</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Problems;
