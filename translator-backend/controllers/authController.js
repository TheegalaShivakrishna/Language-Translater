const User=require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const register= async(req,res) =>{
    try{
        const {name, email, password} = req.body;
    const existingUser =await User.findOne({email});

    if(existingUser){
        return res.status(400).json({message: 'User already exists'});
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user=await User.create({
        name,
        email,
        password: hashedPassword    
    });
    res.status(201).json({message: 'User registered successfully'});
}
    catch (err){
        res.status(500).json({message:'Server error'})
    }
};

const login=async (req,res) => {
    try{
        console.log('Login attempt received:', { email: req.body.email });
        const {email, password} = req.body;
        
        if (!email || !password) {
            console.log('Missing email or password');
            return res.status(400).json({message: 'Email and password are required'});
        }

        const user =await User.findOne({email});
        if(!user){
            console.log('User not found:', email);
            return res.status(400).json({message: 'User not found'});
        }

        console.log('User found, checking password...');
        const isMatch =await bcrypt.compare(password, user.password);
        if(!isMatch){
            console.log('Password mismatch for user:', email);
            return res.status(400).json({message: 'Invalid credentials'});
        }

        console.log('Password matched, generating token...');
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '7d'});
        
        console.log('Login successful for user:', email);
        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email
            }
        });
    
    }
    catch (err){
        console.error('Login error:', err);
        res.status(500).json({message: 'Server error'});
    }

};

const validateToken = async (req, res) => {
    try {
        console.log('Token validation request received');
        console.log('User from middleware:', req.user);
        
        // The middleware already found the user, so we can use it directly
        if (!req.user) {
            console.log('No user found in request');
            return res.status(401).json({ message: 'User not found' });
        }
        
        console.log('Token validation successful for user:', req.user.email);
        res.json({
            valid: true,
            user: {
                id: req.user._id,
                name: req.user.name,
                email: req.user.email
            }
        });
    } catch (err) {
        console.error('Token validation error:', err);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports={register, login, validateToken};