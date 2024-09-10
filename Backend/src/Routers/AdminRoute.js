import express from "express";
import {
  adminLogin, 
  adminLogout, 
  createClientList,
  getClientList,
  showClientListId,
  deleteOneClientList,
  editClientList,
  clinetCounts,
  teamMemberCount,
  contactCount,

} from "../controllers/AdminControllers.js";
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from 'uuid';


// Set storage engine for different file types
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder;
    if (file.mimetype === 'application/pdf' || 
        file.mimetype === 'application/msword' || 
        file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' ||
        file.mimetype === 'text/plain') {
      folder = 'public/Resumes';
    } else if (file.mimetype.startsWith("image/")) {
      folder = "public/Images";
    } else {
      return cb(new Error("Invalid file type"), false);
    }
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const name = uuidv4() + "_" + Date.now() + path.extname(file.originalname);
    cb(null, name);
  },
});

// Initialize upload
const upload = multer({
  storage: fileStorage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    if (
      [
        "application/pdf",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
      ].includes(file.mimetype) || file.mimetype.startsWith("image/")
    ) {
      cb(null, true);
    } else {
      cb(new Error("Unsupported file format"), false);
    }
  }
});

// end image uplode

// admin route
const AdminRouter = express.Router();
AdminRouter.post("/adminlogin", adminLogin);

// client List Route
AdminRouter.post("/clientlist/create", createClientList);
AdminRouter.get("/clientlist", getClientList);
AdminRouter.get("/clientlist/:id", showClientListId);
AdminRouter.delete("/clientlist/delete/:id", deleteOneClientList);
AdminRouter.put("/clientlist/edit/:id", editClientList);

// count many Route
AdminRouter.get("/client-count", clinetCounts);
AdminRouter.get("/teamMember-count", teamMemberCount);
AdminRouter.get("/contact-count", contactCount);

AdminRouter.get("/logout", adminLogout);
export { AdminRouter as AdminRouters };
