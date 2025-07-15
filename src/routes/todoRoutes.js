import express from 'express'
import db from '../db.js'
import e from 'express';

const router = express.Router();

// Get all Todos for all Logged in users

router.get('/', (res,req) => {
    const getTodos = db.prepare('SELCET * from todos where usee_id = ?')
    const todos = getTodos.all(req.userId)
})

//Cretae a new Todo
router.post('/', (req, res) => {})

//Update a todo
router.put('/:id',(req,res) => {} )

//TO delete
router.delete('/:id', (req,res) => {})

export default router