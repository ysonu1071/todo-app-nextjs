'use client'
import Image from "next/image";
import styles from "./page.module.css";
import { Box, Button, IconButton, InputAdornment, Paper, TextField, Typography } from "@mui/material";
import TabsComponent from "./components/TabsComponent";
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { useEffect, useState } from "react";
import AddTodoModel from "./components/AddTodoModel";
import Todo from "./components/Todo";
import CircularProgress from '@mui/material/CircularProgress';
import { SnackbarProvider } from 'notistack';
import { completeAndIncompleteTodo, deleteTodo, getTodos, updateTodo } from "@/lib/action";
import { addTodo } from "@/lib/action";
import { toast } from 'react-hot-toast';
import { usePathname } from "next/navigation";
// import { useRouter } from 'next/router';

export default function Home() {
  const [allTodo, setAllTodo] = useState(null);
  const [todos, setTods] = useState(null);
  const [value, setValue] = useState(1)
  const [openDialog, setOpenDialog] = useState(false);
  const [todo, setTodo] = useState("");
  const [isEdit, setIsEdit] = useState(false);
  const [editData, setEditData] = useState({});
  const [query, setQuery] = useState("");
  const [isLoading, setIsloading] = useState(true);
  const path = usePathname();

  // const { asPath } = useRouter();
    const origin =
        typeof window !== 'undefined' && window.location.origin
            ? window.location.origin
            : '';

    const URL = `${origin}${path}`;

  console.log(URL, 'thhis is path')
  

  const handleChange = (event, newValue) => {
    console.log('value chagnign')
    setValue(newValue);
    
  };

  const handleClose = () => {
    console.log('close fun is calling')
    setOpenDialog(false);
    setTodo("");
  };

  const handleOpenEdit = (todo) => {
    setIsEdit(true);
    setOpenDialog(true)
    setEditData(todo);
    setTodo(todo.todo);

  }

  const filterTodo = (value, query) => {
    console.log(value, query, 'this is query')
    if (value == 1) {
      let alltodo = allTodo ? allTodo.filter((todo) => todo.todo.toLowerCase().includes(query)) : []
      setTods(alltodo);
    } else if (value == 2) {
      let completed = allTodo ? allTodo.filter((todo) => todo.complete == true && todo.todo.toLowerCase().includes(query)) : []
      setTods(completed);
    } else if (value == 3) {
      let incompleted = allTodo ? allTodo.filter((todo) => todo.complete == false && todo.todo.toLowerCase().includes(query)) : []
      setTods(incompleted);
    }
  }

  const handleAddTodo = async () => {
    let response = await addTodo({ todo: todo });
    if (response.success) {
      handleClose();
      toast.success('Todo added successfully');
      getTodosData();

    } else {
      handleClose();
      toast.error('Something went wrong!');

    }

  }

  const handleUpdateTodo = async () => {
    let response = await updateTodo({ id: editData._id, todo: todo });
    if (response.success) {
      handleClose();
      toast.success('Todo updated successfully');
      getTodosData();
      setEditData({});
      setIsEdit(false);
    } else {
      handleClose();
      toast.error('Something went wrong!');

    }

  }

  const handleDelete = async (todo) => {
    let response = await deleteTodo({ id: todo._id });
    if (response.success) {
      handleClose();
      toast.success('Todo deleted successfully');
      getTodosData();
    } else {
      handleClose();
      toast.error('Something went wrong!');

    }

  }

  const handleCompleteAndIncompleteTodo = async (todo) => {
    let response = await completeAndIncompleteTodo({ id: todo._id, status: !todo.complete });
    if (response.success) {
      handleClose();
      toast.success(todo.complete ? 'Todo marked as Incomplete' : 'Todo marked as complete');
      getTodosData();
    } else {
      handleClose();
      toast.error('Something went wrong!');

    }

  }



  const getTodosData = () => {
    setIsloading(true);
    fetch(`${URL}todos`, {})
      .then((res) => {

        return res.json();
      }).then((res) => {
        console.log(res, 'this is resp')
        setAllTodo(res.data);
        setIsloading(false)
        // filterTodo(value);
      })
      .catch((err) => {
        console.log(err, "Something went wrong")
        setIsloading(false)
      });

  };

  useEffect(() => {
    getTodosData()
  }, [])

  useEffect(() => {
    filterTodo(value, query);
  }, [value, allTodo, query])



  return (
    <SnackbarProvider maxSnack={3}>
      <Box sx={{ width: "100vw", height: '100vh', display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "whitesmoke" }}>
        <Paper sx={{ width:{md:"70%", xs:"95%"}, height: {md:"70vh", xs:"100vh"}, }}>
          <Box sx={{ display: 'flex', justifyContent: "center", backgroundColor: "lightblue" }}>
            <Typography sx={{ fontSize: "20px", padding: '20px', fontWeight: "bold" }}>Todo App</Typography>
          </Box>
          <Box sx={{ display: "flex",flexDirection:{md:'row', xs:"column-reverse"}, justifyContent: "space-between", alignItems: "center", padding: "10px 20px", }}>
            <TabsComponent handleChange={handleChange} value={value} />
            <Box sx={{
              display: "flex", justifyContent: "space-between", flexDirection:{md:'row', xs:"column-reverse"}, alignItems: "center", gap: "20px",
              "& .MuiInputBase-input": { padding: "7.5px 14px" }
            }}

            >
              <TextField
                placeholder="Search Todo"
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => setQuery(e.target.value)}
                value={query}
              />

              <AddTodoModel getTodosData={getTodosData} handleClose={handleClose} handleUpdateTodo={handleUpdateTodo} isEdit={isEdit} handleAddTodo={handleAddTodo} openDialog={openDialog} setOpenDialog={setOpenDialog} todo={todo} setTodo={setTodo} />
            </Box>
          </Box>
          <Box sx={{height:{md:"70%", xs:"50%"}, overflow: "auto",}}>
          {!isLoading && todos && todos.length > 0 && <Box>
            {todos.map((todo) => <Todo todo={todo} key={todo.id} handleOpenEdit={handleOpenEdit} handleCompleteAndIncompleteTodo={handleCompleteAndIncompleteTodo} handleDelete={handleDelete} />)}
          </Box>}
          </Box>

          {!isLoading && todos && todos.length == 0 && <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "70%" }}>
            <Typography>No Todo Found</Typography>
          </Box>}

          {isLoading && <Box sx={{ display: 'flex', justifyContent: "center", alignItems: "center", height: "70%" }}>
            <CircularProgress />
          </Box>}

        </Paper>

      <Box sx={{position:'absolute', bottom:'0px', right:"0px", padding:"20px"}}>
        <Typography sx={{fontSize:"12px"}}>Developed by Sonu Kumar</Typography>
      </Box>
      </Box>
    </SnackbarProvider>
  );
}
