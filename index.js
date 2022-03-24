// Import Liblary
const express = require('express');

// Setting App
const app = express();
app.use(express.json()); 
app.use(express.urlencoded());

// Import Controller
const list = require('./Controllers/List');
const article = require('./Controllers/Article');

// Routes
app.get("/news",list);
app.get("/notfs",list);
app.get("/article",article);

// Server
app.listen(3000,()=>{
    console.log('Server running!!');
})