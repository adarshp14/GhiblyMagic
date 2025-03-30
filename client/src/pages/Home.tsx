import { useState, ChangeEvent, FormEvent } from "react";
import { motion } from "framer-motion";
import { CustomFileInput } from "@/components/ui/custom-file-input";
import { ImagePreview } from "@/components/ui/image-preview";
import { StatusOverlay } from "@/components/ui/status-overlay";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Cloud } from "@/assets/svg/cloud";
import { Leaf } from "@/assets/svg/leaf";
import { Sun } from "@/assets/svg/sun";
import { uploadImagesToImgBB, sendEmailWithLinks } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";

export default function Home() {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    // Validate file count
    if (files.length > 3) {
      toast({
        variant: "destructive",
        title: "Too many images",
        description: "Please select a maximum of 3 images."
      });
      return;
    }
    
    setSelectedFiles(files);
  };

  const removeFile = (index: number) => {
    setSelectedFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const validateForm = (): boolean => {
    if (selectedFiles.length === 0) {
      toast({
        variant: "destructive",
        title: "No images selected",
        description: "Please select at least one image to transform."
      });
      return false;
    }

    if (selectedFiles.length > 3) {
      toast({
        variant: "destructive",
        title: "Too many images",
        description: "Please select a maximum of 3 images."
      });
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast({
        variant: "destructive",
        title: "Invalid email",
        description: "Please enter a valid email address."
      });
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Upload images to ImgBB
      const imageUrls = await uploadImagesToImgBB(selectedFiles);
      
      // Send email with image links
      await sendEmailWithLinks(email, imageUrls);
      
      setIsLoading(false);
      setIsSuccess(true);
    } catch (error) {
      console.error("Error during submission:", error);
      setIsLoading(false);
      setIsError(true);
    }
  };

  const closeSuccessOverlay = () => {
    setIsSuccess(false);
    setSelectedFiles([]);
    setEmail("");
  };

  const closeErrorOverlay = () => {
    setIsError(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="relative pt-8 px-6 sm:px-10 flex justify-center items-center flex-col z-10">
        {/* Floating clouds */}
        <motion.div 
          className="absolute top-10 left-10 -z-10"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <Cloud className="w-24 h-12 text-white opacity-80" />
        </motion.div>
        
        <motion.div 
          className="absolute top-20 right-16 -z-10"
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 6, delay: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <Cloud className="w-32 h-14 text-white opacity-80" />
        </motion.div>
        
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white drop-shadow-lg text-center mb-3"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Transform Into <span className="text-[#FFD700] font-bold">Ghibli Magic</span>
        </motion.h1>
        
        <motion.p 
          className="accent-text text-xl md:text-2xl text-white font-semibold drop-shadow-md text-center mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          "Send us your photos, and we'll paint your story in Ghibli light."
        </motion.p>
      </header>

      {/* Main Content */}
      <main className="flex-grow relative z-10 px-4 py-6">
        {/* Decorative elements */}
        <motion.div 
          className="leaf top-20 left-5 absolute hidden lg:block"
          animate={{ 
            y: [0, -10, 10, 0],
            rotate: [0, 5, -5, 0]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Leaf className="text-4xl text-[#5A8F7B] opacity-70" />
        </motion.div>
        
        <motion.div 
          className="leaf bottom-20 right-10 absolute hidden lg:block"
          animate={{ 
            y: [0, 10, -10, 0],
            rotate: [0, -5, 5, 0]
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        >
          <Leaf className="text-4xl text-[#5A8F7B] opacity-70" />
        </motion.div>
        
        {/* Main card container */}
        <motion.div 
          className="max-w-4xl mx-auto bg-[#F9F7F4]/85 backdrop-blur-[10px] rounded-[30px] shadow-lg p-6 md:p-10 relative overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {/* Decorative corner element */}
          <div className="absolute -top-10 -right-10 text-[#F2C879] opacity-20 transform rotate-45">
            <Sun className="w-36 h-36" />
          </div>
          
          {/* Upload Form */}
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Image Upload Section */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#5C5B57]">Upload Your Images</h2>
              <p className="text-[#5C5B57]">Choose up to 3 images to transform into Ghibli-style art</p>
              
              {/* Image Upload Controls */}
              <div className="flex flex-wrap gap-4 justify-center">
                <CustomFileInput onChange={handleFileChange} />
              </div>
              
              {/* Preview Area */}
              <div className="border-2 border-dashed border-[#88C9F2] hover:border-[#5A8F7B] transition-all rounded-2xl p-4 min-h-[200px] flex flex-wrap gap-4 justify-center items-center">
                {selectedFiles.length === 0 ? (
                  <div className="text-[#5C5B57] text-center p-8 w-full">
                    <i className="fas fa-images text-4xl mb-4 text-[#88C9F2] opacity-50"></i>
                    <p>Your images will appear here</p>
                    <p className="text-sm mt-2 text-[#5C5B57] opacity-60">(1-3 images, JPG or PNG only)</p>
                  </div>
                ) : (
                  selectedFiles.map((file, index) => (
                    <ImagePreview 
                      key={index} 
                      file={file} 
                      index={index} 
                      onRemove={removeFile} 
                    />
                  ))
                )}
              </div>
              
              {/* Image Counter */}
              <div className="text-right text-sm text-[#5C5B57]">
                <span>{selectedFiles.length}/3 images selected</span>
              </div>
            </div>
            
            {/* Email Section */}
            <div className="space-y-4">
              <h2 className="text-2xl font-semibold text-[#5C5B57]">Where to Send Your Magic</h2>
              
              <div className="relative">
                <Input 
                  type="email" 
                  id="userEmail" 
                  placeholder="Enter your email address" 
                  className="w-full px-4 py-3 rounded-full border-2 border-[#F9F7F4] focus:border-[#88C9F2] focus:ring-[#88C9F2]/30 transition-all"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div className="absolute right-4 top-3 text-[#F2C879]">
                  <i className="fas fa-envelope"></i>
                </div>
              </div>
            </div>
            
            {/* Submit Button */}
            <div className="flex justify-center pt-4">
              <Button 
                type="submit" 
                className="bg-gradient-to-r from-[#5A8F7B] to-[#88C9F2] text-white font-bold py-4 px-8 rounded-full transform transition-all hover:scale-105 hover:shadow-lg active:scale-95 flex items-center gap-2"
              >
                <span>Send to the Ghibli Spirits</span>
                <motion.i 
                  className="fas fa-paper-plane"
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                ></motion.i>
              </Button>
            </div>
          </form>
          
          {/* Disclaimer */}
          <div className="text-center mt-8 text-[#5C5B57] text-sm">
            <p>We don't store your images. Delivery will be done in a couple of hours.</p>
          </div>
        </motion.div>
      </main>

      {/* Status Overlays */}
      <StatusOverlay 
        type="loading" 
        isVisible={isLoading} 
        onClose={() => {}} 
      />
      
      <StatusOverlay 
        type="success" 
        isVisible={isSuccess} 
        onClose={closeSuccessOverlay} 
      />
      
      <StatusOverlay 
        type="error" 
        isVisible={isError} 
        onClose={closeErrorOverlay} 
      />

      {/* Footer */}
      <footer className="p-6 text-center text-[#5C5B57] z-10">
        <p className="accent-text text-lg">© 2025 Made by AP</p>
      </footer>
    </div>
  );
}
