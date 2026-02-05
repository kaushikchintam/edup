import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/home", (req, res) => {
  res.json({
    stats: [
      { value: "2,500+", label: "Career Changers" },
      { value: "95%", label: "Success Rate" },
      { value: "50+", label: "Expert Mentors" }
    ],
    trust: { score: 4.9, reviews: 500 },
    year: 2026
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running on http://localhost:${PORT}`));