import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useProductsContext } from '../context/products_context'
import { single_product_url as url } from '../utils/constants'


const ProductImages = ({ images = [{ url: '' }] }) => {
  //const [main, setMain] = useState(images?.length > 0 ? images[0] : [])
  const [main, setMain] = useState(images[0])
  // console.log("ProductImages_images", images)
  // console.log("ProductImages_main", main)
  // console.log("ProductImages_main_id", main.id)
  return (
    <Wrapper>
      <img src={images[0].url} alt='main' className='main' />
      <div className='gallery'>
        {images.map((image, index) => {
          return (
            <img
              src={image.url}
              alt={image.filename}
              key={index}
              onClick={() => setMain(images[index])}
              className={`${image.url === main.url ? 'active' : null}`}
            />
          )
        })}

      </div>



    </Wrapper>
  )

}

const Wrapper = styled.section`
  .main {
    height: 600px;
  }
  img {
    width: 100%;
    display: block;
    border-radius: var(--radius);
    object-fit: cover;
  }
  .gallery {
    margin-top: 1rem;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    column-gap: 1rem;
    img {
      height: 100px;
      cursor: pointer;
    }
  }
  .active {
    border: 2px solid var(--clr-primary-5);
  }
  @media (max-width: 576px) {
    .main {
      height: 300px;
    }
    .gallery {
      img {
        height: 50px;
      }
    }
  }
  @media (min-width: 992px) {
    .main {
      height: 500px;
    }
    .gallery {
      img {
        height: 75px;
      }
    }
  }
`

export default ProductImages
