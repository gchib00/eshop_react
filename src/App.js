import React, { Component } from 'react'
import Products from './components/products/Products'
import Header from './components/Header'

import axios from 'axios'


class App extends Component{
  constructor(){
    super()
    this.state={
        dataArray: [],
        category: 'tech',
        selectedCurrency: 0
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
            id
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
            console.log(this.state.dataArray)
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
  render(){
    return(
      <div className='App'>
        <Header 
          category={this.state.category} 
          updateCategory={this.handleCategoryChange} 
          changeCurrency={this.handleCurrencyChange}
        />
        <Products 
          category={this.state.category} 
          productsArray={this.state.dataArray} 
          selectedCurrency={this.state.selectedCurrency}
        />
      </div>
    )
  }
}

export default App;