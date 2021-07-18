import React, {Component} from 'react'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid';
import PhotoSlider from './PhotoSlider'
import QuantityModifier from './QuantityModifier'
import CartOptionSelectorBox from './CartOptionSelectorBox'

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
        const items = this.props.items
        if (items[0] === undefined) {return null}
        const currencySymbol = this.getCurrencySymbol(this.props.items[0].product.prices[this.props.selectedCurrency].currency)
        items.map(item => {
            return total = total + item.product.prices[this.props.selectedCurrency].amount * item.quantity
        })
        return currencySymbol+total.toFixed(2)
    }
    getCartTitle = () => {
        if (this.props.items.length < 1) {
            return 'Cart is empty'
        }
        return 'CART'
    }
    getCurrencySymbol = (currency) => {
        let symbol = currency
        if (symbol === 'USD') {symbol = '$'}
        if (symbol === 'GBP') {symbol = '£'}
        if (symbol === 'JPY') {symbol = '¥'}
        if (symbol === 'RUB') {symbol = '₽'} 
        return symbol
    }
    showItems = () => {
        const array = []
        const index = this.props.selectedCurrency
        this.props.items.map(item => {
            const currency = item.product.prices[index].currency
            const price = item.product.prices[index].amount
            return array.push(
                <ItemContainer key={uuidv4()}>
                    <Side1>
                        <Title>{item.product.name}</Title> 
                        <Price>{this.getCurrencySymbol(currency)}{price}</Price>
                        <br />
                        <div>
                            {(item.product.attributes.length === 0) ? <br/> :
                                item.product.attributes.map(attribute => {
                                    return(
                                        <div key={uuidv4()}>
                                            <OptionBoxes>
                                                <CartOptionSelectorBox         
                                                    attribute={attribute} 
                                                    cartItems={this.props.items}
                                                    selectedOptions={item.productOptions}
                                                    id={item.objectID}
                                                    item={item}
                                                    updateCartItem={this.props.updateCartItem}
                                                />
                                            </OptionBoxes>
                                            <br/>
                                        </div>)
                                })
                            }
                        </div>
                    </Side1>
                    <Side2>
                        <QuantityModifier item={item} updateQuantity={this.props.updateQuantity}/>
                        <PhotoSlider item={item} />
                    </Side2>
                </ItemContainer>) 
        })
        return array
    }
    totalText = () => {
        if (this.props.items[0] === undefined) {return null}
        return 'TOTAL'
    }
    render(){        
        return(
            <>
                <CartTitle>{this.getCartTitle()}</CartTitle>
                <br />
                {this.showItems()}
                <TotalAmount>
                    <h2>{this.totalText()}</h2>
                    <h2>{this.getTotal()}</h2>
                </TotalAmount>
            </>
        )
    }
}
export default Cart