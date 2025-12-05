const { date } = require("joi");

module.exports = function ({
    config,
    userDb,
    NotFoundError,
    UnknownError,
    joi
}) {
    return async ({  userid ,username, password,  address1, address2, phone_number,is_deleted,deleted_by,is_admin , logger  }) => {
        
        // console.log("USEC");
       
        
        // Hash password
        // const hashedPassword = createHash({
        //     data: password,
        //     secret: config.secrets.registerUser
        // });

        // Create user
        // Check if user already exists
        let user;
        try {
            let existuser = await userDb.getUserByUsername({
                username,
                logger
            });
            
            user = await userDb.updateuserProfile({
            userid,
            username, 
            password,  
            address1, 
            address2, 
            phone_number,
            created_at: new date(),
            is_deleted : false,
            deleted_by,
            deleted_at: null,
            is_admin:false,
            createdAt:new date(),
            updatedAt:new date(),
            logger
        });

    }catch(err) {
        if (err instanceof NotFoundError) {
                console.log("User doesn't exist, proceed with registration");
                // User doesn't exist, proceed with registration
            } else {
                throw err;
            }
    }

        return {
            user
        };
    };

   
}; 