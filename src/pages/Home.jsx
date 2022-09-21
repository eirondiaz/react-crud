import React from 'react'
import { Navbar } from '../components/Navbar'
import { ProductTable } from '../components/ProductTable'

export const Home = ({setLogged}) => {
  return (
    <div>
      <Navbar setLogged={setLogged} />
      <ProductTable />
    </div>
  )
}
