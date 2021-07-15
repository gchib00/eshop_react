import React, { PureComponent } from 'react'
import styled from 'styled-components'
import OptionSelectorBox from './OptionSelectorBox'
import { v4 as uuidv4 } from 'uuid';
import sanitizeHtml from 'sanitize-html';

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
    justify-content: flex-start;
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

class ProductDetails extends PureComponent {
    
    addProductToCart = (product, selectedOptions) => {
        if (!product.inStock){
            return null
        }
        return this.props.addToCart(this.props.product)
    }
    disableButton = (available) => {
        if(!available){
            return({display: 'none'})
        }
        return null
    }
    purifyHtml = (html) => {
        const purifiedHtml = sanitizeHtml(html, {
            allowedTags: ['p', 'ul', 'li', 'div', 'span', 'strong', 'h2','h3','h4'],
            allowedAttributes: {}
        })
        return purifiedHtml
    }
    renderAttributes = () => {
        const array = []
        const product = this.props.product
        product.attributes.map(attribute => array.push(
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
        )
        return array
    }
    render() {
        const product = this.props.product
        let currency = product.prices[this.props.selectedCurrency].currency
        let price = product.prices[this.props.selectedCurrency].amount
        if (currency === 'USD') {currency = '$'}
        if (currency === 'GBP') {currency = '£'}
        if (currency === 'AUD') {currency = '$'}
        if (currency === 'JPY') {currency = '¥'}
        if (currency === 'RUB') {currency = '₽'}

        return(
            <MainContainer>
                <ProductName>{product.name}</ProductName>
                {this.renderAttributes()}
                <div>
                    <AttributeTitle>Price:</AttributeTitle>
                    <Price>{currency} {price}</Price>
                </div>
                <AddToCart 
                    onClick={()=>this.addProductToCart(product, this.props.selectedOptions)}
                    style={this.disableButton(product.inStock)}>ADD TO CART
                </AddToCart>
                <Description dangerouslySetInnerHTML={{__html: this.purifyHtml(product.description)}} />
            </MainContainer>
        )
    }
}
export default ProductDetails