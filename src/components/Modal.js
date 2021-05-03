import ReactDom from "react-dom"
import styled from 'styled-components'
import Loading from "./Loading"
import { useProductsContext } from '../context/products_context'

export default function Modal() {

  const { single_product_loading } = useProductsContext();

  if (!single_product_loading) return null;  // если в стейе true, то в проверке будет false


  const overlay = {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(171, 181, 190, 0.8)',
    zIndex: 999,
  }

  return ReactDom.createPortal(
    <div >
      <div className="overlay" style={overlay} />
      <ModalCotainer>
        <Loading />
      </ModalCotainer>
    </div>,
    document.getElementById('portal')
  )
}


const ModalCotainer = styled.nav`
  width: 100%;

  box-sizing: border-box;
  border-radius: 12px;

  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
