const express = require("express");
const { createTodo, updateTodo } = require("./types");
const { todo } = require("./db");
const cors =require("cors");
const app = express();

 
app.use(express.json());
app.use(cors());

app.post('/todo', async function (req, res) {
    const createPayload = req.body;
    const parsePayLoad = createTodo.safeParse(createPayload);
    if (!parsePayLoad.success) {
        res.status(411).json({
            msg: "you sent wrong inputs"
        })
        return;
        //put it in mongo
    }
    await todo.create({
        title: createPayload.title,
        description: createPayload.description,
        completed: false
    })
    res.json({
        msg: "todo created"
    })
})

app.get('/todos', async (req, res) => {
    const todos = await todo.find({});
    res.json({
        todos
    })
})

app.put('/completed', async function (req, res) {
    const updatePayload = req.body;
    const parsePayLoad = updateTodo.safeParse(updatePayload);
    if (!parsePayLoad.success) {
        res.status(411).json({
            msg: "you sent wrong inputs"
        })
        return;
        //put it in mongo

    }
    await todo.update({
        _id: req.body.id
    },
        {
            completed: true
        })
    res.json({
        msg: 'todo markes completed'
    })
})


app.listen(3000);