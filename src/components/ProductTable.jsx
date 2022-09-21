import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Modal } from '@mui/material';
import { ModalInsert } from './ModalInsert';
import { TableItem } from './TableItem';
import axios from 'axios';
import { ModalUpdate } from './ModalUpdate';

export const ProductTable = () => {

  const [open, setOpen] = useState(false);
  const [modalEdit, setOpenModalEdit] = useState(false);
  const [data, setData] = useState([]);
  const [productToEdit, setProductToEdit] = useState({});

  const handleOpen = () => setOpen(true);
  const handleOpenEdit = (prod) => {
    setOpenModalEdit(true)
    setProductToEdit(prod)
  };

  const handleClose = () => {
    fetch()
    setOpen(false);
    setOpenModalEdit(false)
  }
  
  const fetch = async () => {
    try {
      const data = await axios.get(`http://localhost:3002/api/v1/products`)  
      setData(data.data.data)  
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetch()
  }, []);

  return (
    <div style={{ margin: 60 }}>
      <Button onClick={handleOpen} variant="contained" size="medium" color="success">Agregar</Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalInsert handleClose={handleClose} />
      </Modal>

      <Modal
        open={modalEdit}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <ModalUpdate handleClose={handleClose} product={productToEdit} />
      </Modal>

      <div style={{ marginTop: 20 }}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell align="right">Codigo</TableCell>
                <TableCell align="right">Categoria</TableCell>
                <TableCell align="right">Precio</TableCell>
                <TableCell align="right">Stock</TableCell>
                <TableCell align="center">Accion</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {
                data.map(prod => (
                  <TableItem key={prod?._id} row={prod} handleOpenEdit={handleOpenEdit} fetch={fetch} />
                ))
              }
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
    
  )
}
