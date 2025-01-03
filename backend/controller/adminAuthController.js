import express from 'express';
import bcrypt from 'bcrypt';

import adminModel from '../models/adminModel';

export const adminSignup = async (req, res) => {

    try{

        const {name, email, password} = req.body;
        if(!name){
            return res.status(400).json({message:`Enter your name please`});
        }
        if(!email){
            return res.status(400).json({message:"Enter your email please"});
        }
        if(!password){
            return res.status(400).json({message:"Enter your password please"}); 
        }
        const salt =await bcrypt.genSalt(10);
        const hashPassword =await bcrypt.hash(password, salt);

        const admin =new adminModel({
            name,
            email,
            hashPassword
        })
        admin.save();
        return res.status(200).json({admin});
    }catch(err){
        console.log(`Error has occured at admin signup page`);
        res.status(500).json({error:`Internal error - ${err.message}`});
    }
}
export const adminLogin  = async (req,res)=>{

    const {username,password} = req.body;

    if(!username){
        return res.status(400).json({message:"plese provide the username"});
    }
    if(!password){
        return res.status(400).json({message:"please provide the password"});
    }
    const admin = await adminModel.find(username);
    if(!admin){
        return res.status(404).json({message:`User with the username ${username} not found`});
    }
    const compare =await bcrypt.compare(password,admin?.password);
    if(!compare){
        return res.status(404).json({message:"Password mismacthed"});
    }
    return res.status(200).json(admin.populate('-password'));
}