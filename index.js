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
            type: "Jokes",
            setup: setup,
            delivery: response.data.delivery
        })
    }
    if (response.data.type === "single") {
        let singlepart = response.data.joke
        res.render("api.ejs", {
            type: "Jokes",
            singlepart: singlepart
        })
    }
})


app.get("/weather_api", async(req,res)=>{
    let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${12.994147}&lon=${77.699434}&appid=${"541c962a9d121f175c3013075c3c54e4"}`)
    let temp = response.data.main.temp - 273
    let data = {
        city : response.data.name,
        wind : response.data.wind,
        main :response.data.main,
        temp : Math.floor(temp)
    }
    res.render("api.ejs",{
        type: "Weather",
        data:data
    })
})