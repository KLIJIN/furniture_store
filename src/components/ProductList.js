import React from 'react'
import { useFilterContext } from '../context/filter_context'
import GridView from './GridView'
import ListView from './ListView'

const ProductList = () => {
  console.log("ProductList  render");
  const { filtered_products: products, grid_view } = useFilterContext();

  if (products.length < 1) {
    return <h5 style={{ textTransform: "none" }}   >
      Продукты загружаются...
           </h5>
  }
  if (grid_view === false) { //в зависимости от Флага Грида, показываем Продукты в ЛистВью или в ГридВью
    return <ListView products={products} />
  }

  return <GridView products={products} />

}

export default ProductList
