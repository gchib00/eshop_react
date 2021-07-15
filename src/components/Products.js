import React, { PureComponent } from 'react'
import Product from './Product'
import styled from 'styled-components'
import gql from 'graphql-tag'
import {graphql} from 'react-apollo'

const ProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 3fr 3fr 3fr;
  grid-template-rows: 1fr;
  font-family: 'Raleway', sans-serif;
`
const Title = styled.h1`
  font-family: 'Raleway';
  font-style: normal;
  font-weight: normal;
  font-size: 37px;
  margin-left: 4rem;
`
//$category has value of props.category, which allows us to filter the query before the data is fetched
const PRODUCTS_QUERY = gql`
  query($category: String!){ 
    category(input: {title: $category}){
      products{
        id,
        inStock,
        name,
        prices{
          amount,
          currency
        }
        gallery,
        description,
        category,
        attributes{
          items{
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
class Products extends PureComponent{    
  filteredList = () => {
    const array = []
    if (!this.props.data.loading){
      this.props.data.category.products.map(product => array.push(product))
    }
    return array
  }
  displayTitle = () => {
    if (this.props.category === '') {
      return 'Category - All'
    }
    return `Category - ${this.props.category.charAt(0).toUpperCase()+ this.props.category.slice(1)}`
  }
  render(){
    return(
      <>
        <Title>{this.displayTitle()}</Title>
        <ProductsGrid>
          {this.filteredList().map(product => {
            return(
              <Product 
                key={product.id} 
                product={product} 
                selectedCurrency={this.props.selectedCurrency}
                setProductPageItem={this.props.setProductPageItem}
                addToCart={this.props.addToCart}
              />
            )} 
          )}
        </ProductsGrid>
      </>
    )
  }
}
export default graphql(PRODUCTS_QUERY, {
  options: (props) =>{
    return { //passes a category variable to products query, from where it can be used to filter the data
        variables: {category: props.category}}
  }
})(Products)