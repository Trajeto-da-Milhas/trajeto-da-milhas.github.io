import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { useContent } from '../context/ContentContext';

const Testimonials: React.FC = () => {
  const { content } = useContent();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % content.testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [content.testimonials.length]);

  const next = () => setCurrentIndex((prev) => (prev + 1) % content.testimonials.length);
  const prev = () => setCurrentIndex((prev) => (prev - 1 + content.testimonials.length) % content.testimonials.length);

  return (
    <section className="py-32 bg-transparent overflow-hidden">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black mb-6">O que nossos membros dizem</h2>
          <p className="text-[#8BA3C0]">Resultados reais de quem já está viajando de executiva.</p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="p-10 md:p-16 rounded-3xl bg-[#0D1526]/70 border border-[#00D4FF]/10 backdrop-blur-xl text-center"
            >
              <div className="flex justify-center gap-1 mb-8">
                {[...Array(content.testimonials[currentIndex].stars)].map((_, i) => (
                  <Star key={i} className="text-[#00FF94] fill-[#00FF94] w-5 h-5" />
                ))}
              </div>
              
              <p className="text-xl md:text-2xl italic text-[#E8F4FD] mb-10 leading-relaxed">
                "{content.testimonials[currentIndex].text}"
              </p>

              <div className="flex flex-col items-center">
                <img 
                  src={content.testimonials[currentIndex].avatarUrl} 
                  alt={content.testimonials[currentIndex].name}
                  className="w-20 h-20 rounded-full border-2 border-[#00D4FF] mb-4 object-cover"
                  referrerPolicy="no-referrer"
                />
                <h4 className="text-xl font-bold text-[#E8F4FD]">{content.testimonials[currentIndex].name}</h4>
                <p className="text-[#00D4FF] text-sm font-bold uppercase tracking-widest">{content.testimonials[currentIndex].role}</p>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center gap-4 mt-10">
            <button onClick={prev} className="p-3 rounded-full bg-[#0D1526] border border-[#00D4FF]/20 text-[#00D4FF] hover:bg-[#00D4FF] hover:text-[#050A14] transition-all">
              <ChevronLeft />
            </button>
            <button onClick={next} className="p-3 rounded-full bg-[#0D1526] border border-[#00D4FF]/20 text-[#00D4FF] hover:bg-[#00D4FF] hover:text-[#050A14] transition-all">
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
