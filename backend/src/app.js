import express from "express";
import cors from "cors";
import contactRoutes from "./routes/contactRoutes.js";
import { errorHandler } from "./middleware/errorMiddleware.js";

const app = express();

// ✅ CORS (clean)
app.use(cors({
  origin: [
    "https://alliancebehavioraltherapysolutions.netlify.app",
    "https://alliancebehavioraltherapysolutions.com",
    "https://www.alliancebehavioraltherapysolutions.com",
    "https://alliancebehavioraltherapysolutions.net",
    "https://www.alliancebehavioraltherapysolutions.net"
  ],
  methods: ["GET", "POST"],
  credentials: true
}));

app.use(express.json());

// ✅ Routes
app.use("/api/contact", contactRoutes);

app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

// ✅ Error handler
app.use(errorHandler);

export default app;