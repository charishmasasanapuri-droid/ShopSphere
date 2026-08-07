import express from "express";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },

  filename(req, file, cb) {
    console.log("Original Name:", file.originalname);
    console.log("Mimetype:", file.mimetype);

    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

router.post("/", upload.single("image"), (req, res) => {
  console.log("Saved File:", req.file.filename);

  res.json({
    message: "Image uploaded successfully",
    image: `/uploads/${req.file.filename}`,
  });
});

export default router;