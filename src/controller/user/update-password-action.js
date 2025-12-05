const { date } = require("joi");

module.exports = function ({
    createErrorResponse,
    createSuccessResponse,
    updatePassword,
}) {
    return async (req, res) => {
        const logger = req.log;

        try {
            console.log("Con");

            const { user  } = await updatePassword({
                username: req.body.username,
                password: req.body.password,
                newpassword : req.body.newpassword,
                logger,
            });

            // res.cookie("session_id", sessionId, {
            //     httpOnly: true,
            //     secure: false,
            //     domain: process.env.DOMAIN,
            // });

            createSuccessResponse(
                201,
                user,
                res
            );
        } catch (err) {
            logger.error(err);
            logger.error("Error in registerUserController");
            createErrorResponse(err, res);
        }
    };
}; 