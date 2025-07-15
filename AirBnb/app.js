if(process.env.NODE_ENV != "production"){
  require('dotenv').config();
}
const express = require("express");
const app = express();
const port = 3000;
const mongoose = require("mongoose");
const db_URL = process.env.ATLASDB_URL;
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const listingRouter = require("./routes/listings.js")
const reviewRouter = require("./routes/reviews.js")
const userRouter = require("./routes/users.js")
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const LocalStrategy = require("passport-local");
const passport = require("passport");
const User = require("./models/user.js")


app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.engine("ejs", ejsMate);
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "/public")));
app.use(cookieParser());


const store = MongoStore.create({
  mongoUrl: db_URL,
  crypto : {
  secret:process.env.SECRET
  },
  touchAfter: 24 * 3600,
})

store.on("error",(err)=>{
  console.log("Error in MongoDB Session Store",err)
})


const sessionOptions = ({
  store: store,
  secret:process.env.SECRET,
  resave:false,
  saveUninitialized:true,
  cookie : {
    expires : Date.now() + 7 *24*60*60*1000,
    maxAge: 7 *24*60*60*1000,
    httpOnly: true
  }
});


main()
  .then((res) => {
    console.log("Connection successful");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(db_URL);
}


app.use(session(sessionOptions));
app.use(flash());

//Authentication and Authorization using Passpost Package
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req,res,next)=>{
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
   next();
})

app.use("/listings",listingRouter)
app.use("/listings/:id/reviews",reviewRouter)
app.use("/users",userRouter)



//MIDDLEWARE FOR ALL PAGES THAT DOESN'T EXIST
app.all("*", (req, res, next) => {
  next(new ExpressError(400, "Page not found"));
});

app.use((err, req, res, next) => {
  let { status = 500, message = "Something went wrong" } = err;
  res.render("error.ejs", { message });
});


app.listen(port, () => {
  console.log(`Port is workin on ${port}`);
});
