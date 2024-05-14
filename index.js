import express from "express";
import axios from "axios";


const app  = express();
let port = 3000;


app.listen(port, ()=>{
    console.log(`Server started successfully on port ${port}`)
})

app.get('/', (req, res) => {
    res.render("index.ejs")
  })