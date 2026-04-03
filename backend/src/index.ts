import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import blogRoutes from "./routes/blogRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";
import { getTags } from "./controllers/blogController.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGODB_URI = process.env.DATABASE_URI;

let mongoConnectPromise: Promise<typeof mongoose> | null = null;
async function ensureMongoConnected() {
  if (!MONGODB_URI) return;
  if (mongoose.connection.readyState === 1) return;

  if (!mongoConnectPromise) {
    mongoConnectPromise = mongoose
      .connect(MONGODB_URI)
      .then((m) => {
        console.log("MongoDB connected");
        return m;
      })
      .catch((err) => {
        mongoConnectPromise = null;
        console.log(err);
        throw err;
      });
  }

  await mongoConnectPromise;
}

app.use(cors());
app.use(express.json());

app.use(async (req, res, next) => {
  try {
    if (!MONGODB_URI) {
      if (req.path === "/health") return next();
      return res
        .status(500)
        .json({ message: "DATABASE_URI is not configured on the server" });
    }
    if (req.path === "/health") return next();
    await ensureMongoConnected();
    return next();
  } catch {
    return res.status(500).json({ message: "Database connection failed" });
  }
});

app.use("/api/auth", authRoutes);
app.use("/api/posts/tags", getTags);
app.use("/api/posts", blogRoutes);
app.use("/api/comments", commentRoutes);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

if (process.env.NODE_ENV !== "production") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;
