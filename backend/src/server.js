import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001||8080;
const __dirname = path.resolve();

// --- Middleware ---

// 1. Configure your allowed origins
const allowedOrigins = [
  'http://localhost:5173',
  'http://react-frontend-v0.s3-website.ap-south-1.amazonaws.com'
];

// 2. Apply CORS middleware for all environments using the whitelist
app.use(cors({
  origin: allowedOrigins
}));

// 3. Apply other middleware
app.use(express.json()); // Parses JSON bodies
app.use(rateLimiter);

// --- API Routes ---
app.use("/api/notes", notesRoutes);


// --- REMOVED ---
// The block for serving static frontend files has been removed.
// It is not needed because you are hosting your frontend separately on AWS S3.

// --- Start Server ---
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT:", PORT);
  });
});