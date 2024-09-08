import express from "express";
import {
  adminLogin,
  createBlogPost,
  allBlogPost,
  editBlogPost,
  editBlogPostId,
  BlogPostToDelete,
  createFaq,
  allFaq,
  editFaqId,
  faqToDelete,
  editFaq,
  memberToDelete,
  uploadMemberImage,
  allMember,
  adminLogout,
  createTeamMember,
  allTeamMember,
  teamMemberToDelete,
  editTeamMemberID,
  editTeamMember,
  submitedMessage,
  AllClientMessage,
  clientMessageToDelete,
  clientMessageToShow,
  appointmentContactName,
  createAppointment,
  AllAppointment,
  showAppointment,
  editAppointment,
  createContactlist,
  allContactlist,
  contactlistToDelete,
  showContactInfo,
  editContactlist,
  createContactCatagoryList,
  getContactCatagoryList,
  deleteOneContactCatagoryList,
  editContactCatagoryList,
  showContactCatagoryListId,
  createClientCatagoryList,
  getClientCatagoryList,
  deleteOneClientCatagoryList,
  showClientCatagoryListId,
  editClientCatagoryList,
  createClientList,
  getClientList,
  showClientListId,
  deleteOneClientList,
  editClientList,
  clinetCounts,
  teamMemberCount,
  contactCount,
  createJobPost,
  allJobPost,
  jobPostToDelete,
  editJobPostID,
  editJobPost ,
  SubmitedApplicantFrom ,
AllApplicantFrom ,
ApplicantFromToDelete,
ApplicantFromToShow,

} from "../controllers/AdminControllers.js";
import multer from "multer";
import path from "path";
import { v4 as uuidv4 } from 'uuid';

// const CaseFileStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/Images");
//   },
//   filename: (req, file, cb) => {
//     const name = Date.now() + "-" + file.originalname;
//     cb(null, name);
//   },
// });

// Set storage engine
// const fileStorage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/Images");
//   },
//   filename: (req, file, cb) => {
//     const name = uuidv4() + "_" + Date.now() + "-" + file.originalname;
//     cb(null, name);
//   },
// });

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

// job post 
AdminRouter.post("/jobPost/create", createJobPost);
AdminRouter.get("/jobPost", allJobPost);
AdminRouter.delete("/jobPost/delete/:uuid", jobPostToDelete);
AdminRouter.get("/jobPost/:id", editJobPostID);
AdminRouter.put("/jobPost/edit/:id", editJobPost);

// Applicant From
AdminRouter.post("/applyfrom/submited", upload.single("resume"), SubmitedApplicantFrom);
AdminRouter.get("/applyfrom", AllApplicantFrom);
AdminRouter.delete("/applyfrom/delete/:id", ApplicantFromToDelete);
AdminRouter.get("/applyfrom/:id", ApplicantFromToShow);


// Team Member
AdminRouter.post("/teamMember/create", upload.single("file"), createTeamMember);
AdminRouter.get("/teamMember", allTeamMember);
AdminRouter.delete("/teamMember/delete/:uuid", teamMemberToDelete);
AdminRouter.get("/teamMember/:id", editTeamMemberID);
AdminRouter.put("/teamMember/edit/:id", editTeamMember);

// allMember
AdminRouter.get("/member", allMember);
AdminRouter.post("/member/create", upload.single("file"), uploadMemberImage);
AdminRouter.delete("/member/delete/:uuid", memberToDelete);

// FAQ Router
AdminRouter.post("/faq/create", createFaq);
AdminRouter.get("/faq", allFaq);
AdminRouter.get("/faq/:id", editFaqId);
AdminRouter.put("/faq/edit/:id", editFaq);
AdminRouter.delete("/faq/delete/:uuid", faqToDelete);

// Blog Router
AdminRouter.post("/blogpost/create", upload.single("file"), createBlogPost);
AdminRouter.get("/blogpost", allBlogPost);
AdminRouter.put("/blogpost/edit/:id",editBlogPost);
AdminRouter.get("/blogpost/:id", editBlogPostId);
AdminRouter.delete("/blogpost/delete/:id", BlogPostToDelete);

// clientMessage
AdminRouter.post("/message/submited", submitedMessage);
AdminRouter.get("/clientMessage", AllClientMessage);
AdminRouter.delete("/clientMessage/delete/:id", clientMessageToDelete);
AdminRouter.get("/clientMessage/:id", clientMessageToShow);

//Appointment Route
AdminRouter.get("/contactName", appointmentContactName);
AdminRouter.post("/appointment/create", createAppointment);
AdminRouter.get("/appointment/:id", showAppointment);
AdminRouter.get("/appointment", AllAppointment);
AdminRouter.put("/appointment/edit/:id", editAppointment);

// Conatct list Route
AdminRouter.post("/contactlist/create", createContactlist);
AdminRouter.get("/contactlist", allContactlist);
AdminRouter.get("/contactlist/:id", showContactInfo);
AdminRouter.delete("/contactlist/delete/:id", contactlistToDelete);
AdminRouter.put("/contactlist/edit/:id", editContactlist);

// Contact Category Route
AdminRouter.post("/contactCatagory/create", createContactCatagoryList);
AdminRouter.get("/contactCatagoryList", getContactCatagoryList);
AdminRouter.get("/contactCatagoryList/:id", showContactCatagoryListId);
AdminRouter.delete(
  "/contactCatagoryList/delete/:id",
  deleteOneContactCatagoryList
);
AdminRouter.put("/contactCatagoryList/edit/:id", editContactCatagoryList);

// client List Route
AdminRouter.post("/clientlist/create", createClientList);
AdminRouter.get("/clientlist", getClientList);
AdminRouter.get("/clientlist/:id", showClientListId);
AdminRouter.delete("/clientlist/delete/:id", deleteOneClientList);
AdminRouter.put("/clientlist/edit/:id", editClientList);

// client Category Route
AdminRouter.post("/clientCatagory/create", createClientCatagoryList);
AdminRouter.get("/clientCatagoryList", getClientCatagoryList);
AdminRouter.get("/clientCatagoryList/:id", showClientCatagoryListId);
AdminRouter.delete(
  "/clientCatagoryList/delete/:id",
  deleteOneClientCatagoryList
);
AdminRouter.put("/clientCatagoryList/edit/:id", editClientCatagoryList);

// count many Route
AdminRouter.get("/client-count", clinetCounts);
AdminRouter.get("/teamMember-count", teamMemberCount);
AdminRouter.get("/contact-count", contactCount);

AdminRouter.get("/logout", adminLogout);
export { AdminRouter as AdminRouters };
