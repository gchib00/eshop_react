import React, { Component } from 'react'
import Product from './Product'
import styled from 'styled-components'

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


class Products extends Component{    
    render(){
        return(
            <>
                <Title>
                    Category - {this.props.category.charAt(0).toUpperCase()+ this.props.category.slice(1)}
                </Title>
                <ProductsGrid>
                    {
                    
                    this.props.productsArray.map(product => {
                        if (product.category === this.props.category) { //filters out products by category
                            return <Product 
                                      key={product.description} 
                                      product={product} 
                                      selectedCurrency={this.props.selectedCurrency}
                                      setProductPageItem={this.props.setProductPageItem}
                                      addToCart={this.props.addToCart}
                                    /> 
                        } else {
                            return null
                        }
                    })

                    }
                </ProductsGrid>
            </>
        )
    }
}

export default Products