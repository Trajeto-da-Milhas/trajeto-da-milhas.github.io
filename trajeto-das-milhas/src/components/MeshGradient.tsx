import React from 'react';
import { motion } from 'motion/react';

const MeshGradient: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none">
      {/* SVG Canvas para o Mesh Gradient - Apenas Azul */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 1200 800"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="blur-mesh">
            <feGaussianBlur in="SourceGraphic" stdDeviation="80" />
          </filter>
          
          {/* Gradientes de azul - muito suaves */}
          <motion.linearGradient
            id="blue-grad-1"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
            animate={{
              x1: ['0%', '50%', '0%'],
              y1: ['0%', '50%', '0%'],
              x2: ['100%', '50%', '100%'],
              y2: ['100%', '50%', '100%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          >
            <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#0A4A6F" stopOpacity="0.1" />
          </motion.linearGradient>

          <motion.linearGradient
            id="blue-grad-2"
            x1="100%"
            y1="0%"
            x2="0%"
            y2="100%"
            animate={{
              x1: ['100%', '50%', '100%'],
              y1: ['0%', '50%', '0%'],
              x2: ['0%', '50%', '0%'],
              y2: ['100%', '50%', '100%'],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            }}
          >
            <stop offset="0%" stopColor="#0A4A6F" stopOpacity="0.12" />
            <stop offset="100%" stopColor="#00D4FF" stopOpacity="0.08" />
          </motion.linearGradient>

          <motion.linearGradient
            id="blue-grad-3"
            x1="50%"
            y1="100%"
            x2="50%"
            y2="0%"
            animate={{
              x1: ['50%', '100%', '50%'],
              y1: ['100%', '50%', '100%'],
              x2: ['50%', '0%', '50%'],
              y2: ['0%', '50%', '0%'],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 4,
            }}
          >
            <stop offset="0%" stopColor="#00D4FF" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#0A4A6F" stopOpacity="0.12" />
          </motion.linearGradient>
        </defs>

        {/* Círculos grandes e suaves com blur para criar o efeito de mesh gradient */}
        <motion.circle
          cx="200"
          cy="150"
          r="250"
          fill="url(#blue-grad-1)"
          filter="url(#blur-mesh)"
          animate={{
            cx: [200, 300, 200],
            cy: [150, 250, 150],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />

        <motion.circle
          cx="1000"
          cy="400"
          r="280"
          fill="url(#blue-grad-2)"
          filter="url(#blur-mesh)"
          animate={{
            cx: [1000, 900, 1000],
            cy: [400, 300, 400],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 2,
          }}
        />

        <motion.circle
          cx="600"
          cy="600"
          r="300"
          fill="url(#blue-grad-3)"
          filter="url(#blur-mesh)"
          animate={{
            cx: [600, 500, 600],
            cy: [600, 500, 600],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 4,
          }}
        />

        <motion.circle
          cx="100"
          cy="700"
          r="200"
          fill="url(#blue-grad-1)"
          filter="url(#blur-mesh)"
          animate={{
            cx: [100, 200, 100],
            cy: [700, 600, 700],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />

        <motion.circle
          cx="1100"
          cy="200"
          r="220"
          fill="url(#blue-grad-2)"
          filter="url(#blur-mesh)"
          animate={{
            cx: [1100, 1000, 1100],
            cy: [200, 300, 200],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 3,
          }}
        />
      </svg>

      {/* Overlay para suavizar as bordas e garantir discretion */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#050A14] via-transparent to-[#050A14] pointer-events-none" />
    </div>
  );
};

export default MeshGradient;
