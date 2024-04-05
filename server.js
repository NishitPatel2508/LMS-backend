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

//Login
const loginRoute = require("./routes/loginRoute.js")

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

//Chapter
const ChapterRoute = require("./routes/chapterRoute.js")

//ContentVideo
const ContentVideoRoute = require("./routes/contentVideoRoute.js")

//Video
const VideoRoute = require("./routes/videoRoute.js")

//Review
const ReviewRoute = require("./routes/reviewRoute.js")

//Content
const ContentRoute = require("./routes/contentRoute.js")

//Course
const CourseRoute = require("./routes/courseRoute.js")

//Instructor
const InstructorRoute = require('./routes/instructorRoute.js')

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
app.use(loginRoute);
app.use(countryRoute);
app.use(stateRoute);
app.use(cityRoute);
app.use(categoryRoute);
app.use(subCategoryRoute);
app.use(ProgrammingLanguageRoute);
app.use(LanguageRoute);
app.use(ChapterRoute);
app.use(ContentVideoRoute);
app.use(VideoRoute);
app.use(ReviewRoute);
app.use(ContentRoute);
app.use(CourseRoute);
app.use(InstructorRoute);
