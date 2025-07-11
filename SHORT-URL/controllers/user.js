const{v4:uuidv4} = require('uuid');
const User=require('../models/user');
const{setUser} = require('../service/auth');
async function handleUserSignup(req,res){
    const { name, email, password } = req.body;
    await User.create({ name, email, password });
res.render("home", { urls: [] }); // Render home page after signup:)
}
async function handleUserLogin(req, res) {
    const { email, password } = req.body;
    const user= await User.findOne({ email, password })
    if (!user) {
        return res.render("login",{error:"Invalid email or password",});
    }
    const sessionId = uuidv4();  
    setUser(sessionId, user);
    res.cookie("uid", sessionId);
    return res.redirect("/", ); // Render home page after successful login :)
}   
module.exports = {
    handleUserSignup,
    handleUserLogin
};
 