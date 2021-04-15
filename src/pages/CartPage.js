import React from 'react'
import styled from 'styled-components'
import { useCartContext } from '../context/cart_context'
import { Link } from 'react-router-dom'
import { CartContent, PageHero } from '../components'
// import { CartContent, PageHero } from '../components'

const CartPage = () => {

  const { cart } = useCartContext();

  if (cart.length < 1) {
    return <Wrapper className="page-100" >
      <div className="empty" >
        <h2> Корзина Пуста </h2>
        <Link to="/products" className="btn" > Обратно в каталог  </Link>
      </div>
    </Wrapper>
  }

  return <main>
    <PageHero title="cart" />
    <Wrapper className="page" >
      <h2>cart page</h2>
      <CartContent />
    </Wrapper>
  </main >
}

const Wrapper = styled.main`
  .empty {
    text-align: center;
    h2 {
      margin-bottom: 1rem;
      text-transform: none;
    }
  }
`

export default CartPage
