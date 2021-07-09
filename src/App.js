import React, { Component } from 'react'
import Products from './components/products/Products'
import Header from './components/Header'
import ProductPage from './components/ProductPage'
import Cart from './components/Cart'

import axios from 'axios'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'


class App extends Component{
  constructor(){
    super()
    this.state={
        dataArray: [],
        category: 'tech',
        selectedCurrency: 0,
        productPageItem: {},
        cartItems: []
    }
    this.fetchData = this.fetchData.bind(this);
  }

  fetchData = async () => {
    const url = 'http://localhost:4000/'
    const productNames_QUERY = `
    query {
      category{
        products{
          name
          prices{
            amount,
            currency
          }
          gallery,
          description,
          category,
          attributes{
            items{
              displayValue,
              id,
              value
            }
            id,
            name,
            type,
          }
        }
      }
    }
    `
    await axios
        .post(url, {query: productNames_QUERY})
        .then(response => {
            this.setState({
                dataArray: this.state.dataArray.concat(response.data.data.category.products)
            })
        })
  }

  componentDidMount(){
      this.fetchData()
  }

  handleCategoryChange = (category) => {
    this.setState({category: category})
  }

  handleCurrencyChange = (currencyIndex) => {
    this.setState({selectedCurrency: currencyIndex})
  }

  setProductPageItem = (product) => {
    this.setState({productPageItem: product})
  }

  addToCart = (product) => {
    this.setState({cartItems: this.state.cartItems.concat(product)})
  }


  render(){
    return(
      <Router>
          <>
            <Header 
              category={this.state.category} 
              updateCategory={this.handleCategoryChange} 
              changeCurrency={this.handleCurrencyChange}
            />
            <Switch>
              <Route exact path='/'>
                <Products 
                  category={this.state.category} 
                  productsArray={this.state.dataArray} 
                  selectedCurrency={this.state.selectedCurrency}
                  setProductPageItem={this.setProductPageItem}
                />
              </Route>
              <Route exact path='/product'>
                <ProductPage 
                  product={this.state.productPageItem}
                  selectedCurrency={this.state.selectedCurrency}
                  addToCart={this.addToCart}
                />
              </Route>
              <Route exact path='/cart'>
                <Cart 
                  items={this.state.cartItems} 
                  selectedCurrency={this.state.selectedCurrency}
                />
              </Route>
            </Switch>
        </>
      </Router>
    )
  }
}

export default App;