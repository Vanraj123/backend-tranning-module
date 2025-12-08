const express = require("express");
// const router = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

const {
  userActions,
  permissionAction,
  permissionmoduleAction,
  itemActions,
} = require("../controller");
const {
  checkcanview,
  checkcancreate,
  islogin,
  checkcanupdate,
  checkcandelete,
  isadmin,
} = require("../checkpermission/permission");

module.exports = function ({ router }) {
  router.get('/user/logout',userActions.logoutUserAction)
  router.get("/user/item/getitems", islogin,itemActions.getitemsAction);
  router.get("/user/:userId", islogin,checkcanview, userActions.GetUserByIdAction);
  router.post("/user/register",islogin,checkcancreate,userActions.registerUserAction);
  router.post("/user/login",userActions.loginUserAction);
  
  router.put(
    "/user/profileupdate",
    islogin,
    checkcanupdate,
    userActions.updateProfileAction
  );
  router.put(
    "/user/passwordupdate",
    islogin,
    userActions.updatePasswordAction
  );
  
  router.delete(
    "/user/softdeleteuser/:userId",
    islogin,
    checkcandelete,
    userActions.softdeleteUserAction
  );
  router.delete("/user/harddeleteuser", userActions.harddeleteUserAction);
  router.post(
    "/user/addpermission",
    islogin,
    isadmin,
    permissionAction.addPermissionAction
  );
  router.put(
    "/user/updatepermission/:userID",
    islogin,
    isadmin,
    permissionAction.updatePermissionAction
  );
  router.post(
    "/user/createpermissionmodule",
    islogin,
    isadmin,
    permissionmoduleAction.addPermissionmoduleAction
  );
  router.put(
    "/user/updatepermissionmodule",
    islogin,
    isadmin,
    permissionmoduleAction.updatepermissionmoduleAction
  );
  router.delete(
    "/user/deletepermissionmodule",
    islogin,
    isadmin,
    permissionmoduleAction.deletepermissionmoduleAction
  );
  // router.post('/user/additems',itemActions.additemsAction);
  // console.log("hhh");
  router.post(
    "/user/additems",
    islogin,
    upload.array("item_pictures", 10),
    itemActions.additemsAction
  );
  router.put(
    "/user/updateitems",
    islogin,
    upload.array("item_pictures", 10),
    itemActions.updateitemsAction
  );
};
