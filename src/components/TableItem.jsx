import React from 'react'
import { TableCell, TableRow, Button, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2'
import axios from 'axios'

export const TableItem = ({ row, handleOpenEdit, fetch }) => {

  const deleteProd = () => {
    Swal.fire({
      title: 'Estas seguro que deseas eliminar este producto?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:3002/api/v1/products/${row?._id}`)
          fetch()
        } catch (error) {
          console.log(error)
        }
      }
    })
  }

  return (
    <TableRow
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component="th" scope="row">
        {row?.name || ''}
      </TableCell>
      <TableCell align="right">{row?.code || ''}</TableCell>
      <TableCell align="right">{row?.category || ''}</TableCell>
      <TableCell align="right">{row?.price || '0'}</TableCell>
      <TableCell align="right">{row?.stock || '0'}</TableCell>
      <TableCell align="center">
        <div>
          <Tooltip title="Editar">
            <Button style={{ marginRight: 10 }} onClick={() => handleOpenEdit(row)} variant="contained" size="medium" color="secondary"><EditIcon /></Button>
          </Tooltip>
          <Tooltip title="Eliminar">
            <Button onClick={deleteProd} variant="contained" size="medium" color="error"><DeleteIcon /></Button>
          </Tooltip>
        </div>
      </TableCell>
    </TableRow>
  )
}
