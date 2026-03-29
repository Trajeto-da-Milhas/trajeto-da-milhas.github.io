import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const FAQ: React.FC = () => {
  const { content } = useContent();
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className="py-32 bg-[#050A14]">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-6">Perguntas Frequentes</h2>
          <p className="text-[#8BA3C0]">Tire suas dúvidas antes de entrar no grupo.</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {content.faq.map((item) => (
            <div key={item.id} className="rounded-2xl bg-[#0D1526]/50 border border-[#00D4FF]/10 overflow-hidden">
              <button 
                onClick={() => setOpenId(openId === item.id ? null : item.id)}
                className="w-full p-6 flex items-center justify-between text-left hover:bg-[#00D4FF]/5 transition-colors"
              >
                <span className="text-lg font-bold text-[#E8F4FD]">{item.question}</span>
                {openId === item.id ? <Minus className="text-[#00D4FF]" /> : <Plus className="text-[#00D4FF]" />}
              </button>
              
              <AnimatePresence>
                {openId === item.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 text-[#8BA3C0] leading-relaxed border-t border-[#00D4FF]/5">
                      {item.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
