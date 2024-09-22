'use server'

import { Todo } from "./models"
import { connectToDb } from "./utils";
import { revalidatePath } from "next/cache";


export const addTodo = async (prevState, formData) => {
    const { todo } = prevState;

    try {
        connectToDb();
        const newTodo = new Todo({
            todo: todo,
        });

        await newTodo.save();
        console.log("saved to db");
        revalidatePath("/todo");
        return {success:true, message: "" };
        // revalidatePath("/admin");
    } catch (err) {
        console.log(err);
        return {success:false, message: "Something went wrong!" };
    }

}

export const updateTodo = async (prevState, formData) => {
    const { id, todo } = prevState;

    try {
        connectToDb();
        
        await Todo.findByIdAndUpdate({_id:id}, {todo})
        return {success:true, message: "" };
    } catch (err) {
        console.log(err);
        return {success:false, message: "Something went wrong!" };
    }
}

export const completeAndIncompleteTodo = async (prevState, formData) => {
    const { id, status } = prevState;

    try {
        connectToDb();
        
        await Todo.findByIdAndUpdate({_id:id}, {complete: status})
        return {success:true, message: "" };
    } catch (err) {
        console.log(err);
        return {success:false, message: "Something went wrong!" };
    }
}

export const deleteTodo = async (prevState, formData) => {
    const { id } = prevState;
    try {
        connectToDb();
        
        await Todo.findByIdAndDelete({_id:id})
        return {success:true, message: "" };
    } catch (err) {
        console.log(err);
        return {success:false, message: "Something went wrong!" };
    }

}

