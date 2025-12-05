
const { userActions, permissionAction, permissionmoduleAction } = require("../controller");
const { checkcanview, checkcancreate, checkcanupdate, checkcandelete ,isadmin} = require("../checkpermission/permission");

module.exports = function ({ router }) {
    router.get('/user/:userId', checkcanview ,userActions.GetUserByIdAction);
    router.post('/user/register', checkcancreate,userActions.registerUserAction);
    router.post('/user/login', userActions.loginUserAction);
    router.put('/user/passwordupdate', checkcanupdate ,userActions.updatePasswordAction);
    router.put('/user/profileupdate', checkcanupdate ,userActions.updateProfileAction);
    router.delete('/user/softdeleteuser/:userId',checkcandelete,userActions.softdeleteUserAction);
    router.delete('/user/harddeleteuser', userActions.harddeleteUserAction);
    router.post('/user/addpermission',isadmin ,permissionAction.addPermissionAction);
    router.put('/user/updatepermission/:userID',isadmin ,permissionAction.updatePermissionAction);
    router.post('/user/createpermissionmodule',isadmin ,permissionmoduleAction.addPermissionmoduleAction);
    router.put('/user/updatepermissionmodule',isadmin ,permissionmoduleAction.updatepermissionmoduleAction);
    router.delete('/user/deletepermissionmodule',isadmin , permissionmoduleAction.deletepermissionmoduleAction);
}