const express = require("express");
const router = express.Router();
const {createTodo, getTodo, getTodoById, deleteTodo, updateTodo, updateTodoStatus} = require("../contorllers/Todo");
const {auth} = require("../middleware/Auth");

router.post("/createTodo", auth, createTodo);
router.get("/getTodo", auth, getTodo);
router.get("/getTodo/:id", auth, getTodoById);
router.put("/updateTodo/:id", auth, updateTodo);
router.put("/updateTodoStatus/:id", auth, updateTodoStatus);
router.delete("/deleteTodo/:id", auth, deleteTodo);

module.exports = router