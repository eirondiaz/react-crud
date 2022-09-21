import React, { useState } from 'react'
import { Box, TextField, Button, Typography }from '@mui/material';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '45%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

export const ModalInsert = ({handleClose}) => {

  const [emptyFields, setEmptyFields] = useState(false)
  const [data, setData] = useState({
    name: '',
    category: '',
    code: '',
    price: '',
    stock: ''
  });

  const handleInputChange = ({ target }) => {
    const name = target.name
    const value = target.value

    setData({
      ...data,
      [name]: value
    })
  }

  const submitData = async () => {
    if (Object.values(data).some(x => x === '')) {
      setEmptyFields(true)
      return
    }

    try {
      await axios.post(`http://localhost:3002/api/v1/products`, data)
      setEmptyFields(false)
      handleClose()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Box sx={style}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Agregar producto
      </Typography>
      
      <div style={{ marginTop: 20 }}>
        <TextField onChange={handleInputChange} value={data?.name || ''} name="name" style={{ width: '100%' }} id="outlined-basic" size="small" label="Nombre" variant="outlined" />
        <div style={{ marginTop: 10 }}>
          <TextField onChange={handleInputChange} value={data?.code || ''} name="code" style={{ width: '48%', marginRight: 16 }} id="outlined-basic" size="small" label="Codigo" variant="outlined" />
          <TextField onChange={handleInputChange} value={data?.category || ''} name="category" style={{ width: '48%' }} id="outlined-basic" size="small" label="Categoria" variant="outlined" />
        </div>
        <div style={{ marginTop: 10 }}>
          <TextField onChange={handleInputChange} value={data?.price || ''} name="price" type="number" style={{ width: '48%', marginRight: 16 }} id="outlined-basic" size="small" label="Precio" variant="outlined" />
          <TextField onChange={handleInputChange} value={data?.stock || ''} name="stock" type="number" style={{ width: '48%' }} id="outlined-basic" size="small" label="Stock" variant="outlined" />
        </div>

        {
          emptyFields && <p style={{ color: 'red' }}>Debes llenar todos los campos</p>
        }

        <Button onClick={submitData} style={{ marginTop: 10 }} variant="contained" color="success">Agregar</Button>
      </div>
    </Box>
  )
}
