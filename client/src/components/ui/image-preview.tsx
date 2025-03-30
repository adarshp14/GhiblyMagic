import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface ImagePreviewProps {
  file: File;
  index: number;
  onRemove: (index: number) => void;
}

export function ImagePreview({ file, index, onRemove }: ImagePreviewProps) {
  const [preview, setPreview] = useState<string>("");

  useEffect(() => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreview(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    return () => {
      reader.abort();
    };
  }, [file]);

  return (
    <motion.div 
      className="relative p-1 bg-white rounded-xl shadow-md"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -2 }}
    >
      <img 
        src={preview} 
        alt={`Preview ${index + 1}`} 
        className="w-32 h-32 object-cover rounded-lg" 
      />
      
      <motion.button 
        type="button" 
        className="absolute -top-2 -right-2 bg-[#E69898] text-white rounded-full w-6 h-6 flex items-center justify-center shadow"
        onClick={() => onRemove(index)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <i className="fas fa-times text-xs"></i>
      </motion.button>
    </motion.div>
  );
}
