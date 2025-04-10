import React, { useContext } from 'react'
import { Box, IconButton, useTheme} from '@mui/material'
import { ColorModeContext, tokens } from '../../theme'
import InputBase from '@mui/material/InputBase'
import LightModeOutlinedIcon from '@mui/icons-material/LightModeOutlined'
import DarkModeOutlineIcon from '@mui/icons-material/DarkModeOutlined'
import NotificationsOutlinedIcon  from '@mui/icons-material/NotificationsOutlined'
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined'
import SearchIcon from '@mui/icons-material/Search'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'


function Topbar() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  // console.log("colours : ",colors);
  const colorMode = useContext(ColorModeContext);

  return (
    
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SearchBar */}
      <Box display="flex" bgcolor = {colors.primary[400]} borderRadius="3px">
        <InputBase sx={{ ml:2, flex: 1 }} placeholder="Search..."/> 
        <IconButton type='button' sx={{p: 1}}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* Icons */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === 'dark' ? (
            <DarkModeOutlineIcon/>
          ) : (
            <LightModeOutlinedIcon/>
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        <IconButton>
          <PersonOutlinedIcon />
        </IconButton>
      </Box>  
    </Box>
  )
}

export default Topbar