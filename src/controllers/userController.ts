import { RequestHandler } from "express";
import { User } from "../models/user";
import { comparePasswords, hashPassword, signUserToken, verifyUser } from "../services/auth";


    export const createUser: RequestHandler = async (req, res, next) => {
        let newUser: User = req.body;
        if (newUser.username && newUser.password) {
            let hashedPassword = await hashPassword(newUser.password);
            newUser.password = hashedPassword;
            let created = await User.create(newUser);
            res.status(201).json({
                username: created.username,
                userId: created.id
            });
        }
        else {
            res.status(400).send('Username and password required');
        }
}



export const loginUser: RequestHandler = async (req, res, next) => {
    // Look up user by their username
    let existingUser: User | null = await User.findOne({ 
        where: { username: req.body.username }
    });

    // If user exists, check that password matches
    if (existingUser) {
        let passwordsMatch = await comparePasswords(req.body.password, existingUser.password);
        
        // If passwords match, create a JWT
        if (passwordsMatch) {
            let token = await signUserToken(existingUser);
            res.status(200).json({ token });
        }
        else {
            res.status(401).json('Invalid password');
        }
    }
    else {
        res.status(401).json('Invalid username');
    }
}


export const getUser: RequestHandler = async (req, res, next) => {
    let userId = req.params.id;
    let userFound =  await User.findByPk(userId);
    
    if (userFound) {
        res.status(200).json(userFound);
    }
    else {
        res.status(404).json({});
    }
}



export const getAllUsers: RequestHandler = async (req, res, next) => {
    let user = await User.findAll();
    res.status(200).json(user);
}



export const getUserByUsername: RequestHandler = async (req, res, next) => {
   
        const username = req.params.username;
        console.log(`Searching for user with username: ${username}`); // Log the username parameter

        const user = await User.findOne({ where: { username } });
        console.log(`User found: ${user}`); // Log the result of the query

        if (user) {
            res.status(200).json(user);
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    }; 
