//const express = require('express')
import express from 'express'
import path , {dirname} from 'path'
import { execArgv } from 'process'
import { fileURLToPath } from 'url'
import authRoutes from './routes/authRoutes.js'
import todoRoutes from './routes/todoRoutes.js' 

const app = express()
const PORT = process.env.PORT || 5000 // JUst checks if there is a port environment variable , if it is there then it uses that

//console.log("hello world")

// get the file path from the url of the current module 

const __filename = fileURLToPath(import.meta.url)
// get the directory name from the file path

const __dirname = dirname(__filename)

//Acting as middleware
app.use(express.json())

//Servers the html file from the /public directory
//Tell express to server all files from the public folder as static assets / files
app.use(express.static(path.join(__dirname, '../public')))

// Serving the index.html file from the public directory
app.get('/' , (req,res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

//routes
app.use('/auth' , authRoutes)
app.use('/todos' , todoRoutes)


app.listen(PORT, () => {
    console.log(`Server started on port : ${PORT}`)
})

