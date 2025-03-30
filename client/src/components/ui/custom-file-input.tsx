import { ChangeEvent } from "react";
import { motion } from "framer-motion";

interface CustomFileInputProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export function CustomFileInput({ onChange }: CustomFileInputProps) {
  return (
    <motion.label 
      className="cursor-pointer bg-[#88C9F2]/20 hover:bg-[#88C9F2]/30 text-[#88C9F2] rounded-2xl p-5 text-center w-full sm:w-auto flex-1 transition-all flex flex-col items-center justify-center"
      whileHover={{ y: -2, boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)" }}
      transition={{ duration: 0.3 }}
    >
      <input 
        type="file" 
        id="imageUpload" 
        accept=".jpg,.jpeg,.png" 
        multiple 
        className="hidden" 
        onChange={onChange}
      />
      <i className="fas fa-cloud-upload-alt text-3xl mb-2"></i>
      <div>Choose Images</div>
    </motion.label>
  );
}
