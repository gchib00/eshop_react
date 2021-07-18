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
        selectedOptions: []
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
  addToCart = (object) => {
    const cartItems = this.state.cartItems
    if (cartItems.length === 0) {
      object.quantity = 1
      return this.setState({
        cartItems: this.state.cartItems.concat(object),
        selectedOptions: []
      })
    }
    let matchCounter=0;
    for (let i=0; i<cartItems.length; i++){
      if (cartItems[i].product.name === object.product.name){
        for (let ii=0; ii<cartItems[i].productOptions.length; ii++){
          if (cartItems[i].productOptions[ii].option === object.productOptions[ii].option){
            matchCounter++
          }
        }
        if (matchCounter === cartItems[i].productOptions.length) {
          return this.updateQuantity(cartItems[i], 1)
        }
        matchCounter=0
      }
    }
    object.quantity = 1
    this.setState({
      cartItems: this.state.cartItems.concat(object),
      selectedOptions: []
    })
  }
  updateCartItem = (item, attributeName, option) => {
    //this changes the option of one of the attributes of a particular cartItem that it receives
    const cartItems = this.state.cartItems
    cartItems.map(cartItem => {
      if (cartItem.objectID === item.objectID){
        return cartItem.productOptions.map(productOption => {
          if (productOption.attributeName === attributeName){
            return productOption.option = option
          }
          return null
        })
      }
      return null
    })
    return this.setState({cartItems: cartItems})
  }
  saveOption = (productName, attributeName, option) => { 
    const selectedOptions = this.state.selectedOptions
    const object = { //this data is being retrieved from ProductDetails and is being passed to Cart
        productName: productName,
        attributeName: attributeName,
        option: option
    }
    //check if a mutually exclusive option had already been chosen for this item. If yes, delete previosuly selected item:
    for (let i=0; i<selectedOptions.length; i++){
      if (selectedOptions[i].productName === productName && selectedOptions[i].attributeName === attributeName){
          //if old option is found, it will be removed from the array:
          this.setState({
            selectedOptions: this.state.selectedOptions.splice(i, 1)
          })
      }
    }
    this.setState({
        selectedOptions: this.state.selectedOptions.concat(object)
    })
  }
  updateQuantity = (product, modifier) => {
    let items = this.state.cartItems
    let matchCounter = 0; 
    for (let i=0; i<items.length; i++) {
      if (items[i].objectID === product.objectID){
        for (let ii=0; ii<items[i].product.attributes.length; ii++){
          if (items[i].productOptions[ii].option === product.productOptions[ii].option){
            matchCounter++
          }
        }
        if (matchCounter === items[i].productOptions.length) {
          items[i].quantity += modifier //modifier is either -1 or +1
        }
        //if quantity is 0, remove the item from array
        if (items[i].quantity < 1) { 
          items.splice(i, 1)
          this.setState({cartItems: items})
        }
        //replace cartItems with updated array:
        return this.setState({cartItems: items})
      }
    }
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
                cartItems={this.state.cartItems}
              />
            </Route>product
            <Route exact path='/cart'>
              <Cart 
                items={this.state.cartItems} 
                selectedCurrency={this.state.selectedCurrency}
                updateQuantity={this.updateQuantity}
                saveOption={this.saveOption}
                updateCartItem={this.updateCartItem}
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