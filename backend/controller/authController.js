import organizer from '../models/organizer_model.js';
import bcrypt from 'bcrypt';
import generateTokenAndSetCookie from '../lib/utils/generateToken.js';

export const organizerSignup = async(req,res)=>{
    try{
        const {username,password,email} = req.body;
        if(password.length <6){
            return res.status(400).json({error:'password length should be more than 6 characters'});
        }
        const existingUser = await organizer.findOne({username});
        if(existingUser){
            return res.status(400).json({error:"User already exists"});
        }
        const existingEmail = await organizer.findOne({email});
        if(existingEmail){
            return res.status(400).json({error:"Email already exists"});
        }
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);
        const newOrganizer = await organizer({
            username:username,
            email:email,
            password:hashPassword,
        });
        await newOrganizer.save();
        generateTokenAndSetCookie(newOrganizer._id,res);
        return res.status(200).json({
            success:"user created successfully",
        })
    }
    catch(err){
        console.error(`Error has occued-${err.message}`);
    }
}
export const organizerLogin=async (req, res) => {
    try{
        const {username, password} = req.body;
        if(!username||!password){
            return res.status(400).json({error:"Enter the username and password"})
        }
        const user = await organizer.findOne({username});
        if(!user){
            return res.status(400).json({error:"Enter the valid username"});
        }
        let isPasswordCorrect = await bcrypt.compare(password, user?.password);
        if(!isPasswordCorrect){
            return res.status(400).json({error:"password incorrect"});
        }
        generateTokenAndSetCookie(user._id,res);
        return res.status(200).json({
            _id:user._id,
            username: user.username,
            email: user.email,
        })
    }
    catch(err){
        console.error(`Error has occued in Organizerlogin`);
        return res.status(500).json({error:`Internal error has occured - ${err.message}`});
    }

}
export const organizerLogout=(req, res) => {
    try{
        res.cookie('jwt',"",{maxAge:0});
        return res.status(200).json({success:"successfully loggedout"});
    }catch(err){
        console.error(`Internal error has occured - OrganizerLogout`);
        res.status(500).json({error:`Internal error has occured - ${err.message}`});
    }
}