
import { NextResponse } from "next/server"
import { connectToDb } from "@/lib/utils";
import { Todo } from "@/lib/models";

export async function GET(request) {
  
    try {
        connectToDb();
        const todos = await Todo.find();
        return NextResponse.json({ message:"", data:todos }, { status: 200 })

    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: 'Internal Server Error', message:"Something went wrong" }, { status: 500 })
    }
   
}