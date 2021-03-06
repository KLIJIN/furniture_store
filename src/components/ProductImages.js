import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useProductsContext } from '../context/products_context'

const ProductImages = ({ images = [{ url: '' }] }) => {
  console.log("ProductImages render");
  // console.log("ProductImages", images);
  const { SingleProductsAnmount } = useProductsContext() //достаем из контекста часть initialState
  const [main, setMain] = useState(images[0])

  useEffect(() => {
    setMain(images[0])
  }, [images])

  useEffect(() => {
    return () => {
      console.log("ProductImages anmount");
      SingleProductsAnmount();
    }
  }, [SingleProductsAnmount])

  const clickHandler = (index) => {
    // console.log("clickHandler", images[index])
    setMain(images[index])
  }
  return (
    <Wrapper>
      <img src={main?.url} alt='main' className='main' />
      <div className='gallery'>
        {/* {images.length > 1 && console.log("Загрузилось")} */}
        {
          images.map((image, index) => {
            return <img
              src={image.url}
              alt={image.filename}
              key={index}
              onClick={() => clickHandler(index)}
              className={`${image?.url === main?.url ? 'active' : null}`}
            />
          })
        }
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

export default React.memo(ProductImages);
