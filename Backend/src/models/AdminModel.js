// all sql asmin here
const adminLoginData = "SELECT * from admin Where email = ? and password = ?";


//clinet List Query,
const createClientListQuery = "INSERT INTO clientlist(uuid , divisionName , districtName, upazillaName, unNameEn, unNameBn, unLinkOne, unLinkTwo, upSecretaryName,  UpEmail, upContactNumber , upWhatsappNumber, gender, unionInfo) VALUES(?) ";

const getClientListQuery = `SELECT * FROM clientlist ORDER BY clientlist.ID DESC`;
const deleteOneClientListQuery = `DELETE FROM clientlist WHERE uuid = ?`;
const editClientListQuery = `UPDATE clientlist SET divisionName = ?, districtName = ? ,  upazillaName = ? , unNameEn = ? , unNameBn = ? , unLinkOne = ? , unLinkTwo = ? , upSecretaryName = ? , UpEmail = ? , 
upContactNumber = ?, upWhatsappNumber = ?, gender = ?, unionInfo = ? WHERE uuid = ?`;
const showClientListIdQuery = `SELECT * FROM clientlist WHERE uuid = ?`;

export {
  adminLoginData,
  createClientListQuery,
  getClientListQuery,
  showClientListIdQuery,
  deleteOneClientListQuery,
  editClientListQuery,

};
