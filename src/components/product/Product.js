import React, { Component } from 'react'
import styled from 'styled-components'
import RoundCart from '../../static/images/roundCart.svg'
import { Link } from 'react-router-dom'


const ProductCard = styled.div`
    margin: auto;
    margin-top: 3rem;
    margin-bottom: 3rem;
    width: 386px;
    height: 464px;
    &:hover {
        box-shadow: 0px 4px 35px rgba(168, 172, 176, 0.19);
        transition: 300ms;
    }
    &:hover > img { 
        visibility: visible; 
    }
`
const ProductName = styled.p`
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 18px;
    color: #1D1F22;
    margin-left: 1rem;
    line-height: 10px;
`
const Price = styled.p`
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    margin-left: 1rem;
`
const OutOfStock = styled.img`
    width: 100%;
    height: 100%;
`
const OutOfStockText = styled.p`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 205px;

    text-decoration: none;
    font-family: 'Raleway';
    font-weight: 400;
    font-size: 24px;
    color: grey;
`
const MainImage = styled.img`
    width: 94%; 
    height: 78%; 
    margin: 0.64rem;
    margin-bottom: -3rem;
`
const Cart = styled.img`
    position: relative;
    display: flex;
    left: 300px;
    bottom: -15px;
    visibility: hidden;
    cursor: pointer;
    margin: 0;
    &:hover {
        box-shadow: 0px 2px 3px 1px grey;
        border-radius: 50%;
    }
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
            <>
                {this.props.product.inStock === false ?
                    <ProductCard style={{opacity: '0.5'}}>
                        <div style={{width:'100%', height: '80%'}}>
                            <OutOfStock 
                                src={this.props.product.gallery[0]} 
                                alt='out of stock product' 
                            />
                            <OutOfStockText>OUT OF STOCK</OutOfStockText>
                        </div>
                        <ProductName>{this.props.product.name}</ProductName>
                        <Price>{currency}{amount}</Price>
                    </ProductCard>
                    :
                    <ProductCard>
                        <Link to='/product' >
                            <MainImage 
                                src={this.props.product.gallery[0]} 
                                alt='product' 
                                onClick={this.showProductPage}
                            />
                        </Link>
                        <Cart src={RoundCart} onClick={()=>this.props.addToCart(this.props.product)} />
                        <ProductName>{this.props.product.name}</ProductName>
                        <Price>{currency}{amount}</Price>
                    </ProductCard>
                    }
                </>
        )
    }
}

export default Product