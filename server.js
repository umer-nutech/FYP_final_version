import dotenv from "dotenv"; // Load environment variables
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer";
import morgan from "morgan";
import connectDB from "./config/db.js"; // MongoDB connection logic from Code 1

import path from "path";
import { fileURLToPath } from "url";
import { v2 as cloudinary } from "cloudinary"; // **Added Cloudinary import**
import { fal } from "@fal-ai/client";
import authRoutes from "./routes/authRoute.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";

dotenv.config();
connectDB(); // Initialize MongoDB connection (from Code 1)

fal.config({
  credentials: process.env.FAL_AI_API_KEY, // Using the key from .env
});

const app = express();
const PORT = process.env.PORT || 5050;

// Get the current directory in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configure Cloudinary using values from .env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "http://localhost:3000", // your React app's URL
  })
);
app.use(morgan("dev"));
app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/category", categoryRoutes);
app.use("/api/v1/product", productRoutes);

// Serve static files from the uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Set the destination and filename for uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "uploads")); // Save to 'uploads' folder
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}${path.extname(file.originalname)}`); // Timestamp-based filename to avoid collisions
  },
});

const upload = multer({ storage });

// Routes
app.get("/", (req, res) => {
  res.send("Backend is up and running!");
});

// Upload Target Image
app.post("/apps/proxy/upload", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }

  console.log("Target image received:", req.file);
  try {
    // Upload the file to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Respond with the Cloudinary URL
    res.json({ url: result.secure_url });
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    res.status(500).json({ error: "Failed to upload image" });
  }
});

// Upload Source Image
app.post("/apps/proxy/upload1", upload.single("image1"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No file uploaded" });
  }
  console.log("Source image received:", req.file);
  try {
    // Upload the file to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path);

    // Respond with the Cloudinary URL
    res.json({ url: result.secure_url });
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    res.status(500).json({ error: "Failed to upload image" });
  }
});

// Handle Final Form Submission
// app.post("/apps/proxy/userimg", async (req, res) => {
//   const { target_file_url, source_file_url } = req.body;

//   try {
//     // Upload target image from URL to Cloudinary and crop it
//     const uploadResult = await cloudinary.uploader.upload(target_file_url, {
//       public_id: `target_image_${Date.now()}`,
//       crop: "auto",
//       gravity: "auto",
//       width: 500,
//       height: 500,
//     });

//     console.log("Uploaded and cropped target image:", uploadResult);

//     res.json({
//       message: "Image processed successfully",
//       cropped_target_url: uploadResult.secure_url,
//     });
//   } catch (error) {
//     console.error("Error processing image with Cloudinary:", error);
//     res.status(500).json({ error: "Error processing the image" });
//   }

//   // Don't disturb the following commented code
//   // try {
//   //   // Submit the request to Fal AI API
//   //   const result = await fal.subscribe("fal-ai/cat-vton", {
//   //     input: {
//   //       human_image_url: target_file_url,
//   //       garment_image_url: source_file_url,
//   //       cloth_type: "upper", // You can change this based on your requirements
//   //     },
//   //     logs: true,
//   //     onQueueUpdate: (update) => {
//   //       if (update.status === "IN_PROGRESS") {
//   //         update.logs.map((log) => log.message).forEach(console.log);
//   //       }
//   //     },
//   //   });

//   //   console.log('Fal API result:', result.data);
//   //   console.log('Request ID:', result.requestId);

//   //   // Respond with the result from Fal AI
//   //   res.json({ success: true, data: result.data, requestId: result.requestId });
//   // } catch (error) {
//   //   console.error('Error with Fal API:', error);
//   //   res.status(500).json({ error: 'Error with Fal API' });
//   // }
// });

// Try-On Endpoint

//app.get("/api/v1/tryon", (_req, res) => {
//res.json({ message: "TryOn GET request received!", success: true });
//});

app.post("/api/v1/tryon", async (req, res) => {
  const { target_file_url, source_file_url } = req.body;

  if (!target_file_url || !source_file_url) {
    return res
      .status(400)
      .json({ error: "Both target and source image URLs are required" });
  }

  try {
    // Process the target image using Cloudinary (Optional, you can use Fal AI API directly if needed)
    // const uploadResult = await cloudinary.uploader.upload(target_file_url, {
    //   public_id: `target_image_${Date.now()}`,
    //   crop: "auto",
    //   gravity: "auto",
    //   width: 500,
    //   height: 500,
    // });

    // console.log("Uploaded and cropped source image:", uploadResult);

    // Here, you can integrate with the Fal AI API (Uncomment if needed)
    const result = await fal.subscribe("fal-ai/cat-vton", {
      input: {
        human_image_url: target_file_url,
        garment_image_url: source_file_url,
        cloth_type: "upper", // You can modify this depending on the type of cloth
      },
      logs: true,
      onQueueUpdate: (update) => {
        if (update.status === "IN_PROGRESS") {
          update.logs.map((log) => log.message).forEach(console.log);
        }
      },
    });

    // Here, return the response after processing
    res.json({
      message: "Try-On request processed successfully!",
      // cropped_target_url: uploadResult.secure_url,
      result: result.data.image.url, // Uncomment if Fal API integration is needed
    });
  } catch (error) {
    console.error("Error with the Try-On process:", error);
    res.status(500).json({ error: "Error processing the Try-On request" });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
