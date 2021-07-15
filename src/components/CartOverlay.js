import React, {Component} from 'react'
import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom'

import QuantityModifierSmall from './QuantityModifierSmall'



const CartContainer = styled.div` 
    position: absolute;
    z-index: 10;
    min-height: 300px;
    min-width: 385px;
    background: white;
    left: 58vw;
    @media(min-width: 1280px) {
        left: 66vw
    }
    @media(min-width: 1500px) {
        left: 70vw
    }
    @media(min-width: 1700px) {
        left: 72vw
    }
    @media(min-width: 1800px) {
        left: 75vw
    }
    @media(min-width: 1900px) {
        left: 78vw
    }
    @media(min-width: 2000px) {
        left: 80vw
    }    
`
const MyBag = styled.h3`
    font-family: 'Raleway';
    font-style: normal;
    font-weight: bold;
    font-size: 16px;
    line-height: 26px;
    margin-left: 1rem;
`
const ItemsSpan = styled.span`
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 200;
    font-size: 16px;
`

const ItemContainer = styled.div`
    font-family: 'Raleway', sans-serif;
    display: flex;
    justify-content: space-between;
    width: 98%;
    min-height: 140px;
    /* border-top: 1px solid #E5E5E5; */
    align-items: center;
`
const Title = styled.p`
    font-family: 'Raleway', sans-serif;
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    align-items: center;
    color: #1D1F22;
    margin-left: 1rem;
`
const Price = styled.p`
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 600;
    font-size: 14px;
    align-items: center;
    color: #1D1F22;
    margin-left: 1rem;
    margin-right: 1rem;
    line-height: 3px;
`
const Attribute = styled.p`
    font-style: normal;
    font-weight: 100;
    font-size: 14px;
    align-items: center;
    color: #1D1F22;
    margin-left: 1rem;
    line-height: 5px;
`
const Side1 = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    min-height: 137px;
    text-overflow: none;
    margin-top: 0.6rem;
    margin-bottom: 0.6rem;
`
const Side2 = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    min-height: 137px;
    margin-top: 0.6rem;
    margin-bottom: 0.6rem;
`
const Image = styled.img`
    width: 100px;
    height: 137px;
`
const TotalSection = styled.div`
    display: flex;
    justify-content: space-between;
    height: 30px;
    align-items: center;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
`
const ButtonContainer = styled.div`
    height: 43px;
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 1.5rem;
`
const ViewbagButton = styled(Link)`
    font-family: 'Raleway', sans-serif;
    text-decoration: none;
    font-weight: 600;
    font-size: 14px; 
    min-width: 150px;
    padding-top:12px;
    background-color: white;
    border: 1px solid black;
    color: black;
    text-align: center;
    &:hover{
        opacity: 0.5;
    }
`
const CheckoutButton = styled(Link)`
    font-family: 'Raleway', sans-serif;
    text-decoration: none;
    border: none;
    font-weight: 600;
    font-size: 14px;
    min-width: 150px;
    padding-top:13px;
    background-color: #5ECE7B;
    color: white;
    text-align: center;
    &:hover{
        opacity: 0.7;
    }
`
const ColorContainer = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
    margin-top: -4px;
`
const ColorCube = styled.div`
    max-width: 8px;
    padding: 8px;
    border: 1px black solid;
    margin-left: 5px;
`

class CartOverlay extends Component {
    getItemOptions = (attribute, cartItem) => {
        const selectedOptions = this.props.selectedOptions
        for (let i=0; i<selectedOptions.length; i++){
            if (selectedOptions[i].product.name === cartItem.name 
             && selectedOptions[i].attribute.name === attribute.name) {
                return selectedOptions[i].option
            }
        }
    }
    getTotal = () => {
        let total = 0;
        let items = this.props.items
        items.map(item => {
            return total = total + item.prices[this.props.selectedCurrency].amount * item.quantity
        })
        return total.toFixed(2)
    }
    checkIfEmpty = () => {
        if (this.props.items.length < 1) {
            return <h1>Cart is empty</h1>
        }
    }
    mybagText = () => {
        const items = this.props.items
        let totalItems = `${items.length} items`
        if (items.length === 1) {
            totalItems=`${items.length} item`
        }
        return(<MyBag>My Bag.<ItemsSpan> {totalItems}</ItemsSpan></MyBag>)
    }
    getCurrencySymbol = (currency) => {
        let symbol = currency
        // //in case currency is index:
        // if (typeof symbol !== String){
        //     console.log('currency para:', currency)
        //     // symbol = this.props.items[0].prices[currency].currency
        // }
        if (symbol === 'USD') {symbol = '$'}
        if (symbol === 'GBP') {symbol = '£'}
        if (symbol === 'JPY') {symbol = '¥'}
        if (symbol === 'RUB') {symbol = '₽'} 
        return symbol
    }
    showItems = () => {
        const array = []
        const items = this.props.items
        const index = this.props.selectedCurrency
        items.map(item => {
            const currency = item.prices[index].currency
            let price = item.prices[index].amount
            return array.push(
                <ItemContainer key={item.id}>
                    <Side1>
                        <Title>{item.name}</Title> 
                        <Price>{this.getCurrencySymbol(currency)}{price}</Price>
                        <div>
                            {item.attributes.length === 0 ? null :
                                item.attributes.map(attribute => 
                                    {if (attribute.type === 'swatch') {
                                        return(
                                            <ColorContainer key={uuidv4()}>
                                                <Attribute>{attribute.id}: </Attribute>
                                                <ColorCube style={{backgroundColor: this.getItemOptions(attribute, item)}} />
                                            </ColorContainer>
                                        )
                                    } else {
                                        return(
                                            <div key={uuidv4()}>
                                                <Attribute>{attribute.id}: {this.getItemOptions(attribute, item)}</Attribute>
                                            </div>
                                        )
                                    }}
                                )
                            }
                        </div>
                    </Side1>
                    <Side2>
                        <QuantityModifierSmall item={item} updateQuantity={this.props.updateQuantity}/>
                        <Image src={item.gallery[0]} />
                    </Side2>
                </ItemContainer>
            ) 
        })
        return array
    }


    render(){

        this.checkIfEmpty()
        return(
            <CartContainer>
                {this.mybagText()}
                {this.showItems()}
                    <TotalSection>
                        <Title>Total</Title>
                        <Price>
                            {this.getCurrencySymbol(this.props.items[0].prices[this.props.selectedCurrency].currency)} {this.getTotal()}
                        </Price>
                    </TotalSection>
                    <ButtonContainer>
                        <ViewbagButton to='/cart'>VIEW BAG</ViewbagButton>
                        <CheckoutButton to='/cart'>CHECK OUT</CheckoutButton>
                    </ButtonContainer>
            </CartContainer>
        )
    }
}

export default CartOverlay