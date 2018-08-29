//importing module 
import express from 'express';
import bodyParser from 'body-parser';

//importing self files
import mongoose from './db/mongoose';

//create app server and setup middleware
let app = express();
app.use(bodyParser.json());


//port decalartion.
const port = process.env.PORT || 3000;

//requiring routing files
require('./routes/route')(app);

//listening on port
app.listen(port, () => {
    console.log(`server connected on port: ${port}`);
});

module.exports = {app};