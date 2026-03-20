"use client";

import { useRef, useEffect, useState } from "react";
import { Image as ImageIcon } from "lucide-react";

export default function ImageProcessor({ src }: { src: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [filter, setFilter] = useState<"none" | "grayscale" | "sepia" | "invert">("none");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = src;
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Apply filter processing manually using HTML5 Canvas pixels
      ctx.drawImage(img, 0, 0);
      
      if (filter === "none") return;
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const data = imageData.data;
      
      for (let i = 0; i < data.length; i += 4) {
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        
        if (filter === "grayscale") {
          const avg = (r + g + b) / 3;
          data[i] = avg;
          data[i + 1] = avg;
          data[i + 2] = avg;
        } else if (filter === "sepia") {
          data[i] = Math.min(255, (r * 0.393) + (g * 0.769) + (b * 0.189));
          data[i + 1] = Math.min(255, (r * 0.349) + (g * 0.686) + (b * 0.168));
          data[i + 2] = Math.min(255, (r * 0.272) + (g * 0.534) + (b * 0.131));
        } else if (filter === "invert") {
          data[i] = 255 - r;
          data[i + 1] = 255 - g;
          data[i + 2] = 255 - b;
        }
      }
      ctx.putImageData(imageData, 0, 0);
    };
  }, [src, filter]);

  return (
    <div className="flex flex-col items-center gap-4 p-6 rounded-3xl border border-white/40 bg-white/30 backdrop-blur-md shadow-xl w-full max-w-2xl mt-12">
      <div className="flex items-center gap-2 mb-4 w-full">
        <ImageIcon className="text-brand-500" />
        <h3 className="text-lg font-bold text-slate-900">HTML5 Canvas Image Processor</h3>
      </div>
      
      <div className="w-full bg-slate-200/50 rounded-xl overflow-hidden flex justify-center items-center border border-white/50">
        <canvas ref={canvasRef} className="max-w-full h-auto max-h-[400px] object-contain shadow-sm" />
      </div>
      
      <div className="flex flex-wrap gap-2 mt-4 justify-center">
        {["none", "grayscale", "sepia", "invert"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              filter === f 
                ? "bg-brand-500 text-white shadow-lg" 
                : "bg-white/50 text-slate-800 hover:bg-white"
            }`}
          >
            {f.charAt(0).toUpperCase() + f.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
}
