import React from 'react';
import { motion } from 'motion/react';
import { useContent } from '../context/ContentContext';

const WhatIs: React.FC = () => {
  const { content } = useContent();

  return (
    <section id="whatis" className="py-32 bg-[#0A1128] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#00D4FF]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#9D00FF]/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2"
          >
            <h2 className="text-3xl md:text-5xl font-black mb-8 leading-tight">
              {content.whatis.title}
            </h2>
            <p className="text-[#8BA3C0] text-lg leading-relaxed mb-8">
              {content.whatis.description}
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-1 bg-[#00D4FF] rounded-full"></div>
              <span className="text-[#00D4FF] font-bold uppercase tracking-widest text-sm">Exclusividade & Estratégia</span>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:w-1/2 relative"
          >
            <div className="absolute -inset-4 bg-gradient-to-r from-[#00D4FF] to-[#7B2FFF] opacity-20 blur-2xl rounded-3xl"></div>
            <img 
              src={content.whatis.imageUrl} 
              alt="Luxury Travel" 
              className="relative rounded-3xl border border-[#00D4FF]/20 shadow-2xl w-full object-cover aspect-[4/3]"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhatIs;
