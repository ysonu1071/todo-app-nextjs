
import { Todo } from "./models";
import { connectToDb } from "./utils";
import { unstable_noStore as noStore } from "next/cache";

export const getTodos = async() => {
    try {
        connectToDb();
        const todos = await Todo.find();
        return {success:true, todos:todos, message:""};
    } catch (error) {
        console.log(error);
        return {success:false, message:"Failed to fatch todo"}
    }
}