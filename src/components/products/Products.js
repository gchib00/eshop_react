import React, { Component } from 'react'
import Product from '../product/Product'
import styled from 'styled-components'

const ProductsGrid = styled.div`
    display: grid;
    grid-template-columns: 3fr 3fr 3fr;
    grid-template-rows: 1fr;
    font-family: 'Raleway', sans-serif;
`


class Products extends Component{    
    render(){
        return(
            <>
                <h3 style={{fontFamily: `'Raleway', sans-serif`, marginLeft: '40px'}}>
                    Showing {this.props.category}
                </h3>
                <ProductsGrid>
                    {
                    
                    this.props.productsArray.map(product => {
                        if (product.category === this.props.category) { //filters out products by category
                            return <Product 
                                      key={product.description} 
                                      product={product} 
                                      selectedCurrency={this.props.selectedCurrency}
                                      setProductPageItem={this.props.setProductPageItem}
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