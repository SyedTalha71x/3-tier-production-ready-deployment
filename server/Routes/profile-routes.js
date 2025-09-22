import { showProfile, editProfile } from "../Controllers/profile-controller.js";
import express from "express";
import Auth from "../Middlewares/auth.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`);
  },
});


const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 },
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Only JPG and PNG images are allowed!"));
    }
  },
});

const router = express.Router();
router.get("/show-profile", Auth, showProfile);
router.post("/update-profile", upload.single('file'), Auth, editProfile);


router.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
      return res.status(400).json({
        message: "File upload error: " + error.message
      });
    }
    next(error);
  });
export default router;
