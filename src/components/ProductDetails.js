import React, { Component } from 'react'
import styled from 'styled-components'
import ColorSelectorBox from './ColorSelectorBox'

const MainContainer = styled.div`
    font-family: 'Raleway', sans-serif;
    width: 292px;
`
const OptionBoxes = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    margin: auto;
`
const OptionBox = styled.button`
    box-sizing: border-box;
    min-width: 63px;
    min-height: 45px;
    border: 1px solid #1D1F22;
    align-items: center;
    text-align: center; 
    background-color: white;
    &:hover {
        background-color: black;
        color: white;
        transition: 300ms;
    }
`
const AttributeTitle = styled.h2`
    display: flex;
    flex: flex-start;
    font-family: 'Roboto Condensed';
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 18px;
`
const AddToCart = styled.button`
    padding: 16px 32px;
    width: 292px;
    height: 52px;
    background: #5ECE7B;
    color: white;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 600;
    border: none;
    margin: auto;
    margin-bottom: 1rem;
`
const Description = styled.div`
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
`
const Price = styled.p`
    display: flex;
    justify-content: flex-start;
    font-style: normal;
    font-weight: bold;
    font-size: 24px;
    line-height: 18px;
    color: #1D1F22;
`

class ProductDetails extends Component {
    
    addProductToCart = () => {
        alert('product has been added')
        this.props.addToCart(this.props.product)
    }



    render() {
        const product = this.props.product
        // let attributes = this.props.product.attributes.length
        let currency = product.prices[this.props.selectedCurrency].currency
        let price = product.prices[this.props.selectedCurrency].amount

        if (currency === 'USD') {currency = '$'}
        if (currency === 'GBP') {currency = '£'}
        if (currency === 'JPY') {currency = '¥'}
        if (currency === 'RUB') {currency = '₽'}

        return(
            <MainContainer>
                <h1>{product.name}</h1>
                {product.attributes.length === 0 ? //if not checked, the program will break if product has no attribute
                    <br /> //returning br tag or 'null' will fix the problem
                :
                    product.attributes.map(attribute => {
                        return(
                            <div>
                                <AttributeTitle>{attribute.name}:</AttributeTitle>
                                {attribute.type === 'swatch' ?
                                    <OptionBoxes>
                                        {attribute.items.map(item => {
                                            return <ColorSelectorBox color={item.value} />
                                        })}
                                    </OptionBoxes>
                                :
                                    <OptionBoxes>
                                        {attribute.items.map(item => {
                                            return <OptionBox onClick={()=>this.selectOption(item.value)}>{item.value}</OptionBox>
                                        })}
                                    </OptionBoxes>
                                }
                                <br/>
                            </div>
                        )
                    })
                }
                <div>
                    <AttributeTitle>Price:</AttributeTitle>
                    <Price>{currency} {price}</Price>
                </div>
                <AddToCart onClick={this.addProductToCart}>ADD TO CART</AddToCart>
                <Description dangerouslySetInnerHTML={{__html: product.description}} />
            </MainContainer>
        )
    }

}

export default ProductDetails