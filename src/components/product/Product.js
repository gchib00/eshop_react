import React, { Component } from 'react'
import styled from 'styled-components'

const ProductCard = styled.div`
    margin: auto;
    margin-top: 3rem;
    margin-bottom: 3rem;
    width: 386px;
    height: 444px;
    /* border: 1px solid grey; */
    &:hover {
        box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
        transition: 400ms;
    }
`

class Product extends Component{
    // constructor(props) {
    //     super(props)
    // }
    render() {
        const currencyIndex = this.props.selectedCurrency
        return (
            <ProductCard>
                <img src={this.props.product.gallery[0]} alt='product' style={{width:'100%', height: '80%'}}/>
                <p style={{opacity: 0.7}}>
                    <strong>{this.props.product.name}</strong>
                </p>
                <p>
                    <strong>{this.props.product.prices[currencyIndex].currency} {this.props.product.prices[currencyIndex].amount}</strong>
                </p>
            </ProductCard>
        )
    }
}

export default Product