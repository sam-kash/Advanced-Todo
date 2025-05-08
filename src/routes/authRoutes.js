import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken' // allow us to put a json tokem ,which is a alphanumeric key
import db from '../db.js'

const router = express.Router()

//Register a new user endpoint (/auth/register)
router.post('/register', (req,res) => {
    const {username, password} = req.body
    // we save the username and all with an irreversibly encrypted password

    //encrypt the password 
    const hashedPassword = bcrypt.hashSync(password, 8)

    // Save the new user and the password to thhe DB
    try{
        const insertUser = db.prepare(`INSERT INTO users(username, password)
            VALUES (?, ?)`)
            const result = insertUser.run(username, hashedPassword)

            // Now that we have a user, I want to add their todo for them
            const defaultTodo = 'Hello! Add your first todo'
            const insertTodo = db.prepare(`INSERT INTO todos (user_id, task)
                VALUES (?,?)`)
            insertTodo.run(result.lastInsertRowid, defaultTodo)

            // create a token
            const token = jwt.sign({id: result.lastInsertRowid}, process.env.JWT_SECRET, {expiresIn: '24h'})
            res.json({token})
    } catch (err){
        console.log(err.message)
        res.sendStatus(503)
    }

})

router.post('/login', (res,req)=> {
    //we got their email and the password associated to that in the database
    // but we get back to see that its encrypted, which means that we cannot comprre
    // so what we have to do is again one way encrpyt that thing

    const {username, password} = req.body

    try{
        const getUser = db.prepare('SELECT * FROM users WHERE username = ?')
        const user = getUser.get(username)
    }catch(err){
        console.log(err.message)
        res.sendStatus(503)
    }
})

export default router;