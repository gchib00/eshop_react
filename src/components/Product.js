import React, { PureComponent } from 'react'
import styled from 'styled-components'
import RoundCart from '../static/images/roundCart.svg'
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
const OutOfStockText = styled.p`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    bottom: 105px;
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
    margin-bottom: -6rem;
`
const Cart = styled.img`
    position: relative;
    display: flex;
    left: 300px;
    bottom: -15px;
    visibility: hidden;
    cursor: pointer;
    margin: 0;
`
const LinkPDP = styled(Link)`
    text-decoration: none;
    &:hover > img {
        visibility: visible;
    }
`

class Product extends PureComponent{

    showProductPage = () => {
        return this.props.setProductPageItem(this.props.product)
    }
    outofstockStyle = (inStock) => {
        if (!inStock){
            return({
                opacity: '0.5',
                marginBottom: '-8rem',
            })
        }
        return null
    }
    outofstockText = (inStock) => {
        if(!inStock){
            return 'OUT OF STOCK'
        }
        return null
    }
    outofstockCart = (inStock) => {
        if(!inStock){
            return{
                visibility: 'hidden',
            }
        }
    }
    getCurrency = () => {
        const currencyIndex = this.props.selectedCurrency
        let currency = this.props.product.prices[currencyIndex].currency
        if (currency === 'USD') {currency = '$'}
        if (currency === 'GBP') {currency = '£'}
        if (currency === 'JPY') {currency = '¥'} 
        if (currency === 'RUB') {currency = '₽'}
        return currency
    }
    getAmount = () => {
        const currencyIndex = this.props.selectedCurrency
        const amount = this.props.product.prices[currencyIndex].amount
        return amount
    }
    render() {
        const availability = this.props.product.inStock
        return(
            <ProductCard>
                <LinkPDP to='/product'>
                    <MainImage 
                        src={this.props.product.gallery[0]} 
                        alt='product' 
                        onClick={this.showProductPage}
                        style={this.outofstockStyle(availability)}
                    />
                    <OutOfStockText>{this.outofstockText(availability)}</OutOfStockText>
                    <Cart 
                        src={RoundCart} 
                        onClick={this.showProductPage}
                        style={(this.outofstockCart(availability))}
                    />
                </LinkPDP>
                <ProductName>{this.props.product.name}</ProductName>
                <Price>{this.getCurrency()}{this.getAmount()}</Price>
            </ProductCard>
        )
    }
}
export default Product