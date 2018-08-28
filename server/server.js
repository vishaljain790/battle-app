//required module 
import express from 'express';
import bodyParser from 'body-parser';

//create app server and setup middleware
let app = express();
app.use(bodyParser.json());


//port decalartion.
const port = process.env.PORT || 3000;


app.get('/', (req,res) => {
    res.send('hey user!!');
}); 

//listening on port
app.listen(port, () => {
    console.log(`server connected on port: ${port}`);
})