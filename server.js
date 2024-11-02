
import express from 'express';
import dotenv from 'dotenv';
// Load variables
dotenv.config();
// Start Server
const app = express();
app.use(express.static('public'));
app.use(express.json());

// home route

app.get('/' )

app.listen(3000, () =>{
    console.log('listening on port 3000;')
})