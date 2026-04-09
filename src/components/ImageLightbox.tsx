"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface ImageLightboxProps {
  src: string;
  alt: string;
  isOpen: boolean;
  onClose: () => void;
}

export default function ImageLightbox({ src, alt, isOpen, onClose }: ImageLightboxProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 md:p-10"
          onClick={onClose}
        >
          <button 
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-[101]"
          >
            <X size={32} />
          </button>
          
          <motion.div 
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="relative w-full h-full max-w-6xl max-h-screen flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full">
              <Image 
                src={src} 
                alt={alt} 
                fill 
                className="object-contain" 
                sizes="(max-width: 768px) 100vw, 1200px"
              />
            </div>
            {alt && alt !== "Post image" && (
              <div className="absolute bottom-[-2rem] left-0 w-full text-center text-white/70 text-sm">
                {alt}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
