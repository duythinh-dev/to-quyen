"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function AnimatedLogo() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <motion.div
        className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold"
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 15,
        }}
      >
        TQ
      </motion.div>
      <motion.span
        className="text-xl font-bold"
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        Tố Quyên
      </motion.span>
    </Link>
  );
}
