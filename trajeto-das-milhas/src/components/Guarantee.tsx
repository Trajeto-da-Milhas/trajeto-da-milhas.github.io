import React from 'react';
import { motion } from 'motion/react';
import { ShieldCheck } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const Guarantee: React.FC = () => {
  const { content } = useContent();

  return (
    <section className="py-32 relative bg-transparent overflow-hidden">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto p-12 md:p-20 rounded-[3rem] bg-gradient-to-b from-[#0D1526] to-[#050A14] border border-[#00FF94]/20 relative"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-[#050A14] border border-[#00FF94]/30 flex items-center justify-center shadow-[0_0_30px_rgba(0,255,148,0.2)]">
            <ShieldCheck className="text-[#00FF94] w-12 h-12" />
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black mb-8 text-[#E8F4FD]">
            {content.guarantee.title}
          </h2>
          <p className="text-[#8BA3C0] text-lg md:text-xl leading-relaxed mb-10">
            {content.guarantee.description}
          </p>
          
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-[#00FF94]/10 border border-[#00FF94]/20 text-[#00FF94] font-bold">
            Risco Zero para Você
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Guarantee;
