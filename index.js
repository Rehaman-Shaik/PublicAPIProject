import dotenv from 'dotenv';
import express from "express";
import axios from "axios";


const app = express();
let port = 3000;
app.use(express.static("public"))
dotenv.config();
const apiKey = `${process.env.WEATHER_API_KEY}`;


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
            type: "Joke of the Day",
            setup: setup,
            delivery: response.data.delivery
        })
    }
    if (response.data.type === "single") {
        let singlepart = response.data.joke
        res.render("api.ejs", {
            type: "Joke of the Day",
            singlepart: singlepart
        })
    }
})


app.get("/weather_api", async (req, res) => {
    let response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${12.994147}&lon=${77.699434}&appid=${apiKey}`)
    let temp = response.data.main.temp - 273
    let data = {
        city: response.data.name,
        wind: response.data.wind,
        main: response.data.main,
        temp: Math.floor(temp)
    }
    res.render("api.ejs", {
        type: "Today's Weather",
        data: data
    })
})


app.get("/blockchain_api", async (req, res) => {
    // const headers = {
        // 'Accept': 'application/json',
        // 'X-API-Token': 'API_KEY'
    // };
// 
    // let symbol = ""
    // let response = await axios.get(`https://api.blockchain.com/v3/exchange/l2/${symbol}`, {
        // headers: headers
    // })
    // console.log(response.data)
    res.render("api.ejs",{
        type:"Today's Biction",
        token: "Bitcoin",
        price:"60000"
    })
}) 


app.get("/cocktail_api", async (req,res)=>{
    let response = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita")
    res.render("api.ejs", {
        type: "Drink of the Day",
        name:response.data.drinks[0].strDrink,
        instructions:response.data.drinks[1].strInstructions,
        img:response.data.drinks[2].strDrinkThumb,
        ingredient1:response.data.drinks[3].strIngredient1,
        ingredient2:response.data.drinks[4].strIngredient2,
        ingredient3:response.data.drinks[5].strIngredient3
    })
})