import axios from "axios";

const IMGBB_API_KEY = "4e5c1e7f6e82e9231f24cb11924550a6";
const EMAILJS_SERVICE_ID = "service_s4psi1r";
const EMAILJS_TEMPLATE_ID = "template_lhlm4bu";
const EMAILJS_PUBLIC_KEY = "TqyzrqwQT23rqZp2f";

// Function to upload a single image to ImgBB
async function uploadImageToImgBB(file: File): Promise<string> {
  const formData = new FormData();
  formData.append("image", file);
  formData.append("key", IMGBB_API_KEY);
  
  try {
    const response = await axios.post("https://api.imgbb.com/1/upload", formData);
    
    if (response.data.success) {
      return response.data.data.display_url;
    } else {
      throw new Error("Failed to upload image to ImgBB");
    }
  } catch (error) {
    console.error("Error uploading to ImgBB:", error);
    throw error;
  }
}

// Function to upload multiple images to ImgBB
export async function uploadImagesToImgBB(files: File[]): Promise<string[]> {
  const uploadPromises = files.map(file => uploadImageToImgBB(file));
  return Promise.all(uploadPromises);
}

// Function to send email with image links using EmailJS
export async function sendEmailWithLinks(email: string, imageUrls: string[]): Promise<void> {
  // Dynamically import emailjs-com
  const emailjs = await import("@emailjs/browser");
  
  // Initialize EmailJS with the public key
  emailjs.init(EMAILJS_PUBLIC_KEY);
  
  const templateParams = {
    to_email: email,
    user_email: email,
    image_link_1: imageUrls[0] || "",
    image_link_2: imageUrls[1] || "",
    image_link_3: imageUrls[2] || ""
  };
  
  try {
    await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
