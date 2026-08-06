'use client';

import { motion, AnimatePresence, } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import type { Variants } from "framer-motion";


const slideVariants : Variants = {
  initial: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: 'spring', stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    transition: {
      x: { type: 'spring', stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
    },
  }),
};

const fadeSlideVariants : Variants = {
  initial: { opacity: 0, x: 60, scale: 0.98 },
  animate: { 
    opacity: 1, 
    x: 0, 
    scale: 1,
    transition: { duration: 0.5, ease: [0.32, 0.72, 0, 1] }
  },
  exit: { 
    opacity: 0, 
    x: -60, 
    scale: 0.98,
    transition: { duration: 0.4, ease: [0.32, 0.72, 0, 1] }
  },
};

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
     variants={fadeSlideVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}