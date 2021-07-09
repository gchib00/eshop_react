import React, { Component } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'


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
const Price = styled.p`
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 160%;
`

class Product extends Component{

    showProductPage = () => {
        return this.props.setProductPageItem(this.props.product)
    }

    render() {
        const currencyIndex = this.props.selectedCurrency
        let currency = this.props.product.prices[currencyIndex].currency
        let amount = this.props.product.prices[currencyIndex].amount

        if (currency === 'USD') {currency = '$'}
        if (currency === 'GBP') {currency = '£'}
        if (currency === 'JPY') {currency = '¥'}
        if (currency === 'RUB') {currency = '₽'}


        return (
            <ProductCard>
                <Link to='/product' >
                    <img 
                      src={this.props.product.gallery[0]} 
                      alt='product' 
                      style={{width:'100%', height: '80%'}}
                      onClick={this.showProductPage}
                    />
                </Link>
                <p style={{opacity: 0.7}}>
                    <strong>{this.props.product.name}</strong>
                </p>
                <Price>
                    <strong>{currency} {amount}</strong>
                </Price>
            </ProductCard>
        )
    }
}

export default Product