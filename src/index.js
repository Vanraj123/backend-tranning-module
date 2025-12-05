const app = require("./app.js");
// const config = require('./config');
const http = require('http');


const PORT = 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

