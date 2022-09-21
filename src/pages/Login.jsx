import React, { useState } from 'react'
import { TextField, Button }from '@mui/material';
import axios from 'axios'

export const Login = ({ setLogged }) => {

  const [data, setData] = useState({ email: '', password: '' });
  const [register, setRegister] = useState({ name: '', email: '', password: '' });
  const [notFound, setNotFound] = useState(false);
  const [emptyFields, setEmptyFields] = useState(false);

  const handleInputChange = ({ target }) => {
    const name = target.name
    const value = target.value

    setData({
      ...data,
      [name]: value
    })
  }

  const handleRegisterChange = ({ target }) => {
    const name = target.name
    const value = target.value

    setRegister({
      ...register,
      [name]: value
    })
  }

  const submitData = async () => {
    try {
      const user = await axios.post(`http://localhost:3002/api/v1/users/login`, data)
      setNotFound(false)
      localStorage.setItem('logged', '1')
      localStorage.setItem('user', JSON.stringify(user.data.data))
      setLogged(true)
    } catch (error) {
      console.log(error?.response?.data?.msg)
      if (error?.response?.data?.msg === 'user not found') {
        setNotFound(true)
      }
    }
  }

  const submitRegister = async () => { 
    if (Object.values(register).some(x => x === '')) {
      setEmptyFields(true)
      return
    }

    try {
      const user = await axios.post(`http://localhost:3002/api/v1/users/register`, register)
      console.log(user.data)
      setEmptyFields(false)
      localStorage.setItem('user', JSON.stringify(user.data.data))
      localStorage.setItem('logged', '1')
      setLogged(true)
    } catch (error) {
      console.log(error?.response?.data?.msg)
    }
  }

  return (
    <div style={{ display: 'flex', justifyContent: 'space-around' }}>
      <div style={{ backgroundColor: '#EEF1FF', width: 300, padding: 20, marginTop: 200 }}>
        <h2>Login</h2>

        <div style={{ marginTop: 10 }}>
          <TextField onChange={handleInputChange} value={data?.email || ''} name="email" style={{ width: '100%' }} id="outlined-basic" size="small" label="Email" variant="outlined" />
          <TextField onChange={handleInputChange} value={data?.password || ''} name="password" type="password" style={{ width: '100%', marginTop: 10 }} id="outlined-basic" size="small" label="Password" variant="outlined" />
        </div>

        {
          notFound && <p style={{ color: 'red' }}>Email o contrasena incorrecta</p>
        }

        <Button onClick={submitData} style={{ marginTop: 20, marginLeft: 80 }} variant="contained" color="success">Iniciar Sesion</Button>
      </div>

      <div style={{ backgroundColor: '#EEF1FF', width: 300, padding: 20, marginTop: 200 }}>
        <h2>Registro</h2>

        <div style={{ marginTop: 10 }}>
          <TextField onChange={handleRegisterChange} value={register?.name || ''} name="name" style={{ width: '100%' }} id="outlined-basic" size="small" label="Nombre" variant="outlined" />
          <TextField onChange={handleRegisterChange} value={register?.email || ''} name="email" style={{ width: '100%', marginTop: 10 }} id="outlined-basic" size="small" label="Email" variant="outlined" />
          <TextField onChange={handleRegisterChange} value={register?.password || ''} name="password" type="password" style={{ width: '100%', marginTop: 10 }} id="outlined-basic" size="small" label="Password" variant="outlined" />
        </div>

        {
          emptyFields && <p style={{ color: 'red' }}>Debes llenar todos los campos</p>
        }

        <Button onClick={submitRegister} style={{ marginTop: 20, marginLeft: 80 }} variant="contained" color="success">Registrar</Button>
      </div>
    </div>
  )
}
