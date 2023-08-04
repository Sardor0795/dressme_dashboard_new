import React from 'react'
import ProductsPageTop from './ProductsPageTop/ProductsPageTop'
import AddingProduct from './AddingProduct/AddingProduct'

export default function ProductsPageOne() {

  return (
    <div className='w-full'>
        <div className='w-full'>
          <ProductsPageTop />
        </div>
        <div className='w-full'>
          <AddingProduct />
        </div>
    </div>
  )
}
