import React, {Component} from 'react'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid';


import PhotoSlider from './PhotoSlider'
import QuantityModifier from './QuantityModifier'
import OptionSelectorBox from './OptionSelectorBox'

const ItemContainer = styled.div`
    font-family: 'Raleway', sans-serif;
    display: flex;
    justify-content: space-between;

    max-width: 1100px;
    min-height: 186px;
    border-top: 1px solid #E5E5E5;
    margin-left: 3rem;
    margin-bottom: 1rem;

    align-items: center;
`
const CartTitle = styled.h1`
    font-family: 'Raleway';
    font-style: normal;
    font-weight: bold;
    font-size: 32px; 
    margin-left: 3rem;
`
const Title = styled.p`
    font-style: normal;
    font-weight: 500;
    font-size: 30px;
    line-height: 27px;
    align-items: center;
    color: #1D1F22;
`
const Price = styled.p`
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 18px;
    align-items: center;
    color: #1D1F22;
`
const OptionBoxes = styled.div`
    min-width: 200px;
    max-width: 400px;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
`
const Side1 = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`
const Side2 = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
`
const TotalAmount = styled.div`
    font-family: 'Raleway', sans-serif;
    display: flex;
    justify-content: space-between;
    align-items: center;
    max-width: 1100px;
    border-top: 1px solid #E5E5E5;
    margin-left: 3rem;
    margin-bottom: 1rem;
`


class Cart extends Component {

    getTotal = () => {
        let total = 0;
        let items = this.props.items
        items.map(item => {
            return total = total + item.prices[this.props.selectedCurrency].amount * item.quantity
        })
        return total.toFixed(2)
    }

    render(){
        let items = this.props.items
        let index = this.props.selectedCurrency
        let currencyIdentifier;
        
        if (items.length < 1) {
            return <CartTitle>Cart is empty</CartTitle>
        }

        return(
            <>
                <CartTitle>CART</CartTitle>
                <br />
                
                {items.map(item => {

                    let currency = item.prices[index].currency
                    let price = item.prices[index].amount
                        if (currency === 'USD') {currency = '$'}
                        if (currency === 'GBP') {currency = '£'}
                        if (currency === 'JPY') {currency = '¥'}
                        if (currency === 'RUB') {currency = '₽'}
                        currencyIdentifier = currency

                    return(
                        <ItemContainer key={item.id}>
                            <Side1>
                                <Title>{item.name}</Title> 
                                <Price>{currency}{price}</Price>
                                <br />
                                <div>
                                    {item.attributes.length === 0 ? //needs to be checked, otherwise the program will break if product has no attribute
                                    <br /> //returning br tag or 'null' will fix the problem
                                    :
                                        item.attributes.map(attribute => {
                                            return(
                                                <div key={uuidv4()}>
                                                    <OptionBoxes>
                                                        <OptionSelectorBox         
                                                            attribute={attribute} 
                                                            saveOption={this.props.saveOption} 
                                                            product={item}
                                                            selectedOptions={this.props.selectedOptions}
                                                        />
                                                    </OptionBoxes>
                                                    <br/>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </Side1>
                            <Side2>
                                <QuantityModifier item={item} updateQuantity={this.props.updateQuantity}/>
                                <PhotoSlider item={item} />
                            </Side2>
                        </ItemContainer>
                    ) 
                })}
                        <TotalAmount>
                            <h2>TOTAL</h2>
                            <h2>{currencyIdentifier}{this.getTotal()}</h2>
                        </TotalAmount>
            </>
        )
    }
}

export default Cart