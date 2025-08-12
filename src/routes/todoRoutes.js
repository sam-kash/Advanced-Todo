import express from 'express'
import db from '../db.js'
import e from 'express';

const router = express.Router();

// Get all Todos for all Logged in users

router.get('/', (req,res) => {
    const getTodos = db.prepare(`SELECT * FROM todos WHERE user_id = ?`)
    const todos = getTodos.all(req.userId)
    res.json(todos)
})

//Cretae a new Todo
router.post('/', (req, res) => {
    const {task} = req.body
    const InsertTodo = db.prepare(`INSERT INTO todos(user_id, task) VALUES (?, ? )`)
    const result = InsertTodo.run(req.userId, task)

    res.json({id: result.lastInsertRowid, task, completed : 0}) // 0 represents the false boolean state
})

//Update a todo 
router.put('/:id',(req,res) => {
    const {completed} = req.body
    const {id} = req.params
    const {page} = req.query

    const updatedTodo = db.prepare('UPDATE todos SET completed = ? WHERE id = ?')
    updatedTodo.run(completed, id)

    res.json({ message: "Todo completed"})
} )

//TO delete
router.delete('/:id', (req,res) => {
    const {id} = req.params
    const userId = req.userId
    const deleteTodo = db.prepare(`DELETE FROM todos WHERE id = ? AND user_id = ?`)
    deleteTodo.run(id, userId)
    res.send ({message : "Todo deleted"})
})

export default router