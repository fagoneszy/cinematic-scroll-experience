import type { SpringOptions } from 'motion/react';

export const SPRING_CONFIG: SpringOptions = {
  stiffness: 80,
  damping: 22,
  restDelta: 0.01
};

export const SPRING_CONFIG_GLOBAL: SpringOptions = {
  stiffness: 100,
  damping: 30,
  restDelta: 0.01
};
