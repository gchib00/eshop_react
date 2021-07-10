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
        cartItems: [],
        selectedOptions: []

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

  saveOption = (product, attribute, option) => { 
    let selectedOptions = this.state.selectedOptions
    let object = { //this data is being retrieved from ProductDetails and is being passed to Cart
        product: product,
        attribute: attribute,
        option: option
    }
    //check if a mutually exclusive option had already been chosen for this item. If yes, delete previosuly selected item:
    for (let i=0; i<selectedOptions.length; i++){
      if (selectedOptions[i].product.name === product.name){
        if (selectedOptions[i].attribute.id === attribute.id) {
          //if old option is found, it will be removed from the array:
          this.setState({
            selectedOptions: this.state.selectedOptions.splice(i, 1)
          })
          //option will now be replaced by a new one:
        }
      }
    }
    this.setState({
        selectedOptions: this.state.selectedOptions.concat(object)
    })
  }


  render(){
    console.log("selectedOptions: ",this.state.selectedOptions)
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
                  saveOption={this.saveOption}
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