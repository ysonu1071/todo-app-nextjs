import { Box, Button, IconButton, Typography } from '@mui/material'
import React from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const Todo = ({todo, handleOpenEdit, handleDelete, handleCompleteAndIncompleteTodo}) => {
    
  return (
   <Box sx={{display:"flex",flexDirection:{md:'row', xs:"column"}, border:"1px solid lightgray", justifyContent:"space-between", alignItems:"center", padding:{md:"0px 20px", xs:"0px 10px"}}}>
    <Typography>{todo.todo}</Typography>
    <Box sx={{display:"flex", gap:"10px", alignItems:"center"}}>
        <Button onClick={()=> handleCompleteAndIncompleteTodo(todo)}>
           { todo.complete ? 'Incomplete' :'Complete' }
        </Button>
        <IconButton onClick={()=> handleOpenEdit(todo)}>
            <EditIcon/>
        </IconButton>
        <IconButton onClick={()=> handleDelete(todo)}>
            <DeleteIcon/>
        </IconButton>
    </Box>
   </Box>
  )
}

export default Todo