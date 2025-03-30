import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Sun } from "@/assets/svg/sun";

interface StatusOverlayProps {
  type: "loading" | "success" | "error";
  isVisible: boolean;
  onClose: () => void;
}

export function StatusOverlay({ type, isVisible, onClose }: StatusOverlayProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div 
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="bg-white bg-opacity-90 p-8 rounded-3xl max-w-md text-center"
            initial={{ scale: 0.9, y: 20, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            {type === "loading" && (
              <>
                <motion.div 
                  className="mb-4 text-[#F2C879]"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                >
                  <Sun className="w-20 h-20" />
                </motion.div>
                <h3 className="text-2xl font-bold text-[#5C5B57] mb-2">The Ghibli Spirits are Working...</h3>
                <p className="text-[#5C5B57]">Please wait while we process your images</p>
              </>
            )}
            
            {type === "success" && (
              <>
                <div className="text-[#8ED1AF] mb-4">
                  <i className="fas fa-check-circle text-5xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-[#5C5B57] mb-2">All set!</h3>
                <p className="text-[#5C5B57]">The Ghibli spirits are working on your transformation.</p>
                <Button 
                  className="mt-6 bg-[#88C9F2] text-white px-6 py-2 rounded-full hover:bg-opacity-90"
                  onClick={onClose}
                >
                  Close
                </Button>
              </>
            )}
            
            {type === "error" && (
              <>
                <div className="text-[#E69898] mb-4">
                  <i className="fas fa-exclamation-circle text-5xl"></i>
                </div>
                <h3 className="text-2xl font-bold text-[#5C5B57] mb-2">Something went wrong!</h3>
                <p className="text-[#5C5B57]">Please check your files and try again.</p>
                <Button 
                  className="mt-6 bg-[#E69898] text-white px-6 py-2 rounded-full hover:bg-opacity-90"
                  onClick={onClose}
                >
                  Try Again
                </Button>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
