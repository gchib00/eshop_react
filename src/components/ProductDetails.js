import React, { Component } from 'react'
import styled from 'styled-components'
import ColorSelectorBox from './ColorSelectorBox'
import OptionSelectorBox from './OptionSelectorBox'
import { v4 as uuidv4 } from 'uuid';



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
        console.log('Saving the item:')
        console.log(product)
        console.log('with the following options:')
        console.log(selectedOptions)
        alert('Product has been added to cart')
        this.props.addToCart(this.props.product)
    }

    // selectOption = (product, option) => {
    //     alert(`${option} is selected from ${product.name}`)
    //     let attributeIndex;
    //     let itemsIndex;
    //     for (let i=0; i<product.attributes.length; i++){
    //         for (let ii=0; ii<product.attributes[i].items.length; ii++){
    //                 if (product.attributes[i].items[ii].value === option){
    //                     attributeIndex = i; itemsIndex=ii;
    //                 }
    //         }
    //     }
    //     // console.log('attributeIndex', attributeIndex)
    //     // console.log('itemsIndex', itemsIndex)
    // }


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
                <h1>{product.name}</h1>
                {product.attributes.length === 0 ? //otherwise the program will break if product has no attribute
                    <br /> //returning br tag or 'null' fixes the problem
                :
                    product.attributes.map(attribute => {
                        return(
                            <div key={uuidv4()}>
                                <AttributeTitle>{attribute.name}:</AttributeTitle>
                                {attribute.type === 'swatch' ?
                                    <OptionBoxes>
                                        <ColorSelectorBox attribute={attribute}/>
                                    </OptionBoxes>
                                :
                                    <OptionBoxes key={uuidv4()}>
                                        <OptionSelectorBox 
                                            key={uuidv4()}
                                            attribute={attribute} 
                                            product={product} 
                                            saveOption={this.props.saveOption} 
                                            selectedOptions={this.props.selectedOptions}    
                                        />
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
                <AddToCart onClick={()=>this.addProductToCart(product, this.props.selectedOptions)}>ADD TO CART</AddToCart>
                <Description dangerouslySetInnerHTML={{__html: product.description}} />
            </MainContainer>
        )
    }

}

export default ProductDetails