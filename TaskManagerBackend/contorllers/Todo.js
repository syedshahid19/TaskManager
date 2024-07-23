const Todo = require("../models/Todo");

// creation of Todo
exports.createTodo = async(req, res)=>{
    try {
        // Destructure fields from the request body
        const {title, description} = req.body;
        const userId = req.user.id;
        const email = req.user.email;
        // console.log(email);
        // validating that all details present or not
        if(!title || !description){
            return res.status(403).send({
                success: false,
                message: "All Fields are required",
              })
        }

        const createTodo = await Todo.create({
            title, description, userId, email
        })

        res.status(200).json({
            success:true,
            message:"Todo created successfully",
            createTodo,
        })
    } catch (error) {
        console.log("Internal Server Error", error);
        return res.status(500).json({
            success: false,
            message: 'Error while creating Todo. Please try again.'
        })
    }
}

exports.getTodo = async(req, res)=>{
    try {
        const email = req.user.email;
        const todos = await Todo.find({email:email});
        res.status(200).json({
            success:true,
            data:todos,
            message:"Entire Todo data is fetched"
        })
    } catch (error) {
        console.log("Internal Server Error", error);
        return res.status(500).json({
            success: false,
            message: 'Error while getting Todo. Please try again.'
        })
    }
}

exports.getTodoById = async(req, res)=>{
    try {
        const {id} = req.params;
        const todo = await Todo.findById({_id:id}).populate('userId', 'firstName lastName email');
        if(!todo){
            return res.status(404).json({
                success:false,
                message:"Todo not found with given ID"
            })
        }

        res.status(200).json({
            success:true,
            data:todo,
            message:`Todo ${id} data successfully fecthed`
           })
    
    } catch (error) {
        console.log("Internal Server Error", error);
        return res.status(500).json({
            success: false,
            message: 'Error while getting Todo by ID. Please try again.'
        })
    }
}

exports.deleteTodo = async(req, res)=>{
    try {
        const {id} = req.params
        const userId = req.user.id;
        const deletedTodo = await Todo.findOneAndDelete({_id:id, userId:userId});
        res.status(200).json({
            success:true,
            message:`Todo deleted successfully`
           })
    } catch (error) {
        console.log("Internal Server Error", error);
        return res.status(500).json({
            success: false,
            message: 'Error while deleting Todo. Please try again.'
        })
    }
}

exports.updateTodo = async(req, res)=>{
    try {
        const {id} = req.params;
        const {title, description} = req.body;
        const todo = await Todo.findById({_id:id});

        // Check if the request body is empty
        if (!title || !description) {
            return res.status(400).json({
            success: false,
            message: 'No data provided for update'
            });
        }
        
        // Find the Todo by ID
        if(!todo){
            return res.status(404).json({
                success:false,
                message:"Todo not found with given ID"
            })
        }
        const updatedTodo = await Todo.findByIdAndUpdate(id, {title, description,updatedAt:Date.now()},{new:true})
        res.status(200).json({
            success:true,
            data:updatedTodo,
            message:`Todo updated successfully`
           })
    } catch (error) {
        console.log("Internal Server Error", error);
        return res.status(500).json({
            success: false,
            message: 'Error while updating Todo. Please try again.'
        })
    }
}

exports.updateTodoStatus = async(req, res)=>{
    try {
        const {id} = req.params;
        const {status} = req.body;
        const todo = await Todo.findById({_id:id});

        // Check if the request body is empty
        if (!status) {
            return res.status(400).json({
            success: false,
            message: 'No data provided for update'
            });
        }
        
        // Find the Todo by ID
        if(!todo){
            return res.status(404).json({
                success:false,
                message:"Todo not found with given ID"
            })
        }
        const updatedTodo = await Todo.findByIdAndUpdate(id, {status},{new:true})
        res.status(200).json({
            success:true,
            data:updatedTodo,
            message:`Todo Status updated successfully`
           })
    } catch (error) {
        console.log("Internal Server Error", error);
        return res.status(500).json({
            success: false,
            message: 'Error while updating Todo. Please try again.'
        })
    }
}
