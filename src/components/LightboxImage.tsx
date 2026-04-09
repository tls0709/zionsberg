"use client";

import { useState } from "react";
import Image from "next/image";
import ImageLightbox from "./ImageLightbox";

interface LightboxImageProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
}

export default function LightboxImage({ src, alt, className = "", fill = false }: LightboxImageProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div 
        className={`cursor-zoom-in relative ${className}`} 
        onClick={() => setIsOpen(true)}
      >
        <Image 
          src={src} 
          alt={alt} 
          fill={fill}
          width={fill ? undefined : 1200}
          height={fill ? undefined : 800}
          className={`${fill ? 'object-cover' : 'w-full h-auto'} rounded-2xl`} 
        />
      </div>
      <ImageLightbox 
        src={src} 
        alt={alt} 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
      />
    </>
  );
}
