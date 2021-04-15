import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Navbar, Sidebar, Footer } from './components'
// import SingleProductPage from "./pages/SingleProductPage"
import {
  AboutPage,
  //  AuthWrapper,
  CartPage,
  CheckoutPage,
  ErrorPage,
  HomePage,
  // PrivateRoute,
  ProductsPage,
  SingleProductPage
} from "./pages"

function App() {
  return (
    <Router>
      <Navbar />
      <Sidebar />
      <Switch>
        <Route exact path="/">      <HomePage />      </Route>  {/*зарезервировали адрес / за компонентом Home*/}
        <Route exact path="/about"> <AboutPage /> </Route>  {/*зарезервировали адрес  за компонентом AboutPage*/}
        <Route exact path="/cart">  <CartPage />  </Route>  {/*зарезервировали адрес  за компонентом CartPage*/}
        <Route exact path="/products"> <ProductsPage />  </Route>   {/*зарезервировали адрес  за компонентом ProductsPage*/}
        <Route exact path="/products/:id" children={<SingleProductPage />} />   {/*зарезервировали адрес c айди продуктов за компонентом Home*/}
        <Route exact path="/checkout"> <CheckoutPage /> </Route>  {/*зарезервировали адрес  за компонентом Home*/}
        <Route path="*"> <ErrorPage /> </Route>   {/*перехват ошибок*/}
      </Switch>
      <Footer />
    </Router>
  )
}

export default App
