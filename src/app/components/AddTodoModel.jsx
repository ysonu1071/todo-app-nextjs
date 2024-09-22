'use client'
import { Box, Button, TextField } from '@mui/material'
import React, { useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { addTodo } from '@/lib/action';
import { useSnackbar } from 'notistack';


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});



const AddTodoModel = ({getTodosData, openDialog, setOpenDialog, todo, setTodo, handleAddTodo,isEdit, handleClose, handleUpdateTodo}) => {

    const handleClickOpen = () => {
        setOpenDialog(true);
    };


   

    return (
        <Box>
            <Button startIcon={<AddIcon />} variant="contained" color="primary" onClick={handleClickOpen}>Add Todo</Button>

            <Dialog
                open={openDialog}
                // TransitionComponent={Transition}
                // keepMounted
                onClose={handleClose}
                aria-describedby="alert-dialog-slide-description"

            >
                {/* <DialogTitle>{"Use Google's location service?"}</DialogTitle> */}
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description" sx={{ "& .MuiInputBase-input": { padding: "7.5px 14px" } }}>
                        <TextField sx={{ width: "400px" }} placeholder='Enter your todo' value={todo} onChange={(e) => setTodo(e.target.value)} />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    {isEdit ? <Button onClick={handleUpdateTodo} variant='contained'>Update</Button>:<Button onClick={handleAddTodo} variant='contained'>Save</Button>}
                </DialogActions>
            </Dialog>

        </Box>
    )
}

export default AddTodoModel