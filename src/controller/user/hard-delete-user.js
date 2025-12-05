module.exports = function ({
    createErrorResponse,
    createSuccessResponse,
    harddeleteUser,
}) {
    return async (req, res) => {

        const logger = req.log;

        console.log("HII");

        try {
            // const id = req.params.userId;
            // const userid = req.body.user;   // <-- FIXED

            const result = await harddeleteUser();

            createSuccessResponse(
                200,
                result,
                res
            );
        } catch (err) {
            logger.error(err);
            logger.error("Error in getUserByIdAction");
            createErrorResponse(err, res);
        }
    };
};
