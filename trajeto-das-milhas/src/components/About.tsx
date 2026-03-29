import React from 'react';
import { motion } from 'motion/react';
import { useContent } from '../context/ContentContext';

const About: React.FC = () => {
  const { content } = useContent();
  const { about } = content;

  // Cores para os círculos das conquistas
  const achievementColors = [
    { bg: 'bg-[#00D4FF]/10', dot: 'bg-[#00D4FF]' },
    { bg: 'bg-[#9D00FF]/10', dot: 'bg-[#9D00FF]' },
    { bg: 'bg-[#00FF94]/10', dot: 'bg-[#00FF94]' },
  ];

  return (
    <section id="about" className="py-32 bg-[#0A1128] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-[#00D4FF]/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#9D00FF]/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-[#00D4FF] to-[#9D00FF] rounded-2xl blur opacity-20" />
              <img 
                src={about.imageUrl} 
                alt={about.title}
                className="relative rounded-2xl w-full h-[500px] object-cover shadow-2xl"
                referrerPolicy="no-referrer"
              />
              {/* Floating Badge */}
              {about.experienceBadge && (
                <div className="absolute -bottom-6 -right-6 bg-[#00D4FF] text-[#0A1128] font-bold p-6 rounded-xl shadow-xl min-w-[140px] text-center">
                  <p className="text-3xl leading-none mb-1">{about.experienceBadge.value}</p>
                  <p className="text-[10px] uppercase tracking-widest font-black whitespace-pre-line leading-tight">
                    {about.experienceBadge.label}
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Text Side */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/2"
          >
            <h4 className="text-[#00D4FF] font-semibold tracking-widest uppercase mb-4">
              {about.subtitle}
            </h4>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
              {about.title}
            </h2>
            <div className="space-y-6">
              <p className="text-xl text-[#8BA3C0] leading-relaxed">
                {about.description}
              </p>
              
              {about.achievements && about.achievements.length > 0 && (
                <div className="pt-8 space-y-6">
                  {about.achievements.map((achievement, index) => {
                    const color = achievementColors[index % achievementColors.length];
                    return (
                      <div key={index} className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full ${color.bg} flex items-center justify-center flex-shrink-0`}>
                          <div className={`w-3 h-3 rounded-full ${color.dot}`} />
                        </div>
                        <p className="text-white font-medium">{achievement}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
