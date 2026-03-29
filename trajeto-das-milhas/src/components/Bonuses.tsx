import React from 'react';
import { motion } from 'motion/react';
import { Gift } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const Bonuses: React.FC = () => {
  const { content } = useContent();

  return (
    <section className="py-32 bg-transparent">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Gift className="text-[#7B2FFF] w-8 h-8" />
            <span className="text-[#7B2FFF] font-black uppercase tracking-widest">Bônus Exclusivos</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-6">Presentes para acelerar seus resultados</h2>
          <p className="text-[#8BA3C0]">Ao entrar hoje, você também leva esses materiais complementares.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {content.bonuses.map((bonus, index) => (
            <motion.div
              key={bonus.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group rounded-3xl overflow-hidden bg-[#0D1526]/50 border border-[#00D4FF]/10 hover:border-[#7B2FFF]/40 transition-all"
            >
              <div className="aspect-video overflow-hidden">
                <img 
                  src={bonus.imageUrl} 
                  alt={bonus.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold mb-3 text-[#E8F4FD]">{bonus.title}</h3>
                <p className="text-[#8BA3C0] text-sm leading-relaxed">
                  {bonus.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Bonuses;
