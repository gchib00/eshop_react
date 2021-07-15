import React, { Component } from 'react'
import Products from './components/Products'
import Header from './components/Header'
import ProductPage from './components/ProductPage'
import Cart from './components/Cart'
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

const client = new ApolloClient({
  uri: 'http://localhost:4000/'
})

class App extends Component{
  constructor(){
    super()
    this.state={
        dataArray: [],
        category: '',
        selectedCurrency: 0,
        productPageItem: {},
        cartItems: [],
        selectedOptions: [],
        total: 0
    }
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
    let cartItems = this.state.cartItems
    //check if product is already in the cart. If yes, just increase quantity instead of adding separate cartItem:
    for (let i=0; i<cartItems.length; i++) {
      if (cartItems[i].name === product.name) {
        cartItems[i].quantity += 1
        return this.setState({cartItems: cartItems})
      }
    }
    //Since product isn't added to the cart yet, wrap it in a new object and add quantity to it, then pass it to Cart
    product.quantity = 1
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
  updateQuantity = (product, modifier) => {
    let items = this.state.cartItems
    for (let i=0; i<items.length; i++) {
      if (items[i].name === product.name){
        items[i].quantity = items[i].quantity + modifier //modifier is either -1 or +1
        //if quantity is 0, remove the item from array
        if (items[i].quantity === 0) { 
          items.splice(i, 1)
        }
      }
    }
    //replace cartItems with updated array:
    this.setState({cartItems: items})
  }
  render(){
    return(
      <ApolloProvider client={client}>
        <Router>
          <Header 
            category={this.state.category} 
            updateCategory={this.handleCategoryChange} 
            changeCurrency={this.handleCurrencyChange}
            items={this.state.cartItems} 
            selectedCurrency={this.state.selectedCurrency}
            updateQuantity={this.updateQuantity}
            saveOption={this.saveOption}
            selectedOptions={this.state.selectedOptions}
          />
          <Switch>
            <Route exact path='/'>
              <Products 
                category={this.state.category} 
                productsArray={this.state.dataArray} 
                selectedCurrency={this.state.selectedCurrency}
                setProductPageItem={this.setProductPageItem}
                addToCart={this.addToCart}
              />
            </Route>
            <Route exact path='/product'>
              <ProductPage productPageItem
                product={this.state.productPageItem}
                selectedCurrency={this.state.selectedCurrency}
                addToCart={this.addToCart}
                saveOption={this.saveOption}
                selectedOptions={this.state.selectedOptions}
              />
            </Route>product
            <Route exact path='/cart'>
              <Cart 
                items={this.state.cartItems} 
                selectedCurrency={this.state.selectedCurrency}
                updateQuantity={this.updateQuantity}
                saveOption={this.saveOption}
                selectedOptions={this.state.selectedOptions}
              />
            </Route>
          </Switch>
        </Router>
      </ApolloProvider>
    )
  }
}
export default App;