const express = require("express")
const app = express();
const mongoose = require("mongoose")
const path = require("path")
const dotenv  = require("dotenv")
dotenv.config()
const cookie = require("cookie-parser")
const cors = require("cors")
// app.options('*', cors()) // include before other routes 
app.use(cors({
    origin:"*",
    methods:["POST","GET","PATCH","DELETE"],
    credentials:true,
}))

app.use(express.json())
app.use(cookie());
const bodyParser = require("body-parser");
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
const global = require("./global.js")
const Razorpay = require('razorpay');



//User
const userRoute = require("./api/userRoute.js")

//Login
const loginRoute = require("./api/loginRoute.js")
//Forgot Password
const forgotPasswordRoute = require("./api/forgotPasswordRoute.js")
//New Password
const newPasswordRoute = require("./api/newPasswordRoute.js")


//Category
const categoryRoute = require("./api/categoryRoute.js")

//SubCategory
const subCategoryRoute = require("./api/subCategoryRoute.js")

//Programming Languages
const ProgrammingLanguageRoute = require("./api/programmingLanguagesRoute.js")

//Language
const LanguageRoute = require("./api/languageRoutes.js")

//Chapter
const ChapterRoute = require("./api/chapterRoute.js")

//ContentVideo
const ContentVideoRoute = require("./api/contentVideoRoute.js")

//Video
const VideoRoute = require("./api/videoRoute.js")

// Files
const FileRoute = require("./api/contentFileRoute.js")

//Review
const ReviewRoute = require("./api/reviewRoute.js")

//Content
const ContentRoute = require("./api/contentRoute.js")

//Course
const CourseRoute = require("./api/courseRoute.js")

//Instructor
const InstructorRoute = require('./api/instructorRoute.js')

//Dashboard
const DashboardRoute = require('./api/dashboardRoute.js')
//Payment 
const PaymentRoute = require('./api/paymentRoutes.js')
// const InstructorLoginRoute = require("./")
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
// const whitelist = [
//     '*'
//   ];
// app.use((req, res, next) => {
//     const origin = req.get('referer');
//     const isWhitelisted = whitelist.find((w) => origin && origin.includes(w));
//     if (isWhitelisted) {
//       res.setHeader('Access-Control-Allow-Origin', '*');
//       res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
//       res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,Authorization');
//       res.setHeader('Access-Control-Allow-Credentials', true);
//     }
//     // Pass to next layer of middleware
//     if (req.method === 'OPTIONS') res.sendStatus(200);
//     else next();
//   });
  
//   const setContext = (req, res, next) => {
//     if (!req.context) req.context = {};
//     next();
//   };
//   app.use(setContext);
  
//   app.use('/', indexRouter);
app.use('/uploads', express.static('uploads'));
app.use(userRoute);
app.use(loginRoute);

app.use(categoryRoute);
app.use(subCategoryRoute);
app.use(ProgrammingLanguageRoute);
app.use(LanguageRoute);
app.use(ChapterRoute);
app.use(ContentVideoRoute);
app.use(VideoRoute);
app.use(FileRoute);
app.use(ReviewRoute);
app.use(ContentRoute);
app.use(CourseRoute);
app.use(InstructorRoute);
app.use(forgotPasswordRoute);
app.use(newPasswordRoute);
app.use(DashboardRoute);
app.use(PaymentRoute);
module.exports = app;



