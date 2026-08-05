// components/CarouselArrows.tsx

'use client';

import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type ArrowButtonProps = {
  direction: 'left' | 'right';
  onClick: () => void;
};

export default function CarouselArrow({ direction, onClick }: ArrowButtonProps) {
  const Icon = direction === 'left' ? ChevronLeft : ChevronRight;

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className={`absolute top-1/2 z-10 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm 
                  hover:bg-white/30 text-white rounded-full p-2 shadow-md
                  ${direction === 'left' ? 'left-4' : 'right-4'}`}
      aria-label={`${direction} arrow`}
    >
      <Icon size={28} />
    </motion.button>
  );
}
