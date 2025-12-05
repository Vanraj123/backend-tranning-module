const { date } = require("joi");

module.exports = function ({
    createErrorResponse,
    createSuccessResponse,
    loginUser,
}) {
    return async (req, res) => {
        const logger = req.log;

        try {
            console.log("Con");

            const { user } = await loginUser({
                username: req.body.username,
                password: req.body.password,
                logger,
            });

            // res.cookie("session_id", sessionId, {
            //     httpOnly: true,
            //     secure: false,
            //     domain: process.env.DOMAIN,
            // });
            // console.log(user.is_admin);
            
            req.session.user = {
             id: user.id,
             username: user.username,
             is_admin: user.is_admin
            };
            
            createSuccessResponse(
                201,
                "login Succssessfully",
                res
            );
        } catch (err) {
            logger.error(err);
            logger.error("Error in registerUserController");
            createErrorResponse(err, res);
        }

        
    };
}; 