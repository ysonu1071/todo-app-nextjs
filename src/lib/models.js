import mongoose from 'mongoose';

const todoSchema = new mongoose.Schema({
    todo:{
        type: String,
        required: true,
    },
    complete:{
        type:Boolean,
        default: false,
    }
}, {timestamps: true})
console.log(mongoose.models, 'this is model')

export const Todo = mongoose.models?.todo || mongoose.model('todo', todoSchema);