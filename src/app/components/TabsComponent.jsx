'use client'
import { Box } from '@mui/material'
import React, { useState } from 'react'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

const TabsComponent = ({handleChange, value}) => {
    
  return (
    <Box sx={{ width: {md:'50%', xs:'100%'}, overflow:"auto", }}>
    <Tabs
      value={value}
      onChange={handleChange}
      textColor="secondary"
      indicatorColor="secondary"
      aria-label="secondary tabs example"
      sx={{width: {md:'100%', xs:'150%'}}}
    >
      <Tab value={1} label="All Todo" />
      <Tab value={2} label="Completed Todo" />
      <Tab value={3} label="Incompleted Todo" />

    </Tabs>
  </Box>
  )
}

export default TabsComponent