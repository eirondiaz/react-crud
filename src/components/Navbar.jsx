import React, { useEffect, useState } from 'react'
import { Tooltip } from '@mui/material'

export const Navbar = ({setLogged}) => {

  const [user, setUser] = useState({});

  const logout = () => {
    localStorage.setItem('logged', '0')
    localStorage.setItem('user', '{}')
    setLogged(false)
  }

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem('user') || '{}'))
  }, []);

  console.log(user)

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      backgroundColor: '#87A2FB',
      height: 70,
      paddingLeft: 20,
      paddingRight: 20
    }}>
      <h4>CRUD</h4>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between'
      }}>
        <h4 style={{ marginRight: 20 }}>Hola, { user?.name }</h4>
        <Tooltip title="Cerrar Sesion">
          <h4 style={{ cursor: 'pointer' }} onClick={logout}>Cerrar Sesion</h4>
        </Tooltip>
      </div>
    </div>
  )
}
