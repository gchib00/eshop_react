import React, { Component } from 'react'
import styled from 'styled-components'
import OptionSelectorBox from './OptionSelectorBox'
import { v4 as uuidv4 } from 'uuid';



const MainContainer = styled.div`
    font-family: 'Raleway', sans-serif;
    width: 340px;
`
const ProductName = styled.h1`
    display: flex;
    justify-content: flex-start;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 600;
    font-size: 30px;
    margin-bottom: 3rem;
`
const OptionBoxes = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    margin: auto;
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
    width: 338px;
    height: 52px;
    background: #5ECE7B;
    color: white;
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 600;
    border: none;
    margin: auto;
    margin-bottom: 1rem;
    &:hover {
        transition: 300ms;
        opacity: 0.7;
    }
`
const Description = styled.div`
    font-family: 'Roboto';
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
    
    addProductToCart = (product, selectedOptions) => {
        this.props.addToCart(this.props.product)
    }

    render() {
        const product = this.props.product
        let currency = product.prices[this.props.selectedCurrency].currency
        let price = product.prices[this.props.selectedCurrency].amount

        if (currency === 'USD') {currency = '$'}
        if (currency === 'GBP') {currency = '£'}
        if (currency === 'JPY') {currency = '¥'}
        if (currency === 'RUB') {currency = '₽'}

        return(
            <MainContainer>
                <ProductName>{product.name}</ProductName>
                {product.attributes.length === 0 ? //otherwise the program will break if product has no attribute
                    <br /> //returning br tag or 'null' fixes the problem
                :
                    product.attributes.map(attribute => {
                        return(
                            <div key={uuidv4()}>
                                <AttributeTitle>{attribute.name}:</AttributeTitle>
                                    <OptionBoxes key={uuidv4()}>
                                        <OptionSelectorBox 
                                            key={uuidv4()}
                                            attribute={attribute} 
                                            product={product} 
                                            saveOption={this.props.saveOption} 
                                            selectedOptions={this.props.selectedOptions}    
                                        />
                                    </OptionBoxes>

                                <br/>
                            </div>
                        )
                    })
                }
                <div>
                    <AttributeTitle>Price:</AttributeTitle>
                    <Price>{currency} {price}</Price>
                </div>
                <AddToCart onClick={()=>this.addProductToCart(product, this.props.selectedOptions)}>ADD TO CART</AddToCart>
                <Description dangerouslySetInnerHTML={{__html: product.description}} />
            </MainContainer>
        )
    }

}

export default ProductDetails