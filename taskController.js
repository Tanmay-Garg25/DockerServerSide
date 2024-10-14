const Task = require("../models/taskModel");

exports.createTask = async(req, res, next) => {
    try {
        const task = await Task.create(req.body);
        res.status(200).json({
            status: 'success',
            data:{
                task
            }
        });
    } catch (e) {
        console.log("err : ",e);
        res.status(400).json({
            status: 'failed to create a task'
        });
    }
}

exports.getAllTask = async(req, res, next) => {
    try {
        const taskList = await Task.find(req.body);
        res.status(200).json({
            status: 'success',
            count: taskList.length,
            data:{
                taskList
            }
        });
    } catch (e) {
        res.status(400).json({
            status: 'failed to fetch all task'
        });
    }
}

exports.getOneTask = async(req, res, next) => {
    try {
        const task = await Task.findById(req.params.id);
        res.status(200).json({
            status: 'success',
            data:{
                task
            }
        });
    } catch (e) {
        res.status(400).json({
            status: 'failed to fetch the task'
        });
    }
}


exports.updateTask = async(req, res, next) => {
    try {
        const tasks = await Task.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: 'success',
            data:{
                tasks
            }
        });
    } catch (e) {
        res.status(400).json({
            status: 'failed to update the task'
        });
    }
}


exports.deleteTask = async(req, res, next) => {
    try {
        const tasks = await Task.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: 'success',
            message: 'Task deleted successfully'
        });
    } catch (e) {
        res.status(400).json({
            status: 'failed to delete the task'
        });
    }
}