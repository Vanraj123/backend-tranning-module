module.exports = function ({
  createSuccessResponse,
}) {
  return (_, res) => {
    const data = { show: true , level: "warning", message: "Application is currently under maintainance"};
    //level can be error to remove login functionality, warning to show warning or notice to show notices
    createSuccessResponse(200, data, res); 
  }
}
