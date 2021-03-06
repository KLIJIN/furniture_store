import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Navbar, Sidebar, Footer, Modal } from './components'
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
    <>
      <Router>
        <Navbar />
        <Sidebar />
        <Switch>
          <Route exact path="/"> <HomePage />  </Route>
          <Route exact path="/furniture_store"> <HomePage />  </Route>
          <Route exact path="/about"> <AboutPage /> </Route>
          <Route exact path="/cart"> <CartPage /> </Route>
          <Route exact path="/products"> <ProductsPage /> </Route>
          <Route exact path="/products/:id" children={<SingleProductPage />} />
          <Route exact path="/checkout"> <CheckoutPage /> </Route>
          <Route path="*"> <ErrorPage /> </Route>
        </Switch>
        <Footer />
      </Router>
      <Modal />
    </>
  )
}

export default App