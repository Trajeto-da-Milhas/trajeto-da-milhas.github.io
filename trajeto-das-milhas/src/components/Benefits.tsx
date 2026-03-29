import React from 'react';
import { motion } from 'motion/react';
import * as Icons from 'lucide-react';
import { useContent } from '../context/ContentContext';

const Benefits: React.FC = () => {
  const { content } = useContent();

  return (
    <section id="benefits" className="py-32 relative bg-transparent overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-6">Por que fazer parte do grupo?</h2>
          <p className="text-[#8BA3C0] max-w-2xl mx-auto">
            Tudo o que você precisa para dominar o mundo das milhas e viajar com o máximo de conforto.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {content.benefits.map((benefit, index) => {
            const IconComponent = (Icons as any)[benefit.icon] || Icons.HelpCircle;
            return (
              <motion.div
                key={benefit.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-8 rounded-3xl bg-[#0D1526]/50 border border-[#00D4FF]/10 backdrop-blur-md hover:border-[#00D4FF]/40 transition-all group"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#00D4FF]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <IconComponent className="text-[#00D4FF] w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-[#E8F4FD]">{benefit.title}</h3>
                <p className="text-[#8BA3C0] leading-relaxed">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Benefits;
