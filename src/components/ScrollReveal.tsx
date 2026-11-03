import React from 'react';
import { motion } from 'motion/react';

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  yOffset?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  amount?: number | 'some' | 'all';
  once?: boolean;
  margin?: string;
  as?: 'div' | 'section' | 'article' | 'header';
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  className = '',
  delay = 0,
  duration = 0.65,
  yOffset = 36,
  direction = 'up',
  amount = 0.15,
  once = true,
  margin = '-40px 0px',
  as = 'div',
}) => {
  const getInitialPosition = () => {
    switch (direction) {
      case 'up':
        return { opacity: 0, y: yOffset, x: 0 };
      case 'down':
        return { opacity: 0, y: -yOffset, x: 0 };
      case 'left':
        return { opacity: 0, x: yOffset, y: 0 };
      case 'right':
        return { opacity: 0, x: -yOffset, y: 0 };
      case 'none':
        return { opacity: 0, x: 0, y: 0 };
      default:
        return { opacity: 0, y: yOffset, x: 0 };
    }
  };

  const Component = as === 'section' 
    ? motion.section 
    : as === 'article' 
    ? motion.article 
    : as === 'header'
    ? motion.header
    : motion.div;

  return (
    <Component
      initial={getInitialPosition()}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, amount, margin }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </Component>
  );
};

interface ScrollStaggerGroupProps {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
  amount?: number | 'some' | 'all';
  once?: boolean;
  margin?: string;
}

export const ScrollStaggerGroup: React.FC<ScrollStaggerGroupProps> = ({
  children,
  className = '',
  staggerDelay = 0.08,
  amount = 0.15,
  once = true,
  margin = '-40px 0px',
}) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once, amount, margin }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const ScrollStaggerItem: React.FC<{
  children: React.ReactNode;
  className?: string;
  yOffset?: number;
}> = ({ children, className = '', yOffset = 30 }) => {
  const itemVariants = {
    hidden: { opacity: 0, y: yOffset },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div variants={itemVariants} className={className}>
      {children}
    </motion.div>
  );
};
