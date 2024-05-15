import express from "express";
import axios from "axios";


const app = express();
let port = 3000;
app.use(express.static("public"))


app.listen(port, () => {
    console.log(`Server started successfully on port ${port}`)
})

app.get('/', (req, res) => {
    res.render("index.ejs")
})

app.get('/jokes_api', async (req, res) => {
    let response = await axios.get("https://v2.jokeapi.dev/joke/Any")
    console.log(response.data)
    if (response.data.type == "twopart") {
        let setup = response.data.setup
        res.render("api.ejs", {
            setup: setup,
            delivery: response.data.delivery
        })
    }
    if (response.data.type === "single") {
        let singlepart = response.data.joke
        res.render("api.ejs", {
            singlepart: singlepart
        })
    }
})