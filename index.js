const express = require('express');
 
const bodyParser = require('body-parser');
 
const dotenv =  require("dotenv");
const { MongoConnect } = require('./db/db.js');
const authrouter = require('./routes/authRoute.js');
const Doctorrouter = require('./routes/doctorRoutes.js');
dotenv.config();
const app = express();
const PORT = process.env.PORT|| 3001;

 

app.use(bodyParser.json());
app.use("/auth", authrouter)
app.use(Doctorrouter)
 

app.listen(PORT, async() => {
    await MongoConnect();
  console.log(`Server is running on http://localhost:${PORT}`);
});