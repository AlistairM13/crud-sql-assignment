import multer from "multer";
import path from "path";

const storage = multer.memoryStorage();
export const upload = multer({
  storage: storage,

  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|pdf/;
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
      return cb(null, true);
    }
    return cb(new Error("Only images of extension png is allowed!"));
  },
});
