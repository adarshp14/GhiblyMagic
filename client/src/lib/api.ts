import axios from "axios";
import emailjs from "@emailjs/browser";

const IMGBB_API_KEY = "4e5c1e7f6e82e9231f24cb11924550a6";
const EMAILJS_SERVICE_ID = "service_s4psi1r";
const EMAILJS_TEMPLATE_ID = "template_lhlm4bu";
const EMAILJS_PUBLIC_KEY = "TqyzrqwQT23rqZp2f";

// Initialize EmailJS with the public key
emailjs.init(EMAILJS_PUBLIC_KEY);

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
  // Configure parameters for the EmailJS template with all possible recipient names
  const templateParams = {
    // Add all possible recipient parameter names that EmailJS might use
    user_email: email,
    to_email: email,
    recipient_email: email,
    to: email,
    email: email,
    recipient: email,
    to_name: "Ghibli Art Lover",
    from_name: "Ghibli Magic Transform",
    reply_to: email,
    message: "Here are your transformed images in Studio Ghibli style. Click on the links below to view and download them:",
    image_link_1: imageUrls[0] || "",
    image_link_2: imageUrls[1] || "",
    image_link_3: imageUrls[2] || ""
  };
  
  try {
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY
    );
    
    console.log("Email sent successfully:", response);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
