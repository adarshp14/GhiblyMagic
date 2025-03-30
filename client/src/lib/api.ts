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

// Function to send a contact form submission with image links to the site admin via EmailJS
export async function sendEmailWithLinks(email: string, imageUrls: string[]): Promise<void> {
  try {
    // Using EmailJS official documentation pattern
    const templateParams = {
      to_name: "Admin", // Default to "Admin" for the receiver name
      from_name: "Website Form", // "From" name in the email
      reply_to: email, // For easy reply to the customer
      user_email: email, // User's email as specified in instructions
      message: `User requested Ghibli transformation for ${imageUrls.length} image(s).`,
      image_link_1: imageUrls[0] || "",
      image_link_2: imageUrls[1] || "",
      image_link_3: imageUrls[2] || ""
    };
    
    // Using the official pattern from EmailJS docs with all 4 parameters
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams,
      EMAILJS_PUBLIC_KEY // Include the public key as the 4th parameter
    );
    
    console.log("Email sent successfully:", response);
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
}
