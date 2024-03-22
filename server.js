const express = require("express")
const app = express();
const mongoose = require("mongoose")

const dotenv  = require("dotenv")
dotenv.config()

const cors = require("cors")
app.use(cors())

app.use(express.json())
const global = require("./global.ts")


//User
const userRoute = require("./routes/userRoute")

//Country
const countryRoute = require("./routes/countryRoute.js")

//State
const stateRoute = require("./routes/stateRoute.js")

//City 
const cityRoute = require("./routes/cityRoute.js")

//Category
const categoryRoute = require("./routes/categoryRoute.js")

//SubCategory
const subCategoryRoute = require("./routes/subCategoryRoute.js")

//Programming Languages
const ProgrammingLanguageRoute = require("./routes/programmingLanguagesRoute.js")

//Language
const LanguageRoute = require("./routes/languageRoutes.js")
// console.log(mongoose.version); 
mongoose.connect(process.env.URI)
.then(()=>{
    console.log("connected successfully");

    app.listen(process.env.PORT || 8000, (err) =>{
        if(err) console.log("1",err);

        console.log("running successfully at ", process.env.PORT);
    }) 
}).catch((error) =>{
    console.log("error",error);
})
app.get("/",(req,res) =>{
    res.send("api running abc")
})
app.use(userRoute);
app.use(countryRoute);
app.use(stateRoute);
app.use(cityRoute);
app.use(categoryRoute);
app.use(subCategoryRoute);
app.use(ProgrammingLanguageRoute);
app.use(LanguageRoute);
