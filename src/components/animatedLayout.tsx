import { motion } from "framer-motion";
import React from "react";

type Props = {
  children: React.ReactNode;
};
export default function AnimatedLayout({ children }: Props) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      {children}
    </motion.div>
  );
}
