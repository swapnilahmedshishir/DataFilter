import db from "../../Utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { v4 as uuidv4 } from 'uuid';
import {
  adminLoginData,
  createClientListQuery,
  getClientListQuery,
  showClientListIdQuery,
  deleteOneClientListQuery,
  editClientListQuery,
} from "../models/AdminModel.js";

const adminLogin = (req, res) => {
  db.query(
    adminLoginData,
    [req.body.email, req.body.password],
    (err, result) => {
      if (err) return res.json({ loginStatus: false, Error: "Query error" });
      if (result.length > 0) {
        const email = result[0].email;
        const token = jwt.sign(
          { role: "admin", email: email, id: result[0].id },
          "jwt_secret_key",
          { expiresIn: "1d" }
        );
        res.cookie("token", token);
        return res.json({ loginStatus: true });
      } else {
        return res.json({
          loginStatus: false,
          Error: "Wrong email or password",
        });
      }
    }
  );
};


// Client List router
const createClientList = (req, res) => {
  const values = [
    uuidv4(),
    req.body.division,
    req.body.district ,
    req.body.upazilla  ,
    req.body.unNameEn,
    req.body.unNameBn,
    req.body.unLinkOne ,
    req.body.unLinkTwo ,
    req.body.upSecretaryName,
    req.body.UpEmail,
    req.body.upContactNumber ,
    req.body.upWhatsappNumber,
    req.body.gender,
    req.body.unionInfo,
  ];

  console.log(values);  
  
  db.query(createClientListQuery, [values], (err, result) => {
    console.log(err);
    
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true, Result: result });
  });
};
const getClientList = (req, res) => {
  db.query(getClientListQuery, (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true, Result: result });
  });
};
const deleteOneClientList = (req, res) => {
  const uuid = req.params.id;
  db.query(deleteOneClientListQuery, [uuid], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
};
const showClientListId = (req, res) => {
  const id = [req.params.id];
  db.query(showClientListIdQuery, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true, Result: result });
  });
};
const editClientList = (req, res) => {
  const id = [req.params.id];
  const values = [
    req.body.division,
    req.body.district ,
    req.body.upazilla  ,
    req.body.unNameEn,
    req.body.unNameBn,
    req.body.unLinkOne ,
    req.body.unLinkTwo ,
    req.body.upSecretaryName,
    req.body.UpEmail,
    req.body.upContactNumber ,
    req.body.upWhatsappNumber,
    req.body.gender,
    req.body.unionInfo,
  ];
  db.query(editClientListQuery, [...values, id], (err, result) => {
    if (err) return res.json({ Status: false, Error: err });
    return res.json({ Status: true, Result: result });
  });
};

// Many Counts Number
const clinetCounts = (req, res) => {
  const sql = `SELECT count(uuid) AS totalClient FROM clientlist;`;
  db.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
};

const teamMemberCount = (req, res) => {
  const sql = `SELECT count(uuid) AS totalTeamMember FROM team_member;`;
  db.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
};

const contactCount = (req, res) => {
  const sql = `SELECT count(uuid) AS totalContact FROM contactlist;`;
  db.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result });
  });
};

// LOGOUT Route
const adminLogout = (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: true });
};

export {
  adminLogin,  
  createClientList,
  getClientList,
  showClientListId,
  deleteOneClientList,
  editClientList,
  clinetCounts,
  teamMemberCount,
  contactCount, 
  adminLogout,
};
