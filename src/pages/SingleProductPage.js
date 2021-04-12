import React, { useEffect } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { useProductsContext } from '../context/products_context'
import { single_product_url as url } from '../utils/constants'
import { formatPrice } from '../utils/helpers'
import { Loading, Error, ProductImages, AddToCart, Stars, PageHero, } from '../components'




const SingleProductPage = () => {

  const { id } = useParams();
  const history = useHistory()

  const {
    single_product_loading: loading,
    single_product_error: error,
    single_product: product,
    fetchSingleProduct,
  } = useProductsContext() //достаем из контекста часть initialState


  useEffect(() => {
    fetchSingleProduct(`${url}${id}`)
  }, [id])

  useEffect(() => {
    //переадресация на главную страницу в случае ошибки через 5 секунд 
    if (error) {
      setTimeout(() => {
        history.push('/')
      }, 5000)
    }
    // eslint-disable-next-line
  }, [error])

  const { name, price, description, stock, stars, reviews, id: sku, company, images, } = product
  return <Wrapper>
    {loading && <Loading />}
    {error && <Error />}
    < PageHero title={name} product={product} />
    <div className="section section-center page">
      <Link to="/products" className="btn" > Обратно в Каталог  </Link>
      <div className="product-center">
        {images?.length > 1 && <ProductImages images={images} sku={sku} id={id} />}
        <section className="content">
          <h2>{name}</h2>
          <Stars stars={stars} reviews={reviews} />
          <h5 className="price">  {formatPrice(price)}  </h5>
          <p className="desc"> {description}</p>
          <p className="info">
            <span>Наличие:</span>
            {stock > 0 ? "В наличии" : "Отсутствует на складе"}
          </p>
          <p className="info">
            <span>SKU:</span>
            {sku}
          </p>
          <p className="info"> <span>Фирма:</span> {company} </p>
          <hr />
          {stock > 0 && < AddToCart product={product} />}
        </section>
      </div>

    </div>

  </Wrapper>
}

const Wrapper = styled.main`
  .product-center {
    display: grid;
    gap: 4rem;
    margin-top: 2rem;
  }
  .price {
    color: var(--clr-primary-5);
  }
  .desc {
    line-height: 2;
    max-width: 45em;
  }
  .info {
    text-transform: capitalize;
    width: 300px;
    display: grid;
    grid-template-columns: 125px 1fr;
    span {
      font-weight: 700;
    }
  }

  @media (min-width: 992px) {
    .product-center {
      grid-template-columns: 1fr 1fr;
      align-items: center;
    }
    .price {
      font-size: 1.25rem;
    }
  }
`

export default SingleProductPage
