const User = require("../models/userModels");
const bcrypt = require("bcryptjs")


exports.register = async (req, res) =>{
    try {
        // const newUser = await User.create(req.body);
        const {userName, email, password} = req.body;
        const hashPassword = await bcrypt.hash(password, 14);
        const newUser = await User.create({
            userName,
            email,
            password: hashPassword
        })
        res.status(201).json({
            status: 'success',
            data: {
                user: newUser
            }
        })
    } catch (err) {
        console.log("Error: ", err);
        res.status(400).json({
            status: 'failed to register'
        })
    }
}


exports.login = async (req, res) =>{
    try {
        // const newUser = await User.create(req.body);
        const {email, password} = req.body;
        const hashPassword = await bcrypt.hash(password, 14);
        const newUser = await User.findOne({email});

        if(!user) {
            req.status(404).json({
                status: 'fail',
                message: "Invalid Email ID"
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(isMatch){

            res.status(200).json({
                status: 'success',
                data: {
                    user: user.userName,
                    email: email
                }
            })
        }
        else{
            req.status(404).json({
                status: 'fail',
                message: "Invalid Password"
            });
        }


    } 
    
    catch (err) {
        console.log("Error: ", err);
        res.status(400).json({
            status: 'failed to login'
        })
    }
}