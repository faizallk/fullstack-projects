const User = require("../models/user")

module.exports.renderSignUpForm = (req,res)=>{
    res.render("./users/signup")
}

module.exports.postUser = async (req,res)=>{
    try{
        let {username,email,password} = req.body;
        let newUser = new User({email,username})
        let registeredUser = await User.register(newUser,password);
        req.login(registeredUser,(err)=>{
            if(err){
                next(err)
            }
            req.flash("success","Welcome to AirBnb");
            res.redirect("/listings")    
        })
  
    } catch(e){
        req.flash("error",e.message);
        res.redirect("/users/signup");
    }
   
}

module.exports.renderLoginForm = (req,res)=>{
    res.render("./users/login.ejs")
}

module.exports.saveLoginUser = async (req,res)=>{
    req.flash("success","Welcome back to AirBnb");
     let redirectUrl = res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl);
   
}

module.exports.logOutUser = (req,res,next)=>{
    req.logOut((err)=>{
        if(err){
            return next(err);
        }
        req.flash("success","You logged out!")
        res.redirect("/listings")
    })
}